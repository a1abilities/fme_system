const Color = require('../../models/product/color.js');

const all = async function(req, res, next) {
  try {
    const colorList = await new Color({}).all();
    
    res.send({ colorList });
  } catch (err) {
    next(err);
  }
};
const addColor = async function(req, res, next) {
  const colorParam = {
    color: req.body.color,
    user_id: req.decoded.id,
  };

  try {
    const newColor = new Color(colorParam);

    await newColor.add();
    const colorList = await new Color({}).all();

    res.send({ colorList });
  } catch (err) {
    next(err);
  }
};

module.exports = { all,addColor};
