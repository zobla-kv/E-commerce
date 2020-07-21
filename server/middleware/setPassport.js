const passport = require("passport");

module.exports = function set(req, res, next) {
  req.passport = passport;
  next();
};
