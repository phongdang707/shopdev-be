const { product, clothing, electronic } = require("../models/product.model");

class Product {
  constructor({
    product_name,
    product_thumb,
    product_description,
    product_price,
    product_quantity,
    product_type,
    product_shop,
    product_attributes,
  }) {
    this.product_name = product_name;
    this.product_thumb = product_thumb;
    this.product_description = product_description;
    this.product_price = product_price;
    this.product_quantity = product_quantity;
    this.product_type = product_type;
    this.product_shop = product_shop;
    this.product_attributes = product_attributes;
  }

  createProduct = async () => {
    return await product.create(this);
  };
}

class Clothing extends Product {
  createProduct = async () => {
    const newClothing = await clothing.create(this.product_attributes);
    if (!newClothing) throw new Error("Error creating clothing");

    const newProduct = await product.create();
    if (!newProduct) throw new Error("Error creating product");

    return newProduct;
  };
}

class Electronic extends Product {
  createProduct = async () => {
    const newElectronic = await electronic.create(this.product_attributes);
    if (!newElectronic) throw new Error("Error creating electronic");

    const newProduct = await product.create();
    if (!newProduct) throw new Error("Error creating product");

    return newProduct;
  };
}

module.exports = Product;
