const connection = require('../../lib/connection.js');
const dbName = require('../../lib/databaseMySQLNew.js');
const utils = require("../../utils");


var Customer = function (params) {
  // console.log("params@@@@@@@@@@@", params); 

  this.id = params.id;
  this.first_name = params.first_name;
  this.last_name = params.last_name;
  this.address = params.address;
  this.city = params.city;
  this.suburb = params.suburb;
  this.postcode = params.postcode;
  this.telephone = params.telephone;
  this.mobile = params.mobile;
  this.email = params.email;
  this.gender = params.gender;
  this.is_working = params.is_working;
  this.dob = params.dob;
  this.id_type = params.id_type;
  this.id_number = params.id_number;
  this.expiry_date = params.expiry_date;
  this.is_adult = params.is_adult;
  this.id_proof = params.id_proof;
  this.dl_version_number = params.dl_version_number;

  this.alt_c1_name = params.alt_c1_name;
  this.alt_c1_address = params.alt_c1_address;
  this.alt_c1_contact = params.alt_c1_contact;
  this.alt_c1_relation = params.alt_c1_relation;
  this.alt_c2_name = params.alt_c2_name;
  this.alt_c2_address = params.alt_c2_address;
  this.alt_c2_contact = params.alt_c2_contact;
  this.alt_c2_relation = params.alt_c2_relation;

  this.employer_name = params.employer_name;
  this.employer_address = params.employer_address;
  this.employer_telephone = params.employer_telephone;
  this.employer_email = params.employer_email;
  this.employer_tenure = params.employer_tenure;

  this.is_active = params.is_active,
    this.state = params.state,
    this.created_by = params.created_by;
  this.user_id = params.user_id;

  this.other_id_type = params.other_id_type;
  this.updated_by = params.updated_by;

  this.searchText = params.searchText;
  this.customer_id = params.customer_id;
  this.budgetData = params.budgetData;
  this.bankDetailData = params.bankDetailData;
  this.comment = params.comment;

  this.tabValue = params.tabValue;
  this.rowsPerPage = params.rowsPerPage;
  this.pageOffset = params.pageOffset;
};

