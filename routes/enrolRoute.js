const express = require("express");

const enrollmentController  = require("../controllers/enrollmentController")


const enrollmentRouter = express.Router();


enrollmentRouter.post("/enrol",enrollmentController);


module.exports = enrollmentRouter;