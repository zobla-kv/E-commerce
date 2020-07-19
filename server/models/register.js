const User = require("./schemas/user");
const bcrypt = require("bcrypt");
const sendEmail = require("../middleware/sendEmail");

//prettier-ignore
async function createUser(data) {
  const { data: { email, username, password }} = data;
  try{
    if(await isTaken(username) === true)
      throw new Error('Username taken')
      salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = new User({email, username, password: hashedPassword, admin: false, cart: [], activated: false});
      await user.save();
      sendEmail(email, username);
      return "User created";
  } catch (err) {
      return err.message;
  }
}

async function isTaken(username) {
  const user = await User.find({ username });
  return user.length > 0 ? true : false;
}

module.exports = createUser;
