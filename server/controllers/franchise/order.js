const fs = require("fs");
const { promisify } = require("util");

const Order = require('../../models/franchise/order.js');
const Customer = require('../../models/franchise/customer.js');
const UploadDocument = require('../../models/franchise/orderDocumentUpload.js');
const addSubtractDate = require("add-subtract-date");
const moment = require('moment');
const {dateMaker} = require('../../utils/PaymentScheduleDateMaker.js');

async function main(path, data) {
  const writeFile = promisify(fs.writeFile);
  await writeFile(path, data, { encoding: 'base64' });
  console.info("file uploaded successfully!");
}



const postOrder = async function (req, res, next) {
  let params = {
    user_id: req.decoded.user_id,
    userid: req.decoded.id,

    order_id: req.body.order_id,
    customer_id: req.body.customer_id,
    customer_type: req.body.customer_type,
    products_id: req.body.products_id,
    order_type: req.body.order_type,
    flexOrderType: req.body.flexOrderType,
    fixedOrderType: req.body.fixedOrderType,
    payment_mode: req.body.payment_mode,
    order_date: req.body.order_date,
    budget_list: req.body.budget_list,
    related_to: req.body.related_to,
    assigned_to: req.body.assigned_to,
    is_active: req.body.is_active,
    created_by: req.decoded.id,
    duration: req.body.duration,
    sales_type_id: req.body.sales_type_id,
    renting_for_id: req.body.renting_for_id,
    sales_person_id: req.body.sales_person_id,

    converted_to: req.body.converted_to,
    ezidebit_uid: req.body.ezidebit_uid,
  };
    try {
      const newOrder = new Order(params);

      let orderTypeResult = [];
        if(params.fixedOrderType!== null){
          orderTypeResult = await newOrder.postFixedOrder();
          newOrder.exp_delivery_date = params.fixedOrderType.exp_delivery_date;
          newOrder.exp_delivery_time = params.fixedOrderType.exp_delivery_time;          
        }else if(params.flexOrderType !== null){
          orderTypeResult = await newOrder.postFlexOrder();
          newOrder.exp_delivery_date = params.flexOrderType.exp_delivery_date;
          newOrder.exp_delivery_time = params.flexOrderType.exp_delivery_time;
        }

      const budgetResult = await newOrder.postBudget();
      newOrder.budget_id = budgetResult.budget_id;
      newOrder.order_type_id = orderTypeResult.order_type_id;
    
      const orderResult = await newOrder.postOrder();
      newOrder.order_id = orderResult.order_id;

      let productRows = [];
      Object.values(params.products_id.split(',')).map(proId => {
        let proCode =  (Math.random().toString().substring(6,9)) + (Date.now().toString().substring(11, 13)) + (Math.random().toString().substring(6,9));
        productRows.push([orderResult.order_id, proId, proCode, 1 , 1, params.created_by]);
      });

      newOrder.orderedProductValue = productRows;
      await newOrder.postOrderedProduct();



      if (req.body.converted_to !== 0) {
        if (req.body.converted_name === 'lead') {
          newOrder.convertedLead(function (res) { });
        } else if (req.body.converted_name === 'enquiry') {
          newOrder.convertedEnquiry(function (res) { });
        }
      }

      if (params.budget_list.budget_note != "" && params.budget_list.budget_note != undefined) {        
        newOrder.comment = params.budget_list.budget_note;
        await newOrder.postBudgetComment();
      }

      // const order = await new Order({ user_id: req.decoded.user_id }).getOrderList();
      // res.send({ order: order });
      res.send({});
    } catch (err) {
      next(err);
    }
};

