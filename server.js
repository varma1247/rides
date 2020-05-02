const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.use(bodyParser.json());
// const auth=require("./routes/auth")
// app.use('/',auth)
(async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-t3yga.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to database successfully");
    
  } catch (err) {
    throw new Error("Something went wrong on ourside");
  }
})().catch((err) => {
  console.log(err);
});
app.listen(process.env.PORT, () =>
  console.log("Server running on port", process.env.PORT)
);
