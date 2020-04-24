import { validString, validNumber, validDecimalNumber, validFullLengthDecimalNumber, validEmail, validAlpha } from './Regex';
import {checkFutureDate, checkPastDate} from '../../../utils/datetime.js';

export default function validate(values) {
  let errors = {};
 
  if(!values.appointment_date){
    errors.date = 'Date is Required';
  }

  if(!values.start_time || !values.end_time){
    errors.start_time = 'Please select appointment time';
    errors.end_time = 'Please select appointment time';
    alert('Please select appointment time');
  }

  if(!values.meeting_time){
    errors.meeting_time = 'Meeting Time is Required';
  }


  if (!values.first_name) {
    errors.first_name = 'First Name is required';
  } else if (!validString.test(values.first_name)) {
    errors.first_name = 'Special characters & numbers are not allowed';
  }

  if (!values.last_name) {
    errors.last_name = 'Last Name is required';
  } else if (!validString.test(values.last_name)) {
    errors.last_name = 'Special characters & numbers are not allowed';
  }

  
  if (!values.contact) {
    errors.contact = 'Contact number is required';
  } else if (!validNumber.test(values.contact)) {
    errors.contact = 'Contact number is invalid';
  } else if ((values.contact).length<10) {
    errors.contact = 'Contact number should be 10 digits';
  }

  if(!values.meeting_time){
    errors.meeting_time = 'Meeting Time is Required';
  }

  return errors;
};