const Post = require("../../models/Post");
const { postValidator } = require("../../validators/postValidator");
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
      console.log(allPosts);

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
      res.json({ post: savedPost });
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
