const jwt = require("jsonwebtoken");

const authUser = (req,res,next) => {
      try {
          const token = req.headers.authorization.split(" ")[1];
          const decoded = jwt.verify(token, 'verySecretValue');
          req.userData = decoded;
          next();
      } catch (error) {
          return res.status(401).json({
              message: 'Auth failed'
          });
      };
    next()
}

const setUser = (req, res, next) => {
    const userId = req.body.dvid;
    if (userId) {
      req.user = users.find({}).then((user) => user.dvid === userId)
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
