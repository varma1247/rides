const router = require("express").Router();
const register=require("./register")
const verifyToken=require("./verifyToken")
const login=require("./login")
router.post("/register",register)
router.post("/login",login)
router.post("/test",verifyToken,(req,res)=>{
    res.send("success")
})
module.exports=router