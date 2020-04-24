import { validString, validNumber, validDecimalNumber, validFullLengthDecimalNumber, validEmail, validAlpha } from './Regex';

export default function validate(values) {
  let errors = {};

  
  if (!values.product_brand) {
    errors.product_brand = 'Product Brand is required';
  }
  if (!values.product_color) {
    errors.product_color  = 'Product Color is required';
  } else if (!validString.test(values.product_color )) {
    errors.product_color  = 'Product Color is invalid';
  } 
  if (!values.product_cost) {
    errors.product_cost  = 'Product Cost is required';
  } 
  // else if (validFullLengthDecimalNumber.test(values.product_cost )) {
  //   errors.product_cost  = 'Product Cost is invalid';
  // } 
  
  if (!values.specification) {
    errors.specification = 'Specification is required';
  }

  if (!values.invoice_number) {
    errors.invoice_number = 'Invoice number is required';
  }

  if (!values.delivery_date) {
    errors.delivery_date = 'Delivery date is required';
  }
  if (!values.purchase_from) {
    errors.purchase_from = 'Purchase from  is required';
  }
  // if (!values.comment) {
  //   errors.comment = 'comment is required';
  // }
  
  return errors;
};