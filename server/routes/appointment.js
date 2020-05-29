const express = require('express')
const Appointment = require('../controllers/appointment.js');

const validateToken = require('../utils').validateToken;

const appointmentRouter = express.Router();

appointmentRouter.route("/getCurrentTimeslot").get(validateToken, Appointment.getCurrentTimeslot);
appointmentRouter.route("/getAppointedClientList").post(validateToken, Appointment.getAppointedClientList);
appointmentRouter.route("/addOrUpdateTimeslot").post(validateToken, Appointment.addOrUpdateTimeslot);
appointmentRouter.route("/handleLeave").post(validateToken, Appointment.handleLeave);
appointmentRouter.route("/removeTimeSlot").post(validateToken, Appointment.removeTimeSlot);
appointmentRouter.route("/fetchBookedAppointmentList").post(validateToken, Appointment.fetchBookedAppointmentList);


// appointmentRouter.route("/fetchRequiredList").get(validateToken, Appointment.fetchRequiredList);
// appointmentRouter.route("/bookAppointment").post(validateToken, Appointment.bookAppointment);
// appointmentRouter.route("/fetchStaffList").post(validateToken, Appointment.fetchStaffList);

module.exports = appointmentRouter;