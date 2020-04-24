const express = require('express');
const History = require('../controllers/history');

const validateToken = require('../utils').validateToken;

const HistoryRouter = express.Router();

HistoryRouter.route('/getModifiedRecord').post(validateToken, History.getModifiedRecord);

module.exports = HistoryRouter;
