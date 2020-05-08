const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const auth = require("./routes/auth/auth");
const main = require("./routes/main/main");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

//
(async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-t3yga.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    console.log("Connected to database successfully");
  } catch (err) {
    throw new Error("Something went wrong on ourside");
  }
})().catch((err) => {
  console.log(err);
});
// app.get("/", (req, res) => {
//   const user = new User({
//     userName: "hjghg087",
//     password:"Varma0789",
//     firstName:"hfhf",
//     lastName:"hgfhg",
//     email:"76767"
//   });
//   user
//     .save()
//     .then()
//     .catch((err) => {
//       res.send(err)
//     });
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/", auth);
app.use("/", main);
app.listen(process.env.PORT, () =>
  console.log("Server running on port", process.env.PORT)
);
