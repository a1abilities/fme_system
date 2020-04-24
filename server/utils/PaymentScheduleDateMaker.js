const addSubtractDate = require("add-subtract-date");
const moment = require('moment');

const dateMaker = (date, frequency) =>{
  const payDate = new Date(date);

  if(frequency === 1){    
    return moment((addSubtractDate.add(payDate, 1, "month"))).format("YYYY-MM-DD");
  }else if(frequency === 2){
    return moment((addSubtractDate.add(payDate, 14, "days"))).format("YYYY-MM-DD");
  }else if(frequency === 4){
    return moment((addSubtractDate.add(payDate, 7, "days"))).format("YYYY-MM-DD");
  }         
}
module.exports = { dateMaker};