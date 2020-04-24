const Category = require('../models/category.js');
const Product = require('../models/product/product.js');

const add = async function(req, res, next) {
  const categoryParam = {
    maincategory: req.body.maincategory,
    category: req.body.category,
    subcategory: req.body.subcategory,
    user_id: req.decoded.id,
  };

  try {
    const newCategory = new Category(categoryParam);

    await newCategory.add();
    const categoryList = await new Category({getAll : 1}).mainCategoryList();

    res.send({ categoryList });
  } catch (err) {
    next(err);
  }
};

const addCategory = async function(req, res, next) {
  const categoryParam = {
    maincategory: req.body.maincategory,
    category: req.body.category,
    subcategory: req.body.subcategory,
    user_id: req.decoded.id,
  };

  try {
    const newCategory = new Category(categoryParam);

    await newCategory.addCategory();
    const categoryList = await new Category({}).mainCategoryList();
    
    res.send({ categoryList });
  } catch (err) {
    next(err);
  }
};

const addSubCategory = async function(req, res, next) {
  const categoryParam = {
    category : req.body.category,
    subcategory: req.body.subcategory,
    user_id: req.decoded.id,
  };

  try {
    const newCategory = new Category(categoryParam);

    await newCategory.addSubCategory();
    const categoryList = await new Category({}).mainCategoryList();
    
    res.send({ categoryList });
  } catch (err) {
    next(err);
  }
};

const addProduct = async function(req, res, next) {
  const productParam = {
    maincat:req.body.maincat,
    category:req.body.category,
    subcat:req.body.subcat,
    name:req.body.name,
    color_id:req.body.color_id,
    brand_id:req.body.brand_id,
    buying_price:req.body.buying_price,
    description:req.body.description,
    specification:req.body.specification,
    brought:req.body.brought,
    invoice:req.body.invoice,
    rental:req.body.rental,
    meta_keywords:req.body.meta_keywords,
    meta_description:req.body.meta_description,
    status:req.body.status,

    user_id: req.decoded.id,
  };

  try {
    const newProduct = new Product(productParam);

    await newProduct.addProduct();
    const categoryList = await new Product({}).all();
    
    res.send({ categoryList });
  } catch (err) {
    next(err);
  }
};

const productList = async function(req, res, next) {
  try {
    const productList = await new Product({}).all();
    
    res.send({ productList });
  } catch (err) {
    next(err);
  }
};

const edit = async function(req, res, next) {
  const categoryParam = {
    id: req.body.id,
    name: req.body.name,
    color_id: req.body.color_id,
    brand_id: req.body.brand_id,
    buying_price: req.body.buying_price,
    description: req.body.description,
    specification: req.body.specification,
    brought: req.body.brought,
    invoice: req.body.invoice,
    rental: req.body.rental,
    meta_keywords: req.body.meta_keywords,
    meta_description: req.body.meta_description,
    status:req.body.status,
    user_id: req.decoded.id,
  };

  try {
    const newProduct = new Product(categoryParam);
    await newProduct.update();
    const productList = await new Product({}).all();
    
    res.send( productList );
  } catch (err) {
    next(err);
  }
};

const all = async function(req, res, next) {
  try {
    const categoryList = await new Category({}).all();
    
    res.send({ categoryList });
  } catch (err) {
    next(err);
  }
};

const mainCategoryList = async function(req, res, next) {
  try {
    const mainCategoryList = await new Category({}).mainCategoryList();
    res.send({ mainCategoryList });
  } catch (err) {
    next(err);
  }
};

const getAllMainCategoryList = async function(req, res, next) {
  try {
    const mainCategoryList = await new Category({getAll : 1}).mainCategoryList();
    res.send({ mainCategoryList });
  } catch (err) {
    next(err);
  }
};

const categoryList = async function(req, res, next) {
  try {
    const categoryList = await new Category({maincategory: req.body.maincategory}).categoryList();
    
    res.send({ categoryList });
  } catch (err) {
    next(err);
  }
};

const getAllFromCategoryList = async function(req, res, next) {
  try {
    const categoryList = await new Category({maincategory: req.body.maincategory, getAll : 1}).categoryList();
    
    res.send({ categoryList });
  } catch (err) {
    next(err);
  }
};

const subCategoryList = async function(req, res, next) {
  try {
    const subCategoryList = await new Category({category: req.body.category}).subCategoryList();
    
    res.send({ subCategoryList });
  } catch (err) {
    next(err);
  }
};

const getAllFromSubCategoryList = async function(req, res, next) {
  try {
    const subCategoryList = await new Category({category: req.body.category, getAll : 1}).subCategoryList();
    
    res.send({ subCategoryList });
  } catch (err) {
    next(err);
  }
};

const relatedProductList = async function(req, res, next) {
  try {
    const productList = await new Product({subcategory: req.body.subcategory}).relatedProductList()
    
    res.send({ productList });
  } catch (err) {
    next(err);
  }
};

const archivedList = async function(req, res, next) {
  try {
    const archivedList = await new Product({}).archivedList();
    res.send({ archivedList });
  } catch (err) {
    next(err);
  }
};


const searchData = async function (req, res, next) {
  let ProductParams = {
    user_id: req.decoded.user_id,
    searchText: req.body.searchText,
  };
	try{
    const newProduct = new Product(ProductParams);    
    const productList = await newProduct.searchData();
    res.send({ productList });
	}catch(err){
    next(error);
	}
};


const getOrderedProductList = async function (req, res, next) {
  let ProductParams = {
    user_id: req.decoded.user_id,
    product_ids : req.body.product_ids,
  };
	try{
    const newProduct = new Product(ProductParams);    
    const productList = await newProduct.getOrderedProductList();
    res.send({ productList });
	}catch(err){
    next(error);
	}
};




module.exports = { 
  add, 
  addCategory, 
  addSubCategory, 
  addProduct, 
  all, 
  edit, 
  productList,
  archivedList,
  mainCategoryList, 
  categoryList, 
  subCategoryList, 
  relatedProductList, 
  searchData, 
  getAllMainCategoryList,
  getAllFromCategoryList,
  getAllFromSubCategoryList,
  getOrderedProductList,
};