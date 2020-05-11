const User = require("../../models/User");
module.exports={
    saveExpoToken:async (req,res)=>{
        try {
            const expotoken=req.body.expotoken
            let doc = await User.findOneAndUpdate({_id:req.body.user}, {expotoken:expotoken}, {
                new: true,
                useFindAndModify:false
              });
              console.log("hehffgvjg");
              
              res.status(200).json({message:"saved expotoken successfully"})
        } catch (error) {
            console.log(error);
            
            res.status(400).json(error);
        }
    }
}