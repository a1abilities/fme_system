const connection = require("../lib/connection.js");
const dbName = require('../lib/databaseMySQLNew.js');

const utils = require("../utils");

var Company = function (params) {
  this.name = params.name;
  this.nbzn = params.nbzn;
  this.location = params.location;
  this.director_id = params.director_id;
  this.director = params.director;
  this.email = params.email;
  this.contact = params.contact;
  this.alt_contact = params.alt_contact;
  this.website = params.website;
  this.accountant_id = params.accountant_id;

  this.directorList = params.directorList;

  //company_id for update 
  // this.comp_id = params.camp_id;
};


Company.prototype.register = function () {
  const that = this;
  var company_id;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }

      if (!error) {
        connection.changeUser({ database: dbName["prod"] });
        connection.query('SELECT company_id from company ORDER BY company_id DESC LIMIT 1 ', function (error, rows, fields) {
          if (!error) {
            if (rows == '') {
              company_id = 1;
            } else {
              company_id = rows[0].company_id + 1;
            }

            (that.directorList || []).map(info => {

              connection.query('INSERT INTO company(company_id, name,nbzn,location,director,email,contact,alt_contact,website,accountant_id) VALUES ("' + company_id + '", "' + that.name + '", "' + that.nbzn + '","' + that.location + '", "' + info.director + '","' + info.email + '", "' + info.contact + '","' + info.alt_contact + '","' + that.website + '","' + that.accountant_id + '")', function (error, rows, fields) {
                if (!error) {
                  // console.log(rows.insertId)
                } else {
                  console.log("Error...", error);
                  reject(error);
                }
              });
            })
            
            resolve(company_id);
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
      console.log('Company Added %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};

Company.prototype.update = function (newUser) {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      if (!error) {

        let values = [that.name, that.nbzn, that.location, that.director, that.email, that.contact, that.alt_contact, that.website, that.director_id];

        connection.changeUser({ database: dbName["prod"] });
        connection.query('UPDATE company set name = ?, nbzn = ?, location=?, director=?, email = ?, contact = ?, alt_contact = ?, website = ? WHERE id = ?', values, function (error, rows, fields) {
          if (!error) {
            // connection.query('select accountant_id from company where id="' + that.comp_id + '"',function(error,rows,fields){
            //   if (!error) {
            resolve(rows);
            //     }
            //   })
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
}

module.exports = Company;
