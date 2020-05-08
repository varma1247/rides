const router = require("express").Router();
const { getPosts, createPost } = require("./posts");
const verifyToken = require("../auth/verifyToken");
router.get("/post", verifyToken, getPosts);
router.post("/post", verifyToken, createPost);
module.exports = router;
