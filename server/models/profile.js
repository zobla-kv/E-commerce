const User = require("./schemas/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../middleware/sendEmail");

async function getUser(user) {
  return await User.findById(user);
}

async function changePassword(req) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  await User.updateOne(req.user, { password: hashedPassword });
}

async function verifyEmail(token) {
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return "invalid token";
    else {
             User.findOneAndUpdate( { username: decoded.user }, { activated: true }, (err, user) => {
              if (err) return'Something went wrong on the server, try again'
              else return "Verification successful, you can log in now"
        })
    };
  });
}

async function emailPasswordReset(email) {
  const user = await User.findOne({ email });
  if (user) {
    sendEmail(user.email, user.username, "resetPassword");
    return "Email sent";
  } else return "Email not found";
}

async function verifyToken(token) {
  return jwt.verify(token,process.env.JWT_SECRET,(err, decoded) => {
      if (err) return "invalid token";
      else return decoded;
    }
  );
}

async function setNewPassword(req) {
  const token = await verifyToken(req.params.jwt);
  if (token === "invalid token") return "invalid token";
  else {
    req.user = { username: token.user };
    await changePassword(req);
    return "password updated";
  }
}

module.exports = {
  getUser,
  changePassword,
  verifyEmail,
  emailPasswordReset,
  verifyToken,
  setNewPassword,
};
