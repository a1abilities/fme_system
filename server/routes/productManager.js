const express = require('express');
const Product = require('../controllers/productManager');

const validateToken = require('../utils').validateToken;

const ProductRouter = express.Router();

ProductRouter.route('/getTabRelatedRecord').post(validateToken, Product.getTabRelatedRecord);
ProductRouter.route('/getRentedOrder').post(validateToken, Product.getRentedOrder);
ProductRouter.route('/changeProductState').post(validateToken, Product.changeProductState);
ProductRouter.route('/getCommonProductForOrder').post(validateToken, Product.getCommonProductForOrder);

module.exports = ProductRouter;
