function login(req, res, next) {
  req.type = req.body.type;
  req.body = req.body.data;
  req.passport.authenticate("local", function (err, user, info) {
    req.login(user, (err) => {
      if (err) res.locals.failureInfo = info.message;
      next();
    });
  })(req, res, next);
}

module.exports = login;
