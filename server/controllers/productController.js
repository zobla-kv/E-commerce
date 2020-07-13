const product = require("../models/product");

//prettier-ignore
function add(req, res) {
  product.add(req.body, req.files)
  .then((message) => res.json({ message }))
  .catch(err => res.json({message: err}))
}

async function get(req, res) {
  const products = await product.get(req.body, req.files);
  res.render("shop", { user: req.user, products });
}

module.exports = {
  add,
  get,
};
