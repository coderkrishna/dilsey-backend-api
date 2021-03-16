const User = require('../models/userSchema');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SG_API_KEY);

const register = (req, res, next) => {
    
    User.findOne({email : req.body.email})
    .then(user => {
        if(user) {
            res.json({
                message: "This email is already registered"
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hashedPass) => {

                var generateId = () => {
                    var id = "";
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                    for (i = 0; i < 8; i++) {
                        id = id + possible.charAt(Math.floor(Math.random() * possible.length));
                    }
                    return id;
                }
        
                let idRes = generateId();
        
                // console.log(idRes);
        
                if(err) {
                    res.json({
                        error: err
                    });
                }

                const msg = {
                        to: req.body.email, // Change to your recipient
                        from: 'pallav@kahaniya.com', // Change to your verified sender
                        subject: `Your DilseY account created succesfully`,
                        text: `Your account with DilseY is created succesfully,please login with the id ${idRes} as USERNAME and the password provided by you as the  PASSWORD`, 
                        html: `<strong>WELCOME TO DILSEY</strong><br><p>Your account with DilseY is created succesfully<br>Please login with the username ${idRes} and the password which you set during the registration time.</p>`
                       
                }
        
                let user = new User({
                    customId: idRes,
                    name: req.body.name,
                    email: req.body.email,
                    company: req.body.company,
                    phone: req.body.phone,
                    password: hashedPass
                });

                user.save().then(user => { 
                      sgMail
                        .send(msg)
                        .then(() => {
                          console.log('Email sent to the user');
                        })
                        .catch((error) => {
                          console.error(error)
                        })
                                        
                    res.json({
                        dvid: idRes,
                        message: "User added successfully!"
                    });
                }).catch(error => {
                    res.json({
                        message: "An error occured!"
                    });
                    console.log(error)
                });
            });
        }
    });
}

const login = (req, res, next) => {

    var id = req.body.dvid;
    var password = req.body.password;

    User.findOne({customId: id})
    .then(user => {

        if(user) {
            bcrypt.compare(password, user.password, (err, result) => {

                if(err) {
                    res.json({
                        error: err
                    });
                }
                if(result) {
                    let token = jwt.sign({name: user.name}, 'verySecretValue', {expiresIn: '1h'});
                    res.json({
                        message: "Login Successfully!",
                        token: token
                    });
                }else {
                    res.json({
                        message: "Password does not matched***"
                    });
                }
            });
        }else {
            res.json({
                message: "No user found!"
            });
        }
    });
}

module.exports = {
    register, login
}