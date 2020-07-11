const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer,
    required: true,
  },
});

module.exports = mongoose.model("product", productSchema);
