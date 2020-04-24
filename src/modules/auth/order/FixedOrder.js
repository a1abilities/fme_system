import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';

// API CALL
import useSignUpForm from '../franchise/CustomHooks';
import {useCommonStyles} from '../../common/StyleComman'; 
import {getDate, getCurrentDate, getTimeinDBFormat } from '../../../utils/datetime'
import validate from '../../common/validation/FixedOrderValidation';


const RESET_VALUES = {
  exp_delivery_date : getCurrentDate(),
  first_payment : getCurrentDate(),
  last_payment : getCurrentDate(),
  exp_delivery_time : getCurrentDate(),

  int_unpaid_bal : 0,
  liability_wavier_fee : 0,
  liability : 0,
  cash_price  : 0,
  delivery_fee : 0,
  ppsr_fee : 0,
  frequency  : '',
  duration : '',
  no_of_payment : '',
  each_payment_amt : '',
  total_payment_amt : '',
  before_delivery_amt : '',
  minimum_payment_amt : '',
  intrest_rate : '',
  intrest_rate_per : '',
  total_intrest : '',  
};


const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    height: theme.spacing(5),
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    fontSize: theme.typography.pxToRem(14),
    color:"white",
    marginTop:theme.spacing(-3),
  },
  labelTitle: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(14),
    marginTop: 15,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 100,
  },
  heading: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightBold,
  },
  expansionTitle: {
    fontWeight: theme.typography.fontWeightBold,
  },
  button:{
    color:"white",
    fontSize: theme.typography.pxToRem(10),
    marginRight: theme.spacing(1),
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  },
  subTitle:{
    fontSize: theme.typography.pxToRem(12),
  },
  drpdwn:{
    marginTop: theme.spacing(1),
  },
  buttonMargin: {
    margin: theme.spacing(1),
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function FixOrder({ open, handleFixedClose, setFixedOrderList, fixedOrderList, handleOrderType, totalOfRental, productQuantity }) {

  const classes = useStyles();
  const styleClass = useCommonStyles();
  const [frequency, setFrequency] = useState(fixedOrderList === null ? '' : fixedOrderList.frequency);
  const [duration, setDuration] = useState(fixedOrderList === null ? '' : fixedOrderList.duration);
  const [paymentBeforeDelivery,setPaymentBeforeDelivery] = useState(fixedOrderList === null ? '' : fixedOrderList.before_delivery_amt);
  const [firstPaymentDate,setFirstPaymentDate] = useState(fixedOrderList === null ? getCurrentDate() : fixedOrderList.first_payment);
  const [dateArray,setDateArray] = useState([]);
  const [fixedNull,setFixedNull] = useState(true);
  const [bool, setBool]= useState(false);

  
  function fixed(e){
    const data = {
      int_unpaid_bal  : parseFloat(inputs.int_unpaid_bal).toFixed(2),
      cash_price : parseFloat(inputs.cash_price).toFixed(2),
      delivery_fee : parseFloat(inputs.delivery_fee).toFixed(2),
      ppsr_fee : parseFloat(inputs.ppsr_fee).toFixed(2),
      liability_wavier_fee : parseFloat(inputs.liability_wavier_fee).toFixed(2),
      frequency : inputs.frequency,
      duration: inputs.duration,
      first_payment : getDate(inputs.first_payment),
      last_payment : getDate(inputs.last_payment),
      no_of_payment : parseFloat(inputs.no_of_payment).toFixed(2),
      each_payment_amt : parseFloat(inputs.each_payment_amt).toFixed(2),
      total_payment_amt : parseFloat(inputs.total_payment_amt).toFixed(2),
      before_delivery_amt : inputs.before_delivery_amt,
      exp_delivery_date : getDate(inputs.exp_delivery_date),
      exp_delivery_time : getTimeinDBFormat(inputs.exp_delivery_time),
      minimum_payment_amt : parseFloat(inputs.minimum_payment_amt).toFixed(2),
      intrest_rate : parseFloat(inputs.intrest_rate).toFixed(2),
      intrest_rate_per : parseFloat(inputs.intrest_rate_per).toFixed(2),
      total_intrest : parseFloat(inputs.total_intrest).toFixed(2),
    }
    setFixedOrderList(data);
    handleOrderType(1);
    handleFixedClose(false)
  }
 

  function handleDateChange(date){
    handleInputChange({target:{name: 'first_payment', value: date}})
    setFirstPaymentDate(date);
  }

  function handleLastDate(date){
    handleInputChange({target:{name: 'last_payment', value: date}})
  }

  function handleDeliveryDate(date){
    handleInputChange({target:{name: 'exp_delivery_date', value: date}})
  }

  function handleDeliveryTime(time){          
    handleInputChange({target:{name: 'exp_delivery_time', value: time}})
  }

  const handleFrequency = (e) => {
    setFrequency(Number(e.target.value));
    setInput('frequency', Number(e.target.value));
  }
  
  const handleDuration = (e) => {
    setDuration(Number(e.target.value));
    setInput('duration', Number(e.target.value));
  }

  const handleNumberOfPaymentBefDelivery = (e) =>{
    calculateNoOfPayment(e.target.value);
  }
  

  function calculateNoOfPayment(value) {
    const validNumber = /^[0-9]*$/;
    if (value === '' || validNumber.test(value)) {
      let temp = paymentBeforeDelivery;
      setPaymentBeforeDelivery(value);
      setInput( 'before_delivery_amt' , value);
      if(Number(value) > Number(inputs.no_of_payment)){
        alert('Number of payment before delivery should be less then or equal to total number of payment.');
        setPaymentBeforeDelivery(temp);
        setInput( 'before_delivery_amt' , temp);
      }
    }
  }

  useEffect(() => {
    if(duration != '' && frequency != '' && firstPaymentDate != ''){
      let paymentDates = [];
      if(frequency == 1){
        let firstPayDate = new Date(firstPaymentDate);
        for(let i=0; i< duration; i++){
          paymentDates.push(firstPayDate.toString())
          firstPayDate.setMonth(firstPayDate.getMonth() + 1);
        }
      }else if(frequency == 2){
        let firstPayDate = new Date(firstPaymentDate);
        for(let i = 1; i<=  (26 *( duration/12)); i++){
          paymentDates.push(firstPayDate.toString());
          firstPayDate.setDate(firstPayDate.getDate() + 15);
        }
      }else if(frequency == 4){
        let firstPayDate = new Date(firstPaymentDate);
        for(let i = 1; i<=  (52 *( duration/12)); i++){
          paymentDates.push(firstPayDate.toString());
          firstPayDate.setDate(firstPayDate.getDate() + 7);
        }
      }
      setDateArray(paymentDates);
      const lastPaymentDate = new Date(paymentDates[paymentDates.length - 1]);
      handleRandomInput([
        {name: 'last_payment', value: lastPaymentDate},
      ]);
    }

    if(fixedOrderList) {
      if(fixedOrderList.before_delivery_amt && Number(fixedOrderList.before_delivery_amt) > 0) {
        calculateNoOfPayment(fixedOrderList.before_delivery_amt);
      }
    }
  },[duration, frequency, firstPaymentDate]);


  useEffect(() => {
    if(paymentBeforeDelivery!= ''){
      let delivey_date = new Date(dateArray[paymentBeforeDelivery - 1]);
      if(fixedOrderList !== null && fixedNull === true){
        delivey_date = fixedOrderList.exp_delivery_date;
      }
      handleRandomInput([
        {name: 'minimum_payment_amt', value: (paymentBeforeDelivery * parseFloat(inputs.each_payment_amt)).toFixed(2)},
        {name: 'exp_delivery_date', value:   delivey_date},
      ]);
      setFixedNull(false);
    }else{
      handleRandomInput([
        {name: 'minimum_payment_amt', value: ''},
        {name: 'exp_delivery_date', value: ''},
      ]);
    }
  },[paymentBeforeDelivery]);

  
  useEffect(()=>{
      if(frequency != '' && duration != '') {
          if(frequency == 1){
          let installment = (totalOfRental * 4);
          handleRandomInput([
            {name: 'each_payment_amt', value: installment.toFixed(2)},
            {name: 'no_of_payment', value: (duration * 1)},
            {name: 'total_payment_amt', value: (installment * duration).toFixed(2)},
          ]);
        }else if(frequency == 2){
          let installment = (totalOfRental * 2);
          handleRandomInput([
            {name: 'each_payment_amt', value: installment.toFixed(2)},
            {name: 'no_of_payment', value: ((duration * 2) + (duration/12 * 2))},
            {name: 'total_payment_amt', value: (installment * ((duration * 2) + (duration/12 * 2))).toFixed(2)},
          ]);
        }else if(frequency == 4){
          let installment = (totalOfRental);
          handleRandomInput([
            {name: 'each_payment_amt', value: installment.toFixed(2)},
            {name: 'no_of_payment', value: ((duration * 4) + (duration/12 * 4))},
            {name: 'total_payment_amt', value: (installment * ((duration * 4) + (duration/12 * 4))).toFixed(2)},
          ]);
        }
      }
      if(paymentBeforeDelivery > inputs.no_of_payment){
        setPaymentBeforeDelivery('');
        handleRandomInput([
          {name: 'minimum_payment_amt', value: ''},
          {name: 'before_delivery_amt', value: ''},
          {name: 'exp_delivery_date', value: ''},
        ]);
        alert('Number of payment before delivery should be less then or equal to total number of payment.');
      }
  },[duration,frequency]);

  const { inputs, handleInputChange, handleRandomInput, setInputsAll, handleNumberInput, handlePriceInput, handleSubmit, handleReset, setInput, errors } = useSignUpForm(
    (fixedOrderList === null ? RESET_VALUES : fixedOrderList),
    fixed,
    validate
  );

  useEffect(() => {
    let unpaidBal = (parseFloat(inputs.ppsr_fee) + parseFloat(inputs.liability_wavier_fee) + parseFloat(inputs.delivery_fee) + parseFloat(inputs.cash_price) );
    
    handleRandomInput([      
      {name: 'int_unpaid_bal', value:  unpaidBal.toFixed(2)},
    ]);
  },[inputs.ppsr_fee, inputs.liability_wavier_fee,inputs.delivery_fee, inputs.cash_price]);

  useEffect(() => {
    handleRandomInput([      
      {name: 'liability_wavier_fee', value:  Number(inputs.liability * productQuantity).toFixed(2)},
    ]);
  },[inputs.liability]);
  

  const changeBool = (bool) =>{
    setBool(bool);
  }

  useEffect(() => {
    if(bool === true){
      if(inputs.no_of_payment !== ""){
        if(inputs.each_payment_amt != ""){
          handleRandomInput([
            {name: 'minimum_payment_amt', value: (paymentBeforeDelivery * parseFloat(inputs.each_payment_amt)).toFixed(2)},
            {name: 'total_payment_amt', value: (Number(inputs.no_of_payment) * parseFloat(inputs.each_payment_amt)).toFixed(2)},
          ]);
        }else{
          handleRandomInput([
            {name: 'minimum_payment_amt', value: ''},
            {name: 'total_payment_amt', value: ''},
          ]);
        }
      }
    }
  },[inputs.each_payment_amt]);
  
  useEffect(() => {
    if(bool === false){
      if(inputs.no_of_payment !== ""){
        if(inputs.total_payment_amt != ""){
          handleRandomInput([
            {name: 'each_payment_amt', value: (parseFloat(inputs.total_payment_amt) / Number(inputs.no_of_payment)).toFixed(2)},
            {name: 'minimum_payment_amt', value: (paymentBeforeDelivery * parseFloat(inputs.each_payment_amt)).toFixed(2)},
          ]);
        }else{
          handleRandomInput([
            {name: 'minimum_payment_amt', value: ''},
            {name: 'each_payment_amt', value: ''},
          ]);
        }
      }
    }
  },[inputs.total_payment_amt]);
    

return (
    <div>
      <Dialog maxWidth="sm" open={open}  TransitionComponent={Transition}>
        <form onSubmit={handleSubmit}> 
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Fix Order
              </Typography>
              <IconButton size="small" onClick={handleFixedClose} className={styleClass.closeIcon}> x </IconButton>
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
          <Paper className={classes.paper}>            
            <Grid container spacing={4}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h6" className={classes.labelTitle}>
                Credit Details
              </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel className={classes.textsize} htmlFor="cash_price">Cash Price *</InputLabel>
                <TextField
                  InputProps={{
                    classes: {
                      input: classes.textsize,
                    },
                  }}
                  id="cash_price"
                  name="cash_price"
                  // label="Cash Price"
                  value={inputs.cash_price}
                  onChange={handlePriceInput}
                  error={errors.cash_price}
                  helperText={errors.cash_price}
                  fullWidth
                  type="text"
                  margin="dense"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    classes: {
                      input: classes.textsize,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} >
              <InputLabel className={classes.textsize} htmlFor="liability">Liability Wavier Fee *</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="liability"
                      name="liability"                      
                      value={inputs.liability}
                      onChange={handlePriceInput}
                      error={errors.liability_wavier_fee}
                      helperText={errors.liability_wavier_fee}
                      fullWidth
                      type="text"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                    <Typography style = {{textAlign : 'right'}} className={classes.textsize}>{"x " + productQuantity +" = " + inputs.liability_wavier_fee}</Typography>
                  </Grid>                  
                  <Grid item xs={12} sm={6}>
                  <InputLabel className={classes.textsize} htmlFor="delivery_fee">Delivery Fee *</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="delivery_fee"
                      name="delivery_fee"
                      // label="Delivery Fee"
                      value={inputs.delivery_fee}
                      onChange={handlePriceInput}                      
                      error={errors.delivery_fee}
                      helperText={errors.delivery_fee}
                      fullWidth
                      type="text"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}                      
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize} htmlFor="ppsr_fee">PPSR Fee *</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="ppsr_fee"
                      name="ppsr_fee"
                      // label="PPSR Fee"
                      value={inputs.ppsr_fee}
                      onChange={handlePriceInput}
                      error={errors.ppsr_fee}
                      helperText={errors.ppsr_fee}
                      fullWidth
                      type="text"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Grid>                  
                  
                  <Grid item xs={12} sm={12}>
                    <InputLabel className={classes.textsize} htmlFor="int_unpaid_bal">Intial Unpaid Balance *</InputLabel>
                    <TextField                     
                      id="int_unpaid_bal"
                      name="int_unpaid_bal"
                      // label="Intial Unpaid Balance"
                      value={inputs.int_unpaid_bal}
                      onChange={handlePriceInput}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      fullWidth
                      error={errors.int_unpaid_bal}
                      helperText={errors.int_unpaid_bal}
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <Typography variant="h6" className={classes.labelTitle}> Payments  </Typography>
                    <Typography  className={classes.subTitle}> Timing of Payments </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>    
                
                  <InputLabel className={classes.textsize} htmlFor="frequency">Frequency *</InputLabel>
                    <Select
                      id="frequency"
                      name="frequency"
                      value={inputs.frequency}
                      onChange={handleFrequency}
                      error={errors.frequency}
                      margin='dense'                      
                      helperText={errors.frequency}
                      fullWidth                      
                      className={classes.textsize}
                      required                      
                    > 
                      <MenuItem className={classes.textsize} value="" disabled>Select Option</MenuItem>
                      <MenuItem className={classes.textsize} value="4">Weekly</MenuItem>
                      <MenuItem className={classes.textsize} value="2">Fortnightly</MenuItem>
                      <MenuItem className={classes.textsize} value="1">Monthly</MenuItem>                      
                    </Select>                          
                  </Grid>
                  <Grid item xs={12} sm={4}>    
                
                <InputLabel className={classes.textsize} htmlFor="duration">Duration *</InputLabel>
                  <Select
                    id="duration"
                    name="duration"
                    value={inputs.duration}
                    onChange={handleDuration}
                    error={errors.duration}
                    margin='dense'                      
                    helperText={errors.duration}
                    fullWidth                      
                    className={classes.textsize}
                    required                      
                  > 
                    <MenuItem className={classes.textsize} value="" disabled>Select Option</MenuItem>
                    <MenuItem className={classes.textsize} value="12">1 Year</MenuItem>
                    <MenuItem className={classes.textsize} value="24">2 Year</MenuItem>
                    <MenuItem className={classes.textsize} value="36">3 Year</MenuItem>
                    <MenuItem className={classes.textsize} value="48">4 Year</MenuItem>
                    <MenuItem className={classes.textsize} value="60">5 Year</MenuItem>                      
                  </Select>                          
                </Grid>
                  <Grid item xs={12} sm={4}>
                  <Typography  className={classes.subTitle}>
                    First Payment Date *
                  </Typography>
                   <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        margin="dense"
                        autoOk = {true}                    
                        variant = "inline"
                        id="first_payment"
                        name="first_payment"
                        format="dd-MM-yyyy"
                        placeholder="DD-MM-YYYY"
                        disablePast = {true}
                        value={inputs.first_payment}
                        fullWidth 
                        InputProps={{
                          classes: {
                            input: classes.textsize,
                          },
                        }}
                        onChange={handleDateChange}
                        error={errors.first_payment}
                        helperText={errors.first_payment}        
                        disabled = {frequency == "" || duration == ""}
                      />
                    </MuiPickersUtilsProvider>
                   
                    </Grid>
                    
                  <Grid item xs={12} sm={4}>
                  <Typography  className={classes.subTitle}>
                    Last Payment Date *
                  </Typography>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        margin="dense"
                        autoOk = {true}                    
                        variant = "inline"
                        id="last_payment"
                        name="last_payment"
                        format="dd-MM-yyyy"
                        placeholder="DD-MM-YYYY"
                        disabled
                        disablePast = {true}
                        value={inputs.last_payment}
                        fullWidth 
                        InputProps={{
                          classes: {
                            input: classes.textsize,
                          },
                        }}
                        onChange={handleLastDate}
                        error={errors.last_payment}
                        helperText={errors.last_payment}                               
                        // disabled = {frequency == "" || duration == ""}                       
                      />
                    </MuiPickersUtilsProvider>
                    
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography  className={classes.subTitle}>
                      Number of Payments  *
                  </Typography>
                  <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="no_of_payment"
                      name="no_of_payment"   
                      disabled                   
                      value={inputs.no_of_payment}
                      onChange={handleNumberInput}                      
                      fullWidth
                      error={errors.no_of_payment}
                      helperText={errors.no_of_payment}
                      type="text"
                      margin="dense"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography  className={classes.subTitle}>
                    Amount of Each Payments *
                  </Typography>
                  <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="each_payment_amt"
                      name="each_payment_amt"
                      value={inputs.each_payment_amt}
                      onChange={function(e){handlePriceInput(e); changeBool(true)}}
                      error={errors.each_payment_amt}
                      helperText={errors.each_payment_amt}
                      fullWidth
                      type="text"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography  className={classes.subTitle}>
                      Total Amount of Payments *
                  </Typography>
                  <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="total_payment_amt"
                      name="total_payment_amt"
                      // label="total_payment_amt/Mortgage"
                      value={inputs.total_payment_amt}
                      onChange={function(e){handlePriceInput(e); changeBool(false)}}
                      // onChange={handlePriceInput}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      error={errors.total_payment_amt}
                      helperText={errors.total_payment_amt}
                      fullWidth
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                     
                </Grid>
                
                <Grid item xs={12} sm={8}>
                  <Typography  className={classes.subTitle}>
                      Minimun Number of Payments before delivery *
                  </Typography>
                  <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="before_delivery_amt"
                      name="before_delivery_amt"
                      // label="before_delivery_amt/Mortgage"
                      value={inputs.before_delivery_amt}
                      onChange={handleNumberOfPaymentBefDelivery}
                      error={errors.before_delivery_amt}
                      helperText={errors.before_delivery_amt}
                      
                      fullWidth
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"                      
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography  className={classes.subTitle}>
                    Minimum Payment Amt *
                  </Typography>
                  <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="minimum_payment_amt"
                      name="minimum_payment_amt"
                      value={inputs.minimum_payment_amt}
                      onChange={handlePriceInput}
                      error={errors.minimum_payment_amt}
                      helperText={errors.minimum_payment_amt}
                      // disabled
                      fullWidth
                      type="text"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <Typography  className={classes.subTitle}>
                   Expected Delivery Date *
                  </Typography>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          margin="dense"
                          autoOk = {true}                    
                          variant = "inline"
                          id="exp_delivery_date"
                          name="exp_delivery_date"
                          format="dd-MM-yyyy"
                          placeholder="DD-MM-YYYY"
                          disablePast = {true}                          
                          value={inputs.exp_delivery_date}                          
                          InputProps={{
                            classes: {
                              input: classes.textsize,
                            },
                          }}
                          onChange={handleDeliveryDate}
                          error={errors.exp_delivery_date}
                          helperText={errors.exp_delivery_date}                               
                        />
                        </MuiPickersUtilsProvider>
                        </Grid>
                        
                        <Grid item xs={12} sm={4}>

                            <Typography  className={classes.subTitle}>
                              Expected Delivery Time *
                            </Typography>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardTimePicker
                            margin="dense"
                            id="exp_delivery_time"
                            name="exp_delivery_time"                            
                            value={inputs.exp_delivery_time}
                            onChange={handleDeliveryTime}
                            InputProps={{
                              classes: {
                                input: classes.textsize,
                              },
                            }}
                            error={errors.exp_delivery_time}
                            helperText={errors.exp_delivery_time}                            
                          />
                      </MuiPickersUtilsProvider>                   
                </Grid>    
                <Grid item xs={12} sm={12}>
                  <Typography variant="h6" className={classes.labelTitle}>
                    Interest
                  </Typography>
                  <Typography  className={classes.subTitle}>
                    Annual Interest Rates
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={4}> 
                  <Typography  className={classes.subTitle}>
                    Weeks
                  </Typography>                
                  <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="intrest_rate"
                      name="intrest_rate"
                      value={inputs.intrest_rate}
                      onChange={handleNumberInput}
                      fullWidth
                      type="text"
                      margin="dense"
                      InputProps={{                        
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                    </Grid>
                    <Grid item xs={12} sm={4}>       
                        <Typography  className={classes.subTitle}>
                          Daily interest rates of (in %)
                        </Typography>   
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="intrest_rate_per"
                      name="intrest_rate_per"
                      // label="Daily interest rates of (in %)"
                      value={inputs.intrest_rate_per}
                      onChange={handlePriceInput}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      // error={errors.intrest_rate_per}
                      // helperText={errors.intrest_rate_per}
                      fullWidth
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{                        
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      // InputProps={{
                      //   startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      // }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography  className={classes.subTitle}>
                    Total Interest Charges
                  </Typography>
                  
                  <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="total_intrest"
                      name="total_intrest"
                      // label=""
                      value={inputs.total_intrest}
                      onChange={handlePriceInput}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      // error={errors.total_intrest}
                      // helperText={errors.total_intrest}
                      fullWidth
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{                        
                        classes: {
                          input: classes.textsize,
                        },
                      }}                      
                    />
                </Grid>

                
                <Grid item xs={12} sm={12}>
                    
                    <Button  variant="contained"  color="primary" className={classes.button} onClick={handleSubmit}>
                      save
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleFixedClose} className={classes.button}>
                      Close
                    </Button> 
                  </Grid>
              </Grid>
          </Paper>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
