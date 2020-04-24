var connection = require("../lib/connection.js");
const dbName = require('../lib/databaseMySQLNew.js');

var Auth = function (params) {
  this.name = params.name;
  this.password = params.password;
  this.accountId = params.accountId;
  this.token = params.token;
};

Auth.prototype.login = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }

      let values = [that.name, 1];

      if (that.name.split('_')[1] === 'admin') {

        connection.changeUser({ database: dbName["prod"] });
        connection.query('Select AES_DECRYPT(`password`, \'secret\') AS password, id, franchise_id, name as user_name, user_id, role_id, status from user where user_id=? and is_active = ?', values, function (error, rows, fields) {
          if (!error) {
            console.log(rows)
            if (rows == "") {
              rows.franchise_status = 2;
            } else {
              rows[0].franchise_status = 2;
            }
            resolve(rows);
          } else {
            console.log("Error...", error);
            reject(error)
          }
          connection.release();
          console.log('Process Complete %d', connection.threadId);
        });

      } else if (that.name.split('_').length > 2) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.name.split('_')[1]) });
        connection.query('Select user_id from user where id = 1', function (error, rows, fields) {

          connection.changeUser({ database: dbName["prod"] });
          connection.query('select f.state, u.user_id from franchise f inner join user u on f.id = u.franchise_id where u.user_id=?', rows[0].user_id, function (error, rows, fields) {
            if (!error) {
              if (rows[0].state === 2) {
                connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.name.split('_')[1]) });
                connection.query('Select AES_DECRYPT(`password`, \'secret\') AS password, u.id, u.franchise_id, u.name as user_name, u.user_id, r.name as role_name, u.role_id, u.status from user u inner join role r on u.role_id = r.id  where u.user_id=? and u.is_active = ?', values, function (error, rows, fields) {
                  if (!error) {
                    if (rows != "") {
                      rows[0].franchise_status = 2;
                    }
                    resolve(rows);
                  } else {
                    console.log("Error...", error);
                    reject(error)
                  }
                  connection.release();
                  console.log('Process Complete %d', connection.threadId);
                });
              }
              else {
                resolve([{ id: 0, franchise_id: 0, user_name: '', password: ' ', user_id: rows[0].user_id, role_name: '', franchise_status: rows[0].state }]);
              }
            } else {
              console.log("Error...", error);
              reject(error)
            }
          });
        });
      } else {
        connection.changeUser({ database: dbName["prod"] });
        connection.query('Select AES_DECRYPT(`password`, \'secret\') AS password, u.id, u.franchise_id, u.name as user_name, u.user_id, r.name as role_name, u.role_id, u.status from user u inner join role r on u.role_id = r.id  where u.user_id=? and u.is_active = ?', values, function (error, rows, fields) {
          if (!error) {
            if (rows == "") {
              rows.franchise_status = 2;
            } else {
              rows[0].franchise_status = 2;
            }
            resolve(rows);
          } else {
            console.log("Error...", error);
            reject(error)
          }
          connection.release();
          console.log('Process Complete %d', connection.threadId);
        });
      }
    });
  });
};

Auth.prototype.verifyEmail = function (accountId) {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }

      let values = [accountId, 1];
      console.log("")
      if (that.name.split('_').length > 2) {
        console.log("inside if condition for validation", dbName.getFullName(dbName["prod"], that.name.split('_')[1]));
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.name.split('_')[1]) });
      } else {
        console.log("inside else condition for validation", values);
        connection.changeUser({ database: dbName["prod"] });
      }
      connection.query('Select token from user where account_id = ? and is_active = ?', values, function (error, rows, fields) {
        // connection.query('Select password, u.id, u.franchise_id, u.name as user_name, u.user_id, r.name as role_name from user u inner join role r on u.role_id = r.id where u.user_id=? and u.is_active = ?', values, function (error, rows, fields) {

        if (!error) {
          console.log("Error...", error);

          resolve(rows);
        } else {
          console.log("Error...", error);
          reject(error)
        }

        connection.release();
        console.log('Process Complete %d', connection.threadId);
      });
    });
  });
};

Auth.prototype.forgotPassword = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }

      let query = '';
      let values = [that.name, 1];

      if (that.name.split('_').length === 3 || that.name.split('_').length === 2) {
        console.log("inside else condition for validation", values);
        connection.changeUser({ database: dbName["prod"] });
        query = "Select AES_DECRYPT(`password`, 'secret') AS password, u.user_id, u.status, c.email from user u inner join company c on c.id = u.director_id where u.user_id=? and u.is_active = ?";
      } else {
        console.log("inside if condition for validation");
        query = "Select AES_DECRYPT(`password`, 'secret') AS password, u.user_id, u.status, u.is_active from user u where u.user_id=?";
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.name.split('_')[1]) });
      }

      connection.query(query, values, function (error, rows, fields) {
        // connection.query('Select password, u.id, u.franchise_id, u.name as user_name, u.user_id, r.name as role_name from user u inner join role r on u.role_id = r.id where u.user_id=? and u.is_active = ?', values, function (error, rows, fields) {

        if (!error) {
          resolve(rows);
        } else {
          console.log("Error...", error);
          reject(error)
        }

        connection.release();
        console.log('Process Complete %d', connection.threadId);
      });
    });
  });
};

module.exports = Auth;