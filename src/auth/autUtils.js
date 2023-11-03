const JWT = require("jsonwebtoken");
const createToken = async (payload, publicKey, privateKey) => {
  try {
    console.log("_publicKey, privateKey", {
      publicKey,
      privateKey,
    });
    const accessToken = await JWT.sign(payload, publicKey, {
      expiresIn: "2 days",
    });

    const refreshToken = await JWT.sign(payload, privateKey, {
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
    console.error("error____", error);
    return error;
  }
};

module.exports = { createToken };