const editOrder = async function (req, res, next) {
  // console.log('req.order',req.body);
  let params = {
    order_id: req.body.id,
    user_id: req.decoded.user_id,
    products_id: req.body.products_id,
    order_type: req.body.order_type,
    flexOrderType: req.body.flexOrderType,
    fixedOrderType: req.body.fixedOrderType,
    duration: req.body.duration,
    payment_mode: req.body.payment_mode,
    order_date: req.body.order_date,
    budget_list: req.body.budget_list,
    budgetId: req.body.budget_id,
    order_type_id: req.body.order_type_id,
    assigned_to: req.body.assigned_to,
    related_to: req.body.related_to,
    is_active: req.body.is_active,
    updated_by: req.decoded.id,
    sales_type_id: req.body.sales_type_id,
    renting_for_id: req.body.renting_for_id,
    sales_person_id: req.body.sales_person_id,
    ezidebit_uid: req.body.ezidebit_uid,
    order_status: req.body.order_status,
    created_by: req.decoded.id,
};
    try {
      const newOrder = new Order(params);

      if (params.order_status === 11) {
        await new Order({ user_id: req.decoded.user_id, order_id: req.body.id }).regenerateOrder();
      }


      if(params.fixedOrderType!== null){
        await newOrder.editOrderFix();
        newOrder.exp_delivery_date = params.fixedOrderType.exp_delivery_date;
        newOrder.exp_delivery_time = params.fixedOrderType.exp_delivery_time;          
      }else if(params.flexOrderType !== null){
        await newOrder.editOrderFlex();
        newOrder.exp_delivery_date = params.flexOrderType.exp_delivery_date;
        newOrder.exp_delivery_time = params.flexOrderType.exp_delivery_time;
      }

      await newOrder.editOrderBudget();
      await newOrder.editOrder();
      await newOrder.dismissAllProduct();

        let productRows = [];
        Object.values(params.products_id.split(',')).map(proId => {
          let proCode = (Math.random().toString().substring(6,9)) + (Date.now().toString().substring(11, 13)) + (Math.random().toString().substring(6,9));
          productRows.push([params.order_id, proId, proCode, 1 , 1, params.created_by]);
        });
      newOrder.orderedProductValue = productRows;
      await newOrder.postOrderedProduct();
      
      // const order = await new Order({ user_id: req.decoded.user_id }).getOrderList();
      // res.send({ order: order });  
      res.send({});

    } catch (err) {
      next(err);
    } 
};



const uploadDoc = async function (req, res, next) {
  const OrderData = req.body.data; 
  const base64Data = req.body.file.data.split(';base64,').pop();
  const name = req.body.file.name.split('.')[0] + "_" + Date.now() + '.' + req.body.file.name.split('.')[1];
  await main(`./files/order/${name}`, base64Data).catch(error => {
    console.error(error);
    throw (error);
  });

  const orderParams = {
    order_id: OrderData,
    document: name,
    created_by: req.decoded.id,
    user_id: req.decoded.user_id,
  };
  try {
    const newDoc = new UploadDocument(orderParams);

    const result = await newDoc.uploadDoc();
    res.send({});
    // const order = await new Order({ user_id: req.decoded.user_id }).getOrderList();
    // if (result) {
    //   res.send({ order: order, isUploaded: result.isUploaded });
    // } else {
    //   res.send({ order: order, isUploaded: 0 });
    // }
  } catch (err) {
    next(err);
  }
};


const uploadDeliveryDoc = async function (req, res, next) {
  const OrderData = JSON.parse(req.body.data);
  let attachments = '';
  req.files.map((file) => {
    attachments = attachments === '' ? file.filename : (attachments + ',' + file.filename);
  });

  let orderParams = {
    order_id: OrderData,
    document: attachments,
    created_by: req.decoded.id,
    user_id: req.decoded.user_id,
  };
  try {
    const newDoc = new UploadDocument(orderParams);

    const result = await newDoc.uploadDeliveryDoc();
    res.send({});
    // const order = await new Order({ user_id: req.decoded.user_id }).getOrderList();
    // if (result) {
    //   res.send({ order: order, isUploaded: result.isUploaded });
    // } else {
    //   res.send({ order: order, isUploaded: 0 });
    // }
  } catch (err) {
    next(error);
  }
};


const getRequeredOrderList = async function (req, res, next) {
  let params = {
    user_role: req.body.user_role,
    tabValue : req.body.tabValue,
    rowsPerPage : (((Number(req.body.pageNo) + 1 ) * req.body.rowsPerPage)),
    pageOffset : (((Number(req.body.pageNo) + 1 ) * req.body.rowsPerPage) - req.body.rowsPerPage),
    user_id: req.decoded.user_id,
    searchText: req.body.searchText,
  };

  try {
    const models = new Order(params);

    const orderList = await models.getRequeredOrderList();    
    const tabCounts = await models.countTabRecord();

    res.send({ orderList: orderList, tabCounts: tabCounts });
  } catch (err) {
    next(error);
  }
};



const postComment = async function (req, res, next) {
  let commentParams = {
    order_id: req.body.order_id,
    userid: req.body.user_id,
    user_role: req.body.user_role,
    comment: req.body.comment,
    user_id: req.decoded.user_id,
  };
  try {
    console.log(commentParams)
    const newComment = new Order(commentParams);

    const result = await newComment.postComment();    
    if (result) {
      res.send(result);
    } else {
      res.send({ isSucceeded: 0 });
    }
  } catch (err) {
    next(error);
  }
};



