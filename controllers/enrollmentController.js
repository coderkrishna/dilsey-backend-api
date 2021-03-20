const enrollmentSchema = require("../models/enrollmentSchema");

const sgMail = require("@sendgrid/mail");
const Enrollment = require("../models/enrollmentSchema");
sgMail.setApiKey(process.env.SG_API_KEY);

const enrol = async (req,res,next) => {

  await Enrollment.findOne({email : req.body.email})
    .then( async user => {
        if(user) {
            res.json({
                message: "This email is already enrolled"
            });
        } else {
               var generateId = () => {
                    var id = `DV${batch_name}`;
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                    for (i = 0; i < 4; i++) {
                        id = id + possible.charAt(Math.floor(Math.random() * possible.length));
                    }
                    return id;
                }
        
              var id = generateId()

             const msg = {
                to: req.body.email, // Change to your recipient
                from: 'pallav@kahaniya.com', // Change to your verified sender
                subject: `Your are registered succesfully with the DILSEY initiative`,
                text: `Your account with DilseY is created succesfully,please login with the id ${id} as USERNAME and the password provided by you as the  PASSWORD`, 
                html: `<strong>WELCOME TO DILSEY</strong><br><p>Your registration with DilseY is succesful<br>Please login with the username ${id} during the time of assesment</p>`              
        }

        let enrollment = new enrollmentSchema({
            enrollmentid : id,
            name: req.body.name,
            email: req.body.email,
            company: req.body.company,
            phone: req.body.phone,

        });

        await enrollment.save().then(user => { 
            sgMail
             .send(msg)
             .then(() => {
               console.log('Email sent to the user');
             })
             .catch(err => {
                 res.json({
                     error : err,
                 })
             })
                             
          res.json({
             dvid: id,
             message: "You have enrolled into the program successfully!"
         });
     }).catch(error => {
         res.json({
             message: "An error occured!"
         });
         console.log(error)
     });
 
}
})
.catch(err => next(err))
}
        
module.exports = enrol;