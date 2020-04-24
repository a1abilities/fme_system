const soap = require('soap');

const {domainName} = require("../lib/databaseMySQLNew");
const EzidebitPayments = require('../models/EzidebitPayments');


const getPayments = async function (req, res, next) {  
  const params = {
    user_id: req.decoded.user_id,
    payment_type: req.body.payment_type,
    payment_method: req.body.payment_method,
    payment_source: req.body.payment_source,
    date_field: req.body.date_field,
    date_from: req.body.date_from,
    date_to: req.body.date_to,
  };
  switch(req.body.payment_method){
    case 'ALL': params.payment_method = '' ; break;
    case 'CREDIT CARD': params.payment_method = 'CR' ; break;
    case 'BANK ACCOUNT': params.payment_method = 'DR' ; break;
  };
  switch(req.body.payment_type){
    case 'ALL': params.payment_type = '' ; break;
    case 'PENDING': params.payment_type = 'P' ; break;
    case 'FAILED': params.payment_type = 'F' ; break;
    case 'SUCCESSFUL': params.payment_type = 'S' ; break;
  };  
  // console.log(params);
  
  try {
    const result = await new EzidebitPayments(params).GetPayments();
    // console.log(result);
    if(result !== null){
      res.send(result);
    }else{
      res.send([]);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { getPayments: getPayments };