const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

module.exports = async function (email, user, type) {
  const token = jwt.sign({ user }, process.env.JWT_SECRET);

  let message = "";
  let subject = "";

  if (type === "activation") {
    message = `<h2 style="margin-left: 250px;color:black;">Verify your email by clicking link below</h2>
                   <a href="http://localhost:4000/activation/${token}">www.sneakers-zone.com/activation/${token}</a>`;
    subject = "Activation ✔";
  } else {
    message = `<h2 style="margin-left: 250px;color:black;">Reset your password by clicking link below</h2>
        <a href="http://localhost:4000/resetPassword/${token}">www.sneakers-zone.com/resetPassword/${token}</a>`;
    subject = "Reset password ✔";
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_AUTH_USERNAME,
      pass: process.env.EMAIL_AUTH_PASSWORD,
    },
  });
  await transporter.sendMail({
    from: '"Sneakers zone" <sneakersZone123@gmail.com>',
    to: email,
    subject,
    html: message,
  });
};
