require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const AuthRoute = require('./routes/authRoute');
const analyticsRoute = require('./routes/analyticsRoute');
const questionRoute = require("./routes/questionRoute");

//Setting environment variables
const port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());

//mongoDB Connection
const mongoose = require('mongoose');
const analyticsRoute = require('./routes/analyticsRoute');
mongoose.connect(process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => {
        console.log("Database Connected Successfully!!!");
});   

// app.get('/', "Api deployed successfully!");
app.use('/api', AuthRoute);
app.use('/home',questionRoute);
app.use("/home",analyticsRoute);
// app.get('/', "Api deployed successfully!")

app.listen(port, () => {
    console.log("Server started on port: 8080");
});
