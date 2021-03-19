const express = require("express");

const questionController = require("../controllers/questionController");

const questionRouter = express.Router();

questionRouter.get("/quiz",questionController);

module.exports = questionRouter;

