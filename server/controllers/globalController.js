const registerController = require("./registerController");
const loginController = require("./loginController");
const isVerified = require("../middleware/isVerified");

//prettier-ignore
module.exports = async function (req, res, next) {
  if (req.body.type === "login") {
    const { data: { username } } = req.body;
    if (await isVerified(username, res, 'activation') === false) return;
    loginController.login(req, res, next);
  }
  if (req.body.type === "logout") {
    loginController.logout(req, res, next);
  }
  if (req.body.type === "register") {
    registerController(req, res);
  }
};
