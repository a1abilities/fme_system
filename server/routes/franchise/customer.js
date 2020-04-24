const express = require('express')
const Customer = require('../../controllers/franchise/customer.js');
const multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, callback) {

    // if (process.env.NODE_ENV === 'development') {
      callback(null, './files/customer');
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

const upload = multer({ storage: storage });

const validateToken = require('../../utils').validateToken;

const customerRouter = express.Router(); 

customerRouter.route("/register").post(validateToken, upload.array('avatar'), Customer.register);
customerRouter.route("/list").get(validateToken, Customer.all);
customerRouter.route("/customerList").post(validateToken, Customer.customerList);
customerRouter.route("/idtype/list").get(validateToken, Customer.getidtypelist);
customerRouter.route("/search").post(validateToken, Customer.searchData);
customerRouter.route("/postComment").post(validateToken, Customer.postComment);
customerRouter.route("/getCommentList").post(validateToken, Customer.getCommentList);
customerRouter.route("/getsinglecustomer").post(validateToken, Customer.getSingleCustomer);
customerRouter.route("/getCustomerBankDetail").post(validateToken, Customer.getCustomerBankDetail);
customerRouter.route("/addBankDetail").post(validateToken, Customer.addBankDetail);
customerRouter.route("/updateBankDetail").post(validateToken, Customer.updateBankDetail);
// customerRouter.route("/isDuplicateEmail").post(validateToken, Customer.isDuplicateEmail);

// userRouter.route("/getUniqueNames").get(validateToken, User.getUniqueNames);

module.exports = customerRouter;