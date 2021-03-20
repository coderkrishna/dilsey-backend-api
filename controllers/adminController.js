const Analytics = require("../models/analyticsSchema");

 const readAnalytics = (req,res,next) => {
   Analytics.find({})  
    .then((result) => {
       res.json({
          "noofusers" : result[0],
          "usersquiz" : result[1],
          "userspassed" : result[2],
          "noofquizzes" : result[3]
       });
    }) 
    .catch(err => next(err))     
   
 }

 const writeAnalytics = (req,res,next) => {
     var analytics = new Analytics({
          noofusers : req.body.noofusers,
          usersquiz : req.body.usersquiz,
          userspassed : req.body.userspassed,
          quizzestaken : req.body.noofquizzes        
     })

     analytics.save().then(() => {
         res.json({
            "message" : "analytics updation done succesfully",
         })
     })
     .catch((err) => {
      res.json({
         "message" : "analytics updation not succesful",
      })
      next(err)
   });
   next();
 }

 module.exports = {
     readAnalytics,writeAnalytics
    }