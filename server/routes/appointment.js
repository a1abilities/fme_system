const express = require('express')
const Appointment = require('../controllers/appointment.js');

const validateToken = require('../utils').validateToken;

const appointmentRouter = express.Router();

// appointmentRouter.route("/register").post(validateToken, Appointment.register);

appointmentRouter.route("/membersList").get(validateToken, Appointment.membersList);
appointmentRouter.route("/getCurrentTimeslot").post(validateToken, Appointment.getCurrentTimeslot);
appointmentRouter.route("/handleLeave").post(validateToken, Appointment.handleLeave);
appointmentRouter.route("/addOrUpdateTimeslot").post(validateToken, Appointment.addOrUpdateTimeslot);
appointmentRouter.route("/removeTimeSlot").post(validateToken, Appointment.removeTimeSlot);
appointmentRouter.route("/bookAppointment").post(validateToken, Appointment.bookAppointment);
appointmentRouter.route("/fetchBookedAppointmentList").post(validateToken, Appointment.fetchBookedAppointmentList);
appointmentRouter.route("/getAppointedClientList").post(validateToken, Appointment.getAppointedClientList);

module.exports = appointmentRouter;