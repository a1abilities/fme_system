const Location = require('../models/location');

const getAll = async function(req, res, next) {
  try {
    const result = await new Location({}).getAll();
    res.send({ cityList: result });
  } catch (error) {
    next(error);
  }
};

const selectedArea = async function(req, res, next) {
  try {
    if(!req.body.city_id){
      const result = await new Location({city_name: req.body.city_name, city_code: req.body.city_code, suburb: req.body.suburb}).getCityRelatedAllArea();
      res.send({ selectedArea: result });
    }else{
      const result = await new Location({city_id : req.body.city_id, city_name: req.body.city_name, city_code: req.body.city_code}).getSelectedArea()
        res.send({ selectedArea: result });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, selectedArea };
