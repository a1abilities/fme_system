const express = require('express');
const Category = require('../controllers/category.js');

const validateToken = require('../utils').validateToken;

const categoryRouter = express.Router();


categoryRouter.route('/search').post(validateToken, Category.searchData);
categoryRouter.route('/add').post(validateToken, Category.add);
categoryRouter.route('/addCategory').post(validateToken, Category.addCategory);
categoryRouter.route('/addSubCategory').post(validateToken, Category.addSubCategory);
categoryRouter.route('/addProduct').post(validateToken, Category.addProduct);
categoryRouter.route('/productList').get(validateToken, Category.productList);
categoryRouter.route('/edit').post(validateToken, Category.edit);

categoryRouter.route('/list').get(validateToken, Category.all);
categoryRouter.route('/maincategorylist').get(validateToken, Category.mainCategoryList);
categoryRouter.route('/getallmaincategorylist').get(validateToken, Category.getAllMainCategoryList);
categoryRouter.route('/categorylist').post(validateToken, Category.categoryList);
categoryRouter.route('/getallfromcategorylist').post(validateToken, Category.getAllFromCategoryList);
categoryRouter.route('/subcategorylist').post(validateToken, Category.subCategoryList);
categoryRouter.route('/getallfromsubcategorylist').post(validateToken, Category.getAllFromSubCategoryList);
categoryRouter.route('/relatedproductlist').post(validateToken, Category.relatedProductList);

categoryRouter.route('/archivedList').get(validateToken, Category.archivedList);
categoryRouter.route('/getOrderedProductList').post(validateToken, Category.getOrderedProductList);

module.exports = categoryRouter;