const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.services");
const { createToken, verifyJWT } = require("../auth/autUtils");
const { getInfoData } = require("../utils");
const { log } = require("console");
const {
  BadResponseError,
  AuthResponseError,
} = require("../core/error.response");
const { findByEmail } = require("./shop.service");

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
  static handleRefreshToken = async (refreshToken) => {
    const foundToken = KeyTokenService.findByRefreshTokenUsed(refreshToken);
    if (foundToken) {
      const { userId, email } = verifyJWT(refreshToken, foundToken.privateKey);
      console.log("userId, email", userId, email);

      await KeyTokenService.deleteKeyById(userId);
      throw new ForbiddenError("something went wrong!! please relogin");
    }

    const holderToken = await KeyTokenService.findByRefreshToken(refreshToken);
    if (!holderToken) throw new AuthResponseError("Invalid refresh token");

    const { userId, email } = verifyJWT(refreshToken, foundToken.privateKey);
    console.log("[2] userId, email", userId, email);

    const foundShop = await findByEmail({ email });
    if (!foundShop) throw new AuthResponseError("Invalid refresh token");

    const tokens = await createToken(
      { userId: foundShop._id, email },
      holderToken.publicKey,
      holderToken.privateKey
    );
  };
  static logout = async (keyStore) => {
    const delKey = await KeyTokenService.removeKeyById(keyStore._id);
    return delKey;
  };

  static login = async ({ email, password, refreshToken = null }) => {
    const foundShop = await findByEmail({ email });
    if (!foundShop) throw new BadResponseError("Error: Shop not found");

    const match = bcrypt.compare(password, foundShop.password);
    if (!match) throw new AuthResponseError("Error: Auth failed");

    const publicKey = crypto.randomBytes(64).toString("hex");
    const privateKey = crypto.randomBytes(64).toString("hex");

    const tokens = await createToken(
      { userId: foundShop._id, email },
      publicKey,
      privateKey
    );

    await KeyTokenService.createKeyToken({
      privateKey,
      publicKey,
      userId: foundShop._id.toString(),
      refreshToken: tokens.refreshToken,
    });

    return {
      shop: getInfoData({
        fields: ["_id", "name", "email"],
        object: foundShop,
      }),
      tokens,
    };
  };

  static signUp = async ({ name, email, password }) => {
    const holderShop = await shopModel.findOne({ email }).lean();
    if (holderShop) {
      throw new BadResponseError("Email already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newShop = await shopModel.create({
      email,
      name,
      password: passwordHash,
      roles: [RoleShop.SHOP],
    });

    if (newShop) {
      const privateKey = crypto.randomBytes(64).toString("hex");
      const publicKey = crypto.randomBytes(64).toString("hex");

      const keyStore = await KeyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey: publicKey,
        privateKey: privateKey,
      });
      if (!keyStore) {
        throw new BadResponseError("Error create key token");
      }

      const tokens = await createToken(
        { userId: newShop._id, email },
        publicKey,
        privateKey
      );

      return {
        code: 201,
        metadata: {
          shop: getInfoData({
            fields: ["_id", "name", "email"],
            object: newShop,
          }),
          tokens,
        },
      };
    }
    return {
      code: 201,
      metadata: null,
    };
  };
}

module.exports = AccessService;