const getComment = async function (req, res, next) {

  let commentParams = {
    order_id: req.body.order_id,
    user_id: req.decoded.user_id,
  };
  try {
    const newComment = new Order(commentParams);

    const result = await newComment.getComment();
    res.send(result);
  } catch (err) {
    next(error);
  }
};



const getBudgetComments = async function (req, res, next) {

  let commentParams = {
    customer_id: req.body.customer_id,
    user_id: req.decoded.user_id,
  };
  try {
    const newComment = new Order(commentParams);
    const result = await newComment.getBudgetComments();
    res.send(result);
  } catch (err) {
    next(error);
  }
};


const getnewid = async function (req, res, next) {
  try {
    const id = await new Order({ user_id: req.decoded.user_id }).getnewid();

    res.send(id);
  } catch (error) {
    next(error);
  }
};


const getAll = async function (req, res, next) {
  try {
    const order = await new Order({ user_id: req.decoded.user_id }).getOrderList();
    res.send({ order: order });
  } catch (error) {
    next(error);
  }
};



const getSingleOrderData = async function (req, res, next) {
  try {
    const order = await new Order({ user_id: req.decoded.user_id, order_id: req.body.order_id }).getSingleOrderData();

    res.send(order);
  } catch (error) {
    next(error);
  }
};


const archiveOrder = async function (req, res, next) {
  try {
    const result = await new Order({ user_id: req.decoded.user_id, order_id: req.body.order_id }).archiveOrder();    
    res.send({});    
  } catch (error) {
    next(error);
  }
};




const getBudget = async function (req, res, next) {
  try {
    // console.log('req--',req.body)
    const budget = await new Order({
      user_id: req.decoded.user_id,
      customer_id: req.body.customer_id,
      budgetId: req.body.budgetId
    }).getBudget();

    res.send(budget);
  } catch (error) {
    next(error);
  }
};


const getExistingBudget = async function (req, res, next) {
  try {
    const oldBudget = await new Order({ user_id: req.decoded.user_id, customer_id: req.body.customer_id }).getExistingBudget();
    // console.log('budget List',oldBudget);
    if (oldBudget == "") {
      res.send([{ accomodation: 0, afford_amt: 0, benefits: 0, childcare: 0, credit_card: 0, customer_id: '', expenditure: 0, food: 0, income: 0, is_active: '', loan: 0, mobile: 0, other_expenditure: [], other_income: [], power: 0, rent: 0, surplus: 0, telephone: 0, transport: 0, vehicle: 0, vehicle_fuel: 0, work: 0, }]);
    } else {
      res.send(oldBudget);
    }
  } catch (error) {
    next(error);
  }
};



const getBudgetHistory = async function (req, res, next) {
  try {
    const oldBudget = await new Order({ user_id: req.decoded.user_id, customer_id: req.body.customer_id }).getBudgetHistory();
    res.send(oldBudget);
  } catch (error) {
    next(error);
  }
};




const updateBudget = async function (req, res, next) {
  let orderParams = {
    user_id: req.decoded.user_id,
    customer_id: req.body.customer_id,
    budget_list: req.body.budgetList,
    created_by: req.decoded.id,
  }
  try {
    const newOrder = new Order(orderParams);
    const result = await newOrder.updateBudget();
    if (orderParams.budget_list.budget_note != "" && orderParams.budget_list.budget_note != undefined && result != "") {
      newOrder.budget_id = result.budget_id;
      newOrder.order_id = 0;
      newOrder.comment = orderParams.budget_list.budget_note;
      await newOrder.postBudgetComment();
    }
    if (result != "") {
      res.send({ isUpdated: 1 });
    } else {
      res.send({ isUpdated: 0 });
    }
  } catch (error) {
    next(error);
  }
};


const getFixedOrder = async function (req, res, next) {
  try {
    const order = await new Order({ user_id: req.decoded.user_id, fixedOrderId: req.body.fixedOrderId }).getFixedOrder();
    res.send(order);
  } catch (error) {
    next(error);
  }
};

const getFlexOrder = async function (req, res, next) {
  try {
    const order = await new Order({ user_id: req.decoded.user_id, flexOrderId: req.body.flexOrderId }).getFlexOrder();
    res.send(order);
  } catch (error) {
    next(error);
  }
};

const getPaymentSchedule = async function(req, res, next) {
  try {
    const schedule = await new Order({user_id : req.decoded.user_id, order_id: req.body.order_id }).getPaymentSchedule();
    res.send(schedule);
  } catch (error) {
    next(error);
  }
};


const getRequiredDataToCancel = async function(req, res, next) {
  try {
    const order = await new Order({user_id : req.decoded.user_id, id: req.body.id}).getRequiredDataToCancel();
    // console.log('cancellation data',order);
    res.send(order);
  } catch (error) {
    next(error);
  }
};



