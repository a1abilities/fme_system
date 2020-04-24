const express = require('express');
const Status = require('../../controllers/product/status.js');

const validateToken = require('../../utils').validateToken;

const statusRouter = express.Router();
statusRouter.route('/list').get(validateToken, Status.all);
module.exports = statusRouter;
