const Post = require("../../models/Post");
const User = require("../../models/User");
const axios = require("axios");
module.exports = {
  saveInterested: async (req, res) => {
    try {
      let doc = await Post.findByIdAndUpdate(
        req.body.postid,
        {
          $addToSet: { interested: req.body.user },
        },
        {
          new: true,
          useFindAndModify: false,
          upsert: true,
        }
      );
      const user = await User.findById(doc.user, ["expotokens"]);
      console.log(user.expotokens);
      const expotokensArray = user.expotokens;
      if (expotokensArray.length != 0) {
        const messageBody = "Someone is interested to give you a ride";
        const notificationMessage = JSON.stringify({
          to: expotokensArray,
          title: "UTA RIDES",
          body: messageBody,
          sound: "default",
          channelId: "default",
        });
        res.json(doc);
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
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
