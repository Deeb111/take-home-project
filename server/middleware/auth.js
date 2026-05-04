const jwt = require("jsonwebtoken");

const auth = (req, res, next) =>{

    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token){
        return res.status(401).json({msg: "No token, access denied"});
    }
    //verify the token using JWT secret key
    //error if the token is invalid
    try{
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //attatch user info to the request object
        req.user = decoded.user;

        next();
    }
    catch (err){
        res.status(401).json({msg: "Invalid token"});
    }
};

module.exports = auth;