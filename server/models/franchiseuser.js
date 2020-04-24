const connection = require('../lib/connection.js');
const dbName = require('../lib/databaseMySQLNew.js');

const FranchiseUser = function (params) {
  this.id = params.id;
  this.franchise_id = params.franchise_id;
  this.director_id = params.director_id;
  this.name = params.name;
  this.user_id = params.user_id;
  this.selectedRole = params.selectedRole;
};

FranchiseUser.prototype.all = function () {
  
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      const that = this;
      connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
          connection.query('select id, name, franchise_id, director_id from user', (error, rows, fields) => {
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

FranchiseUser.prototype.user = function () {
  
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      const that = this;
      connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
          connection.query('select id as uid, name from user where user_id="'+that.user_id+'" limit 1', (error, rows, fields) => {
            if (!error) {
              // console.log('users----hbsd---',rows);
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


FranchiseUser.prototype.staffList = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
          connection.query('select id, franchise_id, director_id, name, role_id from user where role_id LIKE "%'+that.selectedRole+'%"', function (error, rows, fields) {
            if (!error) {
              resolve( rows );
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
    throw error;
  });
};

FranchiseUser.prototype.franchiseid = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }
      if(that.user_id.split('_')[1]=== 'admin'){}else{
      
      connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
        connection.query('select franchise_id from user where id=1 limit 1', function (error, rows, fields) {
        if (!error) {
            let fid= rows[0].franchise_id;
            connection.changeUser({ database: dbName["prod"] });
            connection.query('select id as franchise_id, name from franchise where id="'+fid+'" limit 1', function (error, rows, fields) {
              if (!error) {
                    // console.log('users----hbsd---',rows);
                    resolve(rows);
                  } else {
                    console.log('Error...', error);
                    reject(error);
                  }
              });
            } else {
              console.log('Error...', error);
              reject(error);
            }
          });
      }
        connection.release();
        console.log('Process Complete %d', connection.threadId);
    });
  });
};

module.exports = FranchiseUser;
