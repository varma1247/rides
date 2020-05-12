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
      let expotokensArray = await User.find(
        { _id: { $ne: finalPost.user._id } },
        "expotokens"
      );
      expotokensArray = expotokensArray.map((tokens) => {
        return tokens.expotokens;
      });
      expotokensArray = expotokensArray.flat();
      const messageBody =
        finalPost.user.firstname +
        " " +
        finalPost.user.lastname +
        " posted a new ride!!!";
      if (expotokensArray.length!=0) {
        const notificationMessage = JSON.stringify({
          to: expotokensArray,
          title: "New Notification",
          body: messageBody,
          sound: "default",
          channelId: "default",
        });
        const notificationResponse = await axios.post(
          "https://exp.host/--/api/v2/push/send",
          notificationMessage,
          {
            headers: {
              Accept: "application/json",
              "Accept-encoding": "gzip, deflate",
              "Content-Type": "application/json",
            },
          }
        );
        console.log(
          notificationResponse.data.data.map((n) => {
            return n.status;
          })
        );
      }

      console.log(expotokensArray);
      res.json({ post: finalPost });
    } catch (error) {
      console.log(error.response);

      res.status(400).json(error);
    }
  },
};
