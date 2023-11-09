const keyTokenModel = require("../models/keytoken.model");
var ObjectId = require("mongoose").Types.ObjectId;

class KeyTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }) => {
    try {
      const filter = { user: userId },
        update = { publicKey, privateKey, refreshTokensUsed: [], refreshToken },
        options = { upsert: true, new: true };

      const tokens = await keyTokenModel.findOneAndUpdate(
        filter,
        update,
        options
      );

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      console.log("error____", error);
      return error;
    }
  };

  static findByUserId = async (userId) => {
    console.log("userId", userId);
    const userToken = await keyTokenModel
      .findOne({ user: new ObjectId(userId.toString()) })
      .lean();

    console.log("userToken", userToken);
    return userToken;
  };

  static removeKeyById = async (id) => {
    return await keyTokenModel.findByIdAndRemove(id).lean();
  };

  static findByRefreshTokenUsed = async (refreshToken) => {
    return await keyTokenModel
      .findOne({ refreshTokensUsed: refreshToken })
      .lean();
  };

  static deleteKeyById = async (userId) => {
    return await keyTokenModel.findByIdAndDelete({ userId }).lean();
  };

  static findByRefreshToken = async (refreshToken) => {
    return await keyTokenModel.findByIdAndDelete({ refreshToken }).lean();
  };
}

module.exports = KeyTokenService;