const completeNCloseContract = async function(req, res, next) {
  let params = {
    user_id : req.decoded.user_id, 
    updated_by: req.decoded.id,
    order_id : req.body.order_id,
    customer_id: req.body.customer_id,
  }
  const activity = new Order(params);
  try {
    const result = await activity.completeNCloseContract();
    console.log('is completed...',result)
    res.send();
  } catch (error) {
    next(error);
  }
};

const dishonourToPayment = async function(req, res, next) {
  let params = {
    user_id : req.decoded.user_id, 
    created_by: req.decoded.id,

    order_id : req.body.order_id,
    customer_id: req.body.customer_id,
    installment_no : Number(req.body.installment_no),    
    payment_amt : Number(req.body.payment_amt),
    payment_date:  req.body.payment_date,
    settlement_date : req.body.settlement_date,
    remark : req.body.remark,
    order_type : Number(req.body.order_type),
    order_type_id : Number(req.body.order_type_id),    
  } 
  try{
    const dishonoured = new Order(params);   

    let orderTypeResult = [];  
    let fixInstallmentAmt = 0;
    if(params.order_type === 1){
      dishonoured.fixedOrderId = params.order_type_id;
      orderTypeResult = await dishonoured.getFixedOrder();  
      fixInstallmentAmt = orderTypeResult[0].each_payment_amt;    
    }
    else if(params.order_type === 2){
      dishonoured.flexOrderId = params.order_type_id;
      orderTypeResult = await dishonoured.getFlexOrder();     
      fixInstallmentAmt = orderTypeResult[0].each_payment_amt; 
    }

    if(fixInstallmentAmt === params.payment_amt){
      dishonoured.payment_status = 6; // 	 Dishonoured
    }else if(fixInstallmentAmt !== params.payment_amt){
      dishonoured.payment_status = 8; // 	 Partial Dishonoured
    }
    
    await dishonoured.dishonourToPayment();

    const result = await dishonoured.getPaymentSchedule();
    const lastRow = result.paymentSchedule[result.paymentSchedule.length - 1];


    let instNo = lastRow.installment_no + 1;
    let paymentDate = moment(lastRow.payment_date).format("YYYY-MM-DD");
    paymentDate = dateMaker(paymentDate, orderTypeResult[0].frequency);
    
    let paymentScheduleArray = [];
      paymentScheduleArray.push(
        [params.order_id, params.customer_id, instNo , paymentDate, params.payment_amt, 1, 1, params.created_by],
      );
    
    dishonoured.paymentScheduleArray = paymentScheduleArray;    
    await dishonoured.createdPaymentSchedule();
  
    const schedule = await new Order({user_id : req.decoded.user_id, order_id: req.body.order_id }).getPaymentSchedule();
    res.send(schedule);
  } catch (error) {
    next(error);
  }
};



