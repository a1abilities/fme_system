const connection = require('../lib/connection.js');
const dbName = require('../lib/databaseMySQLNew.js');

const Report = function (params) {
  this.customer_name = params.customer_name;
  this.customer_id = params.customer_id;
  this.customer_contact = params.customer_contact;
  this.order_id = params.order_id;
  this.from_date = params.from_date;
  this.to_date = params.to_date;
  this.today_date = params.today_date;
  this.user_id = params.user_id;
  this.required_type = params.required_type;
};

Report.prototype.getFinanceReport = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }
      if (!error) {
          connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
          connection.query('select c.id, c.first_name, c.last_name, c.address, c.city, c.postcode, c.telephone, c.mobile, c.email, c.gender, c.is_working, c.dob, c.id_type, c.other_id_type, c.id_number, c.expiry_date, c.is_adult, c.id_proof, c.alt_c1_name, c.alt_c1_address, c.alt_c1_contact, c.alt_c1_relation, c.alt_c2_name, c.alt_c2_address, c.alt_c2_contact, c.alt_c2_relation, c.is_active, c.state, c.created_by, u.name AS created_by_name, ci.employer_name, ci.employer_address, ci.employer_telephone, ci.employer_email, ci.employer_tenure from customer as c inner join customer_income as ci on c.id = ci.cust_id INNER JOIN user as u on c.created_by = u.id WHERE c.id = "'+that.customer_id+'" OR c.first_name = "'+that.customer_name+'" OR c.last_name = "'+that.customer_name+'" OR c.mobile = "'+that.customer_contact+'"', function (error, rows, fields) {
            if (!error && rows != "") {
              let cust_id = rows[0].id;
              // connection.query('SELECT o.id, o.order_id, c.id as customer_id, c.first_name, c.last_name, c.address, c.mobile, c.telephone, o.customer_type,  DATE_FORMAT(o.order_date, \'%Y-%m-%d\') order_date, o.order_status, o.assigned_to, o.order_type, o.payment_mode, o.product_id, o.product_related_to, o.order_type_id, o.doc_upload_status, o.delivery_doc_uploaded, DATE_FORMAT(o.delivered_date, \'%Y-%m-%d\') delivered_date, DATE_FORMAT(o.delivered_time, \'%T\') delivered_time, DATE_FORMAT(o.delivery_date, \'%Y-%m-%d\') delivery_date, DATE_FORMAT(o.delivery_time, \'%T\') delivery_time, o.budget_id, os.order_status as order_status_name, d.document as uploaded_doc from orders as o inner join customer as c on o.customer_id = c.id INNER JOIN order_status as os on o.order_status = os.id LEFT JOIN order_document as d on o.id = d.order_id WHERE o.is_active = 1 AND o.customer_id ="'+cust_id+'" ORDER BY o.id DESC', function (error, orderRows, fields) {
              connection.query('SELECT o.id, o.order_id, o.ezidebit_uid, c.id as customer_id, c.first_name, c.last_name, c.address, c.suburb, c.mobile, c.telephone, o.customer_type,  DATE_FORMAT(o.order_date, \'%Y-%m-%d\') order_date, o.sales_type_id as sales_type, o.renting_for_id as renting_for, o.order_status, o.assigned_to, o.order_type,  CASE o.order_type WHEN 1 THEN \'Fix Order\' ELSE \'Flex Order\' END as \'order_type_name\', o.payment_mode, o.order_type_id, o.doc_upload_status, o.is_active, o.delivery_doc_uploaded, DATE_FORMAT(o.delivered_date, \'%Y-%m-%d\') delivered_date, o.delivered_time, DATE_FORMAT(o.delivery_date, \'%Y-%m-%d\') delivery_date, o.delivery_time, o.budget_id, o.refund_amt, o.cancel_reason, os.order_status as order_status_name, d.document as uploaded_doc, pm.payment_mode as \'payment_mode_name\', stl.sales_type_name, o.sales_person_id, u.name as sales_person_name, GROUP_CONCAT(op.product_id) as product_id  from orders as o INNER JOIN customer as c on o.customer_id = c.id LEFT JOIN order_status as os on o.order_status = os.id LEFT JOIN payment_mode as pm on o.payment_mode = pm.id LEFT JOIN order_document as d on o.id = d.order_id LEFT JOIN sales_type_list as stl ON o.sales_type_id = stl.id LEFT JOIN user as u ON o.sales_person_id = u.id LEFT JOIN ordered_product as op ON o.id = op.order_id AND op.is_active = 1 WHERE o.is_active = 1 AND o.customer_id ="'+cust_id+'" GROUP BY op.order_id ORDER BY o.id DESC',function (error, orderRows, fields) {
                if (!error && rows != "") {
                  resolve({customerData: rows, OrderData: orderRows, isAvailable: 1});
                } else {
                  console.log("Error...", error);
                  resolve({customerData: rows, OrderData: [], isAvailable: 1});
                  // reject(error);
                }
              });
            } else {
              console.log("Error...", error);
              resolve({customerData: [], OrderData: [], isAvailable: 0});
            }
          });
        }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};


