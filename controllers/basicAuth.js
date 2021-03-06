const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const authUser = (req,res,next) => {
      try {
          const token = req.Headers.authorization.split(" ")[1];
          const decoded = jwt.verify(token,process.env.JWT_KEY);
          req.userid = decoded; 
          next();
      } catch (error) {
          return res.status(401).json({
              message: 'Auth failed'
          });
      };
    next()
}

const setUser = (req, res, next) => {
    const userId = req.body.email;
    if (userId) {
      req.userid = User.find({}).then((user) => user.email === userId)
    }
    next()
  }

const authRole = (role) => {
    return (req,res,next) => {
       if(req.role === role){
           res.status(401);
           return res.json({
                "message" : "You are not authorized to access the page",    
           })
       }
       next();
    }
}

module.exports = {
    authUser,authRole,setUser
}
