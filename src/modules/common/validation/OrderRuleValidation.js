import { validString, validNumber, validEmail, validAlpha } from './Regex';

export default function validate(values) {
  let errors = {};
  
  if (!values.payment_mode) {
    errors.payment_mode = 'Payment Mode is required';
  }
  if (!values.customer_type) {
    errors.customer_type = 'Customer is required';
  } 
  // if (!values.main_category) {
  //   errors.main_category = 'Main Category is required';
  // }
  
  // if (!values.category) {
  //   errors.category = 'Category is required';
  // }
  // if (!values.sub_category) {
  //   errors.sub_category = 'Sub Category is required';
  // }
  // if (!values.product) {
  //   errors.product = 'Product is required';
  // }
  if (!values.sales_type) {
    errors.sales_type = 'Sales Type is required';
  }
  if (!values.renting_for) {
    errors.renting_for = 'Field is required';
  }
  if (!values.order_type) {
    errors.order_type = 'Order Type is required';
  }
  if (!values.customer_type) {
    errors.order_type = 'Order Type is required';
  }
  if (!values.sales_person_id) {
    errors.sales_person_id = 'Sales Person is required';
  }
  if (!values.ezidebit_uid) {
    errors.ezidebit_uid = 'EziDebit UID is required';
  }
  
  return errors;
};