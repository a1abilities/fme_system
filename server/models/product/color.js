const connection = require('../../lib/connection.js');
const dbName = require('../../lib/databaseMySQLNew.js');

const utils = require('../../utils');

const Color = function (params) {
  this.id = params.id;
  this.color = params.color;
  this.user_id = params.user_id;
};


Color.prototype.all = function () {
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);

      if (error) {
        throw error;
      }

      connection.changeUser({ database: dbName["prod"] });
      connection.query('select * from color', function (error, rows, fields) {

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


Color.prototype.add = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      if (!error) {
        connection.changeUser({ database: dbName["prod"] });
        connection.query(`INSERT INTO color(color, created_by) VALUES (?,?)`, [that.color, that.user_id], (error, crows, fields) => {
          if (!error) {
            resolve(crows);
          } else {
            console.log('Error...', error);
            reject(error);
          }
        });
      } else {
        console.log('Error...', error);
        reject(error);
      }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  }).catch(error => {
    throw error;
  });
};


module.exports = Color;