Customer.prototype.register = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {


        if (that.id_type === 0) {
          connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
          connection.query('INSERT INTO id_type(name, is_active, created_by) VALUES ("' + that.other_id_type + '", 1, 1)', function (error, rows, fields) {
            if (!error) {
              let values = [
                [that.first_name, that.last_name, that.address, that.city, that.suburb, that.postcode, that.telephone, that.mobile, that.email, that.gender, that.is_working, that.dob, rows.insertId, that.other_id_type, that.dl_version_number, that.id_number, that.expiry_date, that.is_adult, that.id_proof, that.alt_c1_name, that.alt_c1_address, that.alt_c1_contact, that.alt_c1_relation, that.alt_c2_name, that.alt_c2_address, that.alt_c2_contact, that.alt_c2_relation, that.is_active, that.state, that.created_by]
              ];
              connection.query('INSERT INTO customer(first_name, last_name, address, city, suburb, postcode,telephone,mobile,email,gender,is_working,dob,id_type,other_id_type, dl_version_number, id_number,expiry_date,is_adult,id_proof,alt_c1_name,alt_c1_address,alt_c1_contact,alt_c1_relation,alt_c2_name,alt_c2_address,alt_c2_contact,alt_c2_relation,is_active,state,created_by) VALUES ?', [values], function (error, customerRows, fields) {

                if (!error) {
                  let customerIncomeValues = [
                    [customerRows.insertId, that.employer_name, that.employer_address, that.employer_telephone, that.employer_email, that.employer_tenure, that.is_active, that.state, that.created_by]
                  ];
                  connection.query('INSERT INTO customer_income(cust_id, employer_name, employer_address, employer_telephone, employer_email, employer_tenure, is_active, state, created_by) values ?', [customerIncomeValues], function (error, rows2, fields) {
                    if (!error) {
                      resolve({customer_id :customerRows.insertId});
                    } else {
                      console.log("Error...", error);
                      reject(error);
                    }
                  });
                } else {
                  console.log("Error...", error);
                  reject(error);
                }
              });
            } else {
              console.log("Error...", error);
              reject(error);
            }
          })
        }
        else {
          let values = [
            [that.first_name, that.last_name, that.address, that.city, that.suburb, that.postcode, that.telephone, that.mobile, that.email, that.gender, that.is_working, that.dob, that.id_type, that.other_id_type, that.dl_version_number, that.id_number, that.expiry_date, that.is_adult, that.id_proof, that.alt_c1_name, that.alt_c1_address, that.alt_c1_contact, that.alt_c1_relation, that.alt_c2_name, that.alt_c2_address, that.alt_c2_contact, that.alt_c2_relation, that.is_active, that.state, that.created_by, that.updated_by]
          ];

          connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
          connection.query('INSERT INTO customer(first_name, last_name, address, city, suburb, postcode,telephone,mobile,email,gender,is_working,dob,id_type,other_id_type, dl_version_number, id_number,expiry_date,is_adult,id_proof,alt_c1_name,alt_c1_address,alt_c1_contact,alt_c1_relation,alt_c2_name,alt_c2_address,alt_c2_contact,alt_c2_relation,is_active,state,created_by,updated_by) VALUES ?', [values], function (error, customerRows, fields) {

            if (!error) {
              let customerIncomeValues = [
                [customerRows.insertId, that.employer_name, that.employer_address, that.employer_telephone, that.employer_email, that.employer_tenure, that.is_active, that.state, that.created_by]
              ];
              connection.query('INSERT INTO customer_income(cust_id, employer_name, employer_address, employer_telephone, employer_email, employer_tenure, is_active, state, created_by) values ?', [customerIncomeValues], function (error, rows2, fields) {
                if (!error) {
                  resolve({customer_id :customerRows.insertId});
                } else {
                  console.log("Error...", error);
                  reject(error);
                }
              });
            } else {
              console.log("Error...", error);
              reject(error);
            }
          });
        }
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


Customer.prototype.update = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {

        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });

        that.id_proof === '' ?
          connection.query('UPDATE customer SET first_name = "' + that.first_name + '", last_name = "' + that.last_name + '", address = "' + that.address + '", city = "' + that.city + '",  suburb = "' + that.suburb + '", postcode = "' + that.postcode + '", telephone = "' + that.telephone + '", mobile = "' + that.mobile + '", email = "' + that.email + '", gender = "' + that.gender + '", is_working = "' + that.is_working + '", dob = "' + that.dob + '", id_type = "' + that.id_type + '", other_id_type = "' + that.other_id_type + '", dl_version_number = "' + that.dl_version_number + '", id_number = "' + that.id_number + '", expiry_date = "' + that.expiry_date + '", is_adult = "' + that.is_adult + '", alt_c1_name = "' + that.alt_c1_name + '", alt_c1_address = "' + that.alt_c1_address + '", alt_c1_contact = "' + that.alt_c1_contact + '", alt_c1_relation = "' + that.alt_c1_relation + '", alt_c2_name = "' + that.alt_c2_name + '", alt_c2_address = "' + that.alt_c2_address + '", alt_c2_contact = "' + that.alt_c2_contact + '", alt_c2_relation = "' + that.alt_c2_relation + '", is_active = "' + that.is_active + '", state = "' + that.state + '", updated_by = "' + that.updated_by + '" WHERE id= "' + that.id + '"', function (error, rows, fields) {
            if (!error) {
              connection.query('UPDATE customer_income SET employer_name = "' + that.employer_name + '", employer_address = "' + that.employer_address + '", employer_telephone = "' + that.employer_telephone + '", employer_email = "' + that.employer_email + '", employer_tenure = "' + that.employer_tenure + '", is_active = "' + that.is_active + '", state = "' + that.state + '", updated_by = "' + that.updated_by + '" WHERE cust_id = "' + that.id + '"', function (error, rows, fields) {
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

          })
          :
          connection.query('UPDATE customer SET  first_name = "' + that.first_name + '", last_name = "' + that.last_name + '", address = "' + that.address + '", city = "' + that.city + '",  suburb = "' + that.suburb + '", postcode = "' + that.postcode + '", telephone = "' + that.telephone + '", mobile = "' + that.mobile + '", email = "' + that.email + '", gender = "' + that.gender + '", is_working = "' + that.is_working + '", dob = "' + that.dob + '", id_type = "' + that.id_type + '", dl_version_number = "' + that.dl_version_number + '", other_id_type = "' + that.other_id_type + '", id_number = "' + that.id_number + '", expiry_date = "' + that.expiry_date + '", is_adult = "' + that.is_adult + '", id_proof = "' + that.id_proof + '", alt_c1_name = "' + that.alt_c1_name + '", alt_c1_address = "' + that.alt_c1_address + '", alt_c1_contact = "' + that.alt_c1_contact + '", alt_c1_relation = "' + that.alt_c1_relation + '", alt_c2_name = "' + that.alt_c2_name + '", alt_c2_address = "' + that.alt_c2_address + '", alt_c2_contact = "' + that.alt_c2_contact + '", alt_c2_relation = "' + that.alt_c2_relation + '", is_active = "' + that.is_active + '", state = "' + that.state + '", updated_by = "' + that.updated_by + '" WHERE id= "' + that.id + '"', function (error, rows, fields) {
            if (!error) {
              connection.query('UPDATE customer_income SET employer_name = "' + that.employer_name + '", employer_address = "' + that.employer_address + '", employer_telephone = "' + that.employer_telephone + '", employer_email = "' + that.employer_email + '", employer_tenure = "' + that.employer_tenure + '", is_active = "' + that.is_active + '", state = "' + that.state + '", updated_by = "' + that.updated_by + '" WHERE cust_id = "' + that.id + '"', function (error, rows, fields) {
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
          });
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


Customer.prototype.all = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });

        // connection.query('select c.id, c.customer_name, c.address, c.city, c.postcode, c.telephone, c.mobile, c.email, c.gender, c.is_working, c.dob, c.id_type, c.other_id_type, c.id_number, c.expiry_date, c.is_adult, c.id_proof, c.alt_c1_name, c.alt_c1_address, c.alt_c1_contact, c.alt_c1_relation, c.alt_c2_name, c.alt_c2_address, c.alt_c2_contact, c.alt_c2_relation, c.is_active, c.created_by, ci.employer_name, ci.employer_address, ci.employer_telephone, ci.employer_email, ci.employer_tenure from customer as c left join customer_income as ci on c.id = ci.cust_id order by c.id desc', function (error, rows, fields) {
        connection.query('select c.id, c.first_name, c.last_name, c.address, c.city, c.suburb, c.postcode, c.telephone, c.mobile, c.email, c.gender, c.is_working, c.dob, c.id_type, c.other_id_type, c.dl_version_number, c.id_number, c.expiry_date, c.is_adult, c.id_proof, c.alt_c1_name, c.alt_c1_address, c.alt_c1_contact, c.alt_c1_relation, c.alt_c2_name, c.alt_c2_address, c.alt_c2_contact, c.alt_c2_relation, c.is_verified, c.is_active, c.state, c.created_by, u.name AS created_by_name, ci.employer_name, ci.employer_address, ci.employer_telephone, ci.employer_email, ci.employer_tenure from customer as c left join customer_income as ci on c.id = ci.cust_id INNER JOIN user as u on c.created_by = u.id order by c.id desc',
          function (error, rows, fields) {
            if (!error) {
              resolve(rows);
            } else {
              console.log("Error...", error);
              reject(error);
            }
          });
        // });
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


Customer.prototype.countTabRecord = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        let Query = `SELECT COUNT(CASE WHEN (locate('1', c.state) > 0) THEN 1 ELSE NULL END) as active, COUNT(CASE WHEN (locate('2', c.state) > 0) THEN 1 ELSE NULL END) as hold, COUNT(CASE WHEN (locate('3', c.state) > 0) THEN 1 ELSE NULL END) as financial_hardship, COUNT(CASE WHEN (DATE_FORMAT(DATE(c.dob),'%m-%d') = DATE_FORMAT(NOW(),'%m-%d')) THEN 1 ELSE NULL END) as todays_birthday, (SELECT COUNT(ps.id) FROM payment_schedules as ps WHERE ps.is_active = 1 AND ps.status IN(1,8,16,17) AND ps.payment_date < CURRENT_DATE  AND ps.payment_date  > (NOW() - INTERVAL 7 DAY)) as missed_payment FROM customer as c`;
        connection.query(Query, function (error, rows, fields) {
            if (error) {console.log("Error...", error); reject(error);}
            resolve(rows);
          });
      }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};

Customer.prototype.customerList = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        let Query = `select c.id, c.first_name, c.last_name, c.address, c.city, c.suburb, c.postcode, c.telephone, c.mobile, c.email, c.gender, c.is_working, c.dob, c.id_type, c.other_id_type, c.dl_version_number, c.id_number, c.expiry_date, c.is_adult, c.id_proof, c.alt_c1_name, c.alt_c1_address, c.alt_c1_contact, c.alt_c1_relation, c.alt_c2_name, c.alt_c2_address, c.alt_c2_contact, c.alt_c2_relation, c.is_verified, c.is_active, c.state, c.created_by, u.name AS created_by_name, ci.employer_name, ci.employer_address, ci.employer_telephone, ci.employer_email, ci.employer_tenure from customer as c left join customer_income as ci on c.id = ci.cust_id INNER JOIN user as u on c.created_by = u.id `;
        if(that.tabValue === 0){
          Query = Query + ` WHERE c.state = 1 `;
        }else if(that.tabValue === 1){
          Query = Query + ` WHERE c.state = 2 `;
        }else if(that.tabValue === 2){
          Query = Query + ` WHERE c.state = 3 `;
        }else if(that.tabValue === 3){
          Query = Query + ` WHERE  DATE_FORMAT(DATE(c.dob),'%m-%d') = DATE_FORMAT(NOW(),'%m-%d')`;
        }
        if(that.searchText !== ''){
          Query = Query + ` AND (c.id LIKE "%${ that.searchText }%" OR c.first_name LIKE "%${ that.searchText }%" OR c.last_name LIKE "%${ that.searchText }%" OR c.address LIKE "%${ that.searchText }%" OR c.city LIKE "%${ that.searchText }%" OR c.postcode LIKE "%${ that.searchText }%" OR c.telephone LIKE "%${ that.searchText }%" OR c.mobile  LIKE "%${ that.searchText }%" OR c.gender  LIKE "%${ that.searchText }%" OR c.dob  LIKE "%${ that.searchText }%") `
        }
          Query = Query + ` ORDER BY c.id desc LIMIT ${that.pageOffset}, ${that.rowsPerPage};`;

          // console.log(Query);
        connection.query(Query, function (error, rows, fields) {
            if (error) {console.log("Error...", error); reject(error);}
            resolve(rows);
          });
      }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};


