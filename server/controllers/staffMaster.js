const StaffMaster = require("../models/staffMaster.js");
const Miscellaneious = require('../lib/miscellaneous.js');
const nodemailer = require('nodemailer');
const { trans } = require("../lib/mailtransporter");
const {domainName} = require("../lib/databaseMySQLNew");


const register = async function (req, res, next) {

	let staffMasterParams = {
    id: req.body.id,
    first_name: req.body.first_name,
		last_name: req.body.last_name,
		user_id:  req.body.user_id,
		password: req.body.password,
    location: req.body.location,
    contact: req.body.contact,
    email: req.body.email,
    position: req.body.position,
		created_by: req.decoded.id,
		franchise_id: req.decoded.franchise_id,
		is_active : 1,
	};
	
	try{
		const newStaffMaster = new StaffMaster(staffMasterParams);
		

		if(req.body.id) {
			await newStaffMaster.update();
			const staffList = await new StaffMaster({}).getAll();
			
			res.send({ staffList });
		} else {

			const accountId = Miscellaneious.generateAccountId();
			const token = Miscellaneious.generateRandomToken();

			newStaffMaster.accountId = accountId;
			newStaffMaster.token = token;

			await newStaffMaster.register();

			let url = 'http://' + domainName + '/api/auth/verifyEmail?accountId=' + accountId + '&name=' + req.body.user_id + '&token=' + token;
					
			const mail = {
				from: 'admin@' + domainName,
				to: req.body.email,
				subject: 'Please verify your email address',
				text: 'activate your account ',
				html: '<strong><a href=' + url + '> Please click on a link to ativate your account</a></strong> <br />user Id: ' + req.body.user_id + '<br />password: ' + req.body.password
			}

			trans.sendMail(mail, (err, info) => {
				if (err) {
					return console.log(err);
				}
				console.log('Message sent: %s', info.messageId);
				// Preview only available when sending through an Ethereal account
				console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
			});

			const staffList = await new StaffMaster({}).getAll();
			
			res.send({ staffList });
		}
	} catch(err){
			next(err);
	}
};

const all = async function (req, res, next) {
	try {
			const staffList = await new StaffMaster({}).getAll();
			
			res.send({ staffList: staffList });
	} catch (err) {
		next(err);
	}
}



const searchData = async function (req, res, next) {
  let staffParams = {
    user_id: req.decoded.user_id,
    searchText: req.body.searchText,
  };
	try{
    const newStaff = new StaffMaster(staffParams);    
    const staffList = await newStaff.searchData();
    res.send({ staffList: staffList });
	}catch(err){
    next(error);
	}
};




module.exports = { register: register, all: all, searchData: searchData};