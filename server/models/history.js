const connection = require("../lib/connection.js");
const dbName = require('../lib/databaseMySQLNew.js');

let History = function (params) {
    this.user_id = params.user_id;
    this.tableName = params.tableName;
    this.whereClause = params.whereClause;
    this.modifiedBy = params.modifiedBy;
    this.reason = params.reason;
    this.previousValues = params.previousValues;
    this.newValues = params.newValues;
    this.rowId = params.rowId;
    this.transaction_id = params.transaction_id;
};


History.prototype.getValues = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) { throw error; }
      if (!error) {
        connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
        let query = 'SELECT * from "'+that.tableName+'" WHERE "'+that.whereClause+'"';
        query = query.replace("\"",'');
        query = query.replace("\"",'');
        query = query.replace("\"",'');
        query = query.replace(/.$/,'');

        connection.query(query, function (error, rows, fields) {
          if (error){ console.log("Error...", error); reject(error); }
          console.log('rows...',rows)
          resolve(rows)
        });
      }
      connection.release();
      console.log('Record fetched %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
}


History.prototype.saveChanges = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) { throw error; }
      if (!error) {
        connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
        connection.query('SELECT transaction_id FROM history ORDER BY id DESC LIMIT 1', function (error, rows, fields) {
          if (error){ console.log("Error...", error); reject(error); }
          if(rows.length === 0){ that.transaction_id = 1; }
          else{ that.transaction_id = rows[0].transaction_id + 1; }

          let Values = [];
          (that.previousValues).map((preData, preIndex) => {
            (that.newValues).map((postData, postIndex) => {
              if(preIndex === postIndex){
                Values.push(
                  [that.transaction_id, that.tableName, postData.id, JSON.stringify(preData), JSON.stringify(postData), that.reason, that.modifiedBy]
                );
              }
            })
          });

          console.log(that.transaction_id, Values)
          connection.query('INSERT INTO history (transaction_id, table_name, row_id, previous_value, new_value, reason, modified_by) VALUES ?',[Values], function (error, rows, fields) {
            if (error){ console.log("Error...", error); reject(error); }
            resolve(rows)
          });
        });
      }
      connection.release();
      console.log('Exception Added %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
}



History.prototype.getModifiedRecord = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }
      if (!error) {
          connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
          connection.query('SELECT * FROM `history` WHERE table_name = "'+that.tableName+'" AND row_id = "'+that.rowId+'" ORDER BY id DESC', function (error, rows, fields) {
            if(error) {  console.log('Error...', error); reject(error); }
                if(!error){
                  resolve(rows)
                }
          });
        }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};


module.exports = History;
