const connection = require('../../lib/connection.js');
const dbName = require('../../lib/databaseMySQLNew.js');

const Lead = function (params) {

  this.lead_id = params.lead_id;
  this.franchise_id = params.franchise_id;
  this.message = params.message;
  this.customer_name = params.customer_name;
  this.customer_id = params.customer_id;
  this.customer_contact = params.customer_contact;
  this.is_active = params.is_active;
  this.user_id = params.user_id;
  this.userid = params.userid;
  if (this.franchise_id === '0') {
    this.is_franchise_exist = 0;
  }
  else {

    this.is_franchise_exist = 1;
  }
  this.franchise_name = params.franchise_name;
  this.comment = params.comment;
  this.comment_by = params.comment_by;
  this.f_id = params.f_id;
  this.upload = params.upload;
  if (params.f_id === null) {
    this.f_id = 0;
  }
  this.uid = params.uid;
  this.filter_id = params.filter_id;
  
  this.searchText = params.searchText;

  this.is_existing = '';

  if(params.customer_id !== "" && params.customer_id !== undefined){
    this.is_existing = 1;
  }else{
    this.is_existing = 0;
  }  
  // console.log('params------',params);
};

Lead.prototype.add = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }

      if (that.user_id != "admin" && that.user_id.split('_')[1] != 'admin') {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('select franchise_id from user where id=1 limit 1', function (error, rows, fields) {
          if (!error) {
            // resolve(rows);
            const franchise_id = rows[0].franchise_id;
            const values = [
              [that.lead_id, that.is_franchise_exist, that.franchise_id, that.franchise_name, that.message,  that.is_existing, that.customer_id, that.customer_name, that.customer_contact, franchise_id, that.uid, that.is_active, that.upload]
            ];
            connection.changeUser({ database: dbName["prod"] });
            connection.query(`INSERT INTO leads(lead_id,is_franchise_exist, franchise_id,franchise_name,message, is_existing_customer, customer_id, customer_name,customer_contact,f_id,created_by ,is_active, document) VALUES ?`, [values], (error, mrows, fields) => {
              if (!error) {
                resolve(mrows);
              } else {
                console.log('Error...', error);
                reject(error);
              }
            });

          } else {
            console.log("Error...", error);
            reject(error);
          }
        });
      }
      else {
        const values = [
          [that.lead_id, that.is_franchise_exist, that.franchise_id, that.franchise_name, that.message,  that.is_existing, that.customer_id, that.customer_name, that.customer_contact, that.f_id, that.uid, that.is_active, that.upload]
        ];
        connection.changeUser({ database: dbName["prod"] });
        connection.query(`INSERT INTO leads(lead_id,is_franchise_exist, franchise_id,franchise_name,message, is_existing_customer, customer_id,  customer_name,customer_contact,f_id,created_by ,is_active, document) VALUES ?`, [values], (error, mrows, fields) => {
          if (!error) {
            resolve(mrows);
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

Lead.prototype.all = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }
      if(that.user_id.split('_')[1]==='admin'){
        connection.changeUser({ database: dbName["prod"] });
        connection.query('select id,lead_id, document, is_franchise_exist,franchise_id,franchise_name,message, is_existing_customer, customer_id,  customer_name,customer_contact, is_active,f_id,created_by from leads where is_active="1" AND converted_to="0" AND ( f_id="0" OR franchise_id=0 ) order by id desc', function (error, rows, fields) {
          if (!error) {
            resolve(rows);

          } else {
            console.log("Error...", error);
            reject(error);
          }
        });
      }else{
      if (that.user_id != "admin") {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('select franchise_id from user where id=1 limit 1', function (error, rows, fields) {
          if (!error) {
            // resolve(rows);
            const franchise_id = rows[0].franchise_id;
            connection.changeUser({ database: dbName["prod"] });
            connection.query('select id, lead_id, document, is_franchise_exist,franchise_id,franchise_name,message, is_existing_customer, customer_id,  customer_name,customer_contact, is_active,f_id,created_by from leads where is_active="1" AND converted_to="0" AND (f_id="' + franchise_id + '" OR franchise_id="' + franchise_id + '" OR franchise_id="0") order by id desc', function (error, rows, fields) {
              if (!error) {
                resolve(rows);
              } else {
                console.log("Error...", error);
                reject(error);
              }
            });
          }
        });
      }
      else {
        connection.changeUser({ database: dbName["prod"] });
        connection.query('select id,lead_id, document, is_franchise_exist,franchise_id,franchise_name,message, is_existing_customer, customer_id, customer_name,customer_contact, is_active,f_id,created_by from leads where is_active="1" AND converted_to="0" AND ( f_id="0" OR franchise_id=0 ) order by id desc', function (error, rows, fields) {
          if (!error) {
            resolve(rows);

          } else {
            console.log("Error...", error);
            reject(error);
          }
        });
      }
    }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });

}

