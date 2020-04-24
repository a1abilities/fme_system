import { validString, validNumber, validDecimalNumber, validFullLengthDecimalNumber, validEmail, validAlpha } from './Regex';
import {checkFutureDate, checkPastDate} from '../../../utils/datetime.js';

export default function validate(values) {
  let errors = {};
 
  // if(!values.date){
  //   errors.date = 'Delivery Date is Required';
  // }

  // if(!values.start_time){
  //   errors.start_time = 'Start Time is Required';
  // }

  // if(!values.end_time){
  //   errors.start_time = 'Start Time is Required';
  // }
  return errors;
};