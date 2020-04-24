const Enquiry = require('../../models/franchise/enquiry.js');

const getnewid = async function(req, res, next) {
  try {
    const id = await new Enquiry({user_id: req.decoded.user_id}).getnewid();
    
    res.send(id);
  } catch (error) {
    next(error);
  }
};

const getAll = async function(req, res, next) {
  try {
    const enquiryList = await new Enquiry({user_id: req.decoded.user_id}).getAll();

    res.send({ enquiryList });
  } catch (error) {
    next(error);
  }
};

const nonConvertList = async function(req, res, next) {
  try {
    const enquiryList = await new Enquiry({user_id: req.decoded.user_id}).nonConvertList();

    res.send({ enquiryList });
  } catch (error) {
    next(error);
  }
};

const convertedList = async function(req, res, next) {
  try {
    const enquiryList = await new Enquiry({user_id: req.decoded.user_id}).convertedList();

    res.send({ enquiryList });
  } catch (error) {
    next(error);
  }
};

const convert = async function(req, res, next) {
  try {
    await new Enquiry({user_id: req.decoded.user_id, enquiry_id: req.body.enquiry_id}).convert();
    const enquiryList = await new Enquiry({user_id: req.decoded.user_id}).getAll();
    
    res.send({ enquiryList });
  } catch (error) {
    next(error);
  }
};

const postenquiry = async function (req, res, next) {
  console.log('eqnuiry req.body',req.body);
  
	let EnquiryParams = {
    user_id: req.decoded.user_id,
    userid: req.decoded.id,
    franchise_id: req.decoded.franchise_id,
    
    enquiry_id : req.body.enquiry_id,
    lead_id: req.body.lead_id,
    customer_id : req.body.customer_id,    
    customer_name: req.body.customer_name,
    contact: req.body.contact,
    interested_product_id: req.body.interested_product_id,
    is_active: 1,
    converted_to: req.body.converted_to,
    created_by: req.decoded.id,
    convert_by_lead: req.body.convert_by_lead,
  };
	try{
	
    EnquiryParams.created_by = req.decoded.id;
    const newEnquiry = new Enquiry(EnquiryParams);
    
    await newEnquiry.postenquiry();
    const enquiryList = await new Enquiry({user_id : req.decoded.user_id}).getAll();
    
    res.send({ enquiryList: enquiryList });
	}catch(err){
    next(error);
	}
};


const search = async function (req, res, next) {
  let EnquiryParams = {
    user_id: req.decoded.user_id,
    searchText: req.body.searchText,
  };
	try{
    const newEnquiry = new Enquiry(EnquiryParams);
    const result = await newEnquiry.searchData({ user_id: req.decoded.user_id });
    res.send({ enquiryList: result });
	}catch(err){
    next(error);
	}
};



const deleteEnquiry = async function (req, res, next) {
  console.log('enquiry req.body', req.body);
  let EnquiryParams = {
    user_id: req.decoded.user_id,
    enquiry_id : req.body.id,
    comment : req.body.comment,
  };
	try{
    const newEnquiry = new Enquiry(EnquiryParams);
    await newEnquiry.deleteEnquiry();
    const enquiryList = await new Enquiry({user_id : req.decoded.user_id}).getAll();
    res.send({ enquiryList: enquiryList });
	}catch(err){
    next(error);
	}
};


module.exports = { getnewid, postenquiry, getAll, nonConvertList, convert, convertedList, search, deleteEnquiry};