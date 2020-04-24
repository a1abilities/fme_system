const soap = require('soap');
const connection = require('../lib/connection.js');
const dbName = require('../lib/databaseMySQLNew.js');
const { wsdlUrl, custUrl, digitalKey } = require("../lib/ezidebit.js");

var EzidebitPayments = function (params) {
  this.user_id = params.user_id;
  this.payment_type = params.payment_type;
  this.payment_method = params.payment_method;
  this.payment_source = params.payment_source;
  this.date_field = params.date_field;
  this.date_from = params.date_from;
  this.date_to = params.date_to;
};



// Direct Fetch from Ezidebit API
// EzidebitPayments.prototype.GetPayments = function () {
//   const that = this;

//   return new Promise((resolve, reject) => {
//     const payParams = {};
//     payParams.DigitalKey = digitalKey;
//     payParams.PaymentType = that.payment_type;
//     payParams.PaymentMethod = that.payment_method;
//     payParams.PaymentSource = that.payment_source;

//     if(that.date_from !== "Invalid date" && that.date_to !== "Invalid date" && that.date_field !== 'NONE'){
//       payParams.DateFrom = that.date_from;
//       payParams.DateTo = that.date_to;
//       payParams.DateField = that.date_field;
//     }

//     soap.createClient(wsdlUrl, (err, soapClient) => {
//       soapClient.GetPayments(payParams,
//       (err, result) => {
//         const error = result.GetPaymentsResult.Error;
//         if(error){           
//           console.log('Error...', result.GetPaymentsResult.ErrorMessage);
//           reject(error);
//         }else{
//           resolve(result.GetPaymentsResult.Data);
//         }
//       });
//     });
//   });
// };

EzidebitPayments.prototype.GetPayments = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });        
        
        let Query = `SELECT * FROM ezidebit_payments where 1`
                  + (that.payment_type !== '' ? ` AND paymentStatus = \'${that.payment_type}\'` :'')
                  + (that.payment_method !== '' ? ` AND paymentMethod = \'${that.payment_method}\'` :'')
                  + (that.payment_source !== 'ALL' ? ` AND paymentSource = \'${that.payment_source}\'` :'');
        
              if(that.date_from !== "Invalid date" && that.date_to !== "Invalid date" && that.date_field !== 'NONE'){
                if(that.date_field === 'PAYMENT') {Query = Query + ` AND (DATE(debitDate) BETWEEN \'${that.date_from}\' AND \'${that.date_to}\')` };
                if(that.date_field === 'SETTLEMENT') {Query = Query + ` AND (DATE(settlementDate) BETWEEN \'${that.date_from}\' AND \'${that.date_to}\')` };          
              }
              // console.log(Query)
        connection.query(Query, function (error, rows, fields) {
            if (!error) {
              resolve(rows);
            } else {
              console.log("Error...", error);
              reject(error);
            }
          });
      }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};



module.exports = EzidebitPayments;