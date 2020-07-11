const User = require("../models/schemas/user");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(function (username, password, done) {
      User.findOne({ username }, async (err, user) => {
        if (!user) return done(null, false, { message: "User doesn't exist" });
        await bcrypt.compare(password, user.password, (err, isMatched) => {
          if (!isMatched)
            return done(null, false, { message: "Password incorrect" });
          else return done(null, user);
        });
      });
    })
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) =>
    User.findById(id, (err, user) => done(err, user))
  );
};
