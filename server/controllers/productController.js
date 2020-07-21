const product = require("../models/product");

function add(req, res) {
  product.add(req.body, req.files)
  .then((message) => res.json({ message }))
  .catch(err => res.json({message: err}))
}

async function getAll(req, res) {
  const products = await product.getAll(req.body, req.files);
  res.render("shop", { user: req.user, products });
}

async function getSingle(req, res) {
  const item = await product.getSingle(req.params.name);
  res.render("product", { user: req.user, item });
}

module.exports = {
  add,
  getAll,
  getSingle,
};
