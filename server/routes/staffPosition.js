const express = require('express')
const Position = require('../controllers/staffPosition.js');

const validateToken = require('../utils').validateToken;

const staffRouter = express.Router();

staffRouter.route("/list").get(validateToken, Position.all);

module.exports = staffRouter;