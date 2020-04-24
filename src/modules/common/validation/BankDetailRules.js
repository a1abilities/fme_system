import { validString, validNumber, validEmail, validAlpha } from './Regex';

export default function validate(values) {
  let errors = {};

  if (values.acc_holder_name=="") {
    errors.acc_holder_name = 'Account Holder Name is required';
  }else if(!validString.test(values.acc_holder_name)){
    errors.acc_holder_name = 'Account Holder Name is invalid';
  }

  if (!values.institution_name) {
    errors.institution_name = 'Institution Name is required';
  } else if(!validString.test(values.institution_name)){
    errors.institution_name = 'Institution Name is invalid';
  }

  if (!values.bank_branch) {
    errors.bank_branch = 'Branch Name is required';
  } else if(!validString.test(values.bank_branch)){
    errors.bank_branch = 'Branch Name is invalid';
  }

  if (!values.bank_address) {
    errors.bank_address = 'Bank Address is required';
  } 

  if (!values.bank_code) {
    errors.bank_code = 'Bank Code is required';
  } else if((values.bank_code).length < 2){
    errors.bank_code = 'Bank Code is required';
  }

  if (!values.branch_number) {
    errors.branch_number = 'Branch Nubmer is required';
  } else if((values.branch_number).length < 4){
    errors.branch_number = 'Branch Nubmer is required';
  }

  if (!values.acc_number) {
    errors.acc_number = 'Account Number is required';
  } else if((values.acc_number).length < 7){
    errors.acc_number = 'Account Number is required';
  }

  if (!values.suffix) {
    errors.suffix = 'Suffix is required';
  } else if((values.suffix).length < 2){
    errors.suffix = 'Suffix is required';
  }

  

  return errors;
};