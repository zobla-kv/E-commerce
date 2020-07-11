const User = require("../models/schemas/user");
const bcrypt = require("bcrypt");

async function getUser(req, res) {
  const user = await User.findById(req.user);
  res.render("profile", user);
}

async function changePassword(req, res) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  await User.updateOne(req.user, { password: hashedPassword });
  res.status(200).json({ message: "password updated" });
}

module.exports = {
  getUser,
  changePassword,
};
