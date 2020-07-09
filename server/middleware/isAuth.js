// set user state and name based on if he is logged in
module.exports = function setUser(req, res, next) {
  if (req.user === undefined) user = { loggedIn: false, name: "default" };
  else user = { loggedIn: true, name: req.user.username };
  req.user = user;
  next();
};
