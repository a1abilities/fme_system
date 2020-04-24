const connection = require('../lib/connection.js');
const dbName = require('../lib/databaseMySQLNew.js');

const utils = require('../utils');

const TaskStatus = function (params) {
  this.id = params.id;
  this.status = params.status;
};


TaskStatus.prototype.all = function () {
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }
      connection.changeUser({ database: dbName["prod"] });
      connection.query('select id, status from task_status', function (error, rows, fields) {

        if (!error) {
          // console.log('status',rows);
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
module.exports = TaskStatus;
