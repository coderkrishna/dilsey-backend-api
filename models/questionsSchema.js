const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
      "question" : {
          type : String,
      },

      "answer" : {
          type : String
      }
},{timestamps : true})

const Question = mongoose.model("Question",questionSchema);
module.exports = {Question};