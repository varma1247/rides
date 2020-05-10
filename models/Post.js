const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdat: {
    type: Date,
    default: Date.now,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});
module.exports = mongoose.model("Post", postSchema);
