const router = require("express").Router();

const User = require("../../models/User");
const { registrationValidator } = require("../../validators/validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports = async (req, res) => {
  const now = new Date();
  const { error } = registrationValidator.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const existinguseremail = await User.findOne({ email: req.body.email });
  if (existinguseremail) {
    return res.status(400).send("email already exists");
  }
  const existinguserusername = await User.findOne({
    username: req.body.username,
  });
  if (existinguserusername) {
    return res.status(400).send("username already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedpass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedpass;
  const user = new User(req.body);
  try {
    const saveduser = await user.save();
    res.send({ user: saveduser._id });
  } catch (error) {
    res.status(400).send(error);
  }
};
