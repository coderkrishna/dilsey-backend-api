require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {authRole , authUser , setUser } = require("./controllers/basicAuth");

const AuthRoute = require('./routes/authRoute');
const adminRoute = require('./routes/adminRoute');
const questionRoute = require("./routes/questionRoute");

//Setting environment variables
const port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());


//mongoDB Connection
const mongoose = require('mongoose');


mongoose.connect(process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => {
        console.log("Database Connected Successfully!!!");
});   

// app.get('/', "Api deployed successfully!");
app.use('/api',AuthRoute);
app.use(setUser);
app.use('/home',authUser,questionRoute);
app.use("/admin",authUser,authRole,adminRoute);
// app.get('/', "Api deployed successfully!")

app.listen(port, () => {
    console.log("Server started on port: 8080");
});
