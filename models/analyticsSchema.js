const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
    noofusers : {
        type : Number,
        required :true
    },
    usersquiz : {
        type: Number,
        required : true 
    },
    userspassed : {
        type : Number,

    },
    quizzestaken : {
        type :  Number,
    }
});

const Analytics = mongoose.model("analytics",analyticsSchema);
module.exports = Analytics;