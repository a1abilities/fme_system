const Appointment = require('../models/appointment.js');
const {addOneDay, getCurrentDateDBFormat, escapeSunday} = require('../utils/datetime.js');


const getCurrentTimeslot = async function (req, res, next) {
	const params = {
		franchiseId : req.decoded.franchise_id,
		userId : req.decoded.id,
	}
  try {
		const newActivity = new Appointment(params);
		const timeSlot = await newActivity.getCurrentTimeslot();		
		res.send({ timeSlot: timeSlot });
	} catch (err) {
		next(err);
	}
}


const getAppointedClientList = async function (req, res, next) {
	const params = {
		franchiseId : req.decoded.franchise_id,
		userId : req.decoded.id,
		date : req.body.date,
	}
  try {
		const newActivity = new Appointment(params);		
		const clientList = await newActivity.getAppointedClientList();
		res.send({ clientList : clientList  });
	} catch (err) {
		next(err);
	}
}



const addOrUpdateTimeslot = async function (req, res, next) {
	const params = {
		franchiseId : req.decoded.franchise_id,
		userId : req.decoded.id,
		appointmentId : req.body.appointmentId,
		date : req.body.date,
		start_time : req.body.start_time,
		end_time : req.body.end_time,
		operation : req.body.operation,
	}
  try {
		const newActivity = new Appointment(params);
		if(params.operation === 'add'){
			await newActivity.addNewTimeslot();
		}
		else if(params.operation === 'update'){
			await newActivity.updateExistingTimeslot();
		}

		const timeSlot = await newActivity.getCurrentTimeslot();
		res.send({ timeSlot: timeSlot });
	} catch (err) {
		next(err);
	}
}


const handleLeave = async function (req, res, next) {
	const params = {
		franchiseId : req.decoded.franchise_id,
		userId : req.decoded.id,
		appointmentId : req.body.appointmentId,
		appointment_status : req.body.appointment_status,
		date : req.body.date,
	}
  try {
		const newActivity = new Appointment(params);		
		await newActivity.handleLeave();
		
		const timeSlot = await newActivity.getCurrentTimeslot();

		res.send({ timeSlot: timeSlot });
	} catch (err) {
		next(err);
	}
}


const removeTimeSlot = async function (req, res, next) {
	const params = {
		franchiseId : req.decoded.franchise_id,
		userId : req.decoded.id,
		appointmentId : req.body.appointmentId,
	}

  try {
		const newActivity = new Appointment(params);		
		await newActivity.removeTimeSlot();
		
		const timeSlot = await newActivity.getCurrentTimeslot();

		res.send({ timeSlot: timeSlot });
	} catch (err) {
		next(err);
	}
}




const fetchBookedAppointmentList = async function (req, res, next) {
	const params = {		
		franchiseId : req.decoded.franchise_id,
		userId : req.decoded.id,
		date : req.body.date,
	}

  try {
		const newActivity = new Appointment(params);		
		const bookedList = await newActivity.fetchBookedAppointmentList();
		res.send({ bookedList : bookedList  });
	} catch (err) {
		next(err);
	}
}




// const bookAppointment = async function (req, res, next) {
// 	const params = {
// 		userId : req.body.userId,
// 		franchiseId: req.body.franchiseId,
// 		date : req.body.date,
// 		meeting_time : req.body.meeting_time,
// 		start_time : req.body.start_time,
// 		end_time : req.body.end_time,
// 		first_name : req.body.first_name,
// 		last_name : req.body.last_name,
// 		contact : req.body.contact,
// 		reference : req.body.reference,
// 	}

//   try {
// 		const newActivity = new Appointment(params);
		
// 		await newActivity.bookAppointment();
		
// 		const timeSlot = await newActivity.getCurrentTimeslot();
// 		res.send({ timeSlot: timeSlot });
// 	} catch (err) {
// 		next(err);
// 	}
// }




// const fetchRequiredList = async function (req, res, next) {
//   try {
// 		const franchiseList = await new Appointment({}).fetchFranchiseList();
// 		const roleList = await new Appointment({}).getRoleList();
// 		res.send({ franchiseList: franchiseList,  roleList: roleList});
// 	} catch (err) {
// 		next(err);
// 	}
// }


// const fetchStaffList = async function (req, res, next) {
// 	let params = {
// 		roleId : req.body.roleId,
// 		franchiseId : req.body.franchiseId,
// 		fdbName : req.body.fdbName,
// 	}
// 	try {
// 		const newActivity = new Appointment(params);	
		
// 		await newActivity.inActiveDueDatedTimeslot();
// 		const membersList = await newActivity.fetchStaffList();
// 				// console.log(membersList);
// 		if(membersList != null && membersList != undefined && membersList.length > 0){
// 			membersList.map(async (data, index) => {
// 				let date = getCurrentDateDBFormat();

// 				for(let i = 0; i< 7; i++){
// 					if(escapeSunday(date)){
// 						date = addOneDay(date);
// 					}
// 					await newActivity.createTimeslot(params.franchiseId, data.id, date, '15', '09:00', '18:00', 1, 1);
// 					date = addOneDay(date);
// 				}
// 			});
// 		}
		
// 		res.send({ membersList: membersList});
// 	  } catch (err) {
// 		  next(err);
// 	  }
//   }


module.exports = { 
	getCurrentTimeslot: getCurrentTimeslot, 
	getAppointedClientList : getAppointedClientList,	
	addOrUpdateTimeslot: addOrUpdateTimeslot,
	handleLeave: handleLeave,
	removeTimeSlot : removeTimeSlot,
	fetchBookedAppointmentList : fetchBookedAppointmentList,

	// bookAppointment : bookAppointment,	
	// fetchRequiredList : fetchRequiredList,
	// fetchStaffList: fetchStaffList,
 };