const connection = require('../../lib/connection.js');
const dbName = require('../../lib/databaseMySQLNew.js');

const utils = require('../../utils');

const Profile = function (params) {
  this.user_id = params.user_id;
  this.franchise_id = params.franchise_id;
  this.id = params.id;
  console.log('prams...',params );
};


Profile.prototype.info = function () {

  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);

      if (error) {
        throw error;
      }

      if(that.user_id.split('_')[1]==='admin'){
        connection.changeUser({ database: dbName["prod"] });
        connection.query('select s.id, s.first_name, s.last_name, s.location, s.contact, s.email, s.user_id, p.position as role from master_staff as s inner join staff_position as p on s.position = p.id where s.user_id= "'+that.user_id+'"', function (error, prows, fields) {
          if (!error) {
            resolve(prows);
          } else {
            console.log("Error...", error);
            reject(error);
          }
        });
      }else{
      connection.changeUser({ database: dbName["prod"] });
      connection.query('select director_id, franchise_id from user where user_id="' + that.user_id + '"', function (error, rows, fields) {
        if (!error) {
          if(rows[0]){
              const director_id = rows[0].director_id;
              const franchise_id = rows[0].franchise_id;
              connection.changeUser({ database: dbName["prod"] });
              connection.query('select c.name, c.nbzn, c.location, c.director, c.email, c.contact, c.alt_contact, c.website, f.name as fname from company c, franchise f where c.id="' + director_id + '" AND f.id="' + franchise_id + '" limit 1', function (error, mrows, fields) {
                if (!error) {
                  console.log('rows.',mrows);
                  resolve(mrows);
                } else {
                  console.log('Error...', error);
                  reject(error);
                }
              });
            }
            else{
              connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
              const db=dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]);
              // console.log('db-----',db);
              connection.query('select id from user where user_id="' + that.user_id + '" limit 1', function (error, mrows, fields) {
                if (!error) {
                  const fuser_id = mrows[0].id;
                  connection.query('select id, first_name, last_name, location, contact, email, user_id, role from staff where franchise_user_id="'+fuser_id+'"', function (error, prows, fields) {
                    if (!error) {
                      resolve(prows);
                    } else {
                      console.log("Error...", error);
                      reject(error);
                    }
                  });
                } else {
                  console.log('Error...', error);
                  reject(error);
                }
              });
            }
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
}


Profile.prototype.franchiseDetails = function () {

  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);

      if (error) {
        throw error;
      }

      connection.changeUser({ database: dbName["prod"] });
      connection.query('select f.name as franchise_name, f.city as franchise_city, f.suburb, c.name as company_name, c.location as company_location, c.nbzn, c.director, c.email, c.contact, c.alt_contact from franchise as f INNER JOIN company as c on f.company_id = c.company_id WHERE f.id = "' + that.franchise_id + '"', function (error, rows, fields) {

        if (!error) {
          console.log('rows---------------------------',rows);
          resolve(rows);
        } else {
          console.log('Error...', error);
          reject(error);
        }
        connection.release();
        console.log('Process Complete %d', connection.threadId);
      });
    });
  });
}
module.exports = Profile;
