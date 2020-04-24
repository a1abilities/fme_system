const connection = require("../../lib/connection.js");
const dbName = require('../../lib/databaseMySQLNew.js');

var UserRole = function (params) {
  this.id = params.id;
  
  this.franchise_id = params.franchise_id;
  this.role_id = params.role_id;
  this.is_active = params.is_active;
  this.created_by = params.created_by;
  this.fdbname = params.fdbname;
  console.log('DB Name', params)  
};

UserRole.prototype.register = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }

      if (!error) {
        connection.changeUser({ database: dbName["prod"] });
        connection.query('select id from user where franchise_id = "' + that.franchise_id + '"', function (error, rows, fields) {
          if (!error) {
            var user_id = rows;
            (user_id || []).map((user, index) => {
              connection.changeUser({ database: dbName["prod"] });
              connection.query('INSERT INTO user_role(user_id,role_id,is_active,created_by) VALUES ("' + user.id + '", "' + that.role_id + '", "' + that.is_active + '", "' + that.created_by + '")', function (error, rows, fields) {              
                if (!error) {                  
                  resolve({ userRoleId: rows.insertId });
                } else {
                  console.log("Error...", error);
                  reject(error);
                }
              });
            }); 
          }
        });

        connection.changeUser({ database: that.fdbname });
        connection.query('select id from user where franchise_id = "' + that.franchise_id + '"', function (error, rows, fields) {
          if (!error) {
            console.log('user ids',rows);
            var user_id = rows;
            (user_id || []).map((user, index) => {   
              connection.changeUser({ database: that.fdbname });           
              connection.query('INSERT INTO user_role(user_id,role_id,is_active,created_by) VALUES ("' + user.id + '", "' + that.role_id + '", "' + that.is_active + '", "' + that.created_by + '")', function (error, rows, fields) {              
                if (!error) {
                  // console.log(rows);
                  resolve({ userRoleId: rows.insertId });
                } else {
                  console.log("Error...", error);
                  reject(error);
                }
              });
            });      
            // resolve({isSuccess: 'Yes'});
          } else {
            console.log("Error...", error);
            reject(error);
          }
        });

      } else {
        console.log("Error...", error);
        reject(error);
      }

      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  }).catch((error) => {
    reject(error);
  });
};

module.exports = UserRole;