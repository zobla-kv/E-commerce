const registerController = require("./registerController");
const loginController = require("./loginController");

module.exports = async function (req, res, next) {
  if (req.body.type === "login") {
    loginController.login(req, res, next);
  }
  if (req.body.type === "logout") {
    loginController.logout(req, res, next);
  }
  if (req.body.type === "register") {
    registerController(req, res);
  }
};
