const express = require('express')
const Ezidebit = require('../controllers/Ezidebit.js');

const validateToken = require('../utils').validateToken;

const EzidebitRouter = express.Router();

EzidebitRouter.route("/getPayments").post(validateToken, Ezidebit.getPayments);

module.exports = EzidebitRouter;