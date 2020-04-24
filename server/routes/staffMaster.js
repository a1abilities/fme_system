const express = require('express')
const Staff = require('../controllers/staffMaster.js');

const validateToken = require('../utils').validateToken;

const staffRouter = express.Router();

staffRouter.route("/register").post(validateToken, Staff.register);
staffRouter.route("/search").post(validateToken, Staff.searchData);
// staffRouter.route("/update").post(validateToken, User.update);
staffRouter.route("/list").get(validateToken, Staff.all);
// staffRouter.route("/getUniqueNames").get(validateToken, User.getUniqueNames);

module.exports = staffRouter;