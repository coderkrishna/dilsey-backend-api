 const Analytics = require("../models/analyticsSchema");
const analytics = require("../models/analyticsSchema");


 const readAnalytics = (req,res,next) => {
   analytics.find({})  
    .then((result) => {
       res.json({
          "noofusers" : result[0],
          "usersQuiz" : result[1],
          "usersPassed" : result[2],
          "noofquizzes" : result[3]
       });
    }) 
    .catch(err => next(err))     
   
 }

 const writeAnalytics = (req,res,next) => {
     var analytics = new Analytics({
          noofusers : req.body.noofusers,
          usersQuiz : req.body.usersQuiz,
          usersPassed : req.body.usersPassed,
          noofquizzes : req.body.noofquizzes        
     })

     analytics.save().then(() => {
         res.json({
            "message" : "analytics updation done succesfully",
         })
     })
     .catch((err) => {
      res.json({
         "message" : "analytics updation not succesful"
      })     
      next(err)
   });
 }

 module.exports = {
     readAnalytics,writeAnalytics
    }