const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema(
    {
        enrollmentId: {
            type: String,
        },
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
    
        
    }, {timestamps: true}
);

const Enrollment = mongoose.model('enrollment', enrollmentSchema);
module.exports = Enrollment;

