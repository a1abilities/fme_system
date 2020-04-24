const TaskStatus = require('../models/taskStatus.js');

const all = async function(req, res, next) {
  try {
    const taskStatusList = await new TaskStatus({}).all();
    
    res.send({ taskStatusList });
  } catch (err) {
    next(err);
  }
};

module.exports = {all};