Customer.prototype.getidtypelist = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('select id, name, is_active from id_type order by name', function (error, rows, fields) {
          if (!error) {
            resolve(rows);
          } else {
            console.log("Error...", error);
            reject(error);
          }
        });
        // });
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

Customer.prototype.searchData = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('select c.id, c.first_name, c.last_name, c.address, c.city, c.suburb, c.postcode, c.telephone, c.mobile, c.email, c.gender, c.is_working, c.dob, c.id_type, c.other_id_type, c.id_number, c.expiry_date, c.is_adult,  c.is_verified, c.id_proof, c.alt_c1_name, c.alt_c1_address, c.alt_c1_contact, c.alt_c1_relation, c.alt_c2_name, c.alt_c2_address, c.alt_c2_contact, c.alt_c2_relation, c.is_active, c.state, c.created_by, u.name AS created_by_name, ci.employer_name, ci.employer_address, ci.employer_telephone, ci.employer_email, ci.employer_tenure from customer as c inner join customer_income as ci on c.id = ci.cust_id INNER JOIN user as u on c.created_by = u.id WHERE c.id LIKE "%' + that.searchText + '%" OR c.first_name LIKE "%' + that.searchText + '%" OR c.last_name LIKE "%' + that.searchText + '%" OR c.address LIKE "%' + that.searchText + '%" OR c.city LIKE "%' + that.searchText + '%" OR c.postcode LIKE "%' + that.searchText + '%" OR c.telephone LIKE "%' + that.searchText + '%" OR c.mobile  LIKE "%' + that.searchText + '%" OR c.gender  LIKE "%' + that.searchText + '%" OR c.dob  LIKE "%' + that.searchText + '%" order by c.id desc',
          function (error, rows, fields) {
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
      console.log('Customer Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};


Customer.prototype.addBudget = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });

        const budget_list = that.budgetData;
        let budgetValues = [
          [that.customer_id, budget_list.work, budget_list.benefits, budget_list.accomodation, budget_list.childcare, budget_list.rent, budget_list.power, budget_list.telephone, budget_list.mobile, budget_list.vehicle, budget_list.vehicle_fuel, budget_list.transport, budget_list.food, budget_list.credit_card, budget_list.loan, budget_list.other_income, budget_list.other_expenditure, budget_list.pre_order_exp, budget_list.income, budget_list.expenditure, budget_list.surplus, budget_list.afford_amt, budget_list.paid_day, budget_list.debited_day, 0, that.created_by]
        ];
        connection.query('INSERT INTO budget(customer_id, work, benefits, accomodation, childcare, rent, power, landline_phone, mobile_phone, vehicle_finance, vehicle_fuel, public_transport, food, credit_store_cards, loans_hire_purchase, other_income, other_expenditure, pre_order_exp, total_income, total_expenditure, total_surplus, afford_amt, paid_day, debited_day, is_active, created_by) VALUES ?', [budgetValues], function (error, rows, fields) {
          if (!error) {
            // const budget_id = rows.insertId;                
            resolve({budget_id : rows.insertId});
          } else {
            console.log("Error...", error);
            reject(error);
          }
        });
      }
      connection.release();
      console.log('Budget Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};



Customer.prototype.addBankDetail = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });

        const detailList = that.bankDetailData;
        let bankDetailValues = [
           [that.customer_id, detailList.acc_holder_name, detailList.institution_name, detailList.bank_branch, detailList.bank_address, detailList.bank_code, detailList.branch_number, detailList.acc_number, detailList.suffix, 1, that.created_by]
        ];
        connection.query('INSERT INTO customer_bank_detail(customer_id, acc_holder_name, institution_name, bank_branch, bank_address, bank_code, branch_number, acc_number, suffix, is_active, created_by) VALUES ?', [bankDetailValues], function (error, rows, fields) {
          if (!error) {
            resolve(rows);
          } else {
            console.log("Error...", error);
            reject(error);
          }
        });
      }
      connection.release();
      console.log('Bank Detail Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};



Customer.prototype.updateBankDetail = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });

        const detailList = that.bankDetailData;
        // let bankDetailValues = [
        //    [detailList.acc_holder_name, detailList.institution_name, detailList.bank_branch, detailList.bank_address, detailList.bank_code, detailList.branch_number, detailList.acc_number, detailList.suffix, 1, that.created_by]
        // ];
        connection.query('UPDATE customer_bank_detail SET acc_holder_name = "'+detailList.acc_holder_name+'", institution_name = "' + detailList.institution_name + '", bank_branch = "'+detailList.bank_branch+'", bank_address = "'+detailList.bank_address+'", bank_code = "'+detailList.bank_code+'", branch_number = "'+detailList.branch_number+'", acc_number = "'+detailList.acc_number+'", suffix = "'+detailList.suffix+'", is_active = 1, updated_by = "'+that.updated_by+'" where customer_id = "'+ that.customer_id +'"', function (error, rows, fields) {
          if (!error) {
            resolve(rows);
          } else {
            console.log("Error...", error);
            reject(error);
          }
        });
      }
      connection.release();
      console.log('Bank Detail Updated for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};


Customer.prototype.getSingleCustomer = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('select c.id, c.first_name, c.last_name, c.address, c.city, c.suburb, c.postcode, c.telephone, c.mobile, c.email, c.gender, c.is_working, c.dob, c.id_type, c.other_id_type, c.id_number, c.expiry_date, c.is_adult, c.id_proof, c.alt_c1_name, c.alt_c1_address, c.alt_c1_contact, c.alt_c1_relation, c.alt_c2_name, c.alt_c2_address, c.alt_c2_contact, c.alt_c2_relation, c.is_active, c.state, c.created_by, u.name AS created_by_name, ci.employer_name, ci.employer_address, ci.employer_telephone, ci.employer_email, ci.employer_tenure from customer as c inner join customer_income as ci on c.id = ci.cust_id INNER JOIN user as u on c.created_by = u.id WHERE c.id = "' + that.customer_id + '"',
          function (error, rows, fields) {
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
      console.log('Customer Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};

Customer.prototype.postComment = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        const Values = [
          [that.customer_id, that.created_by, that.comment, 1]
        ]
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('INSERT INTO comment_on_customer(customer_id, created_by, comment, is_active) VALUES ?', [Values], function (error, rows, fields) {
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
      console.log('Customer Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};

Customer.prototype.commentList = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {

        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('SET @@session.time_zone="+12:00";', function (error, rows, fields) {
          if(error) reject(error);

          connection.query('select c.customer_id, c.created_by, u.name as created_by_name, c.comment, c.is_active, DATE_FORMAT(c.created_at, \'%W %d %M %Y %H:%i:%s\') created_at from comment_on_customer as c inner join user as u on u.id = c.created_by where customer_id = "' + that.customer_id + '" order by c.id desc', function (error, rows, fields) {
            if (!error) {
              resolve(rows);
            } else {
              console.log("Error...", error);
              reject(error);
            }
  
          })
        });
       
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


Customer.prototype.getCustomerBankDetail = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
          connection.query('select id, customer_id, acc_holder_name, institution_name, bank_branch, bank_address, bank_code, branch_number, acc_number, suffix, is_active, status, created_by, created_at from customer_bank_detail where customer_id = "' + that.customer_id + '"', function (error, rows, fields) {
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
    });
  }).catch((error) => {
    throw error;
  });
};

Customer.prototype.verifyEmail = function (email, id, createdBy) {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }

      let values = [id, 1];

      if (createdBy.split('_').length > 2) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], createdBy.split('_')[1]) });
      } else {
        reject(new Error("Created by is not valid"));
      }

      connection.query('Select first_name, last_name, email from customer where id = ? and is_active = ?', values, function (error, rows, fields) {
        if (!error) {
          console.log("Error...", error);

          resolve(rows);
        } else {
          console.log("Error...", error);
          reject(error)
        }

        connection.release();
        console.log('Process Complete %d', connection.threadId);
      });
    });
  });
};

