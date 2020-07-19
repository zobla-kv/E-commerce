const order = require("../models/orders");

async function getAll(req, res) {
  const orders = await order.getAll();
  res.render("dashboard", { user: req.user, orders });
}

async function remove(req, res) {
  await order.remove(req.body.order);
  res.status(200).json({ message: "removed" });
}

module.exports = {
  getAll,
  remove,
};
