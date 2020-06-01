const User = require("../../models/User");
module.exports = {
  getProfile: async (req, res) => {
    try {
      const profile = await User.findById(req.body.user, [
        "firstname",
        "lastname",
        "profilepic",
        "username",
        "email",
      ]);
      res.json({ profile: profile });
    } catch (error) {
      res.status(400).json("Something went wrong");
    }
  },
  saveProfile: async (req, res) => {
    try {
      console.log(req.path);
      console.log(req.body);
      
      const profile = await User.findByIdAndUpdate(
        req.body.user,
        {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
        },
        {
          new: true,
          useFindAndModify: false,
          upsert: true,
        },
      );
      console.log(profile);
      
      res.json({ profile: profile });
    } catch (error) {
      console.log(error.message);
      
      res.status(400).json("Something went wrong");
    }
  },
};
