const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.services");
const { createToken } = require("../auth/autUtils");

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      const holderShop = await shopModel.findOne({ email }).lean();

      if (holderShop) {
        return {
          code: "",
          messages: "shop already registered!",
        };
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        email,
        name,
        password: passwordHash,
        roles: [RoleShop.SHOP],
      });

      // create private key, public key
      if (newShop) {
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
        });
        console.log("privateKey__, publicKey", privateKey, publicKey);

        const publicKeyString = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey: publicKey,
        });
        if (!publicKeyString) {
          return {
            code: "",
            messages: "shop already registered!",
          };
        }
        const tokens = await createToken(
          { userId: newShop._id, email },
          publicKey,
          privateKey
        );
        console.log("tokens____", tokens);

        return {
          code: 201,
          metadata: {
            shop: newShop,
            tokens,
          },
        };
      }
      return {
        code: 201,
        metadata: null,
      };
    } catch (error) {
      return {
        code: "xxx",
        messages: "",
        status: "error",
      };
    }
  };
}

module.exports = AccessService;
