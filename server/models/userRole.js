const connection = require("../lib/connection.js");
const utils = require("../utils");

var UserRole = function (params) {
  this.id = params.id;
  this.user_id = params.user_id;
  this.role_id = params.role_id;
  this.is_active = params.is_active;
  this.created_by = params.created_by;
};

UserRole.prototype.register = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }

      if (!error) {
        connection.query('INSERT INTO user_role(user_id,role_id,is_active,created_by) VALUES ("' + that.user_id + '", "' + that.role_id + '", "' + that.is_active + '", "' + that.created_by + '")', function (error, rows, fields) {

          if (!error) {
            resolve({ userName: that.name, userId: that.userId, password: that.password });
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
  // });
};

module.exports = UserRole;