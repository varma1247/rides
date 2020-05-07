const router = require("express").Router();
const register = require("./register");
const verifyToken = require("./verifyToken");
const login = require("./login");
router.post("/register", register);
router.post("/login", login);
module.exports = router;
