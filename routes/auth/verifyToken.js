const jwt=require('jsonwebtoken')
const auth=(req,res,next)=>{
    const authHeader=req.headers['authorization']
    if(!authHeader){
       return res.status(401).send('Access Denied')
    }
    const token=authHeader.split(" ")[1]
    if(!token){
        return res.status(401).send('Access Denied')
    }
    try{
        const verifiedToken= jwt.verify(token,process.env.TOKEN_SECRET)
        req.user=verifiedToken;
        next()
    }catch(err){
        res.status(401).send('Access Denied')
    }
   
}
module.exports=auth