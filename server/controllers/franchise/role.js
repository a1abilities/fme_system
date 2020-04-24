const Role = require('../../models/franchise/role.js');

const all = async function(req, res, next) {
  try {
    const role = await new Role({}).all();
    res.send({ role });
  } catch (error) {
    next(error);
  }
};

const getAll = async function(req, res, next) {
  try {
    const role = await new Role({}).getAll();
    
    res.send({ role });
  } catch (error) {
    next(error);
  }
};



module.exports = { all: all, getAll: getAll};