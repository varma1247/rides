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
  interested: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
module.exports = mongoose.model("Post", postSchema);
