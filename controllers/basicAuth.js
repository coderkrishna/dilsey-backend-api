const authUser = (req,res,next) => {
    if(req.user == null){
      res.status = 403;  
      res.json({
          "message" : "you need to signin first"
      })
    }
    next()
}

const setUser = (req, res, next) => {
    const userId = req.body.dvid
    if (userId) {
      req.user = users.find(user => user.dvid === userId)
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