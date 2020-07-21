const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
  },
  cart: {
    type: Array,
  },
  activated: {
    type: Boolean,
  },
  facebookID: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
