const Status = require('../../models/product/status.js');

const all = async function(req, res, next) {
  try {
    const statusList = await new Status({}).all();
    
    res.send({ statusList });
  } catch (err) {
    next(err);
  }
};

module.exports = { all};
