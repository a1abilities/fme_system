const connection = require('../../lib/connection.js');
const dbName = require('../../lib/databaseMySQLNew.js');
const utils = require("../../utils");


var Enquiry = function (params) {
  console.log("params", params);
  this.enquiry_id = params.enquiry_id;
  this.user_id = params.user_id;
  this.enquiry_id = params.enquiry_id;
  this.lead_id = params.lead_id;
  this.customer_id = params.customer_id;
  this.customer_name= params.customer_name;
  this.contact= params.contact;
  this.interested_product_id= params.interested_product_id;
  this.is_active = params.is_active;
  this.created_by =params.created_by;
  this.converted_to = params.converted_to;
  //for lead converted to enquiry
  this.convert_by_lead=params.convert_by_lead;
  this.userid = params.userid;
  this.franchise_id=params.franchise_id;
  this.searchText=params.searchText;
  this.is_existing = '';
  this.comment = params.comment;

  if(params.customer_id !== "" && params.customer_id !== undefined && params.customer_id > 0){
    this.is_existing = 1;
  }else{
    this.is_existing = 0;
  }  
};

Enquiry.prototype.postenquiry = function () {
  const that = this;  
  return new Promise(function (resolve, reject) {
console.log('that enquiry',that);
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        let values = [
          [that.enquiry_id, that.lead_id, that.is_existing, that.customer_id, that.customer_name,that.contact,that.interested_product_id,that.is_active,that.converted_to,that.created_by]
        ]
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('INSERT INTO enquiry(enquiry_id, lead_id, is_existing_customer, customer_id, customer_name, contact, interested_product_id, is_active, converted_to, created_by) VALUES ?',[values],function (error, rows, fields) {
            if (!error) {
                if(that.convert_by_lead!=0){
                  connection.query('select franchise_id from user where id=1 limit 1', function (error, rows, fields) {
                    if (!error) {
                      // resolve(rows);
                      const franchise_id=rows[0].franchise_id;
                      connection.changeUser({ database: dbName["prod"] });
                      connection.query('update leads set converted_to="1",converted_by="'+that.userid+'", converted_by_f_id="'+franchise_id+'" where id="'+that.convert_by_lead+'"',function (error, rows, fields) {
                        if (!error) {
                          console.log("rows...",rows);
                            resolve(rows);
                            } else {
                              console.log("Error...", error);
                              reject(error);
                            }
                      });
                    }else {
                      console.log("Error...", error);
                      reject(error);
                    }
                })
              }else { 
                resolve(rows);
              }
            } else {
              console.log("Error...", error);
              reject(error);
            }
          })
          
      } else {
        console.log("Error...", error);
        reject(error);
      }
      connection.release();
      console.log('Enquiry Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};




Enquiry.prototype.getAll = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
    
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        // connection.query('select id, enquiry_id, customer_name, contact, interested_product_id, is_active, created_by from enquiry WHERE converted_to != 1 order by id desc',function (error, rows, fields) {
          connection.query('select id, customer_id, is_existing_customer, enquiry_id, customer_name, contact, interested_product_id, is_active, created_by, converted_to, reason_to_delete from enquiry order by id desc',function (error, rows, fields) {

          if (!error) {
              // console.log("rows...",rows);
                resolve(rows);
                } else {
                  console.log("Error...", error);
                  reject(error);
                }
          })
          
      } else {
        console.log("Error...", error);
        reject(error);
      }
      connection.release();
      console.log('Enquiry List Fetched Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};


Enquiry.prototype.convertedList = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
    
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('select id, is_existing_customer, customer_id, enquiry_id, customer_name, contact, interested_product_id, reason_to_delete, is_active, created_by from enquiry WHERE converted_to = 1  AND is_active = 1  order by id desc',function (error, rows, fields) {
            if (!error) {
              // console.log("rows...",rows);
                resolve(rows);
                } else {
                  console.log("Error...", error);
                  reject(error);
                }
          })
          
      } else {
        console.log("Error...", error);
        reject(error);
      }
      connection.release();
      console.log('Enquiry Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};



Enquiry.prototype.nonConvertList = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
    
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('select id, is_existing_customer, customer_id, enquiry_id, customer_name, contact, interested_product_id, is_active, reason_to_delete, created_by from enquiry WHERE converted_to = 0 AND is_active = 1 order by id desc',function (error, rows, fields) {
            if (!error) {
              // console.log("rows...",rows);
                resolve(rows);
                } else {
                  console.log("Error...", error);
                  reject(error);
                }
          })
          
      } else {
        console.log("Error...", error);
        reject(error);
      }
      connection.release();
      console.log('Enquiry Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};

Enquiry.prototype.convert = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
    
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('update enquiry set converted_to = 1 WHERE id = "'+that.enquiry_id+'"',function (error, rows, fields) {
            if (!error) {
              // console.log("rows...",rows);
                resolve(rows);
                } else {
                  console.log("Error...", error);
                  reject(error);
                }
          })
          
      } else {
        console.log("Error...", error);
        reject(error);
      }
      connection.release();
      console.log('Enquiry Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};



Enquiry.prototype.getnewid = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('select id from enquiry order by id desc limit 1',function (error, rows, fields) {
            if (!error) {
                resolve(rows);
                } else {
                  console.log("Error...", error);
                  reject(error);
                }
          })
          
      } else {
        console.log("Error...", error);
        reject(error);
      }
      connection.release();
      console.log('Enquiry Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};

Enquiry.prototype.searchData = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        // connection.query('select id, enquiry_id, customer_name, contact, interested_product_id, is_active, created_by from enquiry WHERE converted_to != 1 order by id desc',function (error, rows, fields) {
          connection.query('select id, is_existing_customer, customer_id, enquiry_id, customer_name, contact, interested_product_id, is_active, created_by, converted_to, reason_to_delete from enquiry where customer_name LIKE "%'+that.searchText+'%" OR contact LIKE "%'+that.searchText+'%" OR enquiry_id LIKE "%'+that.searchText+'%" order by id desc',function (error, rows, fields) {                            
            if (!error) {
              // console.log("rows...",rows);
                resolve(rows);
                } else {
                  console.log("Error...", error);
                  reject(error);
                }
          })
          
      } else {
        console.log("Error...", error);
        reject(error);
      }
      connection.release();
      console.log('Enquiry searched for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
  }





  
Enquiry.prototype.deleteEnquiry = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('update enquiry set is_active = 0, reason_to_delete = "'+that.comment+'" where id = "'+that.enquiry_id+'"',function (error, rows, fields) {
          if (!error) {
              resolve(rows);
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
      console.log('Enquiry Deleted %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
  }

  


module.exports = Enquiry;