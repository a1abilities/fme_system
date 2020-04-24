const express = require('express');
const FranchiseUser = require('../controllers/franchiseuser');

const validateToken = require('../utils').validateToken;

const franchiseuserRouter = express.Router();

franchiseuserRouter.route('/list').get(validateToken, FranchiseUser.all);
franchiseuserRouter.route('/user').get(validateToken, FranchiseUser.user);
franchiseuserRouter.route('/staffList').post(validateToken, FranchiseUser.staffList);
franchiseuserRouter.route('/franchiseid').get(validateToken, FranchiseUser.franchiseid);

module.exports = franchiseuserRouter;
