const apiKeySchema = require("../models/apikey.model");

const findMyId = async (key) => {
  const objKey = await apiKeySchema.findOne({ key, status: true }).lean();
  return objKey;
};

module.exports = { findMyId };
