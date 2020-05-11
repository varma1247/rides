const router = require("express").Router();
const { getPosts, createPost } = require("./posts");
const { saveExpoToken } = require("./pushNotification");
const verifyToken = require("../auth/verifyToken");
router.get("/post", verifyToken, getPosts);
router.post("/post", verifyToken, createPost);
router.post('/saveexpotoken',verifyToken,saveExpoToken)
module.exports = router;
