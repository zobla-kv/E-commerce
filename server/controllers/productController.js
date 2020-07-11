const product = require("../models/product");

//prettier-ignore
function add(req, res) {
  product.add(req.body, req.files).then((message) => res.json({ message }));
}

async function get(req, res) {
  const products = await product.get();
  res.json({ message: products });
}

module.exports = {
  add,
  get,
};
