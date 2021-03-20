require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {authRole , authUser , setUser } = require("./controllers/basicAuth");

const AuthRoute = require('./routes/authRoute');
const adminRoute = require('./routes/adminRoute');
const questionRoute = require("./routes/questionRoute");
const enrolRoute = require("./routes/enrolRoute");
//Setting environment variables
const port = process.env.PORT || 8080;

//app.use(bodyParser.urlencoded({extended:true}))
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
//app.use(setUser);
app.use(setUser);
app.use('/api',authUser,questionRoute);
app.use("/admin",authUser,authRole,adminRoute);
app.use("/api",authUser,authRole,enrolRoute);


app.get("/", () =>{
    console.log("Successfully Deployed");
})

app.listen(port, () => {
    console.log("Server started on port: 8080");
});
