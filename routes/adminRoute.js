const express = require("express")
const analyticsController = require("../controllers/adminController"); 
const analyticsRoute = express.Router();

analyticsRoute.get("/getanalytics",analyticsController.readAnalytics);
analyticsRoute.post("/postanalytics",analyticsController.writeAnalytics);

module.exports = analyticsRoute;

