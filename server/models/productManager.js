const connection = require('../lib/connection.js');
const dbName = require('../lib/databaseMySQLNew.js');

const ProductManager = function (params) {
  this.user_id = params.user_id;
  this.tabValue = params.tabValue;
  this.productId = params.productId;
  this.productCode = params.productCode;
  this.rentedOrder = params.rentedOrder;
  this.product_state = params.product_state;
  this.orderId  = params.orderId;
  this.customerId = params.customerId;
  this.newState = params.newState;
  this.rowIdInHistory = params.rowIdInHistory;
};



ProductManager.prototype.getAllRelatedRecord = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }
      if (!error) {
          connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
          // SELECT o.id, o.is_active, op.product_id, GROUP_CONCAT(op.order_id) as rented_order, COUNT(op.product_id) as total_rented FROM orders as o INNER JOIN ordered_product as op ON op.order_id = o.id AND op.is_active = 1 AND o.is_active = 1  GROUP BY op.product_id
          // connection.query('select id, GROUP_CONCAT(id) as rented_order,  is_active, CAST(product_id AS UNSIGNED) as product_id, COUNT(product_id) total_rented from (select o.id, o.is_active, SUBSTRING_INDEX(SUBSTRING_INDEX(o.product_id, \',\', numbers.id), \',\', -1) product_id from status_payment as numbers inner join orders as o on CHAR_LENGTH(o.product_id) - CHAR_LENGTH(REPLACE(o.product_id, \',\', \'\')) >= numbers.id-1 ) as t WHERE is_active = 1 GROUP BY product_id ORDER BY product_id', function (error, rows, fields) {
            connection.query('SELECT op.product_id, GROUP_CONCAT(op.order_id) as rented_order, COUNT(op.product_id) as total_rented FROM orders as o INNER JOIN ordered_product as op ON op.order_id = o.id AND op.is_active = 1 AND o.is_active = 1  GROUP BY op.product_id', function (error, rows, fields) {
            if(error) {  console.log('Error...', error); reject(error); }
                if(!error){
                  
                  let productIdList = Object.values(rows).map(data => {return data.product_id})                  
                  if(productIdList.length  === 0){ productIdList= ''}
                  
                  connection.changeUser({database : dbName["prod"] });
                  connection.query('select * from product where id IN(?)', [productIdList], function (error, productList, fields) {
                    if(error) {  console.log('Error...', error); reject(error); }
                    resolve({productList: productList, orderedProduct: rows});
                  });
                }
          });
        }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};



ProductManager.prototype.getStateRelatedRecord = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }
      if (!error) {
          connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
          
                        
          // connection.query('select p.product_id, COUNT(p.product_id) as total_rented, p.is_active from (select CAST(t.product_id AS UNSIGNED) as product_id, t.is_active from (select o.id, o.is_active, o.order_status, SUBSTRING_INDEX(SUBSTRING_INDEX(o.product_id, \',\', numbers.id), \',\', -1) product_id from status_payment as numbers inner join orders as o on (CHAR_LENGTH(o.product_id) - CHAR_LENGTH(REPLACE(o.product_id, \',\', \'\')) >= numbers.id-1)) as t WHERE t.order_status IN(6,7) GROUP BY t.product_id) as p INNER JOIN delivered_product_detail dpd ON dpd.product_id = p.product_id AND dpd.status = "'+that.tabValue+'" WHERE p.is_active = 1  GROUP BY p.product_id ORDER BY p.product_id', function (error, rows, fields) {
            connection.query('SELECT op.product_id, GROUP_CONCAT(op.order_id) as rented_order, COUNT(op.product_id) as total_rented FROM orders as o LEFT JOIN ordered_product as op ON op.order_id = o.id AND op.is_active = 1 AND o.is_active = 1 WHERE op.status = "'+that.tabValue+'" GROUP BY op.product_id', function (error, rows, fields) {
            if(error) {  console.log('Error...', error); reject(error); }
                if(!error){
                  
                  let productIdList = Object.values(rows).map(data => {return data.product_id})                  
                  if(productIdList.length  === 0){ productIdList= ''}
                  
                  connection.changeUser({database : dbName["prod"] });
                  connection.query('select * from product where id IN(?)', [productIdList], function (error, productList, fields) {
                    if(error) {  console.log('Error...', error); reject(error); }
                    resolve({productList: productList, orderedProduct: rows});
                  });
                }
          });
        }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};



