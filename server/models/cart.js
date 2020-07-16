const User = require("./schemas/user");

async function add(product, userId) {
  const user = await User.findById(userId);
  const productFound = isProductInCart(product, user.cart);
  if (productFound.found === true) {
    await User.findOneAndUpdate(
      { _id: userId, "cart.name": product.name },
      { $inc: { "cart.$.quantity": product.quantity } }
    );
  } else {
    await User.findOneAndUpdate({ _id: userId }, { $push: { cart: product } });
  }
}

async function get(userId) {
  const user = await User.findById(userId);
  return user.cart;
}

function isProductInCart(product, cart) {
  let productFound = { found: false, index: -1 };
  for (let i = 0; i < cart.length; i++)
    if (cart[i].name === product.name) {
      productFound.found = true;
      productFound.index = i;
      productFound.name = cart[i].name;
      break;
    }
  return productFound;
}

module.exports = {
  add,
  get,
};
