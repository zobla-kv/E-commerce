const Order = require("../models/schemas/order");

async function getAll() {
  return await Order.find();
}

async function remove(name) {
  await Order.remove({ name });
}

module.exports = {
  getAll,
  remove,
};