ProductManager.prototype.getRentedOrder = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }
      if (!error) {
          connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
          // SELECT o.id, o.order_id, o.ezidebit_uid, c.id as customer_id, c.first_name, c.last_name, c.address, c.suburb, c.mobile, c.telephone, o.customer_type,  DATE_FORMAT(o.order_date, '%Y-%m-%d') order_date, o.sales_type_id as sales_type, o.renting_for_id as renting_for, o.order_status, o.assigned_to, o.order_type,  CASE o.order_type WHEN 1 THEN 'Fix Order' ELSE 'Flex Order' END as 'order_type_name', o.payment_mode, o.product_id, o.product_related_to, o.order_type_id, o.doc_upload_status, o.is_active, o.delivery_doc_uploaded, DATE_FORMAT(o.delivered_date, '%Y-%m-%d') delivered_date, o.delivered_time, DATE_FORMAT(o.delivery_date, '%Y-%m-%d') delivery_date, o.delivery_time, o.budget_id, o.refund_amt, o.cancel_reason, os.order_status as order_status_name, d.document as uploaded_doc, pm.payment_mode as 'payment_mode_name',  stl.sales_type_name, o.sales_person_id, u.name as sales_person_name, ddoc.document as delivery_document, dpd.status as product_status, p_status.state_name as product_state from orders as o INNER join customer as c on o.customer_id = c.id LEFT JOIN order_status as os on o.order_status = os.id LEFT JOIN payment_mode as pm on o.payment_mode = pm.id LEFT JOIN order_document as d on o.id = d.order_id LEFT JOIN sales_type_list as stl ON o.sales_type_id = stl.id LEFT JOIN user as u ON o.sales_person_id = u.id LEFT JOIN delivery_document as ddoc ON ddoc.order_id = o.id LEFT JOIN delivered_product_detail as dpd ON o.id = dpd.order_id AND o.customer_id = dpd.customer_id LEFT JOIN product_state as p_status ON dpd.status = p_status.id  WHERE o.order_status IN(6,7) AND o.product_id LIKE "%4%" AND dpd.status = "6" AND o.is_active = 1 AND dpd.product_id = 4 ORDER BY o.id DESC
            // SELECT o.id, o.order_id, o.ezidebit_uid, c.id as customer_id, c.first_name, c.last_name, c.address, c.suburb, c.mobile, c.telephone, o.customer_type,  DATE_FORMAT(o.order_date, '%Y-%m-%d') order_date, o.sales_type_id as sales_type, o.renting_for_id as renting_for, o.order_status, o.assigned_to, o.order_type,  CASE o.order_type WHEN 1 THEN 'Fix Order' ELSE 'Flex Order' END as 'order_type_name', o.payment_mode, o.product_id, o.product_related_to, o.order_type_id, o.doc_upload_status, o.is_active, o.delivery_doc_uploaded, DATE_FORMAT(o.delivered_date, '%Y-%m-%d') delivered_date, o.delivered_time, DATE_FORMAT(o.delivery_date, '%Y-%m-%d') delivery_date, o.delivery_time, o.budget_id, o.refund_amt, o.cancel_reason, os.order_status as order_status_name, d.document as uploaded_doc, pm.payment_mode as 'payment_mode_name',  stl.sales_type_name, o.sales_person_id, u.name as sales_person_name, ddoc.document as delivery_document, dpd.status as product_status, p_status.state_name as product_state from orders as o INNER join customer as c on o.customer_id = c.id LEFT JOIN order_status as os on o.order_status = os.id LEFT JOIN payment_mode as pm on o.payment_mode = pm.id LEFT JOIN order_document as d on o.id = d.order_id LEFT JOIN sales_type_list as stl ON o.sales_type_id = stl.id LEFT JOIN user as u ON o.sales_person_id = u.id LEFT JOIN delivery_document as ddoc ON ddoc.order_id = o.id LEFT JOIN delivered_product_detail as dpd ON o.product_id = dpd.product_id AND o.id = dpd.order_id LEFT JOIN product_state as p_status ON dpd.status = p_status.id  WHERE  o.product_id LIKE "%'+that.productId+'%"  AND o.is_active = 1 ORDER BY o.id DESC
            // SELECT o.id, o.order_id, o.ezidebit_uid, c.id as customer_id, c.first_name, c.last_name, c.address, c.suburb, c.mobile, c.telephone, o.customer_type,  DATE_FORMAT(o.order_date, '%Y-%m-%d') order_date, o.sales_type_id as sales_type, o.renting_for_id as renting_for, o.order_status, o.assigned_to, o.order_type,  CASE o.order_type WHEN 1 THEN 'Fix Order' ELSE 'Flex Order' END as 'order_type_name', o.payment_mode, o.order_type_id, o.doc_upload_status, o.is_active, o.delivery_doc_uploaded, DATE_FORMAT(o.delivered_date, '%Y-%m-%d') delivered_date, o.delivered_time, DATE_FORMAT(o.delivery_date, '%Y-%m-%d') delivery_date, o.delivery_time, o.budget_id, o.refund_amt, o.cancel_reason, os.order_status as order_status_name, d.document as uploaded_doc, pm.payment_mode as 'payment_mode_name', stl.sales_type_name, o.sales_person_id, u.name as sales_person_name, GROUP_CONCAT(op.product_id) as product_id, op.status as product_status, sr.status_name as product_status_name, ddoc.document as delivery_document from orders as o INNER join customer as c on o.customer_id = c.id LEFT JOIN order_status as os on o.order_status = os.id LEFT JOIN payment_mode as pm on o.payment_mode = pm.id LEFT JOIN order_document as d on o.id = d.order_id LEFT JOIN sales_type_list as stl ON o.sales_type_id = stl.id LEFT JOIN user as u ON o.sales_person_id = u.id LEFT JOIN ordered_product as op ON o.id = op.order_id AND op.is_active = 1 LEFT JOIN delivery_document as ddoc ON ddoc.order_id = o.id  LEFT JOIN status_record as sr ON sr.status_id = op.status AND sr.status_role = 'product_state'  WHERE o.is_active = 1  GROUP BY op.order_id  HAVING INSTR(product_id, 3) > 0 ORDER BY o.id DESC
            if(that.tabValue === 0) {
              connection.query('SELECT o.id, o.order_id, o.ezidebit_uid, c.id as customer_id, c.first_name, c.last_name, c.address, c.suburb, c.mobile, c.telephone, o.customer_type,  DATE_FORMAT(o.order_date, \'%Y-%m-%d\') order_date, o.sales_type_id as sales_type, o.renting_for_id as renting_for, o.order_status, o.assigned_to, o.order_type,  CASE o.order_type WHEN 1 THEN \'Fix Order\' ELSE \'Flex Order\' END as \'order_type_name\', o.payment_mode, o.order_type_id, o.doc_upload_status, o.is_active, o.delivery_doc_uploaded, DATE_FORMAT(o.delivered_date, \'%Y-%m-%d\') delivered_date, o.delivered_time, DATE_FORMAT(o.delivery_date, \'%Y-%m-%d\') delivery_date, o.delivery_time, o.budget_id, o.refund_amt, o.cancel_reason, os.order_status as order_status_name, d.document as uploaded_doc, pm.payment_mode as \'payment_mode_name\', stl.sales_type_name, o.sales_person_id, u.name as sales_person_name, GROUP_CONCAT(op.product_id) as product_id, op.status as product_status, sr.status_name as product_status_name, COUNT(CASE op.product_id WHEN "'+that.productId+'" then 1 ELSE null END) as product_quantity, ddoc.document as delivery_document from orders as o INNER join customer as c on o.customer_id = c.id LEFT JOIN order_status as os on o.order_status = os.id LEFT JOIN payment_mode as pm on o.payment_mode = pm.id LEFT JOIN order_document as d on o.id = d.order_id LEFT JOIN sales_type_list as stl ON o.sales_type_id = stl.id LEFT JOIN user as u ON o.sales_person_id = u.id LEFT JOIN ordered_product as op ON o.id = op.order_id AND op.is_active = 1 LEFT JOIN delivery_document as ddoc ON ddoc.order_id = o.id  LEFT JOIN status_record as sr ON sr.status_id = op.status AND sr.status_role = \'product_state\'  WHERE o.is_active = 1  GROUP BY op.order_id  HAVING INSTR(product_id, "' + that.productId + '") > 0 ORDER BY o.id DESC', function (error, rows, fields) {
              if(error) {  console.log('Error...', error); reject(error); }
                  if(!error){
                    resolve(rows)
                  }
              });
            }else{
              // connection.query('SELECT o.id, o.order_id, o.ezidebit_uid, c.id as customer_id, c.first_name, c.last_name, c.address, c.suburb, c.mobile, c.telephone, o.customer_type,  DATE_FORMAT(o.order_date, \'%Y-%m-%d\') order_date, o.sales_type_id as sales_type, o.renting_for_id as renting_for, o.order_status, o.assigned_to, o.order_type,  CASE o.order_type WHEN 1 THEN \'Fix Order\' ELSE \'Flex Order\' END as \'order_type_name\', o.payment_mode, o.product_id, o.product_related_to, o.order_type_id, o.doc_upload_status, o.is_active, o.delivery_doc_uploaded, DATE_FORMAT(o.delivered_date, \'%Y-%m-%d\') delivered_date, o.delivered_time, DATE_FORMAT(o.delivery_date, \'%Y-%m-%d\') delivery_date, o.delivery_time, o.budget_id, o.refund_amt, o.cancel_reason, os.order_status as order_status_name, d.document as uploaded_doc, pm.payment_mode as \'payment_mode_name\',  stl.sales_type_name, o.sales_person_id, u.name as sales_person_name, ddoc.document as delivery_document, dpd.status as product_status, p_status.state_name as product_state from orders as o INNER join customer as c on o.customer_id = c.id LEFT JOIN order_status as os on o.order_status = os.id LEFT JOIN payment_mode as pm on o.payment_mode = pm.id LEFT JOIN order_document as d on o.id = d.order_id LEFT JOIN sales_type_list as stl ON o.sales_type_id = stl.id LEFT JOIN user as u ON o.sales_person_id = u.id LEFT JOIN delivery_document as ddoc ON ddoc.order_id = o.id LEFT JOIN delivered_product_detail as dpd ON o.id = dpd.order_id AND o.customer_id = dpd.customer_id LEFT JOIN product_state as p_status ON dpd.status = p_status.id  WHERE o.order_status IN(6,7) AND o.product_id LIKE "%'+that.productId+'%" AND dpd.product_id LIKE "%'+that.productId+'%" AND dpd.status = "'+that.tabValue+'" AND o.is_active = 1 ORDER BY o.id DESC', function (error, rows, fields) {
                // SELECT o.id, o.order_id, o.ezidebit_uid, c.id as customer_id, c.first_name, c.last_name, c.address, c.suburb, c.mobile, c.telephone, o.customer_type,  DATE_FORMAT(o.order_date, '%Y-%m-%d') order_date, o.sales_type_id as sales_type, o.renting_for_id as renting_for, o.order_status, o.assigned_to, o.order_type,  CASE o.order_type WHEN 1 THEN 'Fix Order' ELSE 'Flex Order' END as 'order_type_name', o.payment_mode, o.order_type_id, o.doc_upload_status, o.is_active, o.delivery_doc_uploaded, DATE_FORMAT(o.delivered_date, '%Y-%m-%d') delivered_date, o.delivered_time, DATE_FORMAT(o.delivery_date, '%Y-%m-%d') delivery_date, o.delivery_time, o.budget_id, o.refund_amt, o.cancel_reason, os.order_status as order_status_name, d.document as uploaded_doc, pm.payment_mode as 'payment_mode_name', stl.sales_type_name, o.sales_person_id, u.name as sales_person_name, GROUP_CONCAT(op.product_id) as product_id, op.status as product_status, sr.status_name as product_status_name, COUNT(CASE op.product_id WHEN  "'+that.productId+'" THEN 1 ELSE null END) as product_quantity, ddoc.document as delivery_document from orders as o INNER join customer as c on o.customer_id = c.id LEFT JOIN order_status as os on o.order_status = os.id LEFT JOIN payment_mode as pm on o.payment_mode = pm.id LEFT JOIN order_document as d on o.id = d.order_id LEFT JOIN sales_type_list as stl ON o.sales_type_id = stl.id LEFT JOIN user as u ON o.sales_person_id = u.id LEFT JOIN ordered_product as op ON o.id = op.order_id AND op.is_active = 1 LEFT JOIN delivery_document as ddoc ON ddoc.order_id = o.id  LEFT JOIN status_record as sr ON sr.status_id = op.status AND sr.status_role = 'product_state'  WHERE o.is_active = 1 AND op.status = "'+ that.tabValue +'" GROUP BY op.order_id  HAVING INSTR(product_id, "' + that.productId + '") > 0 ORDER BY o.id DESC
                connection.query('SELECT t.*, GROUP_CONCAT(op.product_id) as product_id FROM (SELECT o.id, o.order_id, o.ezidebit_uid, c.id as customer_id, c.first_name, c.last_name, c.address, c.suburb, c.mobile, c.telephone, o.customer_type,  DATE_FORMAT(o.order_date, \'%Y-%m-%d\') order_date, o.sales_type_id as sales_type, o.renting_for_id as renting_for, o.order_status, o.assigned_to, o.order_type,  CASE o.order_type WHEN 1 THEN \'Fix Order\' ELSE \'Flex Order\' END as \'order_type_name\', o.payment_mode, o.order_type_id, o.doc_upload_status, o.is_active, o.delivery_doc_uploaded, DATE_FORMAT(o.delivered_date, \'%Y-%m-%d\') delivered_date, o.delivered_time, DATE_FORMAT(o.delivery_date, \'%Y-%m-%d\') delivery_date, o.delivery_time, o.budget_id, o.refund_amt, o.cancel_reason, os.order_status as order_status_name, d.document as uploaded_doc, pm.payment_mode as \'payment_mode_name\', stl.sales_type_name, o.sales_person_id, u.name as sales_person_name, GROUP_CONCAT(op.product_id) as product_id, op.status as product_status, sr.status_name as product_status_name, COUNT(CASE op.product_id WHEN  "'+that.productId+'" THEN 1 ELSE null END) as product_quantity, ddoc.document as delivery_document from orders as o INNER join customer as c on o.customer_id = c.id LEFT JOIN order_status as os on o.order_status = os.id LEFT JOIN payment_mode as pm on o.payment_mode = pm.id LEFT JOIN order_document as d on o.id = d.order_id LEFT JOIN sales_type_list as stl ON o.sales_type_id = stl.id LEFT JOIN user as u ON o.sales_person_id = u.id LEFT JOIN ordered_product as op ON o.id = op.order_id AND op.is_active = 1 LEFT JOIN delivery_document as ddoc ON ddoc.order_id = o.id  LEFT JOIN status_record as sr ON sr.status_id = op.status AND sr.status_role = \'product_state\'  WHERE o.is_active = 1 AND op.status = "'+ that.tabValue +'" GROUP BY op.order_id  HAVING INSTR(product_id, "' + that.productId + '") > 0 ORDER BY o.id DESC) as t  INNER JOIN ordered_product as op ON t.id = op.order_id AND op.is_active GROUP BY op.order_id ORDER BY t.id DESC', function (error, rows, fields) {
              if(error) {  console.log('Error...', error); reject(error); }
                  if(!error){
                    resolve(rows)
                  }
              });
            }            
        }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};



