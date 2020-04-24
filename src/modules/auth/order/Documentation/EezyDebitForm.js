import { logo } from '../../../common/Logo.js';
import { eezyDebitLogo } from '../../../common/EezyDebitLogo.js';
import { checkBoxIcon } from '../../../common/CheckBoxIcon.js';

import { getDate, getCurrentDate, getDateInDDMMYYYY, getCurrentDateDDMMYYYY } from '../../../../utils/datetime';
import { styles } from './Styles.js';


export default function layout(data, order, formType) {

  const franchise = data.franchise;
  const products = data.product;
  const customer = data.customer[0];
  const orderType = data.orderType[0];
  const budget = data.budget[0];
  const user = data.user; 
  const bankDetail = data.bankDetail[0] ? data.bankDetail[0] :[];
  
  let eachPay = orderType.each_payment_amt + '.00'
  const eachPaymentAmt = eachPay.split('.')[0];
  const decimalEachPaymentAmt = eachPay.split('.')[1];
  const paymentDate = getDateInDDMMYYYY(orderType.first_payment);
  const currentDate = getCurrentDateDDMMYYYY().toString();

  let eziDebitFormType = formType;


  if(bankDetail.length == 0 || bankDetail == "" || bankDetail == undefined ||  bankDetail == []){
    eziDebitFormType = 0;
  }

  // console.log("data", data);
  // console.log('paymentDate',paymentDate);
  // console.log("data", data);
  console.log(orderType);
  // console.log(customer);
  // console.log(order);

  var dd = {
    content: 
      [
          {
            columns: [
              { text: 'AUTHORITY TO ACCEPT\nDIRECT DEBITS\n(not to operate as an assignment or agreement)\n\nAUTHORISATION CODE\n0227418', style: styles.EezyDebitHeader1 },
              { text: '\nRentronics Auckland South', fontSize: 12, bold: true, alignment: 'center'},
              { image: eezyDebitLogo, fit: [130, 130], alignment: 'right'},
            ],            
          },          
          {
            columns: [
              { text: '________________________________', },{},
              { text: '________________________________',  alignment: 'right'},
            ],            
          },
          {
            columns: [
              { text: 'DIRECT DEBIT REQUEST', fontSize: 13},
              { text: 'Ph: 0212727933', fontSize: 8,  alignment: 'center'},
              { text: 'NEW CUSTOMER FORM', fontSize: 13, alignment: 'right' },
            ], lineHeight: 1.5,
          },
          { fillColor: '#e5edd9',             
            table: {
              widths: ['1%','15%','34%','15%','34%','1%'], 
              body: [                  
                [
                  { text: 'YOUR DETAILS', fontSize: 10, bold: true, fillColor:'#c4dea4', colSpan: 2},{},
                  { text: '| Please complete this form using a BLACK PEN. * Indicates a MANDATORY FIELD', colSpan :4, fontSize: 8, fillColor:'#c4dea4'}, {},{},{},
                ],   
                [ {},
                  { text: 'Business:', fontSize: 7, bold: true,  }, 
                  { text: 'Kiwi Appliance Rental Ltd.', colSpan :2, fontSize: 7, }, {},
                  { text: '100-451-720', fontSize: 12, bold: true, alignment: 'right' }, 
                  {},
                ], 
                [
                  {},
                  { text: 'Customer Reference:', fontSize: 7, bold: true, },
                  { text: '', fillColor:'#ffffff'},
                  { text: '', colSpan:2}, 
                  {},{},
                ],  
                [
                  {},
                  { text: '* Surname: ', fontSize: 7, bold: true, }, 
                  { text: eziDebitFormType === 1 ? customer.last_name : '', fontSize: 7, fillColor:'#ffffff'},
                  { text: '* Given Name: ', fontSize: 7, bold: true, alignment: 'right'}, 
                  { text: eziDebitFormType === 1 ? customer.first_name : '', fontSize: 7, fillColor:'#ffffff'},
                  {},
                ],     
                [
                  {},
                  { text: '* Mobile #: ', fontSize: 7, bold: true, }, 
                  { text: eziDebitFormType=== 1 ? customer.mobile : '', fontSize:7,  fillColor:'#ffffff'},
                  { text: '', colSpan:2},                  
                  {},{},
                ],                  
                [
                  {},
                  { text: '* Email: ', fontSize: 7, bold: true, },                   
                  { text:  eziDebitFormType=== 1 ? customer.email : '', fontSize:7, colSpan:3, fillColor:'#ffffff'}, 
                  {},{},{},
                ],
                [
                  {},
                  { text: '* Address: ', fontSize: 7, bold: true, },                   
                  { text:  eziDebitFormType=== 1 ? customer.address : '', fontSize:7, colSpan:3, fillColor:'#ffffff'},                  
                  {},{},{},
                ],
                [
                  {},
                  { text: '* Suburb: ', fontSize: 7, bold: true, },                   
                  { text:  eziDebitFormType=== 1 ? (customer.suburb != null&& customer.suburb != undefined ? customer.suburb : '') : '', fillColor:'#ffffff',  fontSize: 7,},
                  { text: '* Postcode: ', fontSize: 7, bold: true, alignment: 'right'},              
                  {
                    table:{
                      widths: ['10%','10%','10%','10%','*'], 
                      body: [                  
                        [
                          { text: eziDebitFormType=== 1 ? customer.postcode.split('')[0] :'', alignment:'center', fontSize:7, fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? customer.postcode.split('')[1] :'', alignment:'center', fontSize:7, fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? customer.postcode.split('')[2] :'', alignment:'center', fontSize:7, fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? customer.postcode.split('')[3] :'', alignment:'center', fontSize:7, fillColor:'#ffffff'},
                          { text:'', fillColor:'#e5edd9'}
                        ], 
                      ],
                    },
                    layout:{
                      paddingTop:  function(i, node) { return 8; },
                      paddingBottom: function(i, node) { return 8; },
                      vLineWidth :  function(i, node) { return 2},                      
                      vLineColor: function (i, node) { return '#e5edd9' },
                      hLineColor: function (i, node) { return '#e5edd9' },
                    }
                  },
                  {},
                ],
              ],
            },            
            layout: {
              paddingTop:  function(i, node) { return 4; },
              paddingBottom: function(i, node) { return 4; },
              vLineWidth :  function(i, node) { return 0},
              hLineWidth :  function(i, node) { return (i===0 || i===1 ) ? 1 : 6 },
              hLineColor: function (i, node) {
                return (i === 1 ) ? '#619d5a' : '#e5edd9';
              },
              // vLineColor: function (i, node) {                
              //   return (i === 1) ? '#619d5a' : '#e5edd9';
              // },
            }, 
          },
          '\n',
          { fillColor: '#e5edd9',
            table: {
              widths: ['1%','20%','35%','43%','1%'],
              body: [                  
                [                  
                  { text: 'DEBIT ARRANGEMENT', fontSize: 10, bold: true, colSpan : 2, fillColor:'#c4dea4',},{},
                  { text: 'Including payment details and associated fees/charges detailed below and/or the total amount billed for the specified period for this and any other subsequent agreements or amendments between me/us and the Business and/or Ezidebit', colSpan :3, fontSize: 7, fillColor:'#c4dea4'}, {},{}
                ],
                [  
                  {},
                  {
                    table:{
                      widths: ['5%','95%'], 
                      body: [                  
                        [
                          { text:'', fillColor:'#ffffff',},
                          // { text:'', fillColor:'#e5edd9', border: [false, false, false, false]},
                          { text:'Once Only Debit', fontSize: 7, fillColor:'#e5edd9', bold: true, border: [false, false, false, false]}
                        ],  
                      ],
                    },                     
                  },                  
                  { alignment:'left',
                    table:{
                    widths: ['60%','6%','6%','2%','6%','6%','2%','6%','6%'],
                    body: [                  
                      [
                        { text:'On Date: ', fontSize: 7, fillColor:'#e5edd9', bold: true, },
                        { text:'', fillColor:'#ffffff'}, 
                        { text:'', fillColor:'#ffffff'},
                        { text:'/', fillColor:'#e5edd9'},
                        { text:'', fillColor:'#ffffff'},
                        { text:'', fillColor:'#ffffff'},
                        { text:'/', fillColor:'#e5edd9'},
                        { text:'', fillColor:'#ffffff'},
                        { text:'', fillColor:'#ffffff'},
                      ],  
                      [
                        {},
                        { text:'D', fontSize:6, fillColor:'#e5edd9', alignment: 'center'}, 
                        { text:'D', fontSize:6, fillColor:'#e5edd9', alignment: 'center'},
                        {},                        
                        { text:'M', fontSize:6, fillColor:'#e5edd9', alignment: 'center'},
                        { text:'M', fontSize:6, fillColor:'#e5edd9', alignment: 'center'},
                        {},                        
                        { text:'Y', fontSize:6, fillColor:'#e5edd9', alignment: 'center'},
                        { text:'Y', fontSize:6, fillColor:'#e5edd9', alignment: 'center'},
                      ],
                    ],
                    },
                    layout:{
                      vLineWidth :  function(i, node) { return 3},
                      // paddingTop:  function(i, node) { return 4; },
                      // paddingBottom: function(i, node) { return 4; },              
                      vLineColor: function (i, node) { return '#e5edd9' },
                      hLineColor: function (i, node) { return '#e5edd9' },
                    }
                  },
                  {
                    table:{
                      widths: ['66%','4%','4%','4%','4%','4%','4%','2%','4%','4%'],
                      body: [                  
                        [
                          { text:'Debit this amount: $ ', fontSize: 7, fillColor:'#e5edd9', bold: true, },
                          { text:'', fillColor:'#ffffff'}, 
                          { text:'', fillColor:'#ffffff'}, 
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'.', fillColor:'#e5edd9'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                        ],                          
                      ],
                      },
                      layout:{
                        vLineWidth :  function(i, node) { return 3},
                        // paddingTop:  function(i, node) { return 4; },
                        // paddingBottom: function(i, node) { return 4; },              
                        vLineColor: function (i, node) { return '#e5edd9' },
                        hLineColor: function (i, node) { return '#e5edd9' },
                      }
                  },
                  {},
                ],  
                [
                    
                  {},
                  {
                    table:{
                      widths: ['5%','95%'], 
                      body: [                  
                        [
                          { text:'', fillColor: eziDebitFormType=== 1 ? '#000000' : '#ffffff', },
                          { text:'Regular Debits', fontSize: 7, fillColor:'#e5edd9', bold: true, border: [false, false, false, false]}
                        ],  
                      ],
                    },                     
                  },                  
                  { alignment:'left',
                    table:{
                    widths: ['60%','6%','6%','2%','6%','6%','2%','6%','6%'],
                    body: [                  
                      [
                        { text:'Starting On Date: ', fontSize: 7, fillColor:'#e5edd9', bold: true, },
                        { text: eziDebitFormType=== 1 ? paymentDate.split('-')[0].split('')[0] :'', fontSize: 7,  alignment:'center', fillColor:'#ffffff'}, 
                        { text: eziDebitFormType=== 1 ? paymentDate.split('-')[0].split('')[1] :'', fontSize: 7,  alignment:'center', fillColor:'#ffffff'},
                        { text:'/',  fillColor:'#e5edd9'},
                        { text: eziDebitFormType=== 1 ? paymentDate.split('-')[1].split('')[0] :'', fontSize: 7,  alignment:'center', fillColor:'#ffffff'},
                        { text: eziDebitFormType=== 1 ? paymentDate.split('-')[1].split('')[1] :'', fontSize: 7,  alignment:'center', fillColor:'#ffffff'},
                        { text:'/', fillColor:'#e5edd9'},
                        { text: eziDebitFormType=== 1 ? paymentDate.split('-')[2].split('')[2] :'', fontSize: 7,  alignment:'center', fillColor:'#ffffff'},
                        { text: eziDebitFormType=== 1 ? paymentDate.split('-')[2].split('')[3] :'', fontSize: 7,  alignment:'center', fillColor:'#ffffff'},
                      ],  
                      [
                        {},
                        { text:'D', fontSize:6, fillColor:'#e5edd9', alignment: 'center'}, 
                        { text:'D', fontSize:6, fillColor:'#e5edd9', alignment: 'center'},
                        {},                        
                        { text:'M', fontSize:6, fillColor:'#e5edd9', alignment: 'center'},
                        { text:'M', fontSize:6, fillColor:'#e5edd9', alignment: 'center'},
                        {},                        
                        { text:'Y', fontSize:6, fillColor:'#e5edd9', alignment: 'center'},
                        { text:'Y', fontSize:6, fillColor:'#e5edd9', alignment: 'center'},
                      ],
                    ],
                    },
                    layout:{
                      vLineWidth :  function(i, node) { return 3},
                      vLineColor: function (i, node) { return '#e5edd9' },
                      hLineColor: function (i, node) { return '#e5edd9' },
                    }
                  },
                  {
                    table:{
                      widths: ['66%','4%','4%','4%','4%','4%','4%','2%','4%','4%'],                      
                      body: [                  
                        [
                          { text:'Debit this amount: $ ', fontSize: 7, fillColor:'#e5edd9', bold: true, },
                          { text: eziDebitFormType=== 1 ? eachPaymentAmt.split('')[eachPaymentAmt.split('').length - 6] :'', alignment:'center', bold:true, fontSize: 8, fillColor:'#ffffff'}, 
                          { text: eziDebitFormType=== 1 ? eachPaymentAmt.split('')[eachPaymentAmt.split('').length - 5] :'', alignment:'center', bold:true,  fontSize: 8, fillColor:'#ffffff'}, 
                          { text: eziDebitFormType=== 1 ? eachPaymentAmt.split('')[eachPaymentAmt.split('').length - 4] :'', alignment:'center', bold:true,  fontSize: 8,fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? eachPaymentAmt.split('')[eachPaymentAmt.split('').length - 3] :'', alignment:'center', bold:true,  fontSize: 8, fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? eachPaymentAmt.split('')[eachPaymentAmt.split('').length - 2] :'', alignment:'center', bold:true,  fontSize: 8, fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? eachPaymentAmt.split('')[eachPaymentAmt.split('').length - 1] :'', alignment:'center', bold:true,  fontSize: 8, fillColor:'#ffffff'},
                          { text:'.', fillColor:'#e5edd9'},
                          { text: eziDebitFormType=== 1 ? decimalEachPaymentAmt.split('')[0] :'', fontSize: 8, alignment:'center',  bold:true,  fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? decimalEachPaymentAmt.split('')[1] :'', fontSize: 8,alignment:'center',  bold:true,  fillColor:'#ffffff'},
                        ],                          
                      ],
                      },
                      layout:{
                        vLineWidth :  function(i, node) { return 3},
                        vLineColor: function (i, node) { return '#e5edd9' },
                        hLineColor: function (i, node) { return '#e5edd9' },
                      }
                  },
                  {},
                ], 
                [
                  {},
                  {
                    table:{
                      widths: ['5%','19%','1%','19%','1%','19%','1%','19%','1%','19%',],
                      body: [                 
                        [
                          { text:'', border: [false, false, false, false]},
                          { text:'Frequency:', fontSize: 8, fillColor:'#e5edd9', bold: true, border: [false, false, false, false]},                          
                          { text:'', fillColor: eziDebitFormType=== 1 && (orderType.frequency === 4 ? '#000000' : '#ffffff')},
                          { text:'Weekly', fontSize: 7, fillColor:'#e5edd9', bold: true, border: [false, false, false, false]},
                          { text:'', fillColor: eziDebitFormType=== 1 && (orderType.frequency === 2 ? '#000000' : '#ffffff')},
                          { text:'Fortnightly', fontSize: 7, fillColor:'#e5edd9', bold: true, border: [false, false, false, false]},
                          { text:'', fillColor: eziDebitFormType=== 1 && (orderType.frequency === 1 ? '#000000' : '#ffffff')},
                          { text:'Monthly', fontSize: 7, fillColor:'#e5edd9', bold: true, border: [false, false, false, false]},
                          { text:'', fillColor: '#ffffff'},
                          { text:'4 Weekly', fontSize: 7, fillColor:'#e5edd9', bold: true, border: [false, false, false, false]},
                        ],  
                      ],
                    }, colSpan:3,
                  },                                  
                  {},                
                  {},                
                  {},                
                ],
                [
                  {},
                  { 
                    table:{
                      widths: ['5%','18%','1%','43%','1%','1%','1%','*'],
                      body: [                 
                        [
                          { text:'', border: [false, false, false, false]},
                          { text:'Duration:', fontSize: 8, fillColor:'#e5edd9', bold: true, border: [false, false, false, false]},
                          { text:'', fillColor: eziDebitFormType=== 1 ? '#000000' : '#ffffff'},
                          { text:'Continue regular debits until further notice (minimum of ', fontSize: 7, fillColor:'#e5edd9', bold: true, border: [false, false, false, false]},
                          { text: eziDebitFormType=== 1 ? order.order_type === 1 ? orderType.no_of_payment.toString().split('')[0] : '' :'', fillColor:'#ffffff', fontSize: 7, bold:true},
                          { text: eziDebitFormType=== 1 ? order.order_type === 1 ? orderType.no_of_payment.toString().split('')[1] : '' :'', fillColor:'#ffffff',fontSize: 7, bold:true},
                          { text: eziDebitFormType=== 1 ? order.order_type === 1 ? orderType.no_of_payment.toString().split('')[2] : '' :'', fillColor:'#ffffff',fontSize: 7,bold:true  },
                          { text:'Debits)', fontSize: 7, fillColor:'#e5edd9', bold: true, border: [false, false, false, false]},
                        ],  
                      ],
                    }, colSpan:3,
                  },
                  {},                
                  {},                
                  {},                
                ],                
                [
                  {},
                  { 
                    table:{
                      widths: ['15%','7%','13%','7%','13%','27%','8%','*'],
                      body: [                 
                        [
                          { text:'Administration Fee\n(Once Only)\nup to:', alignment: 'center', bold: true, fontSize:7, fillColor: '#ffffff'},
                          { text:'Paid by Business:', fontSize: 7, alignment: 'center', fillColor: '#ffffff' },
                          { text:'Bank Card Transaction Fee:', fontSize: 7, alignment: 'center',  bold: true, fillColor: '#ffffff' },
                          { text:'Paid by Business:', fontSize: 7, alignment: 'center', fillColor: '#ffffff' },
                          { text:'Credit Card Transaction Fee:', fontSize: 7, alignment: 'center',  bold: true, fillColor: '#ffffff' },
                          { text:'VISA/Mastercard: Paid by Business\nAMEX/Diners: N/A', fontSize: 7, alignment: 'center', fillColor: '#ffffff' },
                          { text:'Failed Payment Fee: ', fontSize: 7, alignment: 'center',  bold: true, fillColor: '#ffffff' },
                          { text:'$14.95', fontSize: 7, alignment: 'center', fillColor: '#ffffff'  },
                        ],  
                      ],
                    }, colSpan:3,
                    layout:{
                      hLineColor: function(i, node) {return '#e5edd9'},
                      vLineWidth : function(i, node) {return 2},
                      vLineColor : function(i, node) {return i===4 ? '#619d5a' : '#e5edd9'},
                    },
                  },
                  {},                
                  {},                
                  {},
                                                  
                ]
              ],
            },            
            layout: {
              paddingTop:  function(i, node) { return 4; },
              paddingBottom: function(i, node) { return 4; },              
              vLineWidth :  function(i, node) { return 0},
              hLineWidth :  function(i, node) { return (i===0 || i===1 ) ? 1 : 6 },
              hLineColor: function (i, node) {
                return (i === 1 ) ? '#619d5a' : '#e5edd9';
              },              
            }, 
          },



          '\n',
          { fillColor: '#e5edd9',
            table: {
              widths: ['*'],
              body: [                  
                [                  
                  { text: 'CHOOSE YOUR PAYMENT METHOD', fontSize: 10, bold: true, fillColor:'#c4dea4',}
                ],
                [  
                  {
                    table:{
                      widths: ['1%','1%','30%','1%','20%','1%','*'],
                      body: [                  
                        [
                          { text:'', border: [false, false, false, false]},
                          { text:'', fillColor:'#ffffff',},
                          { text:'Debit from Credit Card    -', fontSize: 7, border: [false, false, false, false]},
                          { text:'', fillColor:'#ffffff', },
                          { text:'VISA', fontSize: 7, border: [false, false, false, false]},
                          { text:'', fillColor:'#ffffff',},
                          { text:'MasterCard', fontSize: 7,border: [false, false, false, false]},
                        ],  
                      ],
                    },                     
                  },                  
                ], 
                [  
                  {
                    table:{
                      widths: ['8%','20%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','25%','2%','2%','2%','2%','2%','*'],
                      body: [                  
                        [
                          {}, { text:'Card Number: ', fontSize: 7},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          {},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          {},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          {},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          {},
                          { text:'Expiry Date: ', fontSize: 7, alignment: 'right'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'/', fontSize: 7, alignment: 'center'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          {},
                        ],  
                      ],
                    },  
                    layout:{
                      hLineColor :  function(i, node) { return '#e5edd9'},
                      vLineColor :  function(i, node) { return '#e5edd9'},
                      vLineWidth :  function(i, node) { return 2},
                    },                  
                  },                  
                ], 
                [  
                  {
                    table:{
                      widths: ['8%','30%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','*'],
                      body: [                  
                        [
                          {}, { text:'Name of Cardholder: ', fontSize: 7},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          {},
                        ],
                        [ {},
                          {text: 'By signing this form, I/we authorize Ezidebit (NZ) Limited, acting on behalf of the Business, to debit payments from the specified Credit Card above, and I/we acknowledge that Ezidebit will appear as the merchant on my credit card statement.', fontSize:6, colSpan: 30},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
                        ]  
                      ],
                    },  
                    layout:{
                      hLineColor :  function(i, node) { return '#e5edd9'},
                      vLineColor :  function(i, node) { return '#e5edd9'},
                      vLineWidth :  function(i, node) { return 2},
                    },                  
                  },                  
                ], 
                [  
                  {
                    table:{
                      widths: ['1%','1%','*'],
                      body: [                  
                        [
                          { text:'', border: [false, false, false, false]},
                          { text:'', fillColor: eziDebitFormType=== 1 ?  '#000000' :'#ffffff',},
                          { text:'Details of the Account to be Debited', fontSize: 7, border: [false, false, false, false]},                          
                        ],  
                      ],
                    },                     
                  },                  
                ], 
                [  
                  {
                    table:{
                      widths: ['4%','10%','40%','15%','*'],
                      body: [                  
                        [
                          { text:'', },                          
                          { text:'Financial Institution: ', fontSize: 7, },
                          { text: eziDebitFormType === 1 && (bankDetail.institution_name != null ? bankDetail.institution_name :''), fillColor:'#ffffff', fontSize: 7, bold: true,},
                          { text:'Branch: ', fontSize: 7, },
                          { text: eziDebitFormType=== 1 ? bankDetail.bank_branch :'',  fontSize: 7, bold: true,fillColor:'#ffffff',},
                        ],  
                      ],
                    },
                    layout:{
                      hLineColor: function(i, node){ return '#e5edd9' },
                      vLineColor: function(i, node){ return '#e5edd9' }
                    },                    
                  },                  
                ], 
                [  
                  {
                    table:{
                      widths: ['8%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','*'],
                      body: [                  
                        [
                          {},
                          { text: eziDebitFormType=== 1 ? bankDetail.bank_code.toString().split('')[0] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff',},
                          { text: eziDebitFormType=== 1 ? bankDetail.bank_code.toString().split('')[1] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff',},
                          { text:'-', fontSize: 8, alignment: 'center'},
                          { text: eziDebitFormType=== 1 ? bankDetail.branch_number.toString().split('')[0] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff',},
                          { text: eziDebitFormType=== 1 ? bankDetail.branch_number.toString().split('')[1] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff',},
                          { text: eziDebitFormType=== 1 ? bankDetail.branch_number.toString().split('')[2] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff',},
                          { text: eziDebitFormType=== 1 ? bankDetail.branch_number.toString().split('')[3] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff',},
                          {},
                          {},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_number.toString().split('')[0] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff',},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_number.toString().split('')[1] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff',},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_number.toString().split('')[2] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff',},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_number.toString().split('')[3] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff',},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_number.toString().split('')[4] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff',},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_number.toString().split('')[5] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff',},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_number.toString().split('')[6] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff',},
                          {},
                          { text: eziDebitFormType=== 1 ? bankDetail.suffix.toString().split('')[0] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff',},
                          { text: eziDebitFormType=== 1 ? bankDetail.suffix.toString().split('')[1] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff',},
                          { text: eziDebitFormType=== 1 ? bankDetail.suffix.toString().split('')[2] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff',}, 
                          {},
                        ],  
                        [
                          {},
                          { text:'Bank', colSpan: 3, fontSize: 7},{},{},
                          { text:'Branch', colSpan: 6, fontSize: 7},{},{},{},{},{},
                          { text:'Account', colSpan: 8, fontSize: 7},{},{},{},{},{},{},{},
                          { text:'Suffix', colSpan: 3, fontSize: 7},{},{},
                          {},
                        ],
                      ],
                    },
                    layout:{
                      vLineWidth: function(i, node){ return 3},
                      hLineColor: function(i, node){ return '#e5edd9' },
                      vLineColor: function(i, node){ return '#e5edd9' },
                      padding:  function(i, node){ return 1 },
                    },                    
                  },                  
                ],                
                [  
                  {
                    table:{
                      widths: ['8%','35%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','*'],
                      body: [                  
                        [
                          {}, { text:'Account Holder Name: ', fontSize: 7},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_holder_name.toUpperCase().split('')[0] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_holder_name.toUpperCase().split('')[1] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_holder_name.toUpperCase().split('')[2] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_holder_name.toUpperCase().split('')[3] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_holder_name.toUpperCase().split('')[4] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_holder_name.toUpperCase().split('')[5] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_holder_name.toUpperCase().split('')[6] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_holder_name.toUpperCase().split('')[7] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_holder_name.toUpperCase().split('')[8] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_holder_name.toUpperCase().split('')[9] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_holder_name.toUpperCase().split('')[10] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_holder_name.toUpperCase().split('')[11] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_holder_name.toUpperCase().split('')[12] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_holder_name.toUpperCase().split('')[13] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_holder_name.toUpperCase().split('')[14] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_holder_name.toUpperCase().split('')[15] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_holder_name.toUpperCase().split('')[16] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_holder_name.toUpperCase().split('')[17] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_holder_name.toUpperCase().split('')[18] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_holder_name.toUpperCase().split('')[19] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_holder_name.toUpperCase().split('')[20] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_holder_name.toUpperCase().split('')[21] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_holder_name.toUpperCase().split('')[22] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_holder_name.toUpperCase().split('')[23] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_holder_name.toUpperCase().split('')[24] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_holder_name.toUpperCase().split('')[25] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_holder_name.toUpperCase().split('')[26] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff'},
                          { text: eziDebitFormType=== 1 ? bankDetail.acc_holder_name.toUpperCase().split('')[27] :'', fontSize: 7, bold: true, alignment: 'center', fillColor:'#ffffff'},
                          {},
                        ],                         
                      ],
                    },  
                    layout:{
                      hLineColor :  function(i, node) { return '#e5edd9'},
                      vLineColor :  function(i, node) { return '#e5edd9'},
                      vLineWidth :  function(i, node) { return 2},
                    },                  
                  },                  
                ], 
                [  
                  {
                    table:{
                      widths: ['18%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','2%','*'],
                      body: [  
                        [
                          {},
                          { text:'Payer Particulars', fontSize: 7, colSpan: 12},{},{},{},{},{},{},{},{},{},{},{},
                          {},
                          { text:'Payer Code', fontSize: 7, colSpan: 12},{},{},{},{},{},{},{},{},{},{},{},
                          {},
                          { text:'Payer Reference', fontSize: 7, colSpan: 12},{},{},{},{},{},{},{},{},{},{},{},
                          {},
                        ],                 
                        [
                          {},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          {},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          {},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},                          
                          { text:'', fillColor:'#ffffff'},
                          { text:'-', fontSize:8},
                        ], 
                        [ {},
                          {text: 'I/we authorise you until further notice to debit my/our account with all amount which EZIDEBIT (NZ) LIMITED, the registered initiator of the above Authorisation Codes, may initiate by Direct Debit. I/we acknowledge and accept that the bank accepts this authority only upon the conditions listed on the reverse of this form.', fontSize:6, colSpan: 39},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
                        ]                      
                      ],
                    },  
                    layout:{
                      hLineColor :  function(i, node) { return '#e5edd9'},
                      vLineColor :  function(i, node) { return '#e5edd9'},
                      vLineWidth :  function(i, node) { return 2},
                    },                  
                  },                  
                ], 
              ],
            },            
            layout: {
              // paddingTop:  function(i, node) { return 2; },
              // paddingBottom: function(i, node) { return 2; },
              vLineWidth :  function(i, node) { return 0},
              hLineWidth :  function(i, node) { return (i===0 || i===1 ) ? 1 : 6 },
              hLineColor :  function(i, node) { return (i === 1 ) ? '#619d5a' : '#e5edd9'},
            },             
          },
          '\n',
          {
            table:{
              widths: ['40%','40%','20%'],
              body: [ 
                [                  
                  { fillColor: '#e5edd9',
                    table:{
                      widths: ['40%','60%'],
                      body: [ 
                        [                           
                          { text:'Signature(s) of Nominated Account: \n', fontSize: 7, border: [false, false, false, false]},
                          { text:'', fillColor:'#ffffff',border: [false, false, false, false]},
                        ],                
                      ],
                    },
                  },
                  { fillColor:'#e5edd9',
                    table:{
                      widths: ['20%','3%','3%','3%','3%','3%','3%','3%','3%','*',],
                      body: [ 
                        [                           
                          { text:'Date: ', fontSize: 7, alignment: 'right'},
                          { text: eziDebitFormType=== 1 ? currentDate.split('')[0] :'', fontSize: 7, bold:true, alignment: 'center', fillColor:'#ffffff',},
                          { text: eziDebitFormType=== 1 ? currentDate.split('')[1] :'', fontSize: 7, bold:true, alignment: 'center', fillColor:'#ffffff',},
                          { text:'/', fontSize: 7, alignment: 'center'},
                          { text: eziDebitFormType=== 1 ? currentDate.split('')[3] :'', fontSize: 7, bold:true, alignment: 'center', fillColor:'#ffffff',},
                          { text: eziDebitFormType=== 1 ? currentDate.split('')[4] :'', fontSize: 7, bold:true, alignment: 'center', fillColor:'#ffffff',},
                          { text:'/',  fontSize: 7, alignment: 'center'},
                          { text: eziDebitFormType=== 1 ? currentDate.split('')[8] :'', fontSize: 7, bold:true, alignment: 'center', fillColor:'#ffffff',},
                          { text: eziDebitFormType=== 1 ? currentDate.split('')[9] :'', fontSize: 7, bold:true, alignment: 'center', fillColor:'#ffffff',},
                          {},
                        ],   
                        [                           
                          {},
                          { text:'D', fontSize: 6, alignment: 'center'},
                          { text:'D', fontSize: 6, alignment: 'center'},
                          {},
                          { text:'M', fontSize: 6, alignment: 'center'},
                          { text:'M', fontSize: 6, alignment: 'center'},
                          {},
                          { text:'Y', fontSize: 6, alignment: 'center'},
                          { text:'Y', fontSize: 6, alignment: 'center'},
                          {},
                        ],              
                      ],
                    },
                    layout:{
                      vLineWidth: function(i, node){ return 3},
                      hLineColor: function(i, node){ return '#e5edd9' },
                      vLineColor: function(i, node){ return '#e5edd9' },
                    },
                  },
                  { fillColor:'#e5edd9',
                    table:{
                      widths: ['50%','50%'],
                      body: [ 
                        [                           
                          {text: 'Approved\n2741', fontSize: 7, alignment:'center', colSpan: 2, bold: true},{}
                        ],   
                        [                           
                          {text: '05', fontSize: 7, alignment:'center', bold: true},
                          {text: '15', fontSize: 7, alignment:'center', bold: true},
                        ],
                        [                           
                          {text: 'DDR Service Agreement (Ver 1.3)', fontSize: 6, alignment:'center', colSpan: 2,border:[false, false, false, false]},{}
                        ],          
                      ],
                    },
                  },
                ],                
              ],
            },
            layout:{
              vLineWidth: function(i, node){ return 3},
              hLineColor: function(i, node){ return '#e5edd9' },
              vLineColor: function(i, node){ return '#e5edd9' },
              padding:  function(i, node){ return 1 },
            },                    
          },
          { text : '',pageBreak: "after",},
          {
            table:{
              widths: ['*'],
              body: [ 
                [            
                  { image: eezyDebitLogo, fit: [130, 130], alignment: 'center'},
                ],
                [            
                  {text: 'DDR Service Agreement (Ver 1.3)', alignment: 'center', fontSize: 12, bold: true}
                ],
              ],
            },
            layout:{
              hLineColor: function(i, node){ return i === 1 ? '#619d5a' : '#ffffff'},
              vLineColor: function(i, node){ return '#ffffff'}
            }
          },
          {
            fillColor: '#ffffff',             
            table: {
              widths: ['*'], 
              body: [                  
                [
                  { text: 'DDR Service Agreement (Ver 1.3)', fontSize: 10, fillColor:'#c4dea4',},
                ],   
                [ {style: styles.margins,  alignment:'justify', fontSize: 5,
                    text: [
                      {text:'Conditions of this Authority to Accept Direct Debits\n\n', bold: true, fontSize: 7},
                      
                      {text:'1. The Initiator:', bold: true, fontSize: 7},
                      {text:'\n\n\na) The initiator undertakes to give notice to the acceptor of the commencement date, frequency and amount at least 10 calendar days before the first Direct Debit is drawn (but not more than 2 calendar months). This notice will provided either',},
                      {text:'\n\n(i) in writing, or\n(ii) by electronic mail where the customer has provided written consent to the initiator.',},
                      {text:'\n\n\nWhere the Direct Debit system Is used for the collection of payments which are regular as to frequency, but variable as to amounts, the initiator undertakes to provide the acceptor with a schedule detailing each payment amount and each payment date. In the event of any subsequent change to the frequency or amount of the Direct Debits. the initiator has agreed to give advance notice at least 30 days before the change comes into effect,',},
                      {text:'\n\n\nb) May. upon the relationship which gave rise to this Authority being terminated, give notice to the Bank that no further Direct Debits are to be initiated under the Authority. Upon receipt of such notice the Bank may terminate this Authority as to future payments by notice in writing to me I us.'},
                      
                      {text:'\n\n\n2. The Customer may:-', bold: true, fontSize: 7},
                      {text:'\n\na) At any time, terminate this authority as to hit re payments by giving written notice of termination to the Bank and to the Initiator.'},
                      {text:'\nb) Stop payment of any Direct Debt is to be initiated under this authority by the initiator by giving written notice to the bank prior to the Direct Debit being paid by the bank.'},
                      {text:'\nc) Where a variation to the amount agreed between the initiator and the customer from time to time to be direct debited has been made wthout notice being given in terms of clause 1(a) above, request the bank to reverse or alter any such direct debit initialed by the initiator by debiting the amount of the reversal or alteration of a Direct Debit back to the initiator through the initiator\'s hank. PROVIDED such request is made not more than 120 days from the date when the Divot Debit was debited to my/our account.'},
                      
                      {text:'\n\n\n3. The Customer acknowledges that:-', bold: true, fontSize: 7},
                      {text:'\n\na) This authority will remain in force and effect in respect of all Direct Debits passed to mykour account in good faith notwithstanding my/our death. bankruptcy or other revocation the Bank.'},
                      {text:'\nb) In any event this Authority is subject to any arrangement now or hereafter existing between me/us and the Bank in relation to mylour account.'},
                      {text:'\nc) Any dispute as to the correctness or validity of an amount debited to my/our account shall not be the concern of the bank except in so far as the Direct Debit has not been paid in accordance to this authority, Any other disputes lies between me/us and the initiator.'},
                      {text:'\nd) Where the bank has used reasonable care and skill in acting in accordance with this authority, the bank accepts no responsibility or liability in respect of:'},
                      {text:'\n- the accuracy of information about Direct Debts on bank statements - any variations between notices given by the initiator and the amounts of the Direct Debits,'},
                      {text:'\ne) The Bank is not responsible for or under any liability in respect of the initiators failure to give written advance notice correctly nor for the non-receipt or late receipt of notice by me/us for any reason whatsoever. In any such situation the dispute Iles between mehts and the initiator.'},
                      {text:'\nf)  Notice given by the initiator in terms of clause 1(b) to the debtor responsible for the payments shall be effective. Any communication necessary because the debtor responsible for payment is a person other than me/us is a matter between me/us and the debtor concerned.'},

                      {text:'\n\n\n4. The Bank may:-', bold: true, fontSize: 7},
                      {text:'\n\na) In its absolute discretion conclusively determine the order of priority of payment by it of any mon les pursuant to this or any other authority, cheque of draft properly executed by me/us and given to or drawn on the bank.'},
                      {text:'\nb) At any time terminate this authority as to future payments by notice in writing to me/us.'},
                      {text:'\nc) Charge it current fees for this service in force from time to time.'},

                      {text:'\n\n\nTerms and Conditions', bold: true, fontSize: 7},
                      {text:'\n\nParties', bold: true, fontSize: 7},
                      {text:'\n\nThe \'Business\' means the organisation providing the service for which the Customer is paying.'},
                      {text:'\n\nThe "Customer means the person or party signing this Payment Contract. "Payment Contract" means the Agreement in which the Customer has agreed to pay for the service provided by the Business. Hereafter referred to as the "Agreement" "Ezidebil NZ Ltd. PO Box 5587, Wellington 6145. New Zealand Phone 0800 394 332 Fax 04 473 6511 Entail info@lezidebrIno.nz'},
                      {text:'\n\nThe Customer acknowledges that Ezidebit has been contracted by the Business to collect the payments due under the Agreement in return for having an entitlement to use the services provided by the Business.'},
                      {text:'\n\nNothing contained in the Payment Contract shall render Ezidebit, the agent ol the Business, For any purpose other than the collection ol payments due and payable under the Agreement.'},
                      {text:'\n\nYou acknowledge that Ezidebit shall not in any way be liable to you for the provision of Services.'},
                      {text:'\n\nFor the purpose of the Contracts Privacy Act, you acknowledge that all rights of the Business pursuant to this Agreement may be enforced by Ezidebit, as if it were the Business, without requiring your consent or any involvement on the part of the Business.'},
                      
                      {text:'\n\n\nPayments', bold: true, fontSize: 7},
                      {text:'\n\nEzidebit shall administer the collection of payments due by you to the Business. All payments due by you shall be made directly to Ezidebit in the mariner specified in the Agreement. It can Lake up to three (3) days lot payments to he processed from your account Your obligations under this agreement is to ensure sufficient funds remain available to cover the instalment amount specified in this agreement for at least three (3) days after the nominated instalment date.'},

                      {text:'\n\n\nAdministration Fee', bold: true, fontSize: 7},
                      {text:'\n\nEzidebit shall charge a one off administration fee in addition to your first debit.'},

                      {text:'\n\n\nTransaction fee', bold: true, fontSize: 7},
                      {text:'\n\nEzidebit shall charge it transaction fee per direct debit payment deducted from your Account.'},

                      {text:'\n\n\nFailed Payment Fee', bold: true, fontSize: 7},
                      {text:'\n\nEzidebit shall debit a failed payment fee of up to $14.95 direct from your account for any payment dishonoured by your bank within 14 days of the payment rejecting.'},

                      {text:'\n\n\nSMS Fee', bold: true, fontSize: 7},
                      {text:'\n\nEzidebit shall debit an SMS fee direct from your account for any SMS sent.'},

                      {text:'\n\nEzidebit Pty Ltd NZBN 9429035266310', fontSize: 9, alignment: 'center'},
                      {text:'\nPO Box 5587 Wellington NZ 6145', fontSize: 9, alignment: 'center'},
                      {text:'\nP 0800 394 332 F (4) 473 6511 E support@ezidebit.co.nz', fontSize: 9, alignment: 'center'},
                    ]
                  },
                ], 
              ],
            },            
            layout: {                                  
              hLineColor :  function(i, node) {  return (i === 1 || i === node.table.body.length) ? '#619d5a' : '#e5edd9';},
              vLineColor :  function(i, node) {  return (i === 0 || i === node.table.widths.length) ? '#619d5a' : '#e5edd9';},
            }, 
          },
  ],
    pageSize: 'A4',
    pageOrientation: 'portrait',
  }
  return dd ;
}