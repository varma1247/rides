const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const { loginValidator } = require("../../validators/validator");
const bcrypt = require("bcrypt");
// router.post("/login", );
module.exports = async (req, res) => {
  const { error } = loginValidator.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).send("Username doesn't exist");
  }
  const validpass = await bcrypt.compare(req.body.password, user.password);
  if (!validpass) {
    return res.status(400).send("Invalid password");
  }
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).status(200).send(token);
};
