const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  console.log(req.path);
  
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).send("Access Denied");
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send("Access Denied");
  }
  try {
    const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.body.user = verifiedToken._id;
    console.log(verifiedToken);
    console.log("hughyfggfvgfvgvgvcgvgvvhgv");

    next();
  } catch (err) {
    console.log(err);
    
    res.status(401).send("Access Denied");
  }
};
module.exports = auth;
