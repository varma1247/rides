const User = require("../../models/User");
module.exports = {
  saveExpoToken: async (req, res) => {
    try {
      const expotoken = req.body.expotoken;
      //   User.findOneAndUpdate(
      //     { expotokens: expotoken },
      //     {
      //       $pull: { expotokens: expotoken },
      //     }

    //   User.findByIdAndUpdate(req.body.user, {
    //     $pull: { expotokens: expotoken },
    //   })
    //     .then((deletedToken) => {
    //       console.log(deletedToken);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
      let doc = await User.findByIdAndUpdate(
        req.body.user,
        { $addToSet: { expotokens: expotoken } },
        {
          new: true,
          useFindAndModify: false,
          upsert: true,
        }
      );
      console.log(doc);

      res.status(200).json({ message: "saved expotoken successfully" });
    } catch (error) {
      console.log(error);

      res.status(400).json(error);
    }
  },
};
