const register = require("../models/register");

module.exports = async function (req, res) {
  const message = await register(req.body);
  const code = message === "User created" ? 201 : 409;
  res.status(code).json({ message });
};
