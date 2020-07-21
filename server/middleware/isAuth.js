const User = require("../models/schemas/user");

module.exports = async function (req, res, next) {
  const reqUrl = req.originalUrl;

  if (!req.session.passport || !req.session.passport.user) 
    return res.sendStatus(403);

  if (reqUrl.includes("profile")) {
    if (reqUrl === "/profile/" + req.session.passport.user) return next();
    else return res.sendStatus(403);
  }

  if (reqUrl.includes("dashboard")) {
    const _id = req.session.passport.user;
    const user = await User.findById({ _id });
    if (user.admin === true) return next();
    else return res.sendStatus(403);
  }

  next();
};
