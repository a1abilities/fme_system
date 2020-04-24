const express = require('express')
const Enquiry = require('../../controllers/franchise/enquiry.js');

const validateToken = require('../../utils').validateToken;

const enquiryRouter = express.Router();

enquiryRouter.route("/getnewid").get(validateToken, Enquiry.getnewid);
enquiryRouter.route("/getall").get(validateToken, Enquiry.getAll);
enquiryRouter.route("/nonconvertlist").get(validateToken, Enquiry.nonConvertList);
enquiryRouter.route("/convertedList").get(validateToken, Enquiry.convertedList);
enquiryRouter.route("/convert").post(validateToken, Enquiry.convert);
enquiryRouter.route("/postenquiry").post(validateToken, Enquiry.postenquiry);
enquiryRouter.route('/search').post(validateToken, Enquiry.search);
enquiryRouter.route('/deleteEnquiry').post(validateToken, Enquiry.deleteEnquiry);

module.exports = enquiryRouter;