const connection = require('../../lib/connection.js');
const dbName = require('../../lib/databaseMySQLNew.js');
const utils = require("../../utils");


var Staff = function (params) {
  // console.log("params@@@@@@@@@@@", params);

  this.franchise_id = params.franchise_id;
  this.id = params.id;
  this.first_name = params.first_name;
  this.last_name = params.last_name;
  this.location = params.location;
  this.contact = params.contact;
  this.email = params.email;

  this.pre_company_name = params.pre_company_name;
  this.pre_company_address = params.pre_company_address;
  this.pre_company_contact = params.pre_company_contact;
  this.pre_position = params.pre_position;
  this.duration = params.duration;
  this.resume = params.resume;
  this.cover_letter = params.cover_letter;
  this.employment_docs = params.employment_docs;

  this.user_id = params.user_id;
  this.password = params.password;
  this.role = params.role;
  this.created_by = params.created_by;
  this.updated_by = params.updated_by;
  this.is_active = params.is_active;
  this.token = params.token;
  this.accountId = params.accountId;
  this.searchText = params.searchText;

};

Staff.prototype.register = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
   
    connection.getConnection(function (error, connection) {
      if (error) { throw error; }
      if (!error) {
        let staffRoles= [];
        (that.role.split(',')).map((role,index) =>{
          staffRoles.push(role);
        });        

        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('INSERT INTO user(franchise_id,director_id, name,user_id,password,token,account_id,designation,role_id,is_active,created_by) VALUES ("' + 0 + '", "' + 0 + '", "' + that.first_name + " " + that.last_name + '", "' + that.user_id + '", AES_ENCRYPT("' + that.password + '", "secret"),  "' + that.token + '", "' + that.accountId + '" , "' + that.designation + '", "' + that.role + '", "' + that.is_active + '", "' + that.created_by + '")', function (error, rows, fields) {
          const savedUserId = rows.insertId;
          (staffRoles.length > 0 ? staffRoles : []).map((data, index) => {
              connection.query('INSERT INTO user_role(user_id,role_id,is_active,created_by) VALUES ("' + savedUserId + '", "' + data + '", "' + that.is_active + '", "' + that.created_by + '")', function (error, rows, fields) {
                  resolve(rows);
              })
          });

          connection.query('INSERT INTO staff(franchise_user_id, first_name, last_name, location, contact, email, pre_company_name, pre_company_address, pre_company_contact, pre_position, duration, user_id, password, role, employment_docs, created_by) values ("' + savedUserId + '","' + that.first_name + '","' + that.last_name + '","' + that.location + '","' + that.contact + '","' + that.email + '","' + that.pre_company_name + '","' + that.pre_company_address + '","' + that.pre_company_contact + '","' + that.pre_position + '", "' + that.duration + '", "' + that.user_id + '", AES_ENCRYPT("' + that.password + '", "secret"), "' + that.role + '", "' + that.employment_docs + '", "' + that.created_by + '")', function (error, rows, fields) {
            if (!error) {
              resolve(rows);
            } else {
              console.log("Error...", error);
              reject(error);
            }
          });
        });
      } else {
        console.log("Error...", error);
        reject(error);
      }

      connection.release();
      console.log('Staff Added for Franchise %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};


Staff.prototype.update = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
          if(that.employment_docs===''){ 
            const Values = [that.first_name, that.last_name, that.location, that.contact, that.email, that.pre_company_name, that.pre_company_address, that.pre_company_contact, that.pre_position, that.duration, that.role, that.updated_by, that.role, that.is_active, that.id ];
            connection.query('update staff as s INNER JOIN user as u ON u.id = s.franchise_user_id  SET s.first_name = ?, s.last_name = ?, s.location = ?, s.contact = ?, s.email = ?, s.pre_company_name = ?, s.pre_company_address = ?, s.pre_company_contact = ?, s.pre_position = ?, s.duration = ?, s.role = ?, s.updated_by = ?, u.role_id = ?, u.is_active = ? WHERE s.id = ?', Values, function (error, rows, fields) {
              if (error) { console.log("Error...", error); reject(error); }
                resolve(rows);
            });
          } else{
            const Values = [that.employment_docs, that.first_name, that.last_name, that.location, that.contact, that.email, that.pre_company_name, that.pre_company_address, that.pre_company_contact, that.pre_position, that.duration, that.role, that.updated_by, that.role, that.is_active, that.id ];
            connection.query('update staff as s INNER JOIN user as u ON u.id = s.franchise_user_id  SET s.employment_docs = ?, s.first_name = ?, s.last_name = ?, s.location = ?, s.contact = ?, s.email = ?, s.pre_company_name = ?, s.pre_company_address = ?, s.pre_company_contact = ?, s.pre_position = ?, s.duration = ?, s.role = ?, s.updated_by = ?, u.role_id = ?, u.is_active = ? WHERE s.id = ?', Values, function (error, rows, fields) {
              if (error) { console.log("Error...", error); reject(error); }
                resolve(rows);
            });
          }        
      }
      connection.release();
      console.log('Staff Added for Franchise %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};


Staff.prototype.all = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('select s.id, s.first_name, s.last_name, s.location, s.contact,  s.email, s.pre_company_name, s.pre_company_address, s.pre_company_contact, s.pre_position, s.duration, s.user_id, AES_DECRYPT(s.`password`, \'secret\') AS password, s.role, s.employment_docs, s.created_by, u.is_active, u.status from staff as s inner join user as u on u.id = s.franchise_user_id order by id desc', function (error, rows, fields) {
          if (!error) {
                let datas = [];
                (rows && rows.length > 0 ? rows : []).map(data =>{
                  let pass = data.password.toString('utf8');
                  data.password = pass;
                  datas.push(data);
                });
            resolve(datas);
          } else {
            console.log("Error...", error);
            reject(error);
          }
        });
      }
      else {
        console.log("Error...", error);
        reject(error);
      }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};


Staff.prototype.searchData = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });        
        connection.query('select id, first_name, last_name, location, contact,  email, pre_company_name, pre_company_address, pre_company_contact, pre_position, duration, user_id, AES_DECRYPT(`password`, \'secret\') AS password, role, employment_docs, created_by from staff where first_name LIKE "%'+that.searchText+'%" OR last_name LIKE "%'+that.searchText+'%" OR location LIKE "%'+that.searchText+'%" OR email LIKE "%'+that.searchText+'%" OR contact LIKE "%'+that.searchText+'%" OR user_id LIKE "%'+that.searchText+'%" order by id desc', function (error, rows, fields) {
            if (!error) {
                  let datas = [];
                  (rows && rows.length > 0 ? rows : []).map(data =>{
                    let pass = data.password.toString('utf8');
                    data.password = pass;
                    datas.push(data);
                  });     
                  console.log(rows)
              resolve(datas);
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
      console.log('Customer Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};



module.exports = Staff;