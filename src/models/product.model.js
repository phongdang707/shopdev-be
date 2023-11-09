const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";
// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema(
  {
    product_name: { type: String, require: true },
    product_thumb: { type: String, require: true },
    product_description: { type: String },
    product_price: { type: Number },
    product_quantity: { type: Number, require: true },
    product_type: {
      type: String,
      require: true,
      enum: ["Electronics", "Clothing"],
    },
    product_shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
    product_attributes: { type: Schema.Types.Mixed, require: true },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

const clothingSchema = new mongoose.Schema(
  {
    brand: { type: String, require: true },
    size: { type: String },
    material: { type: String },
  },
  {
    timestamps: true,
    collection: "clothes",
  }
);

const electronicSchema = new mongoose.Schema(
  {
    manufacture: { type: String, require: true },
    model: { type: String },
    color: { type: String },
  },
  {
    timestamps: true,
    collection: "electronics",
  }
);

//Export the model
module.exports = {
  product: mongoose.model(DOCUMENT_NAME, productSchema),
  electronic: mongoose.model("Electronic", electronicSchema),
  clothing: mongoose.model("Clothes", clothingSchema),
};
