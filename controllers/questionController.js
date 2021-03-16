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

module.exports = randomQuestions;