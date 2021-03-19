const Question = require("../models/questionsSchema");
const question = require("../models/questionsSchema");

const randomQuestions = (req,res,next) => {
    question.Question.find({})//returns a cursor object which is an array
    .then((questions) => {
        if(questions.length === 0 || questions.length < process.env.NOOFQUESTIONS){
           res.json({
               "status" : "no enough questions in the database",
           })   
        }
        else{
            question.Question.aggregate([{ $sample : { size : 10 }}])            
             .then((selectedQuestions)=> {      
                res.json({
                      "questions" : selectedQuestions,
                })
            })
            .catch(err => next(err))
        }      
    })
    .catch(err => next(err));
}

const writeQuestions = (req,res,next) => {
    var question = new Question({
        question : req.body.question,
        options : req.body.options,
        answer : req.body.answer
    })

    question.save()
    .then((result) => {
        res.json({
            "result" : "questions inserted succesfully"
        })
    }).catch(err => {next(err)
           console.log("error occured during insertion of questions into the database")
    })
}
module.exports = {
    randomQuestions,writeQuestions
}