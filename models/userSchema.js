const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type : String,
            required : true,
            maxlength : 32,
            unique : true,
            trim : true
        },
        email: {
            type : String,
            trim : true,
            required : true,
            unique : true
        },
        company: {
            type : String,
            required : true
        },
        phone: {
            type: String,
            maxlength:10
        },
        password: {
            type: String
        },
        role : {
            type : Number
        },
        active : {
            type : Boolean,
            default : false
        },
        activationcode : {
           type : String,
        },
        activeExpires : {
            type : Date
        }
    }, {timestamps: true}
);

const User = mongoose.model('User', userSchema);
module.exports = User;

