import { validString, validNumber, validEmail, validAlpha } from './Regex';

export default function validate(values) {
  let errors = {};
  if (values.cancel_reason=="") {
    errors.cancel_reason = 'Reason is required';
  }
  if (!values.cancellation_charge) {
    errors.cancellation_charge = 'Cancellation Charge is required';
  } 
  if (!values.cancel_by) {
    errors.customer_contact = 'Field is required';
  } 
  
  return errors;
};