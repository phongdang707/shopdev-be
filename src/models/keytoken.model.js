const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "key";
const COLLECTION_NAME = "keys";
// Declare the Schema of the Mongo model
var keyTokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Shop",
    },
    publicKey: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: Array,
      default: [],
    },
  },
  { collection: COLLECTION_NAME, timestamps: true }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, keyTokenSchema);
