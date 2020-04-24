const express = require('express');
const Profile = require('../../controllers/setting/profile.js');

const validateToken = require('../../utils').validateToken;

const brandRouter = express.Router();
brandRouter.route('/info').get(validateToken, Profile.info);
brandRouter.route('/franchiseDetails').get(validateToken, Profile.franchiseDetails);
module.exports = brandRouter;
