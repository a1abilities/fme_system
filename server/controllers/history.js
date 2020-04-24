const History = require('../models/history.js');

const CombineResult = (historyList) => {
  let preValues = [];
  let newValues = [];
  
  const finalResult = (historyList.length > 0 ? historyList : []).map((data) => {
    let combine = {};
    preValues = JSON.parse(data.previous_value);
    newValues = JSON.parse(data.new_value);
    if(preValues !== null && preValues !== undefined && preValues !== "" && newValues !== null && newValues !== undefined && newValues !== ""){   
      // Object.keys(preValues).map((preKey, preIndex) => {
      //   Object.keys(newValues).map((postKey, postIndex) => {
      //     if(preIndex === postIndex){
      //       if(preValues[preKey] !== newValues[postKey]){
      //         combine[preKey] = preValues[preKey];
      //         combine['updated_'+ postKey] = newValues[postKey];
      //       }
      //     }
      //   })
      // })
      Object.keys(preValues).map((preKey) => {
        combine[preKey] = preValues[preKey];
      })
      Object.keys(newValues).map((postKey) => {
        combine['updated_'+ postKey] = newValues[postKey];
      })
    }
    combine['update_reason'] = data.reason;
    combine['record_modified_by'] = data.modified_by;
    combine['record_modified_at'] = data.modified_at;
    return combine
  });
  return finalResult;
}

const getModifiedRecord = async function(req, res, next) {
  const params = {    
    user_id: req.decoded.user_id,
    rowId: req.body.rowIdInHistory,
    tableName: req.body.tableName,
  };
  
  try {
    const activity = new History(params);
    const result = await activity.getModifiedRecord();
    const finalResult = await CombineResult(result);
    res.send(finalResult);
  } catch (error) {
    next(error);
  }
};



module.exports = {
  getModifiedRecord
};
