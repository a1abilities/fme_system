const express = require('express');
const Password = require('../../controllers/setting/password.js');

const validateToken = require('../../utils').validateToken;

const taskRouter = express.Router();

taskRouter.route('/change').post(validateToken, Password.change);
taskRouter.route('/pwd').get(validateToken, Password.pwd);

module.exports = taskRouter;