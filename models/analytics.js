const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
    users : {
        type : Number,
        required :true
    },
    usersQuiz : {
        type: Number,
        required : true 
    },
    usersPassed : {
        type : Number,

    },
    quizesTaken : {
        type :  Number,
    }
})

const analytics = mongoose.model("analytics",analyticsSchema);
module.exports = analyticsSchema;