const paymentSubmit = async function(req, res, next) {
  let params = {
    user_id : req.decoded.user_id, 
    created_by: req.decoded.id,

    order_id : req.body.order_id,
    customer_id: req.body.customer_id,
    installment_no : Number(req.body.installment_no),
    payment_date: req.body.payment_date, 
    settlement_date : req.body.settlement_date,
    each_payment_amt : Number(req.body.payment_amt),
    payment_amt : Number(req.body.deposit_amt), 
    total_paid : Number(req.body.total_paid), 
    remark : req.body.remark,
    order_type : Number(req.body.order_type),
    order_type_id : Number(req.body.order_type_id),
    
    transaction_date : req.body.settlement_date,
    transaction_amt : Number(req.body.deposit_amt),
  }   
  try {
    const newPayment = new Order(params);

    const transaction_result = await newPayment.transactionEntry();
    newPayment.transaction_id = transaction_result.transaction_id;

    let orderTypeResult = [];
    let fixInstallmentAmt = 0;
    let frequency = 0;
    if(params.order_type === 1){
      newPayment.fixedOrderId = params.order_type_id;
      orderTypeResult = await newPayment.getFixedOrder();
      fixInstallmentAmt = orderTypeResult[0].each_payment_amt;
      frequency = orderTypeResult[0].frequency;
      newPayment.installment_before_delivery = orderTypeResult[0].before_delivery_amt;
    } else if(params.order_type === 2){
      newPayment.flexOrderId = params.order_type_id;
      orderTypeResult = await newPayment.getFlexOrder();      
      fixInstallmentAmt = orderTypeResult[0].each_payment_amt;
      newPayment.installment_before_delivery = orderTypeResult[0].before_delivery_amt;
      frequency = orderTypeResult[0].frequency;
    }
  
    const result = await newPayment.getPaymentSchedule()
    const lastRow = result.paymentSchedule[result.paymentSchedule.length - 1];
    let remainingRowOfSchedule = ((lastRow.installment_no - params.installment_no) + 1);
    
    let advPayAmt = params.payment_amt - params.each_payment_amt;
    let totalRequiredRowToSubmitPayment = 1;
    let diffrent = remainingRowOfSchedule - 1;
    if(advPayAmt > 0){
      totalRequiredRowToSubmitPayment = Math.ceil(advPayAmt / fixInstallmentAmt);
      diffrent = remainingRowOfSchedule - totalRequiredRowToSubmitPayment;
    }
    
    
    let paymentScheduleArray = [];
    let paymentDate = moment(lastRow.payment_date).format("YYYY-MM-DD"); 
    let totalInst = lastRow.installment_no;

    for(i = diffrent; i < 5; i++){        
      paymentDate = dateMaker(paymentDate, frequency);
      totalInst = totalInst + 1;        
      paymentScheduleArray.push(          
        [params.order_id, params.customer_id, totalInst, paymentDate, fixInstallmentAmt, 1, 1, params.created_by],
      );
    }
    if (diffrent < 5) {
      newPayment.paymentScheduleArray = paymentScheduleArray;
      await newPayment.createdPaymentSchedule();
    }

    if(params.payment_amt === params.each_payment_amt){
      if(fixInstallmentAmt === params.payment_amt){
        if(params.payment_date === params.settlement_date){
          newPayment.payment_status = 2; // Paid
        }else if (params.payment_date > params.settlement_date){        
          newPayment.payment_status = 3; // Advance Paid
        }else if (params.payment_date < params.settlement_date){        
          newPayment.payment_status = 11; // Late Paid
        }
      }else if (fixInstallmentAmt > params.payment_amt){
        if(params.payment_date === params.settlement_date){
          newPayment.payment_status = 13; // Remaining Partial Paid
        }else if (params.payment_date > params.settlement_date){        
          newPayment.payment_status = 14; // Remaining Partial Paid in Advance
        }else if (params.payment_date < params.settlement_date){        
          newPayment.payment_status = 15; // Remaining Late Paid
        }
      }
      newPayment.total_paid = params.total_paid + params.payment_amt;      
      await newPayment.paymentSubmit();
    }
    
    else if(params.payment_amt < params.each_payment_amt){
      if(params.payment_date === params.settlement_date){
        newPayment.payment_status = 4; // Partial Paid
      }else if (params.payment_date > params.settlement_date){        
        newPayment.payment_status = 5; // Advance Partial Paid
      }else if (params.payment_date < params.settlement_date){        
        newPayment.payment_status = 12; // Partial Late Paid
      }
      newPayment.total_paid = params.total_paid + params.payment_amt;
      const result = await newPayment.paymentSubmit();
      
      newPayment.payment_status = 16; // Partial Pending
      newPayment.payment_amt = params.each_payment_amt - newPayment.payment_amt;
      await newPayment.increaseSchedule();
    }

    else if(params.payment_amt > params.each_payment_amt){
        if(fixInstallmentAmt === params.each_payment_amt){
          if(params.payment_date === params.settlement_date){
            newPayment.payment_status = 2; // Paid
          }else if (params.payment_date > params.settlement_date){
            newPayment.payment_status = 3; // Advance Paid
          }else if (params.payment_date < params.settlement_date){
            newPayment.payment_status = 11; // Late Paid
          }
        }else if (fixInstallmentAmt > params.each_payment_amt){
          if(params.payment_date === params.settlement_date){
            newPayment.payment_status = 13; // Remaining Partial Paid
          }else if (params.payment_date > params.settlement_date){
            newPayment.payment_status = 14; // Remaining Partial Paid in Advance
          }else if (params.payment_date < params.settlement_date){        
            newPayment.payment_status = 15; // Remaining Late Paid
          }
        }

        newPayment.payment_amt = params.each_payment_amt;
        newPayment.total_paid = params.total_paid + params.each_payment_amt;
        const result = await newPayment.paymentSubmit();        
        let nextPayDate = result.nextInst[0].payment_date;
        
        newPayment.remark = '';
        let payAmt = params.payment_amt - params.each_payment_amt;
        let advanceTime = Math.ceil(payAmt/fixInstallmentAmt);
          for(let i=1; i<= advanceTime; i++){
            if(payAmt >= fixInstallmentAmt){
              if(nextPayDate === params.settlement_date){
                newPayment.payment_status = 2; // Paid
              }else if (nextPayDate > params.settlement_date){
                newPayment.payment_status = 3; // Advance Paid
              }else if (nextPayDate < params.settlement_date){
                newPayment.payment_status = 11; // Late Paid
              }
              newPayment.payment_amt = fixInstallmentAmt;
              newPayment.total_paid =  newPayment.total_paid + fixInstallmentAmt;
              newPayment.installment_no = newPayment.installment_no + 1;

              const result = await newPayment.paymentSubmit();
              nextPayDate = result.nextInst[0].payment_date;

              payAmt = payAmt - fixInstallmentAmt;
            }else if(payAmt !== 0){
              if(nextPayDate === params.settlement_date){
                newPayment.payment_status = 4; // Partial Paid
              }else if (nextPayDate > params.settlement_date){
                newPayment.payment_status = 5; // Advance Partial Paid
              }else if (nextPayDate < params.settlement_date){
                newPayment.payment_status = 12; // Late Paid
              }
              newPayment.payment_amt = payAmt;
              newPayment.total_paid =  newPayment.total_paid + payAmt;
              newPayment.installment_no = newPayment.installment_no + 1;

              const result = await newPayment.paymentSubmit();

              newPayment.payment_date = moment(result.lastUpdated[0].payment_date).format('YYYY-MM-DD');
              newPayment.payment_status = 16; // Partial Pending
              newPayment.payment_amt = fixInstallmentAmt - payAmt;
              await newPayment.increaseSchedule();
            }
          }
    }    
    const schedule = await new Order({user_id : req.decoded.user_id, order_id: req.body.order_id }).getPaymentSchedule();
    res.send(schedule);
  } catch (error) {
    next(error);
  }
};





