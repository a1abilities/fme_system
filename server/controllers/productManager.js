const ProductManager = require('../models/productManager');
const History = require('../models/history.js');


const combineResult = (params) => {
  let productList = params.productList;
  const orderedProduct = params.orderedProduct;
  let combineResult = [];
  
  if(productList !== "" && productList !== null && productList !== undefined && orderedProduct !== "" && orderedProduct !== null && orderedProduct !== undefined){
    (productList.length > 0 ? productList : []).map((product, index) => {
      (orderedProduct.length > 0 ? orderedProduct : []).map(count => {
        if(product.id === count.product_id){
          product.total_rented = count.total_rented;
          product.rented_order = count.rented_order;
          combineResult.push(product);
        }
      })
    })       
  }
  return combineResult;
}

const getTabRelatedRecord = async function(req, res, next) {
  const params = {        
    user_id: req.decoded.user_id,
    tabValue: req.body.tabValue,
  };
  try {
    const activity = new ProductManager(params);
    let result = [];
      if(req.body.tabValue === 0){
        result = await activity.getAllRelatedRecord();
      }else if(req.body.tabValue !== 0){
        result = await activity.getStateRelatedRecord();
      }
    const finalResult = await combineResult(result);
    
    const countResult = await activity.countStateRecord();    
    res.send({productList: finalResult, tabCounts: countResult});
  } catch (error) {
    next(error);
  }
};


const getRentedOrder = async function(req, res, next) {
  const params = {
    user_id: req.decoded.user_id,
    productId: req.body.productId,
    rentedOrder: req.body.rentedOrder,
    tabValue: req.body.tabValue,
  };
  
  try {
    const activity = new ProductManager(params);
    const result = await activity.getRentedOrder();

    let finalResult = [];
    Object.values(result).map(data => {
      if(data.product_id !== '' && data.product_id !== undefined){        
        let filterList =  Object.values(data.product_id.split(',')).filter(id => id == params.productId);
        if(filterList !== "" && filterList.length > 0){
          finalResult.push(data);
        }
      }
    });
    const countResult = await activity.countStateRecord();
    res.send({orderList: finalResult, tabCounts: countResult});
  } catch (error) {
    next(error);
  }
};




const changeProductState = async function(req, res, next) {
  const params = {
    user_id: req.decoded.user_id,
    productId : req.body.productId,
    orderId : req.body.orderId,
    productCode : req.body.productCode,
    customerId: req.body.customerId,
    tabValue: req.body.tabValue,
    newState: req.body.newState,
  };
  
  const auditLog = {
    user_id: req.decoded.user_id,
    tableName : `ordered_product`,
    whereClause: `order_id = ${params.orderId} AND product_id = ${params.productId} AND product_code = '${params.productCode}' AND is_active = 1`,
    modifiedBy: req.decoded.id,
    reason: req.body.comment,
  }

  try {
    const history = new History(auditLog);
    const activity = new ProductManager(params);
    
    const previousValues = await history.getValues();
    await activity.changeProductState();
    const newValues = await history.getValues();
    
    history.previousValues = previousValues;
    history.newValues = newValues;
    await history.saveChanges();
    console.log('length',previousValues.length, newValues.length)
    
    let result = [];
    if(req.body.tabValue !== 0){
      result = await activity.getStateRelatedRecord();
    }
    
    const finalResult = await combineResult(result);
    const orderList = await activity.getRentedOrder();
    const countResult = await activity.countStateRecord();
    res.send({productList: finalResult, orderList: orderList, tabCounts: countResult});
  } catch (error) {
    next(error);
  }
};




const getCommonProductForOrder = async function(req, res, next) {
  const params = {    
    user_id: req.decoded.user_id,
    productId : req.body.productId,
    orderId : req.body.orderId,  
    tabValue: req.body.tabValue,
  };
  
  try {
    const activity = new ProductManager(params);
    const result = await activity.getCommonProductForOrder();
    res.send(result);
  } catch (error) {
    next(error);
  }
};
 


module.exports = {
  getTabRelatedRecord,
  getRentedOrder,
  changeProductState,
  getCommonProductForOrder,
};
