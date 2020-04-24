const express = require('express');
const Color = require('../../controllers/product/color.js');

const validateToken = require('../../utils').validateToken;

const colorRouter = express.Router();
colorRouter.route('/list').get(validateToken, Color.all);
colorRouter.route('/addColor').post(validateToken, Color.addColor);
module.exports = colorRouter;
