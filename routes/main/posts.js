const Post = require("../../models/Post");
const User = require("../../models/User");
const { postValidator } = require("../../validators/postValidator");
const axios = require("axios");
module.exports = {
  getPosts: async (req, res) => {
    try {
      console.log("hello");
      const allPosts = await Post.find({})
        .lean()
        .populate("user", ["username", "firstname", "lastname", "interested"])
        .sort({ createdat: -1 });
      // const {firstname,lastname,username}=allPosts.user
      // allPosts.user={firstname,lastname,username}

      if (!allPosts) {
        return res.status(400).json("No Posts");
      }
      // allPosts=allPosts.map((post)=>{
      //   if(req.body.user === post.user){
      //     return {...post,self:true}
      //   }
      //   return {...post}
      // })
      // let newAllPosts = [];

      allPosts.forEach((post) => {
        if (post.user._id.toString() === req.body.user.toString()) {
          post.self = true;
        }
        let interestedPeopleIds = post.interested.map((i) => i.toString());
        if (interestedPeopleIds.includes(req.body.user.toString())) {
          console.log("hbhzcvhvch");
          post.liked = true;
        }
        // console.log(post);

        post.interested = post.interested.length;
        // newAllPosts.push(post);
      });
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
      const finalPost = await savedPost.populate("user").execPopulate();
      // console.log(finalPost);
      let expotokensArray = await User.find(
        { _id: { $ne: finalPost.user._id } },
        "expotokens"
      );
      if (expotokensArray.length != 0) {
        expotokensArray = expotokensArray.map((tokens) => {
          return tokens.expotokens;
        });
        expotokensArray = expotokensArray.flat();
        expotokensArray = [...new Set(expotokensArray)];
        const messageBody =
          finalPost.user.firstname +
          " " +
          finalPost.user.lastname +
          " posted a new ride!!!";

        const notificationMessage = JSON.stringify({
          to: expotokensArray,
          title: "UTA RIDES",
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