Lead.prototype.last = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      connection.changeUser({ database: dbName["prod"] });
      connection.query('select id from leads order by id desc limit 1', function (error, rows, fields) {
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


Lead.prototype.addComment = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }

      connection.changeUser({ database: dbName["prod"] });

      const values = [
        [that.lead_id, that.comment, that.comment_by]
      ];
      connection.query(`INSERT INTO lead_comment(l_id,comment,comment_by) VALUES ?`, [values], (error, mrows, fields) => {
        if (!error) {
          resolve(mrows);
        } else {
          console.log('Error...', error);
          reject(error);
        }
      });

      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
}

Lead.prototype.allComment = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }

      connection.changeUser({ database: dbName["prod"] });
      connection.query(`Select l_id,comment,comment_by from lead_comment where l_id="` + that.lead_id + `"`, (error, mrows, fields) => {
        if (!error) {
          resolve(mrows);
        } else {
          console.log('Error...', error);
          reject(error);
        }
      });

      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
}


Lead.prototype.franchiseList = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }
      connection.changeUser({ database: dbName["prod"] });
      connection.query('select id,name,city,suburb from franchise where state=2 order by id desc', function (error, rows, fields) {
        if (!error) {
          console.log('rows----', rows);
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

Lead.prototype.convertedList = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }
      if (that.user_id != "admin") {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('select franchise_id from user where id=1 limit 1', function (error, rows, fields) {
          if (!error) {
            // resolve(rows);
            const franchise_id = rows[0].franchise_id;
            connection.changeUser({ database: dbName["prod"] });
            connection.query('select id,lead_id, is_franchise_exist,franchise_id,franchise_name,message, is_existing_customer, customer_id, customer_name,customer_contact, is_active,f_id,created_by,converted_to,converted_by,converted_by_f_id from leads where is_active="1" AND converted_to != 0 AND (f_id="' + franchise_id + '" OR franchise_id="' + franchise_id + '" OR franchise_id=0) order by id desc', function (error, rows, fields) {
              if (!error) {
                resolve(rows);

              } else {
                console.log("Error...", error);
                reject(error);
              }
            });
          }
        });
      }
      else {

        connection.changeUser({ database: dbName["prod"] });
        connection.query('select id,lead_id, is_franchise_exist,franchise_id,franchise_name,message, is_existing_customer, customer_id, customer_name,customer_contact, is_active,f_id,created_by from leads where is_active="1" AND converted_to != 0 AND (f_id="0" OR franchise_id=0) order by id desc', function (error, rows, fields) {
          if (!error) {
            resolve(rows);

          } else {
            console.log("Error...", error);
            reject(error);
          }
        });
      }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });

}


Lead.prototype.filter = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }
      if (that.filter_id === 1) {
        if (that.user_id != "admin") {
          connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
          connection.query('select franchise_id from user where id=1 limit 1', function (error, rows, fields) {
            if (!error) {
              // resolve(rows);
              const franchise_id = rows[0].franchise_id;
              connection.changeUser({ database: dbName["prod"] });
              connection.query('select id,lead_id, is_franchise_exist,franchise_id,franchise_name,message, is_existing_customer, customer_id, customer_name,customer_contact, is_active,f_id,created_by from leads where is_active="1" AND converted_to="0" AND f_id="' + franchise_id + '" order by id desc', function (error, rows, fields) {
                if (!error) {
                  console.log(rows);
                  resolve(rows);

                } else {
                  console.log("Error...", error);
                  reject(error);
                }
              });
            }
          });
        }
        else {

          connection.changeUser({ database: dbName["prod"] });
          connection.query('select id,lead_id, is_franchise_exist,franchise_id,franchise_name,message, is_existing_customer, customer_id,  customer_name,customer_contact, is_active,f_id,created_by from leads where is_active="1" AND converted_to="0" AND  f_id="0" order by id desc', function (error, rows, fields) {
            if (!error) {
              resolve(rows);

            } else {
              console.log("Error...", error);
              reject(error);
            }
          });
        }
      }
      else if (that.filter_id === 2) {
        if (that.user_id != "admin") {
          connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
          connection.query('select franchise_id from user where id=1 limit 1', function (error, rows, fields) {
            if (!error) {
              // resolve(rows);
              const franchise_id = rows[0].franchise_id;
              connection.changeUser({ database: dbName["prod"] });
              connection.query('select id,lead_id, is_franchise_exist,franchise_id,franchise_name,message, is_existing_customer, customer_id, customer_name,customer_contact, is_active,f_id,created_by from leads where is_active="1" AND converted_to="0" AND franchise_id="' + franchise_id + '" order by id desc', function (error, rows, fields) {
                if (!error) {
                  resolve(rows);

                } else {
                  console.log("Error...", error);
                  reject(error);
                }
              });
            }
          });
        }
      }
      else if (that.filter_id === 3) {
        connection.changeUser({ database: dbName["prod"] });
        connection.query('select id,lead_id, is_franchise_exist,franchise_id,franchise_name,message, is_existing_customer, customer_id, customer_name,customer_contact, is_active,f_id,created_by from leads where is_active="1" AND converted_to="0" AND franchise_id=0 order by id desc', function (error, rows, fields) {
          if (!error) {
            resolve(rows);

          } else {
            console.log("Error...", error);
            reject(error);
          }
        });
      }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });

}


