const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
      "question" : {
          type : String,
      },
      "options" : {
          type : Array,
          maxsize: 5,
          required : true
      },

      "answer" : {
          type : String
      }
},{timestamps : true})

const Question = mongoose.model("Question",questionSchema);
module.exports = Question;