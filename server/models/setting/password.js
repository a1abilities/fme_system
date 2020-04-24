const connection = require('../../lib/connection.js');
const dbName = require('../../lib/databaseMySQLNew.js');

const Password = function (params) {
  this.current_password = params.current_password;
  this.new_password = params.new_password;
  this.user_id = params.user_id;
  this.id = params.id;  
};

Password.prototype.update = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if(!error){
        if(that.user_id.split('_')[1]==='admin'){
          connection.changeUser({ database: dbName["prod"] });
          connection.query('update user set password = AES_ENCRYPT("' + that.new_password + '", "secret") where user_id="' + that.user_id + '"', function (error, rows, fields) {
            if (!error) {
                resolve( rows );                      
            } else {
              console.log("Error...", error);
              reject(error);
            }
          });
        }else{
          connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
          connection.query('update user set password = AES_ENCRYPT("' + that.new_password + '", "secret") where user_id="' + that.user_id + '"', function (error, mainRows, fields) {
              if (!error) {                
                connection.changeUser({ database: dbName["prod"] });
                connection.query('update user set password = AES_ENCRYPT("' + that.new_password + '", "secret") where user_id="' + that.user_id + '"', function (error, rows, fields) {
                  if (!error) {
                      resolve( mainRows );                      
                  } else {
                    console.log("Error...", error);
                    reject(error);
                  }
                });
              } else {
                console.log("Error...", error);
                reject(error);
              }
            });
          }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    }
    });
  }).catch((error) => {
    throw error;
  });
};



Password.prototype.passwordSelection = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if(!error){
        if(that.user_id.split('_')[1]==='admin'){
            connection.changeUser({ database: dbName["prod"] });
        }else{
            connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
        }
            connection.query('Select AES_DECRYPT(`password`, \'secret\') AS password, user_id from user where user_id=?',[that.user_id], function (error, rows, fields) {
                resolve(rows);
            });
          connection.release();
          console.log('Process Complete %d', connection.threadId);
      }
    });
  }).catch((error) => {
    throw error;
  });
};


Password.prototype.pwd = function () {

  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);

      if (error) {
        throw error;
      }

      connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
      connection.query('Select AES_DECRYPT(`password`, \'secret\') AS password from user where user_id="' + that.user_id + '"', function (error, rows, fields) {
        if (!error) {
          resolve(rows);
        } else {
          console.log("Error...", error);
          reject(error);
        }

        connection.release();
        console.log('Process Complete %d', connection.threadId);
      });
    });
  });
}
module.exports = Password;
