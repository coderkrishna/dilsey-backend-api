const User = require('../models/userSchema');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const  register =  (req, res, next) => {
    
    User.findOne({email : req.body.email})
    .then(user => {
        if(user) {
            res.json({
                message: "This email is already registered"
            });
        } else {
               bcrypt.hash(req.body.password, 10).then((err,hashedPass) => {

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
                    console.log("error occured in the bcrypt hash function");
                }

                var generateRole = () => {
                    let roleid = 1; //user
                    if(req.body.name === process.env.ADMIN_NAME && req.body.email === process.env.ADMIN_EMAIL && req.body.company == process.env.ADMIN_COMPANY)
                    {
                        roleid = 99;   
                    }
                    return roleid;
                }

                let role = generateRole();
       
                let user = new User({
                    customId: idRes,
                    name: req.body.name,
                    email: req.body.email,
                    company: req.body.company,
                    phone: req.body.phone,
                    password: hashedPass,
                    role : role

                });

                user.save().then(user => {                          
                    res.json({
                        email : req.body.email,
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

const login =  (req, res, next) => {

    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email: email})
    .then(user => {

        if(user) {
            bcrypt.compare(password, user.password, (err, result) => {

                if(err) {
                    res.json({
                        error: err
                    });
                    console.log("error occured in bcrypt compare ");
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