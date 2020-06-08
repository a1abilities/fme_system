const Staff = require('../../models/franchise/staff.js');
const nodemailer = require('nodemailer');
const { trans } = require("../../lib/mailtransporter");
const Miscellaneious = require('../../lib/miscellaneous.js');
const {domainName} = require("../../lib/databaseMySQLNew");

const register = async function (req, res, next) {
  const staffData = JSON.parse(req.body.data);
  let attachments = '';
  req.files.map((file) => {
    attachments = attachments === '' ? file.filename : (attachments + ',' + file.filename);
  });

	let staffParams = {
      franchise_id: req.decoded.franchise_id,
      id: staffData.id,
      first_name: staffData.first_name,
      last_name: staffData.last_name,
      location: staffData.location,
      contact: staffData.contact,
      email: staffData.email,
      
      pre_company_name: staffData.pre_company_name,
      pre_company_address: staffData.pre_company_address,
      pre_company_contact: staffData.pre_company_contact,
      pre_position: staffData.pre_position,
      duration: staffData.duration,
      resume:  staffData.resume,
      cover_letter: staffData.cover_letter,
      employment_docs: attachments,

      user_id: staffData.user_id,
      password: staffData.password,
      role: staffData.role,
      created_by: req.decoded.id,
      updated_by:req.decoded.id,
      is_active: staffData.is_active,
	};

	try{
    const newStaff = new Staff(staffParams);

    if(staffData.id) {
      newStaff.updated_by = req.decoded.id;
      await newStaff.update();
    } else {      
      const accountId = Miscellaneious.generateAccountId();
      const token = Miscellaneious.generateRandomToken();
      newStaff.accountId = accountId;      
      newStaff.token = token;
      newStaff.created_by = req.decoded.id;
      await newStaff.register();

      let url = 'http://' + domainName + '/api/auth/verifyEmail?accountId=' + accountId + '&name=' + staffData.user_id + '&token=' + token;
			const mail = {
				from: 'admin@' + domainName,
				to: staffData.email,
				subject: 'Please verify your email address',
				text: 'activate your account ',
				html: '<strong><a href=' + url + '> Please click on a link to ativate your account</a></strong> <br />user Id: ' + staffData.user_id + '<br />password: ' + staffData.password
			}

			trans.sendMail(mail, (err, info) => {
				if (err) {
					return console.log(err);
				}
				console.log('Message sent: %s', info.messageId);
				// Preview only available when sending through an Ethereal account
				console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      });      
    }
    
    res.send({ });
	}catch(err){
    next(err);
	}
};



const all = async function(req, res, next) {
  const params = {
    user_id : req.decoded.user_id,
    tabValue : req.body.tabValue,
    searchText : req.body.searchText,
  };

  try {
    const Model = new Staff(params);
    const staffList = await Model.all();
    const tabCounts = await Model.countTabRecord();

    res.send({staffList: staffList, tabCounts: tabCounts});
    
  } catch (error) {
    next(error);
  }
};


const searchData = async function (req, res, next) {
  let staffParams = {
    user_id: req.decoded.user_id,
    searchText: req.body.searchText,
  };
	try{
    const newStaff = new Staff(staffParams);    
    const staffList = await newStaff.searchData();
    res.send({ staffList });
	}catch(err){
    next(error);
	}
};



module.exports = { register: register, all: all, searchData: searchData};