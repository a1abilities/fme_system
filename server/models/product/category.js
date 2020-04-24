const connection = require('../lib/connection.js');
const dbName = require('../lib/databaseMySQLNew.js');

const utils = require('../utils');

const Category = function(params) {
  this.id = params.id;
  this.category = params.category;
  this.type = params.type;
  // this.parentid = params.parentid;
  this.position = params.position;
  this.description = params.description;
  this.meta_keywords = params.meta_keywords;
  this.meta_description = params.meta_description;
  this.is_active = params.is_active;
};

Category.prototype.add = function() {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      if (!error) {
        connection.changeUser({database : dbName["prod"]});
        connection.query(
          `INSERT INTO category(category,type,position,description,meta_keywords,meta_description,is_active) VALUES ("${that.category}", "${that.type}", "${that.position}", "${that.description}", "${that.meta_keywords}", "${that.meta_description}", "${that.is_active}")`,
          (error, rows, fields) => {
            if (!error) {
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

      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  }).catch(error => {
    throw error;
  });
};

Category.prototype.update = function() {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      if (!error) {
        console.log("type..........", that);
        
        connection.changeUser({database : dbName["prod"]});

        let values = [that.category, that.type, that.position, that.description, that.meta_keywords, that.meta_description, that.id]

			connection.query('UPDATE category set category = ?, type = ?, position = ?, description = ?, meta_keywords = ?, meta_description = ? WHERE id = ?', values, function (error, rows, fields) {
          if (!error) {
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

      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  }).catch(error => {
    throw error;
  });
};

Category.prototype.all = function () {
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);

      if (error) {
        throw error;
      }

      connection.changeUser({database : dbName["prod"]});
      connection.query('select * from category', function (error, rows, fields) {

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
module.exports = Category;
