import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    // console.log("Request Body :  ", req.body);
    // console.log("Request Header : ", req.header("Authorization"));
    let token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access denied" });

    if(token.startsWith("Bearer ")){
      // console.log("token starts with bearer");
        token = token.slice(7, token.length).trimLeft();
    }
    
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("> User has been verified");
    req.user = verified;
    next();
    
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
