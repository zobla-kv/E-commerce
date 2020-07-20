const profile = require("../models/profile");

async function getUser(req, res) {
  const user = await profile.getUser(req.user);
  res.render("profile", user);
}

function redirect(req, res) {
  if (!req.session.passport || !req.session.passport.user) res.sendStatus(401);
  else res.redirect(`/profile/${req.session.passport.user}`);
}

async function changePassword(req, res) {
  await profile.changePassword(req);
  res.status(200).json({ message: "password updated" });
}

//prettier-ignore
async function verifyEmail(req, res) {
  let jwtVerificationMessage = await profile.verifyEmail(req.params.jwt)
  res.render("activation", { jwtVerificationMessage });
}

async function emailPasswordReset(req, res) {
  const message = await profile.emailPasswordReset(req.body.email);
  res.status(200).json({ message });
}

async function verifyToken(req, res) {
  const message = await profile.verifyToken(req.params.jwt);
  res.render("setNewPassword", { message });
}

async function setNewPassword(req, res) {
  const message = await profile.setNewPassword(req);
  res.status(200).json({ message });
}

module.exports = {
  getUser,
  redirect,
  changePassword,
  verifyEmail,
  emailPasswordReset,
  verifyToken,
  setNewPassword,
};