const assignToFinance = async function (req, res, next) {
  let params = {
    user_id: req.decoded.user_id,
    assigned_to: req.body.assigned_to,
    order_id: req.body.id,
    customer_id: req.body.customer_id,
    created_by: req.decoded.id,
    order_type: req.body.order_type,
    order_type_id: req.body.order_type_id,
  };

  try {
    const newActivity = new Order(params);
    await newActivity.assignToFinance();
    const isScheduleExist = await newActivity.isScheduleExist();

    if(isScheduleExist == null || isScheduleExist.length === 0){
      let orderTypeResult = [];
      let noOfPayment = 0;
      let payAmt = 0;
  
      if(params.order_type === 1){
        newActivity.fixedOrderId = params.order_type_id;
        orderTypeResult = await newActivity.getFixedOrder();
        noOfPayment =  orderTypeResult[0].no_of_payment;
        payAmt = orderTypeResult[0].each_payment_amt;
      } else if(params.order_type === 2){
        newActivity.flexOrderId = params.order_type_id;
        orderTypeResult = await newActivity.getFlexOrder();
        noOfPayment =  orderTypeResult[0].before_delivery_amt;
        payAmt = orderTypeResult[0].each_payment_amt;
      }


      let paymentDate = moment(orderTypeResult[0].first_payment).format("YYYY-MM-DD");
      let paymentScheduleArray = [];
      
      for(let i=1; i<= noOfPayment; i++){
        paymentScheduleArray.push(          
          [params.order_id, params.customer_id, i, paymentDate, payAmt, 1, 1, params.created_by],
        );
        paymentDate = dateMaker(paymentDate, orderTypeResult[0].frequency);
      }

      newActivity.paymentScheduleArray = paymentScheduleArray;

      await newActivity.createdPaymentSchedule();
    }

    // const order = await new Order({ user_id: req.decoded.user_id }).getOrderList();    
    // res.send({ order: order });
    res.send({});
  } catch (error) {
    next(error);
  }
};




const paymentReschedule = async function(req, res, next) {
  let params = {
    user_id : req.decoded.user_id,
    order_id: req.body.order_id,
    customer_id : req.body.customer_id,
    diffBetweenSchedule: req.body.diffBetweenSchedule[0],
  };
  
  try {
    const newActivity = new Order(params);
    const result = await newActivity.paymentReschedule();

    const schedule = await new Order({user_id : req.decoded.user_id, order_id: req.body.order_id }).getPaymentSchedule();
    res.send(schedule);
  } catch (error) {
    next(error);
  }
};


const assignToDelivery = async function (req, res, next) {
  try {
    await new Order({ user_id: req.decoded.user_id, assigned_to: req.body.assigned_to, id: req.body.id }).assignToDelivery();
    // const order = await new Order({ user_id: req.decoded.user_id }).getOrderList();
    // res.send({ order: order });
    res.send({ });
  } catch (error) {
    next(error);
  }
};

