import { validString, validNumber, validDecimalNumber, validFullLengthDecimalNumber, validEmail, validAlpha } from './Regex';

export default function validate(values) {
  let errors = {};
  console.log('values',values);

  if(values.surplus == ""){
    errors.surplus = 'Surplus is required';
  }else if (Number(values.surplus) <= 0 ) {
    errors.surplus = 'Total surplus should be greater than zero';
  } 
  if(values.afford_amt == "" || values.afford_amt <= 0){
    errors.afford_amt = 'Afford Amt is required';
  }else if (Number(values.afford_amt)  > Number(values.surplus) ) {
    errors.afford_amt = 'Afford Amt should be less than surplus amt';
  } 
  if(!values.paid_day){
    errors.paid_day = 'Paid Day is required';    
  }
  if(!values.debited_day){
    errors.debited_day = 'Debited Day is Required';
  }  
  return errors;
};