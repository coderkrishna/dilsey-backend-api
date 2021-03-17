const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
    noofusers : {
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
});

const Analytics = mongoose.model("analytics",analyticsSchema);
module.exports = Analytics;