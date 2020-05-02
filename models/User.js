const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    minlength: [8, "Username should contain 8-15 characters"],
    maxlength: [15, "Username should contain 8-15 characters"],
    validate:{}
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});
module.exports = mongoose.model("User", userSchema);
