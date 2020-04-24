const FranchiseUser = require('../models/franchiseuser');

const all = async function (req, res, next) {
  try {
    const franchiseUserList = await new FranchiseUser({ user_id: req.decoded.user_id }).all();

    res.send({ franchiseUserList });
  } catch (error) {
    next(error);
  }
};
const user = async function (req, res, next) {
  try {
    const currentuser = await new FranchiseUser({ user_id: req.decoded.user_id }).user();

    res.send({ currentuser });
  } catch (error) {
    next(error);
  }
};

const staffList = async function (req, res, next) {
  const staffRoleParam = {
    selectedRole: req.body.selectedRole,
    user_id: req.decoded.user_id
  };
  try {
    const newFranchiseUser = new FranchiseUser(staffRoleParam);
    const staffList = await newFranchiseUser.staffList();

    res.send({ staffList });
  } catch (err) {
    next(err);
  }
};

const franchiseid = async function (req, res, next) {
  try {
    const currentfranchise = await new FranchiseUser({ user_id: req.decoded.user_id }).franchiseid();

    res.send({ currentfranchise });
  } catch (error) {
    next(error);
  }
};

module.exports = { all, user, staffList, franchiseid };
