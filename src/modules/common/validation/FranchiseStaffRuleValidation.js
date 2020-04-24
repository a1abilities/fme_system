import { validString, validNumber, validDecimalNumber, validAlphaNumericwithDot, validEmail, validAlpha } from './Regex';

export default function validate(values, preErrors) {
  let errors = {};

  if (!values.first_name) {
    errors.first_name = 'First Name is required';
  } else if (!validString.test(values.first_name)) {
    errors.first_name = 'Special characters are not allowed';
  }

  if (!values.last_name) {
    errors.last_name = 'Last Name is required';
  } else if (!validString.test(values.last_name)) {
    errors.last_name = 'Special characters are not allowed';
  }
 
  
  if (!values.location) {
    errors.location = 'Location is required';
  } 

  if (!values.contact) {
    errors.contact = 'Contact number is required';
  } else if (!validNumber.test(values.contact)) {
    errors.contact = 'Contact number is invalid';
  } else if ((values.contact).length<9) {
    errors.contact = 'Contact number is invalid';
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

  if (Object.values(values.assign_role).length === 0) {
    errors.assign_role = 'Assign Role is required';
  }

  if (!values.pre_company_name) {
    errors.pre_company_name = 'Name of Previous Company is required';
  } 
  if (!values.pre_company_address) {
    errors.pre_company_address = 'Address of Previous Company is required';
  } 
  if (!values.pre_company_contact) {
    errors.pre_company_contact = 'Contact of Previous Company is required';
  } else if (!validNumber.test(values.pre_company_contact)) {
    errors.pre_company_contact = 'Contact of Previous Company is invalid';
  } else if ((values.pre_company_contact).length<9) {
    errors.pre_company_contact = 'Contact of Previous Company is invalid';
  }
  if (!values.pre_position) {
    errors.pre_position = 'Position/JobRole is required';
  } else if (!validString.test(values.pre_position)) {
    errors.pre_position = 'Special characters & numbers are not allowed';
  }
  if (!values.duration) {
    errors.duration = 'Work Experience is required';
  }  else if (!validDecimalNumber.test(values.duration)) {
    errors.duration = 'Only digits are allowed';
  }
  if (!values.password) {
    errors.password = 'Click here to get Password';
  } 
  
  return errors;
};