const StaticContent = require('../models/staticContent');

const getWeekDayList = async function(req, res, next) {
  try {
    const result = await new StaticContent({user_id: req.decoded.user_id}).getWeekDayList();
    res.send({ weekDayList : result });
  } catch (error) {
    next(error);
  }
};

const getPaymentModeList = async function(req, res, next) {
  try {
    const result = await new StaticContent({user_id: req.decoded.user_id}).getPaymentModeList();
    res.send({ paymentModeList : result });
  } catch (error) {
    next(error);
  }
};

const getDiscountRateList = async function(req, res, next) {
  try {
    const result = await new StaticContent({user_id: req.decoded.user_id}).getDiscountRateList();
    res.send({ discountRateList : result });
  } catch (error) {
    next(error);
  }
};


const getEzidebitPaymentsParamsList = async function(req, res, next) {
  try {
    const result = await new StaticContent({user_id: req.decoded.user_id}).getEzidebitPaymentsParamsList();    
    res.send({ ezidebitPaymentsParamsList : result });
  } catch (error) {
    next(error);
  }
};

const updateDiscountRateList = async function(req, res, next) {
  let reqData = {
    user_id: req.decoded.user_id,
    discountList : req.body.discountList,
  }
  const updateDiscount = await new StaticContent(reqData);

  try {
    if(reqData.discountList != undefined && reqData.discountList != null){
      (reqData.discountList.length > 0 ? reqData.discountList : []).map((data,index) => {
          updateDiscount.updateDiscountRateList(data.id,  Number(data.weekly_discount_rate),  Number(data.fortnightly_discount_rate));
      });
    }
    res.send({});
  } catch (error) {
    next(error);
  }
};




const getProductState = async function(req, res, next) {
  const params = {    
    user_id: req.decoded.user_id,
  };
  try {
    const activity = new StaticContent(params);
    const result = await activity.getProductState();
    res.send({stateList: result});    
  } catch (error) {
    next(error);
  }
};

module.exports = { 
  getWeekDayList, 
  getPaymentModeList, 
  getDiscountRateList, 
  updateDiscountRateList, 
  getEzidebitPaymentsParamsList,
  getProductState
};
