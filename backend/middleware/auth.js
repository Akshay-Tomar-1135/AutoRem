const jwt = require("jsonwebtoken");
const User = require("../models/userDetails");

const Authenticate = async (req, res, next)=>{
    try{
        console.log(req.cookies);
        console.log(res);
        const token = req.cookies.jwtoken;
        console.log(token);
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await User.findOne({_id: verifyToken._id, "tokens.token":token});
        
        if(!rootUser){
            throw new Error('User not found');
        }
        // req.token = token;
        // req.rootUser = rootUser;
        req.userId = rootUser._id;

        next();
    }
    catch(e){
        res.status(401).send('Unauthorised: NO token provided');
        console.log(e);
    }
}

module.exports = Authenticate;