Customer.prototype.updateStatus = function (id, name) {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }

      const values = [id];

      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], name.split('_')[1]) });
        connection.query('UPDATE customer set is_verified = 1 WHERE id = ?', values, function (error, rows, fields) {
          if (!error) {
            resolve(rows);
          } else {
            console.log("Error...", error);
            reject(error)
          }
        });
      } else {
        console.log("Error...", error);
        reject(error)
      }

      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};



// Customer.prototype.isDuplicateEmail = function () {
//   const that = this;
//   return new Promise(function (resolve, reject) {
//     connection.getConnection(function (error, connection) {
//       if (error) {
//         throw error;
//       }
//       if (!error) {
//         connection.changeUser({ database: dbName.getFullName(dbName["prod"], name.split('_')[1]) });
//         connection.query('SELECT s.email, c.email, ee.employer_email from customer_income as ee JOIN customer as c JOIN staff as s WHERE s.email = "'+ that.email +'" OR c.email = "'+ that.email +'" OR ee.employer_email = "'+ that.email +'"', function (error, rows, fields) {
//           if (error) {
//             console.log("Error...", error);
//             reject(error);
//           }
//           if (!error) {
//               resolve(rows);
//           }
//         });
//       }
//       connection.release();
//       console.log('Process Complete %d', connection.threadId);

//     });
//   });
// }




module.exports = Customer;