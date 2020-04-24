import React, { useState, useEffect } from 'react';
import { logo } from '../../../common/Logo.js';
import { getDate, getCurrentDate, getDateInDDMMYYYY, getTime, getCurrentDateDDMMYYYY } from '../../../../utils/datetime';
import { styles } from './Styles.js';

export default function layout(data,order) {

  const franchise = data.franchise[0];
  const products = data.product;
  const customer = data.customer;
  const orderType = data.orderType[0];
  const budget = data.budget; 
  const user = data.user[0]; 
  // console.log('user',user);
  // console.log('orderTypeuser',orderType);


  var dd = {
    pageMargins: [ 40, 40, 40, 50 ],
    footer: function (currentPage, pageCount) {
        return {
            table: {
                widths: '*',
                body: [
                    [
                        { text: "Page " + currentPage.toString() + ' of ' + pageCount, alignment: 'right', fontSize: 8, margin: [0, 20, 50, 0], }
                    ],
                ]
            },
            layout: 'noBorders'
        };
    },
    content: 
      [
          { 
            columns: [                 
                { image: logo, fit: [150, 150], style: styles.Header1 },                                
              [ { text: 'DISCLOSURE STATEMENT FOR CONSUMER LEASE', style: styles.Header2, bold: true },
                { text: `RENT-FLEX CONTRACT`, style: styles.Header2, bold: true },
              ],
              [ 
               { text: '\nStatement Date ' , style: styles.Header3},                             
               { text: getCurrentDateDDMMYYYY() , style: styles.Header3},
              ],
            ]
          },
          '\n',
          
          {
            table: {              
              widths: ['*'],
              body: [                
                  [
                    {                    
                     border: [true, true, true, false],
                      table: {
                        widths: ['*'],
                        body: [
                          [
                            {style:styles.margins, text: [  
                              { text: 'Inial disclosure statement under section 64 of Credit Contracts and Consumer Finance Act 2003 for consumer lease contracts.', style: styles.JustifyFont8, bold: true, }, 
                              { text: '\nIMPORTANT -', style: styles.JustifyFont8, bold: true, }, 
                              { text: 'This document sets out key information about your consumer lease contract. You should read it thoroughly.'
                                    + 'if you do not understand anything in this document, you should seek independent advice. you should keep this disclosure statement'
                                    + 'and a copy of your consumer credit contract in a safe place.', style: styles.JustifyFont8, }, 
                              { text: '\nThe law gives you a limited right to cancel the consumer lease contract (see below for further details). Note That strict time limits apply.', style: styles.JustifyFont8, }, 
                            ]},
                          ]
                        ]
                      },                      
                  }],
                  [
                    {style:styles.margins, text: [
                      { text: '\nFULL NAME AND ADDRESS OF CREDITOR ', style: styles.JustifyFont8, bold: true,  },
                      { text: '(this is the person providing you the credit)', style: styles.JustifyFont8,  }, 
                    ], border: [true, false, true, false]},
                  ],

                  [{
                    border: [true, false, true, false],
                    table: {
                      fillColor: '#C5C7C0',
                      widths: ['40%','60%'],
                      body: [                        
                        [[
                          {style:styles.margins, text: [
                            { text: 'You may send notices to the creditor by:\n', style: styles.JustifyFont8,  bold: true,   },
                          ],},
                          
                          { ul: [
                            { text: 'Writing to the creditor at the creditor\'s portal address; or \n', style: styles.Header3CenterFont8,  bold: true,  alignment: screenLeft }, 
                            { text: 'Sending an email to the address specified', style: styles.Header3CenterFont8,  bold: true,  alignment: screenLeft },
                          ],},
                        ],
                        
                        {style:styles.margins, text: [
                            { text: 'Name:\t\t' + franchise.franchise_name,   alignment: screenLeft, fontSize: 10},   
                            { text: '\nAddress:\t' + franchise.location, alignment: screenLeft,  fontSize: 10 }, 
                            { text: '\nPhone:\t\t' + franchise.contact, alignment: screenLeft, fontSize: 10 }, 
                            { text: '\nEmail:\t\t'+ franchise.email, alignment: screenLeft, fontSize: 10 }, 
                          ],
                        },
                        ],
                      ], 
                    },
                }],

                [
                  {style:styles.margins, text: [  
                    { text: 'CONSUMER LEASE DETAILS', style: styles.Header3CenterFont8, bold: true, alignment: screenLeft }, 
                  ], border: [true, false, true, false]},
                ],
                [{
                  border: [true, false, true, false],
                  // layout: 'noBorders',
                  table: {                    
                    widths: ['30%','30%','40%'],
                    body: [                                             
                      [
                        { text: '\nRent Price of Goods', style: styles.Header3CenterFont8,  alignment: screenLeft },
                        { text: '\n$'+ orderType.goods_rent_price, style: styles.Header3CenterFont8,  alignment: screenLeft },
                        {style:styles.margins, rowSpan:5, 
                          text: [  
                            { text: '\nThis consumer lease has a Minimum Term of Six(6) Months.\n', bold:true, style: styles.Header3CenterFont8,  alignment: screenLeft },
                            { text: 'If you terminate the lease before six months you will be liable To pay an Early Termination Fee\n\n\n', style: styles.Header3CenterFont8,  alignment: screenLeft },
                            { text: 'Option to purchase\n', style: styles.Header3CenterFont8, bold:true,  alignment: screenLeft },
                            { text: `Under this Rent-Flex Contract there is no option to purchase the Good.`, style: styles.Header3CenterFont8, italics: true, alignment: screenLeft },
                          ], 
                        },                        
                      ],
                      [
                        { text: '\nPPSR Fee (if applicable)', style: styles.Header3CenterFont8,  alignment: screenLeft },
                        { text: '\n$' + orderType.ppsr_fee, style: styles.Header3CenterFont8,  alignment: screenLeft },{}
                      ],
                      [
                        { text: '\nLiability Waiver Fee*', style: styles.Header3CenterFont8,  alignment: screenLeft },
                        { text: '\n$' + orderType.liability_fee, style: styles.Header3CenterFont8,  alignment: screenLeft },{}
                        // { text: 'Rent Price of Goods', style: styles.Header3CenterFont8,  alignment: screenLeft },
                      ],
                      [
                        { text: '*$1.5 per week or $3.00 per fornight', alignment: screenLeft, fontSize:8 },
                        { text: '', style: styles.JustifyFont8,  },{}
                      ],
                      [
                        {style:styles.margins, text: [
                          { text: 'TOTAL ', style: styles.JustifyFont8,  bold:true, },
                          { text: 'PER WEEK / FORNIGHT', style: styles.JustifyFont8,  },
                          { text: '\n(Please circle which is applicable)', fontSize: 6,  alignment: screenLeft },
                          ],
                        },                        
                        { text: '$' + orderType.each_payment_amt , style: styles.JustifyFont8, bold:true},{}
                      ],                     
                    ], 
                  },
                  layout: {
                    hLineColor: function (i, node) {
                      return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
                    },
                    vLineColor: function (i, node) {
                      return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
                    },
                  }
                }],

                [
                  {style:styles.margins, text: [  
                    { text: 'PAYMENTS', style: styles.Header3CenterFont8, bold: true, alignment: screenLeft }, 
                    { text: '\t\t\t\tYou are required to make each payment of the amount specified and by the time specified', fontSize: 7, bold: true, alignment: screenLeft },
                  ], border: [true, false, true, false]},
                ],

                [{
                  border: [true, false, true, false],
                  table: {                    
                    widths: ['40%','5%','15%','5%','15%','5%','15%'],
                    body: [
                      [
                        { text: 'Timing of Payments', style: styles.paymentHeading, border: [true, true, false, false],},
                        { text: '', border: [true, false, true, false],},
                        { text: 'Number of Payments', style: styles.paymentHeading, border: [true, true, false, false],},
                        { text: '', border: [true, false, true, false],},
                        { text: 'Amount of Each Payment', style: styles.paymentHeading, border: [true, true, false, false], },
                        { text: '', border: [true, false, true, false],},
                        { text: 'Total Amount of payments', style: styles.paymentHeading, border: [true, true, true, false],},                                               
                      ],  
                      [
                        {style:styles.margins, text: [  
                          { text: '\nFrequency \t\t\t' , alignment: screenLeft, fontSize: 8, },
                            orderType.frequency === 1 ? { text: 'Monthly' , alignment: screenLeft,  fontSize: 10, bold:true  }
                          : orderType.frequency === 2 ? { text: 'Fortnightly' , alignment: screenLeft,  fontSize: 10, bold:true  }  
                          : orderType.frequency === 4 ? { text: 'Weekly' , alignment: screenLeft,  fontSize: 10, bold:true  }  :'',
                          
                          { text: '\n\nFirst payment \t\t',  alignment: screenLeft, fontSize: 8,},
                          { text: getDateInDDMMYYYY(orderType.first_payment) + '\n\n',  alignment: screenLeft,   fontSize: 10, bold:true },
                        ],border: [true, false, true, true],},
                          { text: '', border: [true, false, true, false],},
                          { text: '\n\nINDEFINITE\n', style: styles.paymentBody, border: [true, false, true, true],},
                          { text: '', border: [true, false, true, false],},
                          { text: '\n\n$'+ orderType.each_payment_amt + '\n',  style: styles.paymentBody, border: [true, false, true, true], },
                          { text: '', border: [true, false, true, false],},
                          { text: '\n\nINDEFINITE\n', style: styles.paymentBody, border: [true, false, true, true],},
                      ],                                    
                    ], 
                  },
                }],


                [{
                  border: [true, false, true, false],
                  table: {                    
                    widths: ['50%','2%','23%','2%','23%'],
                    body: [
                      [
                        {style:styles.margins, text: [  
                          { text: 'Minimum number of Payments before Delivery',   fontSize:8, alignment: screenLeft, bold: true,},
                          { text: '\n\n\n' + orderType.before_delivery_amt, style: styles.paymentBody,},
                          { text: '\n\nWe require the Bond to be paid by you on/before the Delivery Date to source' 
                                + ' performance of your obligations under the contract, or the payment of money payable under ' 
                                + 'the contract, or both.', fontSize:8, alignment: screenLeft},
                          ],
                        },
                        { text: '', border: [true, false, true, false],},                        
                        {style:styles.margins, text: [  
                          { text: 'Expected Delivery Date',   style: styles.paymentHeading},
                          { text: '\n\n' + getDateInDDMMYYYY(orderType.exp_delivery_date), style: styles.paymentBody,},
                          { text: '\n\nExpected Time of Delivery', style: styles.paymentHeading},
                          { text: '\n\n' + orderType.exp_delivery_time, style: styles.paymentBody},
                          ],
                        },                        
                        { text: '', border: [true, false, true, false],},
                        {style:styles.margins, text: [  
                          { text: 'Bond Amt.',  style: styles.paymentHeading},
                          { text: '\n\n\n$' + orderType.bond_amt, style: styles.paymentBody, fontSize: 10},
                          ],
                        },   
                      ],                                                           
                    ], 
                  },
                }],

                [
                  {style:styles.margins, text: [  
                    { text: 'CREDIT FEE AND CHARGES', style: styles.Header3CenterFont8, bold: true, alignment: screenLeft }, 
                  ], border: [true, false, true, false]},
                ],

                [{
                  border: [true, false, true, false],
                  table: {                    
                    widths: ['100%'],
                    body: [
                      [
                        {style:styles.margins, text: [  
                          { text: 'The following credit fee(s) and charge(s) (which are not included in the initial unpaidbalance) are, or may become, payable under, or in connection with, the contract Your consumer lease may allow the creditor to vary this/these fee(s) and charge(s).',   fontSize:8, alignment: screenLeft,},                          
                          { text: '\nEarly Termination Fee:      $' + (orderType.frequency * orderType.each_payment_amt).toFixed(2) + ', ', fontSize:8, alignment: screenLeft, bold: true},
                          { text: 'being 2 fortnightly payment instalments or 4 weekly payment instalments.', fontSize:8, alignment: screenLeft},
                          { text: '\nLiability Waiver Excess:    $' + (orderType.frequency * orderType.each_payment_amt).toFixed(2) + ', ', fontSize:8, alignment: screenLeft, bold : true},
                          { text: 'being 2 fortnightly payment instalments or 4 weekly payment instalments.', fontSize:8, alignment: screenLeft},
                          { text: '\nAdministration costs and fees payable on full prepayment are disclosed under the full prepayment heading.', fontSize:8, alignment: screenLeft},
                          ], lineHeight: 1.5,
                        },                         
                      ],                                                           
                    ], 
                  },
                }],

                [
                  {style:styles.margins, text: [  
                    { text: 'CONTINUING DISCLOSURE', style: styles.Header3CenterFont8, bold: true, alignment: screenLeft }, 
                  ], border: [true, false, true, false]},
                ],

                [{
                  border: [true, false, true, false],
                  table: {                    
                    widths: ['100%'],
                    body: [
                      [
                        {style:styles.margins, text: [  
                          { text: 'The creditor may be required to provide you with regular statements.  The statements will give you information about your account.',   fontSize:8, alignment: screenLeft,},                          
                          { text: '\nStatements will be provided ', fontSize:8, alignment: screenLeft},
                          { text: 'every six (6) months.', fontSize:8, alignment: screenLeft, bold: true},
                          ], lineHeight: 1.5,
                        },                         
                      ],                                                           
                    ], 
                  },
                }],
              
                [
                  {style:styles.margins, text: [  
                    { text: 'LIABILITY WAIVER', style: styles.Header3CenterFont8, bold: true, alignment: screenLeft }, 
                  ], border: [true, false, true, false]},
                ],

                [{
                  border: [true, false, true, false],
                  table: {                    
                    widths: ['100%'],
                    body: [
                      [
                        {style:styles.margins, text: [  
                          { text: 'If you have elected to purchase the liability waiver you must pay:',   fontSize:8, alignment: screenLeft,},                          
                          { text: '\n$1.50 weekly 	  OR    $3.00 fortnightly (circle which is applicable) per item', fontSize:9, bold: true, style: styles.Header2Center},
                          { text: '\nIn the event you need to use the liability waiver the excess charge is $___________________  being 2 fortnightly or 4 weekly payment instalments.', fontSize:8, alignment: screenLeft},
                          ], lineHeight: 1.5, 
                        },                         
                      ],                                                           
                    ], 
                  },
                }],      
                [
                  { text : '',
                    pageBreak: "after",
                  },            
                ],
                [
                  {style:styles.margins, text: [  
                    { text: 'WHAT COULD HAPPEN IF YOU FAIL TO MEET YOUR COMMITMENTS', style: styles.Header3CenterFont8, bold: true, alignment: screenLeft }, 
                  ], border: [true, false, true, false]},
                ],
                [{
                  border: [true, false, true, false],
                  table: {                    
                    widths: ['100%'],
                    body: [
                      [ 
                        {style:styles.margins,   border: [true, true, true, false], text: [  
                          { text: 'Security interest(s)',   fontSize:8, bold: true, alignment: screenLeft,},                          
                          { text: '\nThis is secured credit.  If you fail to meet your commitments under the contract, the creditor may be entitled to repossess and sell this property.', fontSize:8, alignment: screenLeft},
                          { text: '\nDescription of security Interest\'s):', fontSize:8, bold: true, alignment: screenLeft},
                          { text: '\nProperty which is (or will be) subject to a security interest:', fontSize:8, alignment: screenLeft, },                          
                          ],                         
                        },                        
                      ],
                      [
                        {    
                          border: [true, false, true, false], 
                          table: {  
                            widths: ['50%','50%'],
                            body: [
                              [                               
                                { text: 'Item', fontSize:8, alignment: screenLeft},
                                { text: 'Description', fontSize:8, alignment: screenLeft},
                              ],
                              [                               
                                { text: '\n', fontSize:8, alignment: screenLeft},
                                { text: '\n', fontSize:8, alignment: screenLeft},
                              ],
                              [                               
                                { text: '\n', fontSize:8, alignment: screenLeft},
                                { text: '\n', fontSize:8, alignment: screenLeft},
                              ],
                              [                               
                                { text: '\n', fontSize:8, alignment: screenLeft},
                                { text: '\n', fontSize:8, alignment: screenLeft},
                              ],
                            ], 
                          },
                        }
                      ],
                      [ 
                        { text: 'You must not create or allow any Security Interest over the Goods, If a Security Interest is created over the Goods in breach of this Agreement, we may repossess the Goods. We may also pay the holder of the Security Interest the amount necessary to discharge it and we may recover any costs from you.',   fontSize:8, bold: true, alignment: screenLeft, border: [true, false, true, true],}, 
                      ],                                                                                   
                    ], 
                  },
                }],               
                [{
                  border: [true, false, true, false],
                  table: {                    
                    widths: ['100%'],
                    body: [
                      [
                        {style:styles.margins, text: [  
                          { text: 'Penalty Interest -',   fontSize:8, alignment: screenLeft, bold: true},                          
                          { text: '\nIn the event of a default in payment, and while the default continues, you must pay the penalty interest charges. ', fontSize:8, alignment: screenLeft},
                          { text: '\nPenalty Interest is charged from the time you fail to make a due payment until the arrears are paid. Penalty interest is calculated by multiplying the amount in arrears at the end of the day by a daily penalty interest rate. The daily penalty interest rate is calculated by dividing the annual penalty interest rate by 365. Interest is charged to your account weekly.', fontSize:8, alignment: screenLeft},
                          { text: '\nAnnual Penalty Interest rate is: 10%', fontSize:8, alignment: screenLeft},
                          
                          { text: '\n\nDefault Fees -',   fontSize:8, alignment: screenLeft, bold: true},                          
                          { text: '\nIn the event of a breach of the contract or on the enforcement of the contract, the default fees specified below are payable. Your credit contract may allow the creditor to vary these fees and charges.', style: styles.JustifyFont8,},
                          { text: '\nLate Fee: ',  style: styles.JustifyFont8,},
                          { text: '$10.00 ',  style: styles.JustifyFont8, bold: true},
                          { text: 'is charged when a payment is not made when it becomes due.',  style: styles.JustifyFont8,},
                          { text: '\nRepossession Fee: will be the reasonable fees incurred by us when a repossession attempt is made.',  style: styles.JustifyFont8,},
                          ],lineHeight: 1.2,
                        },                                            
                      ],                                                           
                    ], 
                  },
                }],

                [
                  {style:styles.margins, text: [  
                    { text: 'TERMINATION', style: styles.Header3CenterFont8, bold: true, alignment: screenLeft }, 
                  ], border: [true, false, true, false]},
                ],

                [{
                  border: [true, false, true, false],
                  table: {                    
                    widths: ['100%'],
                    body: [
                      [
                        {style:styles.margins, text: [  
                          { text: 'EARLY TERMINATION',   fontSize:8, alignment: screenLeft, bold: true},                          
                          { text: '\nIf you seek to terminate the contract before the Minimum Term, you may be required to pay a fee or charge to compensate the creditor for any loss resulting from the early termination.', fontSize:8, alignment: screenLeft},
                          { text: '\nEarly Termination Fee: will be 2 fortnightly payment instalments or 4 weekly payment instalments,', fontSize:8, alignment: screenLeft},
                          
                          { text: '\n\nTERMINATION',   fontSize:8, alignment: screenLeft, bold: true},                          
                          { text: '\nIf you seek to terminate the contract after the Minimum Term, you must provide the creditor with one payment period notice. At this stage, we will arrange a time to Collect the Goods from you, or you can return them to our store.',   fontSize:8, alignment: screenLeft,},
                          ],lineHeight: 1.2,
                        },                         
                      ],                                                           
                    ], 
                  },
                }],

                [
                  {style:styles.margins, text: [  
                    { text: 'RIGHT TO CANCEL', style: styles.Header3CenterFont8, bold: true, alignment: screenLeft }, 
                  ], border: [true, false, true, false]},
                ],

                [{
                  border: [true, false, true, false],
                  table: {                    
                    widths: ['100%'],
                    body: [
                      [[
                        {style:styles.margins, text: [  
                          { text: 'You are entitled to cancel the consumer credit contract by giving notice to the creditor.',  style: styles.JustifyFont8,},                          
                          { text: '\nTime limits for cancellation',  style: styles.JustifyFont8, bold: true},                                                    
                          { text: '\nIf the disclosure documents are handed to you directly you must give notice that you intend to cancel within 5 working days after you receive the documents.',  style: styles.JustifyFont8,},
                          { text: '\nIf the disclosure documents are sent to you by electronic means (email) you must give notice within 7 working days after the electronic communication is sent.',  style: styles.JustifyFont8,},
                          { text: '\nIf the documents are mailed to you in the post you must give notice within 9 working days after they were posted.',  style: styles.JustifyFont8,},
                          { text: '\nSaturdays, Sundays, and national public holidays are not counted as working days.',  style: styles.JustifyFont8,},
                          ], lineHeight: 1.2,  
                        }, 
                          { text: 'How to cancel',  style: styles.JustifyFont8, bold: true},
                          { text: 'To cancel, you must give the creditor written notice that you intend to cancel the contract by:',  style: styles.JustifyFont8,},
                          
                          { fontSize: 8,
                            ul:[
                              { text: 'giving notice to the creditor or an employee or agent of the creditor; or',  style: styles.JustifyFont8,},
                              { text: 'posting the notice to the creditor or an agent of the creditor; or',  style: styles.JustifyFont8,},
                              { text: 'emailing the notice to the creditor\'s email address (if specified on the front of this disclosure statement); or',  style: styles.JustifyFont8,},
                              { text: 'sending the notice to the creditor\'s fax number (if specified on the front of this disclosure statement).',  style: styles.JustifyFont8,},
                            ],lineHeight: 1.2, 
                          },

                          { text: 'You must also:', style: styles.JustifyFont8, bold: true, lineHeight: 1.2,},
                          {
                            type: 'lower-alpha', fontSize: 8,
                            ol:[
                              { text: 'return to the creditor any advance and any other property received by you under the contract (but you cannot do this if youhave taken possession of any goods or if you have bought any property at an auction or if the contract is for the sale of services that have been performed); or',  style: styles.JustifyFont8,},
                              { text: 'pay the cash price of the property or services within 15 working days of the day you give notice.',  style: styles.JustifyFont8,},
                            ],lineHeight: 1.2, 
                          },
                          
                          { text: 'What you may have to pay if you cancel',  style: styles.JustifyFont8, bold: true},
                          { text: 'If you cancel the contract, the creditor can charge you:',  style: styles.JustifyFont8,},
                          
                        {
                          type: 'lower-alpha', fontSize: 8,
                          ol: [
                            { text: 'the amount of any reasonable expenses the creditor had to pay in connection with the contract and its cancellation (including legal fees and fees for credit reports, etc);',  style: styles.JustifyFont8,},
                            { text: 'the costs of repairing any property you return if the property was damaged while it was in your possession.',  style: styles.JustifyFont8,},
                          ]
                        },                        
                      ],                         
                      ],                                                           
                    ], 
                  },
                }],
                [
                  { text : '',
                    pageBreak: "after",
                  },            
                ],
                [
                  {style:styles.margins, text: [  
                    { text: 'WHAT TO DO IF YOU SUFFER UNFORESEEN HARDSHIP', style: styles.Header3CenterFont8, bold: true, alignment: screenLeft }, 
                  ], border: [true, false, true, false]},
                ],
                [{
                  border: [true, false, true, false],
                  table: {                    
                    widths: ['100%'],
                    body: [
                      [[
                        {style:styles.margins, text: [  
                          { text: 'If you are unable reasonably to keep up your payments or other obligations because of illness, injury, loss of employment, the end of a relationship, or other reasonable cause, you may be able to apply to the creditor for a hardship variation. ',   fontSize:8, alignment: screenLeft,},                          
                          { text: '\nTo apply for a hardship variation, you need to:',   fontSize:8, alignment: screenLeft,},                           
                          
                          
                          ], lineHeight: 1.2,                            
                        }, 
                        {
                          type: 'lower-alpha', fontSize: 8,
                          ol: [
                            { text: 'make an application in writing; and', fontSize:8, alignment: screenLeft},
                            { text: 'explain your reason(s) for the application; and', fontSize:8, alignment: screenLeft},
                            { text: 'request one of the following:', fontSize:8, alignment: screenLeft},
                            {
                              ul:[
                                { text: 'an extension of the term of the contract (which will reduce the amount of each payment due under the contract}; or', fontSize:8, alignment: screenLeft},
                                { text: 'a postponement of the dates on which payments are due under the contract (specify the period for which you want this to apply); or', fontSize:8, alignment: screenLeft},
                                { text: 'both of the above; and', fontSize:8, alignment: screenLeft},                                
                              ],
                            },
                            { text: 'give the application to the creditor,', fontSize:8, alignment: screenLeft},
                          ]
                        },   
                        { text: 'Do this as soon as possible. if you leave it for too long, the creditor may not have to consider your application.', fontSize:8, alignment: screenLeft},
                      ],                        
                      ],                                                           
                    ], 
                  },
                }],
                [
                  {style:styles.margins, text: [  
                    { text: 'DISPUTE RESOLUTION', style: styles.Header3CenterFont8, bold: true, alignment: screenLeft }, 
                  ], border: [true, false, true, false]},
                ],
                [
                  {
                    border: [true, false, true, false],
                    table: {                    
                      widths: ['100%'],
                      body: [
                        [
                          {style:styles.margins, text: [  
                            { text: 'Name of dispute resolution scheme: ', style: styles.Header3CenterFont8, alignment: screenLeft },
                            { text: 'Financial Dispute Resolution Service', style: styles.Header3CenterFont8, bold: true, alignment: screenLeft, decoration: 'underline',decorationStyle: 'solid', decorationColor: 'black',  },
                            { text: '\n\nIt is free to make a complaint to this independent dispute resolution scheme.   This scheme can help you to resolve any disagreements you have with the creditor.', style: styles.Header3CenterFont8, alignment: screenLeft },
                            { text: '\n\nContact details of dispute resolution scheme:', style: styles.Header3CenterFont8, alignment: screenLeft },
                            { text: '\n\nPhone:', style: styles.Header3CenterFont8, alignment: screenLeft },
                            { text: '0508337337', style: styles.Header3CenterFont8, alignment: screenLeft, decoration: 'underline',decorationStyle: 'solid', decorationColor: 'black',  },
                            { text: '\nWebsite:', style: styles.Header3CenterFont8, alignment: screenLeft },
                            { text: 'www.fdrs.orgn.nz', style: styles.Header3CenterFont8, alignment: screenLeft, decoration: 'underline',decorationStyle: 'solid', decorationColor: 'black',  },
                            { text: '\nBusiness address:', style: styles.Header3CenterFont8, alignment: screenLeft },
                            { text: 'Wellington', style: styles.Header3CenterFont8, alignment: screenLeft, decoration: 'underline',decorationStyle: 'solid', decorationColor: 'black',  },                    
                          ],
                          },
                        ],
                      ],
                    },
                  },
                ],
                [
                  {style:styles.margins, text: [  
                    { text: 'REGISTRATION ON FINANCIAL SERVICE PROVIDER REGISTER', style: styles.Header3CenterFont8, bold: true, alignment: screenLeft }, 
                  ], border: [true, false, true, false]},
                ],  
                [
                  {
                    border: [true, false, true, false],
                    table: {                    
                      widths: ['100%'],
                      body: [
                        [
                          {style:styles.margins, text: [  
                            { text: 'Creditor registration name: \t', style: styles.Header3CenterFont8, alignment: screenLeft, },                    
                            { text: 'KIWI APPLIANCE RENTAL LTD \t', style: styles.Header3CenterFont8, alignment: screenLeft, bold: true}, 
                            { text: 'Registration number: ', style: styles.Header3CenterFont8, alignment: screenLeft,}, 
                            { text: 'FSP553806', style: styles.Header3CenterFont8, alignment: screenLeft, bold: true}, 
                          ],
                          },
                        ],
                      ],
                    },
                  },
                ],                   
                [
                  {
                    border: [true, false, true, false],
                    table: {                    
                      widths: ['48%','4%','48%'],
                      body: [
                        [
                          {text: [  
                            { text: 'DEBTORS SIGNATURE', style: styles.Header3CenterFont8, alignment: screenLeft,  bold: true},                    
                            { text: '\nSigned as Customer:\n\n\n\n\n\n', style: styles.Header3CenterFont8, alignment: screenLeft,},                           
                          ],
                          },
                          { text: '', style: styles.Header3CenterFont8, alignment: screenLeft, border: [true, false, true, false],},                           
                          {text: [  
                            { text: 'CREDITORS SIGNATURE\n', style: styles.Header3CenterFont8, alignment: screenLeft,  bold: true},                    
                            { text: 'Signed on behalf of Creditor:\n\n\n\n\n\n', style: styles.Header3CenterFont8, alignment: screenLeft,},                           
                          ],
                          },
                        ],
                        [
                          { text: 'Signature\n\n\n\n\n', style: styles.Header3CenterFont8, alignment: screenLeft,  },                    
                          { text: '', style: styles.Header3CenterFont8, alignment: screenLeft,  border: [true, false, true, false],},                    
                          { text: 'Signature\n\n\n\n\n', style: styles.Header3CenterFont8, alignment: screenLeft,},                                             
                        ],  
                        [
                          { text: 'Please print name in full', style: styles.Header3CenterFont8, alignment: screenLeft,},                    
                          { text: '', style: styles.Header3CenterFont8, alignment: screenLeft, border: [true, false, true, false],},                    
                          { text: 'Please print name in full', style: styles.Header3CenterFont8, alignment: screenLeft,},                                   
                        ],                   
                      ],
                      },                    
                    },                     
                  ],    
                  [
                    {style:styles.margins, text: [  
                      { text: '\n\n\nFor our General Terms and Conditions please see attached Rent-Flex Terms and Conditions.\n', style: styles.Header3CenterFont8, fontSize: 9, bold: true,}, 
                    ], border: [true, false, true, true]},
                  ],            
        ],              
      },
    },  
  ],
    
    pageSize: 'A4',
    pageOrientation: 'portrait',
  }
  return dd ;
}