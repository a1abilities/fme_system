const express = require('express');
const Report = require('../controllers/Report');

const validateToken = require('../utils').validateToken;

const ReportRouter = express.Router();

// ReportRouter.route('/getAll').get(validateToken, Location.getAll);
ReportRouter.route('/financeOrderReport').post(validateToken, Report.financeOrderReport);
ReportRouter.route('/getOrderReport').post(validateToken, Report.getOrderReport);
ReportRouter.route('/getDeliveryReport').post(validateToken, Report.getDeliveryReport);
//task report
ReportRouter.route('/getTaskReport').post(validateToken, Report.getTaskReport);
ReportRouter.route('/getDueTaskReport').post(validateToken, Report.getDueTaskReport);
module.exports = ReportRouter;
