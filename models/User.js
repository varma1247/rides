const mongoose = require("mongoose");
const {userNameValidator,emailValidator,passwordValidator}=require("./validators/validator")
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: [8, "Username should contain 8-15 characters"],
    maxlength: [15, "Username should contain 8-15 characters"],
    validate:userNameValidator,
    unique:true
  },
  email: {
    type: String,
    required: true,
    unique:true,
    trim:true,
    validate:emailValidator
  },
  password: {
    type: String,
    required: true,
    validate:passwordValidator
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  profilepic:{
      type:String
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});
module.exports = mongoose.model("User", userSchema);
