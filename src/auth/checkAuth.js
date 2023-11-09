const { findMyId } = require("../services/apikey.sertvice");

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

const apiKey = async (req, res, next) => {
  const key = req.headers[HEADER.API_KEY]?.toString();
  if (!key) {
    return res.status(403).json({
      message: "Forbidden error",
    });
  }
  const objKey = await findMyId(key);
  if (!objKey) {
    return res.status(403).json({
      message: "Forbidden error",
    });
  }
  req.objKey = objKey;
  return next();
};

const permission = (permission) => {
  return (req, res, next) => {
    if (!req.objKey.permissions) {
      return res.status(403).json({
        message: "permission error",
      });
    }

    const validPermission = req.objKey.permissions.includes(permission);
    if (!validPermission) {
      return res.status(403).json({
        message: "permission error",
      });
    }

    return next();
  };
};

module.exports = { apiKey, permission };
