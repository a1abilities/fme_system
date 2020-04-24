import { validString, validNumber, validDecimalNumber, validFullLengthDecimalNumber, validEmail, validAlpha } from './Regex';

export default function validate(values) {
  let errors = {};

  
  if (!values.product_code) {
    errors.product_code = 'Product is required';
  }
  
  if (!values.product_state) {
    errors.product_state  = 'Product status is required';
  } 
  
  if (!values.comment) {
    errors.comment = 'Comment is required';
  }
  
  return errors;
};