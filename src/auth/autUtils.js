const JWT = require("jsonwebtoken");
const createToken = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "2 days",
    });

    const refreshToken = await JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "7 days",
    });

    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.log("err verify", err);
      } else {
        console.log("decode verify", decode);
      }
    });

    console.log("accessToken, refreshToken", accessToken, refreshToken);
    return { accessToken, refreshToken };
  } catch (error) {
    return error;
  }
};

module.exports = { createToken };
