import { validString, validNumber, validEmail, validAlpha } from './Regex';

export default function validate(values) {
  let errors = {};
  if (values.franchise_id=="") {
    errors.franchise_id = 'Franchise is required';
  }
  if (!values.description) {
    errors.description = 'Description is required';
  } 
  if (!validString.test(values.customer_name)) {
    errors.customer_name = 'Customer Name is invalid';
  }

  if (!values.customer_contact) {
    errors.customer_contact = 'Contact number is required';
  } else if (!validNumber.test(values.customer_contact)) {
    errors.customer_contact = 'Contact number is invalid';
  } else if ((values.customer_contact).length<9) {
    errors.customer_contact = 'Contact number is invalid';
  }
  
  return errors;
};