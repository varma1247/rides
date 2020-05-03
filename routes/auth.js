const router = require("express").Router();
const User = require("../models/User");
const {userValidator}=require("../validators/validator")
router.get("/register", (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  const valid=userValidator.validate({
      username:"hnvshv089",
      email:"hh@mavs.uta.edu"
  })
  console.log(valid)
//   user
//     .save()
//     .then()
//     .catch((err) => {
//       res.send(err);
//     });
  res.send(req.body);
});
module.exports = router;
