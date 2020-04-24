const StaffPosition = require("../models/staffPosition");

const all = async function (req, res, next) {
    try {
        const result = await new StaffPosition({}).getAll();
        res.send({ staffPosition: result });
    } catch (err) {
      next(err);
    }
  }

module.exports = { all };