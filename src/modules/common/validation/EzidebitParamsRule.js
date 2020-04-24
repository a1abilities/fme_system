import { validString, validNumber, validEmail, validAlpha } from './Regex';

export default function validate(values) {
  let errors = {};
  
  if (!values.payment_type) {
    errors.payment_type = 'Payment Type is required';
  }

  if (!values.payment_method) {
    errors.payment_method = 'Payment Method is required';
  }

  if (!values.payment_source) {
    errors.payment_source = 'Payment Source is required';
  }

  if (values.date_field != 'NONE' &&
      (values.date_from == 'Invalid Date' || values.date_from == null || values.date_from == '' )
    ) {
    errors.date_from = 'Select  a valid date';
  }

  if (values.date_field != 'NONE' &&
      (values.date_to == 'Invalid Date' || values.date_to == null || values.date_to == '' )
    ) {
    errors.date_to = 'Select  a valid date';
  }
  
  // (values.date_to  !== 'Invalid Date' && values.date_to  !== '' && values.date_to  !== null )
  // // if((values.date_from === 'Invalid Date' || values.date_from === null || values.date_from === '' )){
  // //   if(values.date_field !== 'NONE'){
  // //     errors.date_from = 'A valid date is required with non NONE date field';
  // //   }
  // // }else{
  // //   if(values.date_field === 'NONE'){
  // //     errors.date_field = 'Choose a valid Date Field';
  // //   }
  // // }

  // // if((values.date_to  === 'Invalid Date' || values.date_to  === '' || values.date_to  === null )){
  // //   if(values.date_field !== 'NONE'){
  // //     errors.date_from = 'A valid date is required with non NONE date field';
  // //   }
  // // }else{
  // //   if(values.date_field === 'NONE'){
  // //     errors.date_field = 'Choose a valid Date Field';
  // //   }
  // // }

  // if (values.date_from === 'Invalid date') {
  //   errors.date_from = 'Date is invalid ';
  // }

  // if (values.date_to  === 'Invalid date' ) {
  //   errors.date_to = 'Date is invalid';
  // }


  return errors;
};