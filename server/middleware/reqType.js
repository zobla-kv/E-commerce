const register = require("../models/register");

async function reqType(req, res, next) {
  if (req.body.type === "search") {
  }
  if (req.body.type === "login") {
    return next();
  }
  if (req.body.type === "logout") {
    req.logout();
    res.json({ message: "success" });
  }
  if (req.body.type === "register") {
    const message = await register(req.body);
    const code = message === "User created" ? 201 : 409;
    res.status(code).json({ message });
  }
}

module.exports = reqType;
