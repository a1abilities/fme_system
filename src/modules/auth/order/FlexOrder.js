import React, { useState, useEffect } from 'react';
import {component} from 'react-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Paper from '@material-ui/core/Paper';
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';

import { APP_TOKEN } from '../../../api/Constants';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import {getDate, getCurrentDate, getTimeinDBFormat } from '../../../utils/datetime'
import validate from '../../common/validation/FlexOrderValidation';
import {useCommonStyles} from '../../common/StyleComman'; 
import useSignUpForm from '../franchise/CustomHooks';

const RESET_VALUES = {
  goods_rent_price : '',
  ppsr_fee : '',
  liability_fee : '',
  liability : '',
  weekly_total : '',
  frequency : '',
  first_payment : getCurrentDate(),
  each_payment_amt : '',
  before_delivery_amt : '',
  exp_delivery_date : getCurrentDate(),
  exp_delivery_time : getCurrentDate(),
  bond_amt : '',
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
  subTitle: {
    fontSize: theme.typography.pxToRem(12),
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


export default function FlexOrder({ open, handleFlexClose, setFlexOrderList, flexOrderList, handleOrderType, totalOfRental, productQuantity}) {

  const classes = useStyles();
  const styleClass = useCommonStyles();
  const [frequency, setFrequency] = useState(flexOrderList === null ? '' : flexOrderList.frequency);
  const [paymentBeforeDelivery,setPaymentBeforeDelivery] = useState(flexOrderList === null ? '' : flexOrderList.before_delivery_amt);
  const [firstPaymentDate,setFirstPaymentDate] = useState(flexOrderList === null ? '' : flexOrderList.first_payment);
 
 
  function handleDateChange(date){    
    handleInputChange({target:{name: 'first_payment', value: date}})
    setFirstPaymentDate(date);
  }

  function handleDeliveryDate(date){    
    handleInputChange({target:{name: 'exp_delivery_date', value: date}})
  }

  function handleDeliveryTime(time){      
    handleInputChange({target:{name: 'exp_delivery_time', value: time}})
  }

  function flex(e){
        const data = {
        goods_rent_price : parseFloat(inputs.goods_rent_price).toFixed(2),
        ppsr_fee : parseFloat(inputs.ppsr_fee).toFixed(2),
        liability_fee : parseFloat(inputs.liability_fee).toFixed(2),
        weekly_total : parseFloat(inputs.weekly_total).toFixed(2),
        frequency :  inputs.frequency,
        each_payment_amt : parseFloat(inputs.each_payment_amt).toFixed(2),
        before_delivery_amt : inputs.before_delivery_amt,
        bond_amt : parseFloat(inputs.bond_amt).toFixed(2),
        exp_delivery_date : getDate(inputs.exp_delivery_date),
        exp_delivery_time : getTimeinDBFormat(inputs.exp_delivery_time),
        first_payment : getDate(inputs.first_payment), 
      }
      setFlexOrderList(data);
      handleOrderType(2);
      handleFlexClose(false)
  }

  const handleFrequency = (e) => {
    setFrequency(Number(e.target.value));
    setInput('frequency', Number(e.target.value));
  }
    
  const handleNumberOfPaymentBefDelivery = (e) =>{
    calculateNoOfPayment(e.target.value);
  }

  function calculateNoOfPayment(value) {
    const validNumber = /^[0-9]*$/;
    if (value === '' || validNumber.test(value)) {
      setPaymentBeforeDelivery(value);
      setInput( 'before_delivery_amt' , value);     
    }
  }


  useEffect(() => {
    if(paymentBeforeDelivery!= ''){
      handleRandomInput([
        {name: 'bond_amt', value: (paymentBeforeDelivery * parseFloat(inputs.each_payment_amt))},
      ]);
    }else{
      handleRandomInput([
        {name: 'bond_amt', value: ''},
      ]);
    }
  },[paymentBeforeDelivery]);

  
  useEffect(()=>{
      let eachPaymentAmt = 0;

      if(frequency != ''){    
        if(frequency == 1){
          let installment = (totalOfRental * 4);
          handleRandomInput([ {name: 'each_payment_amt', value: installment.toFixed(2)},]);
          eachPaymentAmt = installment;          
        }else if(frequency == 2){ 
          let installment = (totalOfRental * 2);
          handleRandomInput([ {name: 'each_payment_amt', value: installment.toFixed(2)}, ]);
          eachPaymentAmt = installment; 
        }else if(frequency == 4){ 
          let installment = totalOfRental;
          handleRandomInput([ {name: 'each_payment_amt', value: installment.toFixed(2)}, ]);        
          eachPaymentAmt = installment; 
        }
      }    
      if(paymentBeforeDelivery!= ''){
        handleRandomInput([
          {name: 'bond_amt', value: (paymentBeforeDelivery * eachPaymentAmt).toFixed(2)},
        ]);
      }else{
        handleRandomInput([
          {name: 'bond_amt', value: ''},
        ]);
      }        
  },[frequency]);
  

const { inputs, handleInputChange, handleNumberInput, handleRandomInput, handlePriceInput, handleSubmit, handleReset, setInput, errors } = useSignUpForm(
  (flexOrderList === null ? RESET_VALUES : flexOrderList),
  flex,
  validate
);


useEffect(()=>{
  if(paymentBeforeDelivery!= ''){
    handleRandomInput([
      {name: 'bond_amt', value: (paymentBeforeDelivery * inputs.each_payment_amt).toFixed(2)},
    ]);
  }else{
    handleRandomInput([
      {name: 'bond_amt', value: ''},
    ]);
  }  
},[inputs.each_payment_amt]);

  useEffect(() => {
    handleRandomInput([      
      {name: 'liability_fee', value:  Number(inputs.liability * productQuantity).toFixed(2)},
    ]);
  },[inputs.liability]);


return (
    <div>
      <Dialog maxWidth="sm" open={open} TransitionComponent={Transition}>
        <form > 
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Flex Order
              </Typography>
              <IconButton size="small" onClick={handleFlexClose} className={styleClass.closeIcon}> x </IconButton>
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
          <Paper className={classes.paper}>            
            <Grid container spacing={4}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h6" className={classes.labelTitle}>
                Consumer Lease Details
              </Typography>
              </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize} htmlFor="first_name">Rent Price of Goods *</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="goods_rent_price"
                      name="goods_rent_price"
                      // label="Rent Price of Goods"
                      value={inputs.goods_rent_price}
                      onChange={handlePriceInput}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      error={errors.goods_rent_price}
                      helperText={errors.goods_rent_price}
                      fullWidth
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
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize}  htmlFor="first_name">PPSR Fee (if applicable) *</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="ppsr_fee"
                      name="ppsr_fee"
                      // label="PPSR Fee (if applicable)"
                      value={inputs.ppsr_fee}
                      onChange={handlePriceInput}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      error={errors.ppsr_fee}
                      helperText={errors.ppsr_fee}
                      fullWidth
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
                  <Grid item xs={12} sm={6} >
                    <InputLabel className={classes.textsize} htmlFor="liability_fee">Liability Wavier Fee *</InputLabel>
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
                      error={errors.liability_fee}
                      helperText={errors.liability_fee}
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
                    <Typography style = {{textAlign : 'right'}} className={classes.textsize}>{"x " + productQuantity +" = " + inputs.liability_fee}</Typography>
                  </Grid>                  
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="first_name">TOTAL PER WEEK/ FORTNIGHT *</InputLabel>
                    <TextField                     
                      id="weekly_total"
                      name="weekly_total"
                      // label="TOTAL PER WEEK/ FORTNIGHT"
                      value={inputs.weekly_total}
                      onChange={handlePriceInput}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      error={errors.weekly_total}
                      helperText={errors.weekly_total}
                      fullWidth
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
                  <Typography variant="h6" className={classes.labelTitle}>
                      Payments 
                  </Typography>
                  <Typography  className={classes.subTitle}>
                      Timing of Payments
                  </Typography>
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
                  <Typography  className={classes.subTitle}> Amount of Each Payment *</Typography>
                  <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="each_payment_amt"
                      name="each_payment_amt"
                      value={inputs.each_payment_amt}
                      onChange={handlePriceInput}
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
                  <Typography  className={classes.subTitle}> First Payment Date *</Typography>
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
                        disabled = {frequency == ""}                             
                      />
                    </MuiPickersUtilsProvider>
                </Grid>
                
                <Grid item xs={12} sm={8}>
                  <Typography  className={classes.subTitle}>Minimun Number of Payments before delivery *</Typography>
                  <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="before_delivery_amt"
                      name="before_delivery_amt"
                      value={inputs.before_delivery_amt}
                      onChange={handleNumberOfPaymentBefDelivery}
                      error={errors.before_delivery_amt}
                      helperText={errors.before_delivery_amt}
                      fullWidth
                      type="text"
                      margin="dense"
                    />
                </Grid>
                 
                <Grid item xs={12} sm={4}>
                  <Typography  className={classes.subTitle}>Bond Amt *</Typography>
                  <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="bond_amt"
                      name="bond_amt"
                      value={inputs.bond_amt}
                      onChange={handlePriceInput}
                      error={errors.bond_amt}
                      helperText={errors.bond_amt}
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
                  <Typography  className={classes.subTitle}>Expected Delivery Date *</Typography>
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
                          <Typography  className={classes.subTitle}>Expected Delivery Time *</Typography>
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
                    
                    <Button  variant="contained"  color="primary" className={classes.button} onClick={handleSubmit}>
                      save
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleFlexClose} className={classes.button}>
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
