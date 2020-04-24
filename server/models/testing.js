const connection = require('../lib/connection.js');
const dbName = require('../lib/databaseMySQLNew.js');

const Testing = function (params) {
  this.city = params.city;
  this.suburb = params.suburb;
  console.log('@@@@@@@@@@@@params',params);
};

Testing.prototype.testDB = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    
    const frachiseDbName = dbName.getFullName(dbName["prod"], that.city.substring(0, 2).toLowerCase() + that.suburb.substring(0, 2).toLowerCase());
    console.log("franchise database name..........", frachiseDbName)

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.query('SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?', frachiseDbName, function (error, rows, fields) {
          if(rows.length === 0){
            resolve({isExist: 0});
          }else{
            resolve({isExist: 1});
          }
      });
    }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};


Testing.prototype.getSelectedArea = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }
      // console.log("params...",that);
      // connection.changeUser({ database: dbName["prod"] });
      // connection.query('select suburb from franchise WHERE city = ? AND city_code = ? AND state != 4', [that.city_name, that.city_code], (error, rows, fields) => {
      //   if (!error) {
      //     let suburb = [''];
      //     (rows.length > 0 ? rows : []).map((data, index) => {
      //       suburb.push(data.suburb);
      //     })
      //     // console.log("sub..",suburb);
      //     connection.query('select id, area_name, city_id, is_active from area where city_id = "' + that.city_id + '" AND area_name NOT IN (?) order by area_name', [suburb], (error, rows, fields) => {
      //       if (!error) {
      //         resolve(rows);
      //       } else {
      //         console.log('Error...', error);
      //         reject(error);
      //       }
      //     })
      //   } else {
      //     console.log('Error...', error);
      //     reject(error);
      //   }
      // });

      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};

module.exports = Testing;