const Delivered = async function (req, res, next) {
  try {
    await new Order({ user_id: req.decoded.user_id, assigned_to: req.body.assigned_to, id: req.body.id, delivered_date: req.body.delivered_date, delivered_time: req.body.delivered_time }).Delivered();
    const order = await new Order({ user_id: req.decoded.user_id }).getOrderList();
    res.send({ order: order });
  } catch (error) {
    next(error);
  }
};




const submitCancel = async function (req, res, next) {
  try {
    const result = await new Order({
      user_id: req.decoded.user_id,
      id: req.body.id,
      budgetId: req.body.budget_id,
      order_type: req.body.order_type,
      order_type_id: req.body.order_type_id,
      refund: req.body.refund,
      cancel_by: req.body.cancel_by,
      cancel_reason: req.body.cancel_reason,
      cancellation_charge: req.body.cancellation_charge,
    }).submitCancel();
    const order = await new Order({ user_id: req.decoded.user_id }).getOrderList();
    res.send({ order: order });
  } catch (error) {
    next(error);
  }
};



const submitDeliveredProduct = async function (req, res, next) {
  let params = {
    id: req.body.id,
    user_id: req.decoded.user_id,
    userid: req.decoded.id,
    customer_id: req.body.customer_id,
    order_id: req.body.order_id,
    user_role: req.body.user_role,
    comment: req.body.comment,
    assigned_to: 5,
    delivered_date: req.body.delivered_date,
    delivered_time: req.body.delivered_time,
    created_by: req.decoded.id,
    productDetails : req.body.productDetails,    
  };
  
  try {
      const newOrder = new Order(params);
      if(req.body.comment !== ''){
        await newOrder.postComment();
      }
        await newOrder.Delivered();


      Object.values(params.productDetails).map(async (data) => {
        const result = await newOrder.updateProductStatus(2, params.id, data.product_id);
        await newOrder.submitDeliveredProduct(
          [[result[0].id, data.invoice_number, data.purchase_from, data.product_cost, data.product_color, data.product_brand, data.delivery_date,  data.specification, 1, params.created_by]]
        );
      });
      
    const order = await newOrder.getOrderList();
    res.send({ order: order });
  } catch (error) {
    next(error);
  }
};


