import { validString, validNumber, validDecimalNumber, validFullLengthDecimalNumber, validEmail, validAlpha } from './Regex';

export default function validate(values) {
  let errors = {};
  if (!values.name) {
    errors.name = 'Product Title/Name is required';
  }

  if (!values.color_id) {
    errors.color_id = 'Color is required';
  } 
  else if (values.color_id==0) {
    errors.color_id = 'Color is required';
  }
  
  if (!values.brand_id) {
    errors.brand_id = 'Brand is required';
  } 
  else if (values.brand_id==0) {
    errors.brand_id = 'Brand is required';
  }

  if (!values.buying_price) {
    errors.buying_price = 'Product Buying Price is required';
  } else if (!validFullLengthDecimalNumber.test(values.buying_price)) {
    errors.buying_price = 'Product Buying Price is invalid';
  }
  if (!values.description) {
    errors.description = 'Product Description is required';
  }

  if (!values.specification) {
    errors.specification = 'Product Specification is required';
  }
  
  if (!values.brought) {
    errors.brought = 'Brought From is required';
  }
  
  if (!values.invoice) {
    errors.invoice = 'Invoice Number is required';
  } else if (!validAlpha.test(values.invoice)) {
    errors.invoice = 'Invoice Number is invalid';
  }
  
  // if (!values.meta_keywords) {
  //   errors.meta_keywords = 'Meta Keywords is required';
  // }
  // if (!values.meta_description) {
  //   errors.meta_description = 'Meta Description is required';
  // }
  
  if (!values.rental) {
    errors.rental = 'Rental Price is required';
  } else if (!validFullLengthDecimalNumber.test(values.rental)) {
    errors.rental = 'Rental Price is invalid';
  } else if(values.rental == 0) {
    errors.rental = 'Rental Price can not be zero';
  }
  if (!values.status) {
    errors.status = 'Status is required';
  } 

  return errors;
};