Lead.prototype.searchData = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        if (that.user_id != "admin") {
          connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
          connection.query('select franchise_id from user where id=1 limit 1', function (error, rows, fields) {
            if (!error) {
              // resolve(rows);
              const franchise_id = rows[0].franchise_id;
              connection.changeUser({ database: dbName["prod"] });
              connection.query('select id,lead_id, document, is_franchise_exist,franchise_id, franchise_name,message, is_existing_customer, customer_id, customer_name,customer_contact, is_active,f_id,created_by from leads where is_active="1" AND converted_to="0" AND (f_id="' + franchise_id + '" OR franchise_id="' + franchise_id + '" OR franchise_id="0") AND ( customer_name LIKE "%'+that.searchText+'%" OR customer_contact LIKE "%'+that.searchText+'%" OR franchise_name LIKE "%'+that.searchText+'%"  OR lead_id LIKE "%'+that.searchText+'%") order by id desc', function (error, rows, fields) {
                if (!error) {
                  console.log(rows)
                  resolve(rows);
  
                } else {
                  console.log("Error...", error);
                  reject(error);
                }
              });
            }
          });
        }
        else {  
          connection.changeUser({ database: dbName["prod"] });
          connection.query('select id,lead_id, document, is_franchise_exist,franchise_id,franchise_name,message, is_existing_customer, customer_id, customer_name,customer_contact, is_active,f_id,created_by from leads where is_active="1" AND converted_to="0" AND ( f_id="0" OR franchise_id=0 ) AND ( customer_name LIKE "%'+that.searchText+'%" OR customer_contact LIKE "%'+that.searchText+'%" OR franchise_name LIKE "%'+that.searchText+'%"  OR lead_id LIKE "%'+that.searchText+'%") order by id desc', function (error, rows, fields) {
            if (!error) {
              resolve(rows);
  
            } else {
              console.log("Error...", error);
              reject(error);
            }
          });
        }


      connection.release();
      console.log('Customer Added for Franchise Staff %d', connection.threadId);
      }
  
    });});
  }



Lead.prototype.fetchLeads = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }
      if(that.user_id.split('_')[1]==='admin'){
        connection.changeUser({ database: dbName["prod"] });
        connection.query('select id,lead_id, document, is_franchise_exist,franchise_id,franchise_name,message, is_existing_customer, customer_id,  customer_name,customer_contact, is_active,f_id,created_by from leads where is_active="1" AND converted_to="0" AND (  f_id="0" OR franchise_id=0 ) order by id desc', function (error, rows, fields) {
          if (!error) {
            console.log('rowss.1',rows)
            resolve(rows);

          } else {
            console.log("Error...", error);
            reject(error);
          }
        });
      }else{
      if (that.user_id != "admin") {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('select franchise_id from user where id=1 limit 1', function (error, rows, fields) {
          if (!error) {
            // resolve(rows);
            const franchise_id = rows[0].franchise_id;
            connection.changeUser({ database: dbName["prod"] });
            connection.query('select id, lead_id, document, is_franchise_exist, franchise_id, franchise_name, message, is_existing_customer, customer_id,  customer_name, customer_contact, is_active, f_id, created_by from leads where is_active="1" AND converted_to="0" AND (franchise_id= "' + franchise_id + '" OR franchise_id= "0") order by id desc', function (error, rows, fields) {
              if (!error) {
                console.log('rowss.2',rows)
                resolve(rows);
              } else {
                console.log("Error...", error);
                reject(error);
              }
            });
          }
        });
      }
      else {
        connection.changeUser({ database: dbName["prod"] });
        connection.query('select id,lead_id, document, is_franchise_exist,franchise_id,franchise_name,message, is_existing_customer, customer_id, customer_name,customer_contact, is_active,f_id,created_by from leads where is_active="1" AND converted_to="0" AND (  f_id="0" OR franchise_id=0 ) order by id desc', function (error, rows, fields) {
          if (!error) {
            console.log('rowss.3',rows)
            resolve(rows);

          } else {
            console.log("Error...", error);
            reject(error);
          }
        });
      }
    }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });

}

module.exports = Lead;
