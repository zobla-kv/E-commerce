const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer,
    required: true,
  },
  cart: {
    type: Array,
  },
});

module.exports = mongoose.model("product", productSchema);
