const Post = require("../../models/Post");
const User = require("../../models/User");
const { postValidator } = require("../../validators/postValidator");
const axios = require("axios");
module.exports = {
  getPosts: async (req, res) => {
    try {
      console.log("hello");
      const allPosts = await Post.find({})
        .populate("user", ["username", "firstname", "lastname"])
        .sort({ createdat: -1 });
      // const {firstname,lastname,username}=allPosts.user
      // allPosts.user={firstname,lastname,username}
      if (!allPosts) {
        return res.status(400).json("No Posts");
      }
      // console.log(allPosts);

      res.json({ allPosts: allPosts });
    } catch (error) {
      res.status(400).json(error);
    }
  },
  createPost: async (req, res) => {
    const { error } = postValidator.validate(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }
    const post = new Post(req.body);
    try {
      const savedPost = await post.save();
      const finalPost = await savedPost.populate("user").execPopulate();
      // console.log(finalPost);
      let expotokens = await User.find({}, "expotoken");
      expotokens = expotokens.map((e) => {
        return e.expotoken;
      });
      console.log(expotokens);
      res.json({ post: finalPost });
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
