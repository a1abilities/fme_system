import { validString, validNumber, validEmail, validAlpha } from './Regex';
import { object } from 'prop-types';

export default function validate(values, preErrors) {
  let errors = {};

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
  
  if (!values.location) {
    errors.location = 'Location is required';
  } 
  
  if (!values.contact) {
    errors.contact = 'Contact is required';
  } else if (!validNumber.test(values.contact)) {
    errors.contact = 'Contact is invalid';
  } else if ((values.contact).length<9) {
    errors.contact = 'Contact is invalid';
  }
  
  if (!values.email) {
    errors.email = 'Email Address is required';
  } else if (!validEmail.test(values.email)) {
    errors.email = 'Email Address is invalid';
  } else if (preErrors){
    if(preErrors.email === 'Email already registered'){
      errors.email = 'Email already registered';
    }
  }

  if (!values.password) {
    errors.password = 'Click here to get Password';
  }

  if (Object.values(values.position).length === 0) {
    errors.position = 'Position is required';
  }

  return errors;
};