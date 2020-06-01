const User = require("../../models/User");
const Post = require("../../models/Post");
const jwt = require("jsonwebtoken");
const { loginValidator } = require("../../validators/validator");
const bcrypt = require("bcrypt");
// router.post("/login", );
module.exports = async (req, res) => {
  // User.deleteMany({}).then(()=>{
  //   console.log("deleted");

  // })
  // Post.deleteMany({}).then(()=>{
  //   console.log("deleted");

  // })
  const { error } = loginValidator.validate(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json("User doesn't exist");
    }
    console.log("hello");
    const validpass = await bcrypt.compare(req.body.password, user.password);
    if (!validpass) {
      return res.status(400).json("Invalid password");
    }
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).status(200).json({ token: token });
  } catch (error) {
    console.log(error);
    
    res.status(400).json(error);
  }
}
