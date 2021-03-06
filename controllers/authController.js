const User = require('../models/userSchema');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const register = (req, res, next) => {

User.findOne({email : req.body.email})
    .then(user => {
        if(user) {
            res.json({
                message: "This email is already registered"
            });
        } else {
               bcrypt.hash(req.body.password, 10).then((hashedPass) => {

            /*    var generateId = () => {
                    var id = "";
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                    for (var i = 0; i < 8; i++) {
                        id = id + possible.charAt(Math.floor(Math.random() * possible.length));
                    }
                    return id;
                }*/
        
                //let idRes = generateId();
                // console.log(idRes);        
                

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

                   // customId: idRes,
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
            })
            .catch((err) => {
                    res.json({
                        error: err
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
            bcrypt.compare(password, user.password)
            .then((result) => {
                  if(result) {
                    let token = jwt.sign({email: user.email}, process.env.JWT_KEY , {
                        expiresIn: '1h'
                    });
                    res.json({
                        message: "Login Successfully!",
                        token: token
                    });
                 }else {
                    res.json({
                        message: "Password does not matched***"
                    });
                }
            }).catch((err) => {
                    res.json({
                        error: err,
                    });
                    next(err)
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