Report.prototype.getOrderReport = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }
      if (!error) {
          connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
          // connection.query('select p.id, p.order_id, p.customer_id, p.installment_no, DATE_FORMAT(p.payment_date,\'%Y-%m-%d\') payment_date, DATE_FORMAT(p.payment_rec_date,\'%Y-%m-%d\') payment_rec_date, p.payment_amt, p.total_paid, p.status, p.is_active, CASE p.status WHEN 1 THEN \'Paid\' WHEN 2 THEN \'Disownered Paid\' END as status_name from payment_status as p WHERE p.order_id = "'+that.order_id+'" AND p.customer_id = "'+that.customer_id+'" AND DATE_FORMAT(p.payment_rec_date, \'%Y-%m-%d\') BETWEEN  DATE_FORMAT("'+that.from_date+'",\'%Y-%m-%d\') AND DATE_FORMAT("'+that.to_date+'" ,\'%Y-%m-%d\')', function (error, rows, fields) {             
            connection.query('SELECT ps.id, ps.order_id, ps.customer_id, ps.installment_no, DATE_FORMAT(ps.payment_date,\'%Y-%m-%d\') payment_date, DATE_FORMAT(ps.settlement_date,\'%Y-%m-%d\') settlement_date, ps.payment_amt, ps.total_paid, ps.remark, ps.status, sp.status as status_name, ps.is_active FROM payment_schedules as ps LEFT JOIN status_payment as sp ON ps.status = sp.id WHERE ps.order_id = "'+that.order_id+'" AND ps.customer_id = "'+that.customer_id+'" AND DATE_FORMAT(ps.settlement_date, \'%Y-%m-%d\') BETWEEN  DATE_FORMAT("'+that.from_date+'",\'%Y-%m-%d\') AND DATE_FORMAT("'+that.to_date+'" ,\'%Y-%m-%d\')', function (error, rows, fields) {
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
};



Report.prototype.getDeliveryReport = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }
      if (!error) {        
        connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
        if(that.required_type===2){
          // query = 'SELECT o.id, o.order_id, c.id as customer_id, c.customer_name, c.address, c.mobile, c.telephone, o.customer_type,  DATE_FORMAT(o.order_date, \'%Y-%m-%d\') order_date, o.order_status, o.assigned_to, o.order_type, o.payment_mode, o.product_id, o.product_related_to, o.order_type_id, o.doc_upload_status, o.delivery_doc_uploaded, DATE_FORMAT(o.delivered_date, \'%Y-%m-%d\') delivered_date, DATE_FORMAT(o.delivered_time, \'%h:%i:%p\') delivered_time, DATE_FORMAT(o.delivery_date, \'%Y-%m-%d\') delivery_date, DATE_FORMAT(o.delivery_time, \'%h:%i:%p\') delivery_time, o.budget_id, os.order_status as order_status_name, d.document as uploaded_doc from orders as o inner join customer as c on o.customer_id = c.id INNER JOIN order_status as os on o.order_status = os.id LEFT JOIN order_document as d on o.id = d.order_id WHERE o.is_active = 1 AND o.order_status IN(4,5) AND DATE_FORMAT(o.delivery_date, \'%Y-%m-%d\') BETWEEN  DATE_FORMAT("'+that.from_date+'", \'%Y-%m-%d\') AND DATE_FORMAT("'+that.to_date+'" ,\'%Y-%m-%d\') ORDER BY o.delivery_date, o.delivery_time';          
          // connection.query('SELECT o.id, o.order_id, c.id as customer_id, c.customer_name, c.address, c.mobile, c.telephone, o.customer_type,  DATE_FORMAT(o.order_date, \'%Y-%m-%d\') order_date, o.order_status, o.assigned_to, o.order_type, o.payment_mode, o.product_id, o.product_related_to, o.order_type_id, o.doc_upload_status, o.delivery_doc_uploaded, DATE_FORMAT(o.delivered_date, \'%Y-%m-%d\') delivered_date, DATE_FORMAT(o.delivered_time, \'%T\') delivered_time, DATE_FORMAT(o.delivery_date, \'%Y-%m-%d\') delivery_date, DATE_FORMAT(o.delivery_time, \'%T\') delivery_time, o.budget_id, os.order_status as order_status_name, d.document as uploaded_doc from orders as o inner join customer as c on o.customer_id = c.id INNER JOIN order_status as os on o.order_status = os.id LEFT JOIN order_document as d on o.id = d.order_id WHERE o.is_active = 1 AND o.order_status = 4 AND DATE_FORMAT(o.order_date, \'%Y-%m-%d\') BETWEEN  DATE_FORMAT("'+that.from_date+'", \'%Y-%m-%d\') AND DATE_FORMAT("'+that.to_date+'" ,\'%Y-%m-%d\') ORDER BY o.delivery_date DESC, o.delivery_time', function (error, rows, fields) {
          // connection.query(query, function (error, rows, fields) {
          connection.query('SELECT o.id, o.order_id, o.ezidebit_uid, c.id as customer_id, c.first_name, c.last_name, c.address, c.suburb, c.mobile, c.telephone, o.customer_type,  DATE_FORMAT(o.order_date, \'%Y-%m-%d\') order_date, o.sales_type_id as sales_type, o.renting_for_id as renting_for, o.order_status, o.assigned_to, o.order_type,  CASE o.order_type WHEN 1 THEN \'Fix Order\' ELSE \'Flex Order\' END as \'order_type_name\', o.payment_mode, o.order_type_id, o.doc_upload_status, o.is_active, o.delivery_doc_uploaded, DATE_FORMAT(o.delivered_date, \'%Y-%m-%d\') delivered_date, o.delivered_time, DATE_FORMAT(o.delivery_date, \'%Y-%m-%d\') delivery_date, o.delivery_time, o.budget_id, o.refund_amt, o.cancel_reason, os.order_status as order_status_name, d.document as uploaded_doc, pm.payment_mode as \'payment_mode_name\', stl.sales_type_name, o.sales_person_id, u.name as sales_person_name, GROUP_CONCAT(op.product_id) as product_id  from orders as o INNER JOIN customer as c on o.customer_id = c.id LEFT JOIN order_status as os on o.order_status = os.id LEFT JOIN payment_mode as pm on o.payment_mode = pm.id LEFT JOIN order_document as d on o.id = d.order_id LEFT JOIN sales_type_list as stl ON o.sales_type_id = stl.id LEFT JOIN user as u ON o.sales_person_id = u.id LEFT JOIN ordered_product as op ON o.id = op.order_id AND op.is_active = 1 WHERE o.is_active = 1 AND o.order_status IN(4,5) AND DATE_FORMAT(o.delivery_date, \'%Y-%m-%d\') BETWEEN  DATE_FORMAT("'+that.from_date+'", \'%Y-%m-%d\') AND DATE_FORMAT("'+that.to_date+'" ,\'%Y-%m-%d\') GROUP BY op.order_id ORDER BY o.delivery_date, o.delivery_time',function (error, rows, fields) {
            if (!error && rows != "") {
              resolve({ orderData: rows, isAvailable: 1});              
            } else {
              resolve({orderData: [], isAvailable: 0});
              reject(error);
            }
          });
          }
        }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};



