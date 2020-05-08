const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdat: {
    type: Date,
    default: Date.now,
  },
 user:{
  type:Schema.Types.ObjectId,
  ref:"User"
 },
 post:{
    type:Schema.Types.ObjectId,
    ref:"Post"
 },
});
module.exports = mongoose.model("Comment", commentSchema);
