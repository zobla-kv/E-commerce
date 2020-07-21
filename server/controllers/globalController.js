const registerController = require("./registerController");
const loginController = require("./loginController");

//prettier-ignore
module.exports = async function (req, res) {
  if(req.body.type === 'login') loginController.login(req, res);
  if (req.body.type === "logout") loginController.logout(req, res);
  if (req.body.type === "register") registerController(req, res);
};
