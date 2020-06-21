const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String },
  quantity: { type: Number },
});

const Product = mongoose.model("Product", productSchema);

function validateProduct(product) {
  const schema = {
    name: Joi.string().min(3).required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    quantity: Joi.number().min(1),
  };
  return Joi.validate(product, schema);
}

exports.productSchema = productSchema;
exports.Product = Product;
exports.validate = validateProduct;
