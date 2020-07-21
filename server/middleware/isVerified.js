const User = require("../models/schemas/user");

module.exports = async function (username, res) {
  const user = await User.findOne({ username });
  if (!user) return true;
  if (user.activated === false) {
    res.status(401).json({ message: "Email not verified" });
    return false;
  } else return true;
};
