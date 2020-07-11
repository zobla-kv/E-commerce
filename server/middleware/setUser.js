// set user state and name based on if he is logged in
// prettier-ignore
module.exports = function(req, res, next) {
  if (req.user === undefined) user = { loggedIn: false, name: "default" };
  else user = { loggedIn: true, name: req.user.username, id: req.session.passport.user, admin: req.user.admin };
  req.user = user;
  next();
};
