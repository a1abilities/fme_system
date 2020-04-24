const Profile = require('../../models/setting/profile.js');

const info = async function(req, res, next) {
  
  try {
    const profile = await new Profile({user_id : req.decoded.user_id, id: req.decoded.id}).info();
    
    res.send({ profile });
  } catch (err) {
    next(err);
  }
};

const franchiseDetails = async function(req, res, next) {
  try {
    const fd = await new Profile({franchise_id : req.decoded.franchise_id}).franchiseDetails();
    
    res.send({ fd });
  } catch (err) {
    next(err);
  }
};

module.exports = {info, franchiseDetails};