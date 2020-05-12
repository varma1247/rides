const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  profilepic: {
    type: String,
  },
  createdat: {
    type: Date,
    default: Date.now,
  },
  isverified: {
    type: Boolean,
    default: false,
  },
  expotokens: [
    {
      type: String,
    },
  ],
});
module.exports = mongoose.model("User", userSchema);
