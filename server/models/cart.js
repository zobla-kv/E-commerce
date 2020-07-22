const User = require("./schemas/user");
const Order = require("./schemas/order");

async function add(product, userId) {
  const user = await User.findById(userId);
  const productFound = isProductInCart(product, user.cart);
  if (productFound.found === true) {
    await User.findOneAndUpdate(
      { _id: userId, "cart.name": product.name },
      { $inc: { "cart.$.quantity": product.quantity } }
    );
    return 'product in cart';
  } else {
    await User.findOneAndUpdate({ _id: userId }, { $push: { cart: product } });
    return 'added to cart'
  }
}

async function get(userId) {
  const user = await User.findById(userId);
  return user.cart;
}

async function remove(product, userId) {
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { cart: { name: product } } },
    { new: true }
  );
  return getNewPrice(user.cart);
}

async function createOrder(userId) {
  const user = await User.findById(userId);
  const orderObject = generateOrder(user.username, user.cart);
  const order = new Order({name: orderObject.user , products: orderObject.products, price: orderObject.price});
  order.save()
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

function getNewPrice(cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++)
    total += cart[i].price * cart[i].quantity;
  return total;
}

function generateOrder(user, cart) {
  const products = [];
  let price = 0;
  for (let i = 0; i < cart.length; i++) {
    products.push(`${cart[i].name} x ${cart[i].quantity}`);
    price += cart[i].price * cart[i].quantity;
  }
  return {
    user,
    products,
    price,
  };
}

module.exports = {
  add,
  get,
  remove,
  createOrder,
};
