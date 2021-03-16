const express = require("express")
const analyticsController = require("../controllers/analyticsController"); 
const analyticsRoute = express.Router();

analyticsRoute.get("/analytics",analyticsController);

module.exports = analyticsRoute;