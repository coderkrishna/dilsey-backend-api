const question = require("../models/questionsSchema");

const randomQuestions = (req,res,next) => {
    question.find({})//returns a cursor object which is an array
    .then((questions) => {
        if(questions.length == 0 || questions.length < process.env.NOOFQUESTIONS){
            res.json({
               "status" : "Not enough questions in the database",
           })   
        }
        else{
          question.aggregate({$select : {size : process.env.NOOFQUESTIONS}})            
             .then((selectedQuestions)=> {      
                 res.json({
                      "questions" : selectedQuestions,
                })
            })
            .catch(err => console.log(err))
        }      
    })
    .catch(err => next(err));
}

const writeQuestions = (req,res,next) => {
    var questionone = new question({
        question : req.body.question,
        options : req.body.options,
        answer : req.body.answer
    })

    questionone.save()
    .then((result) => {
        res.json({
            "result" : "Questions added succesfully."
        })
    }).catch(err => {
           console.log("error occured during insertion of questions into the database")
    })
}
module.exports = {
    randomQuestions,writeQuestions
}