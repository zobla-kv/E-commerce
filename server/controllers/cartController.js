const cart = require("../models/cart");

async function add(req, res) {
  const message = await cart.add(req.body, req.session.passport.user);
  res.status(201).json({ message });
}

async function get(req, res) {
  const cartItems = await cart.get(req.session.passport.user);
  const totalPrice = getTotalPrice(cartItems);
  res.render("cart", { user: req.user, cartItems, totalPrice });
}

async function remove(req, res) {
  const newPrice = await cart.remove(req.body.productName,req.session.passport.user);
  res.status(200).json({ newPrice });
}

async function createOrder(req, res) {
  await cart.createOrder(req.session.passport.user);
  res.status(201).json({ message: "Order created" });
}

function getTotalPrice(cartItems) {
  let total = 0;
  for (let i = 0; i < cartItems.length; i++)
    total += cartItems[i].price * cartItems[i].quantity;
  return total;
}

module.exports = {
  add,
  get,
  remove,
  createOrder,
};
