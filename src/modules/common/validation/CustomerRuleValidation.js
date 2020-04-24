import { validString, validNumber, validFullLengthDecimalNumber, validEmail, validAlpha } from './Regex';
import {checkFutureDate, checkPastDate} from '../../../utils/datetime.js';

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

  if (!values.address) {
    errors.address = 'Address is required';
  }

  if (!values.suburb) {
    errors.suburb = 'Suburb is required';
  } else if (!validString.test(values.suburb)) {
    errors.suburb = 'Special characters & numbers are not allowed';
  }
  
  if (!values.city) {
    errors.city = 'City is required';
  } else if (!validString.test(values.city)) {
    errors.city = 'Special characters & numbers are not allowed';
  }
  
  if (!values.postcode) {
    errors.postcode = 'Postcode is required';
  } else if (!validNumber.test(values.postcode)) {
    errors.postcode = 'Only digits are allowed';
  } else if ((values.postcode).length<4) {
    errors.postcode = 'Postcode should be 4 digits';
  } 

  if (values.telephone) {
    if (!validNumber.test(values.telephone)) {
      errors.telephone = 'Telephone number is invalid';
    } else if ((values.telephone).length<8) {
      errors.telephone = 'Telephone number should be between 8 to 12 digits';
    } 
  }
  
  if (!values.mobile) {
    errors.mobile = 'Mobile number is required';
  } else if (!validNumber.test(values.mobile)) {
    errors.mobile = 'Mobile number is invalid';
  } else if ((values.mobile).length<8) {
    errors.mobile = 'Mobile number should be between 8 to 12 digits';
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

  if (!values.gender) {
    errors.gender = 'Gender is required';
  } 
  
  if (!values.dob) {
    errors.dob = 'Date Of Birth is required';
  }else if(checkPastDate(values.dob)){
    errors.dob = 'Invalid date format';
  }
  
  if (values.id_type==='' ) {
    errors.id_type = 'ID Proof is required';
  }
  if(values.id_type===0){    
    if (!values.other_id_type) {
      errors.other_id_type = 'ID Type is required';
    }
  }

  if(values.id_type==2){
    if (!values.dl_version_number) {
      errors.dl_version_number = 'Version number is required';
    }else if( (values.dl_version_number).length <3 ){
      errors.dl_version_number = 'Version number should be 3 digits';
    }
  }

  if (!values.id_number) {
    errors.id_number = 'ID is required';
  }

  if (!values.is_working) {
    errors.is_working = 'Required';
  }

  // if (!values.expiry_date) {
  //   errors.expiry_date = 'Expiry Date is required';
  // }else
  if(checkFutureDate(values.expiry_date)){
    errors.expiry_date = 'Invalid date format';
  }

   
  if (!values.alt_c1_name) {
    errors.alt_c1_name = 'Name is required';
  } else if (!validString.test(values.alt_c1_name)) {
    errors.alt_c1_name = 'Special characters & numbers are not allowed';
  }

  if (!values.alt_c1_address) {
    errors.alt_c1_address = 'Address is required';
  } 

  if (!values.alt_c1_contact) {
    errors.alt_c1_contact = 'Contact number is required';
  } else if (!validNumber.test(values.alt_c1_contact)) {
    errors.alt_c1_contact = 'Contact number is invalid';
  } else if ((values.alt_c1_contact).length<8) {
    errors.alt_c1_contact = 'Contact number should be between 8 to 12 digits';
  }
  
  if (!values.alt_c1_relation) {
    errors.alt_c1_relation = 'Relationship is required';
  } else if (!validString.test(values.alt_c1_relation)) {
    errors.alt_c1_relation = 'Special characters & numbers are not allowed';
  }
  
  if (!values.alt_c2_name) {
    errors.alt_c2_name = 'Name is required';
  } else if (!validString.test(values.alt_c2_name)) {
    errors.alt_c2_name = 'Special characters & numbers are not allowed';
  }
  
  if (!values.alt_c2_address) {
    errors.alt_c2_address = 'Address is required';
  } 

  if (!values.alt_c2_contact) {
    errors.alt_c2_contact = 'Contact number is required';
  } else if (!validNumber.test(values.alt_c2_contact)) {
    errors.alt_c2_contact = 'Contact number is invalid';
  } else if ((values.alt_c2_contact).length<8) {
    errors.alt_c2_contact = 'Contact number should be between 8 to 12 digits';
  }
  
  if (!values.alt_c2_relation) {
    errors.alt_c2_relation = 'Relationship is required';
  } else if (!validString.test(values.alt_c2_relation)) {
    errors.alt_c2_relation = 'Special characters & numbers are not allowed';
  }
  
  if (!values.employer_name) {
    errors.employer_name = 'Employer Name is required';
  } else if (!validAlpha.test(values.employer_name)) {
    errors.employer_name = 'Special characters & numbers are not allowed';
  } 

  
  // if (!values.employer_address) {
  //   errors.employer_address = 'Address is required';
  // } 
  
  if (values.employer_telephone) {
    if (!validNumber.test(values.employer_telephone)) {
      errors.employer_telephone = 'Telephone number is invalid';
    } else if ((values.employer_telephone).length<8) {
      errors.employer_telephone = 'Telephone number should be between 8 to 12 digits';
    }  
  } 
  
  if (values.employer_email) {
    if (!validEmail.test(values.employer_email)) {
      errors.employer_email = 'Email is invalid';
    } else if(preErrors.employer_email === 'Email already registered'){
      errors.employer_email = 'Email already registered';
    }
  }
 
  if (!values.employer_tenure) {
    errors.employer_tenure = 'Tenure of Employer is required';
  }  else if (!validFullLengthDecimalNumber.test(values.employer_tenure)) {
    errors.employer_tenure = 'Tenure of Employer is invalid';
  }

  if (!values.id_proof) {
    errors.id_proof = 'Identity Document is required';
  }

  return errors;
};