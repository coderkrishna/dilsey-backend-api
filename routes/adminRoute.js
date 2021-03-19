const express = require("express")
const analyticsController = require("../controllers/adminController"); 
const analyticsRoute = express.Router();

analyticsRoute.get("/analytics",analyticsController.readAnalytics);
analyticsRoute.post("/analytics",analyticsController.writeAnalytics);

module.exports = analyticsRoute;

