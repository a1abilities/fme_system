import { validString, validNumber, validEmail, validAlpha } from './Regex';

export default function validate(values) {
  let errors = {};

  if (values.payment_rec_date =="" || values.payment_rec_date == null) {
    errors.payment_rec_date  = 'Date is required';
  }

  if (values.payment_amt =="" ) {
    errors.payment_amt = 'Payment Amount is required';
  }
  
  // if (values.comment =="" ) {
  //   errors.comment = 'Comment is required';
  // }


  return errors;
};