const express = require("express");

const questionController = require("../controllers/questionController");

const questionRouter = express.Router();

questionRouter.get("/quiz",questionController.randomQuestions);
questionRouter.post("/quiz",questionController.writeQuestions);

module.exports = questionRouter;

