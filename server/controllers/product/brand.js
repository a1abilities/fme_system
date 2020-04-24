const Brand = require('../../models/product/brand.js');

const all = async function(req, res, next) {
  try {
    const brandList = await new Brand({}).all();
    
    res.send({ brandList });
  } catch (err) {
    next(err);
  }
};

const add = async function(req, res, next) {
  const brandParam = {
    brand_name: req.body.brand_name,
    user_id: req.decoded.id,    
  };

  try {
    const newBrand = new Brand(brandParam);

    await newBrand.addBrand();
    const brandList = await new Brand({}).all();

    res.send({ brandList });
  } catch (err) {
    next(err);
  }
};
module.exports = {all,add};
