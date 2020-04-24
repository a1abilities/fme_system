const express = require('express');
const Category = require('../controllers/product/category.js');

const validateToken = require('../utils').validateToken;

const categoryRouter = express.Router();

categoryRouter.route('/maincat').post(validateToken, Category.main);
// categoryRouter.route('/cat').post(validateToken, Category.edit);
// categoryRouter.route('/subcat').get(validateToken, Category.all);
module.exports = categoryRouter;
