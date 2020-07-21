function login(req, res) {
  req.type = req.body.type;
  req.body = req.body.data;
  req.passport.authenticate("local", function (err, user, info) {
    req.login(user, (err) => {
      if (err) res.status(400).json({ message: info }); 
      else res.status(200).json({ message: "success" });
    });
  })(req, res);
}

function logout(req, res) {
  req.logout();
  req.session.destroy(() => res.json({ message: "success" }));
}

module.exports = {
  login,
  logout,
};
