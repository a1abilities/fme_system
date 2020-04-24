const express = require('express')
const Role = require('../../controllers/franchise/role.js');

const validateToken = require('../../utils').validateToken;

const roleRouter = express.Router();

roleRouter.route("/list").get(validateToken, Role.all);
roleRouter.route("/getall").get(validateToken, Role.getAll);

module.exports = roleRouter;