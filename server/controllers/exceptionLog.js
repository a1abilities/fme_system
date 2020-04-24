const ExceptionLog = require('../models/exceptionLog');

const add = async function (data) {
  const exceptionLogParam = {
    code: data.code,
    message: data.message,
    franchise_id: data.franchise_id,
    stack: data.stack,
    created_by: data.created_by
  };

  try {
    const exceptionLog = new ExceptionLog(exceptionLogParam);

    await exceptionLog.log();

    return true;
  } catch (err) {
    return err;
  }
};

module.exports = {
  add
};