ProductManager.prototype.changeProductState = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }
      if (!error) {
          connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
          connection.query('UPDATE `ordered_product` SET status = ? WHERE order_id = ? AND product_id = ? AND product_code = ? AND is_active = ?',[that.newState, that.orderId, that.productId, that.productCode, 1], function (error, rows, fields) {
            if(error) {  console.log('Error...', error); reject(error); }
                if(!error){
                  resolve(rows)
                }
          });
        }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};



ProductManager.prototype.countStateRecord = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }
      if (!error) {
          connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
          connection.query('SELECT COUNT(t.product_id) as `all`, COUNT(CASE WHEN (locate(\'1\', t.status) > 0) THEN 1 ELSE NULL END) as ordered, COUNT(CASE WHEN (locate(\'2\', t.status) > 0) THEN 1 ELSE NULL END) as with_customer, COUNT(CASE WHEN (locate(\'3\', t.status) > 0) THEN 1 ELSE NULL END) as under_repair, COUNT(CASE WHEN (locate(\'4\', t.status) > 0) THEN 1 ELSE NULL END) as replaced, COUNT(CASE WHEN (locate(\'5\', t.status) > 0) THEN 1 ELSE NULL END) as faulty_with_customer, COUNT(CASE WHEN (locate(\'6\', t.status) > 0) THEN 1 ELSE NULL END) as faulty_under_repair FROM (SELECT op.product_id, GROUP_CONCAT(op.status) as `status` FROM orders as o LEFT JOIN ordered_product as op ON op.order_id = o.id AND op.is_active = 1 AND o.is_active = 1 GROUP BY op.product_id ) as t', function (error, rows, fields) {
            if(error) {  console.log('Error...', error); reject(error); }
                if(!error){
                  resolve(rows)
                }
          });
        }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};



ProductManager.prototype.getCommonProductForOrder = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }
      if (!error) {
          connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
          connection.query('SELECT * FROM `ordered_product` WHERE order_id = "'+that.orderId+'" AND product_id = "'+that.productId+'" AND status = "'+that.tabValue+'" AND is_active = 1', function (error, rows, fields) {
            if(error) {  console.log('Error...', error); reject(error); }
                if(!error){
                  resolve(rows)
                }
          });
        }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};


module.exports = ProductManager;