Report.prototype.getTaskReport = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }
      if (!error) {
          connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
        
          connection.query('select t.id, t.task_id, ta.id as activity_id, t.task_description, t.is_active, t.created_by as task_created_by, t.creator_role, DATE_FORMAT(t.created_at, \'%W %d %M %Y %H:%i:%s\')  task_created_at, ta.assign_to, ta.assign_to_role as assign_to_role_id, ta.description as activity_description, ta.activity_status,  DATE_FORMAT(ta.due_date,\'%Y-%m-%d\') due_date, DATE_FORMAT(ta.start_date,\'%Y-%m-%d\') start_date, DATE_FORMAT(ta.completed_date,\'%Y-%m-%d\') completed_date, DATE_FORMAT(ta.reschedule_req_date,\'%Y-%m-%d\') reschedule_req_date, DATE_FORMAT(ta.last_due_date,\'%Y-%m-%d\') last_due_date, ta.message_id, ta.document_id, ta.status, ta.created_by as activity_created_by, DATE_FORMAT(ta.created_at, \'%W %d %M %Y %H:%i:%s\') activity_created_at, u.name as task_created_by_name, ua.name as assign_to_name, case r.name when "Admin" then "Director" else r.name END as assign_to_role_name, ts.status as task_status_name,  m.message from task as t INNER JOIN task_activity ta on t.id = ta.task_id INNER JOIN user as u on t.created_by = u.id INNER JOIN role as r on ta.assign_to_role = r.id INNER JOIN user as ua on ta.assign_to = ua.id INNER JOIN task_status as ts on ta.status = ts.id LEFT JOIN task_message as m on ta.message_id = m.id WHERE ta.is_active = 1  AND  DATE_FORMAT(ta.due_date, \'%Y-%m-%d\') BETWEEN  DATE_FORMAT("'+that.from_date+'",\'%Y-%m-%d\') AND DATE_FORMAT("'+that.to_date+'" ,\'%Y-%m-%d\')  AND ta.status NOT IN (6,7) ORDER BY t.id desc', function (error, rows, fields) {
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
};



Report.prototype.getDueTaskReport = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }
      if (!error) {
          connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
        
          connection.query('select t.id, t.task_id, ta.id as activity_id, t.task_description, t.is_active, t.created_by as task_created_by, t.creator_role, DATE_FORMAT(t.created_at, \'%W %d %M %Y %H:%i:%s\')  task_created_at, ta.assign_to, ta.assign_to_role as assign_to_role_id, ta.description as activity_description, ta.activity_status,  DATE_FORMAT(ta.due_date,\'%Y-%m-%d\') due_date, DATE_FORMAT(ta.start_date,\'%Y-%m-%d\') start_date, DATE_FORMAT(ta.completed_date,\'%Y-%m-%d\') completed_date, DATE_FORMAT(ta.reschedule_req_date,\'%Y-%m-%d\') reschedule_req_date, DATE_FORMAT(ta.last_due_date,\'%Y-%m-%d\') last_due_date, ta.message_id, ta.document_id, ta.status, ta.created_by as activity_created_by, DATE_FORMAT(ta.created_at, \'%W %d %M %Y %H:%i:%s\') activity_created_at, u.name as task_created_by_name, ua.name as assign_to_name, case r.name when "Admin" then "Director" else r.name END as assign_to_role_name, ts.status as task_status_name,  m.message from task as t INNER JOIN task_activity ta on t.id = ta.task_id INNER JOIN user as u on t.created_by = u.id INNER JOIN role as r on ta.assign_to_role = r.id INNER JOIN user as ua on ta.assign_to = ua.id INNER JOIN task_status as ts on ta.status = ts.id LEFT JOIN task_message as m on ta.message_id = m.id WHERE ta.is_active = 1  AND  (DATE_FORMAT(ta.due_date, \'%Y-%m-%d\') <  DATE_FORMAT("'+that.today_date+'",\'%Y-%m-%d\'))  AND ta.status NOT IN (6,7) ORDER BY t.id desc', function (error, rows, fields) {
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
};
module.exports = Report;