const getProductAndCategoryName = async function (req, res, next) {
  let orderParams = {
    user_id: req.decoded.user_id,
    products_id: req.body.product_id,
  };
  try {
    const newOrder = new Order(orderParams);
    const result = await newOrder.getProductAndCategoryName();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const getDeliveredProductData = async function (req, res, next) {
  let orderParams = {
    id: req.body.order_id,
    user_id: req.decoded.user_id,
  };
  try {
    const newOrder = new Order(orderParams);
    const result = await newOrder.getDeliveredProductData();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const getFlexOrderDataForPDF = async function (req, res, next) {
  let orderParams = {
    user_id: req.decoded.user_id,

    franchise_id: req.decoded,
    order_id: req.body.data.id,
    customer_id: req.body.data.customer_id,
  };

  if (orderParams.order_id != '' || orderParams.order_id != null) {
    try {

      const budget = await new Order({ user_id: req.decoded.user_id, budgetId: req.body.data.budget_id, customer_id: req.body.data.customer_id }).getBudget();
      const budgetComment = await new Order({ user_id: req.decoded.user_id, customer_id: req.body.data.customer_id }).getBudgetComments();
      const flexOrder = await new Order({ user_id: req.decoded.user_id, flexOrderId: req.body.data.order_type_id }).getFlexOrder();
      const customer = await new Order({ user_id: req.decoded.user_id, lastInsertId: req.body.data.customer_id }).getCustomerDetails();
      const franchise = await new Order({ user_id: req.decoded.user_id }).getCompanyDetail();
      const product = await new Order({ products_id: req.body.data.product_id }).getProductDetail();
      const user = await new Order({ user_id: req.decoded.user_id, id: req.decoded.id }).getCSRDetail();
      const bankDetail = await new Customer({ user_id: req.decoded.user_id, customer_id: req.body.data.customer_id }).getCustomerBankDetail();

      res.send({ budget: budget, orderType: flexOrder, customer: customer, franchise: franchise, product: product, user: user, budgetComment: budgetComment, bankDetail: bankDetail });

    } catch (err) {
      next(err);
    }
  }
};

const getFixedOrderDataForPDF = async function (req, res, next) {
  let orderParams = {
    user_id: req.decoded.user_id,

    franchise_id: req.decoded,
    order_id: req.body.data.id,
    customer_id: req.body.data.customer_id,
  };


  if (orderParams.order_id != '' || orderParams.order_id != null) {
    try {
      const budget = await new Order({ user_id: req.decoded.user_id, budgetId: req.body.data.budget_id, customer_id: req.body.data.customer_id }).getBudget();
      const budgetComment = await new Order({ user_id: req.decoded.user_id, customer_id: req.body.data.customer_id }).getBudgetComments();
      const fixedOrder = await new Order({ user_id: req.decoded.user_id, fixedOrderId: req.body.data.order_type_id }).getFixedOrder();
      const customer = await new Order({ user_id: req.decoded.user_id, lastInsertId: req.body.data.customer_id }).getCustomerDetails();
      const franchise = await new Order({ user_id: req.decoded.user_id }).getCompanyDetail();
      const product = await new Order({ products_id: req.body.data.product_id }).getProductDetail();
      const user = await new Order({ user_id: req.decoded.user_id, id: req.decoded.id }).getCSRDetail();
      const bankDetail = await new Customer({ user_id: req.decoded.user_id, customer_id: req.body.data.customer_id }).getCustomerBankDetail();

      res.send({ budget: budget, orderType: fixedOrder, customer: customer, franchise: franchise, product: product, user: user, budgetComment: budgetComment, bankDetail: bankDetail });

    } catch (err) {
      next(err);
    }
  }
};


const getSalesTypeList = async function (req, res, next) {
  try {
    const list = await new Order({ user_id: req.decoded.user_id }).getSalesTypeList();
    res.send(list);
  } catch (error) {
    next(error);
  }
};
const getSalesPersonList = async function (req, res, next) {
  try {
    const list = await new Order({ user_id: req.decoded.user_id }).getSalesPersonList();
    res.send(list);
  } catch (error) {
    next(error);
  }
};

const getRentingForList = async function (req, res, next) {
  try {
    const list = await new Order({ user_id: req.decoded.user_id }).getRentingForList();
    res.send(list);
  } catch (error) {
    next(error);
  }
};



const getReceivedPaymentsList = async function (req, res, next) {
  try {
    const result = await new Order({ user_id: req.decoded.user_id }).getReceivedPaymentsList();
    res.send(result);
  } catch (error) {
    next(error);
  }
};


const fetchMissedPaymentData = async function (req, res, next) {
  try {
    const customerList = await new Order({ user_id: req.decoded.user_id }).fetchMissedPaymentData();
    const fetchData = await new Customer({ user_id: req.decoded.user_id });

    const tabCounts = await fetchData.countTabRecord();
    res.send({ customerList: customerList, tabCounts: tabCounts });
  } catch (error) {
    next(error);
  }
};


const filterMissedPaymentData = async function (req, res, next) {
  try {
    const fetchData = await new Customer({ user_id: req.decoded.user_id });
    const customerList = await new Order({
      user_id: req.decoded.user_id, 
      searchText: req.body.searchText.searchText,
      fromPaymentDate: req.body.searchText.fromPaymentDate, 
      toPaymentDate: req.body.searchText.toPaymentDate,
    }).filterMissedPaymentData();

    const tabCounts = await fetchData.countTabRecord();    
    tabCounts[0].missed_payment = customerList.length;
    res.send({ customerList:customerList, tabCounts: tabCounts });
  } catch (error) {
    next(error);
  }
};

const searchOrder = async function (req, res, next) {
  let CustomerParams = {
    user_id: req.decoded.user_id,
    searchText: req.body.searchText,
  };
  try {
    const newCustomer = new Order(CustomerParams);
    const result = await newCustomer.searchOrder();
    res.send({ order: result });
  } catch (error) {
    next(error);
  }
};




module.exports = {
  getRequeredOrderList,
  getnewid,
  uploadDoc,
  postComment,
  getComment,
  uploadDeliveryDoc,
  getFlexOrderDataForPDF,
  getFixedOrderDataForPDF,
  getRequiredDataToCancel,
  postOrder,
  submitCancel,
  getAll,
  getBudget,
  getExistingBudget,
  getBudgetHistory,
  updateBudget,
  getFixedOrder, 
  getFlexOrder, 
  editOrder, 
  assignToFinance, 
  assignToDelivery, 
  paymentSubmit, 
  Delivered,
  getDeliveredProductData,
  getProductAndCategoryName,
  submitDeliveredProduct,
  getRentingForList,
  getSalesTypeList,
  getSalesPersonList,
  getBudgetComments,
  getReceivedPaymentsList,
  fetchMissedPaymentData,
  getSingleOrderData,
  archiveOrder,
  getPaymentSchedule,
  paymentReschedule,
  searchOrder,
  filterMissedPaymentData,
  dishonourToPayment,
  completeNCloseContract,
  // getOrderDataByID,
};