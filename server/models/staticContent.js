const connection = require('../lib/connection.js');
const dbName = require('../lib/databaseMySQLNew.js');

const StaticContent = function (params) {
  this.user_id =  params.user_id;
  this.id = params.id;
  this.fortnightly_discount_rate = params.fortnightly_discount_rate;
  this.weekly_discount_rate = params.weekly_discount_rate;
};

StaticContent.prototype.getWeekDayList = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])}); 
      connection.query('SELECT `id`, `week_day`, `is_active`, `created_at` FROM `week_day_list` WHERE is_active = 1', (error, rows, fields) => {
        if (!error) {
          resolve(rows);
        } else {
          console.log('Error...', error);
          reject(error);
        }
      });

      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};



StaticContent.prototype.getPaymentModeList = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])}); 
      connection.query('SELECT `id`, `payment_mode`, `is_active` FROM `payment_mode` WHERE is_active = 1', (error, rows, fields) => {
        if (!error) {
          resolve(rows);
        } else {
          console.log('Error...', error);
          reject(error);
        }
      });

      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};



StaticContent.prototype.getDiscountRateList = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }
      
      connection.changeUser({ database: dbName["prod"] });
      connection.query('SELECT `id`, `duration_in_year`, `duration_period`, `weekly_discount_rate`, `fortnightly_discount_rate`, `is_active`, `created_at` FROM `discount_rate_list` WHERE is_active = 1', (error, rows, fields) => {
        if (!error) {
          resolve(rows);
        } else {
          console.log('Error...', error);
          reject(error);
        }
      });

      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};



StaticContent.prototype.getEzidebitPaymentsParamsList = function () {
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }
      
      connection.changeUser({ database: dbName["prod"] });
      connection.query('SELECT * FROM `ezidebit_pay_params`', (error, rows, fields) => {
        if (error) { console.log('Error...', error); reject(error); }
        
        resolve(rows);
      });

      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};

StaticContent.prototype.updateDiscountRateList = function (id, weekly_discount_rate, fortnightly_discount_rate) {  
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }
      connection.changeUser({ database: dbName["prod"] });
      connection.query('UPDATE discount_rate_list SET `weekly_discount_rate` = "'+ weekly_discount_rate +'", `fortnightly_discount_rate` = "'+ fortnightly_discount_rate +'" WHERE id = "'+ id +'"', (error, rows, fields) => {
        if (!error) {
          resolve(rows);
        } else {
          console.log('Error...', error);
          reject(error);
        }
      });

      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};


StaticContent.prototype.getProductState = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }
      if (!error) {
          connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
          connection.query('SELECT * FROM status_record WHERE is_active = 1 AND status_role = \'product_state\'', function (error, stateList, fields) {
            if(error) {  console.log('Error...', error); reject(error); }
            if(!error){
              resolve(stateList);
              // connection.query('SELECT * FROM product_state WHERE is_active = 1', function (error, currentState, fields) {
              //   if(error) {  console.log('Error...', error); reject(error); }
              //   if(!error){
              //     resolve({currentState: currentState, stateList: stateList})
              //   }
              // });
            }
          });
        }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};

module.exports = StaticContent;
