const express = require('express')
const Order = require('../../controllers/franchise/order.js');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {

    // if (process.env.NODE_ENV === 'development') {
    callback(null, './files/order');
    // } else {
    //   callback(null, './build/');
    // }
  },
  filename: function (req, file, callback) {
    // if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {      
    callback(null, file.originalname.split('.')[0] + "_" + Date.now() + '.' + file.originalname.split('.')[1]);
    // }
  }
});


const Delivery = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './files/DeliveredDoc');
  },
  filename: function (req, file, callback) {

    // if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {

    callback(null, file.originalname.split('.')[0] + "_" + Date.now() + '.' + file.originalname.split('.')[1]);
    // }
  }
});

// const paymentDocs = multer.diskStorage({
//   destination: function (req, file, callback) {
//       callback(null, './files/DocsForPayment');
//   },
//   filename: function (req, file, callback) {

//     // if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {

//       callback(null, file.originalname.split('.')[0] + "_" + Date.now() + '.' + file.originalname.split('.')[1]);
//     // }
//   }
// });


const upload = multer({ storage: storage });
const DeliveredDoc = multer({ storage: Delivery });
// const paymentDoc = multer({ storage: paymentDocs });

const validateToken = require('../../utils').validateToken;

const orderRouter = express.Router();

orderRouter.route("/getnewid").get(validateToken, Order.getnewid);
orderRouter.route("/getall").get(validateToken, Order.getAll);
orderRouter.route("/getcomment").post(validateToken, Order.getComment);
orderRouter.route("/postComment").post(validateToken, Order.postComment);
orderRouter.route("/getRequeredOrderList").post(validateToken, Order.getRequeredOrderList);

orderRouter.route("/uploaddoc").post(validateToken, Order.uploadDoc);
orderRouter.route("/uploadDeliveryDoc").post(validateToken, DeliveredDoc.array('avatar'), Order.uploadDeliveryDoc);
orderRouter.route("/getbudget").post(validateToken, Order.getBudget);
orderRouter.route("/getExistingBudget").post(validateToken, Order.getExistingBudget);
orderRouter.route("/getBudgetHistory").post(validateToken, Order.getBudgetHistory);
orderRouter.route("/updateBudget").post(validateToken, Order.updateBudget);
orderRouter.route("/getfixedorder").post(validateToken, Order.getFixedOrder);
orderRouter.route("/getflexorder").post(validateToken, Order.getFlexOrder);

orderRouter.route("/paymentsubmit").post(validateToken, Order.paymentSubmit);
orderRouter.route("/dishonourToPayment").post(validateToken, Order.dishonourToPayment);
orderRouter.route("/editorder").post(validateToken, Order.editOrder);
orderRouter.route("/assigntofinance").post(validateToken, Order.assignToFinance);
orderRouter.route("/assigntodelivery").post(validateToken, Order.assignToDelivery);
orderRouter.route("/delivered").post(validateToken, Order.Delivered);
orderRouter.route("/postorder").post(validateToken, Order.postOrder);
orderRouter.route("/get-flex-order-data-for-PDF").post(validateToken, Order.getFlexOrderDataForPDF);
orderRouter.route("/get-fixed-order-data-for-PDF").post(validateToken, Order.getFixedOrderDataForPDF);
orderRouter.route("/getRequiredDataToCancel").post(validateToken, Order.getRequiredDataToCancel);
orderRouter.route("/submitCancel").post(validateToken, Order.submitCancel);
orderRouter.route("/getDeliveredProductData").post(validateToken, Order.getDeliveredProductData);
orderRouter.route("/getProductAndCategoryName").post(validateToken, Order.getProductAndCategoryName);
orderRouter.route("/submitDeliveredProduct").post(validateToken, Order.submitDeliveredProduct);

orderRouter.route("/getSalesTypeList").get(validateToken, Order.getSalesTypeList);
orderRouter.route("/getRentingForList").get(validateToken, Order.getRentingForList);
orderRouter.route("/getBudgetComments").post(validateToken, Order.getBudgetComments);
orderRouter.route("/getSalesPersonList").get(validateToken, Order.getSalesPersonList);

orderRouter.route("/getReceivedPaymentsList").get(validateToken, Order.getReceivedPaymentsList);
orderRouter.route("/fetchMissedPaymentData").get(validateToken, Order.fetchMissedPaymentData);
orderRouter.route("/getSingleOrderData").post(validateToken, Order.getSingleOrderData);
orderRouter.route("/archiveOrder").post(validateToken, Order.archiveOrder);
orderRouter.route("/getPaymentSchedule").post(validateToken, Order.getPaymentSchedule);
orderRouter.route("/paymentReschedule").post(validateToken, Order.paymentReschedule);
orderRouter.route("/searchOrder").post(validateToken, Order.searchOrder);
orderRouter.route("/filterMissedPaymentData").post(validateToken, Order.filterMissedPaymentData);
orderRouter.route("/completeNCloseContract").post(validateToken, Order.completeNCloseContract);

// orderRouter.route("/getOrderDataByID").post(validateToken, Order.getOrderDataByID);



module.exports = orderRouter;