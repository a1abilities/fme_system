import React, { useState, useEffect } from 'react';
import {component} from 'react-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TextField from '@material-ui/core/TextField';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
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
import DateFnsUtils from '@date-io/date-fns';
import Tooltip from '@material-ui/core/Tooltip';
import {useCommonStyles} from '../../common/StyleComman'; 
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import 'date-fns';


import { APP_TOKEN } from '../../../api/Constants';

// API CALL
import Staff from '../../../api/franchise/Staff';
import Order from '../../../api/franchise/Order';
import CategoryAPI from '../../../api/Category';
import ConfirmationDialog from '../ConfirmationDialog.js';
import ConfirmDialogDishonour from '../ConfirmationDialog.js';
import ConfirmDialogCompleted from '../ConfirmationDialog.js';


import { getDate, getCurrentDate, getCurrentDateDDMMYYYY, getCurrentDateDBFormat, getDateInDDMMYYYY, setDBDateFormat, subtractOneDay, addOneDay } from '../../../utils/datetime';

import useSignUpForm from '../franchise/CustomHooks';
import { FormLabel } from '@material-ui/core';

import FixPaymentTable from './OrderComponent/FixPaymentTable';
import FlexPaymentTable from './OrderComponent/FlexPaymentTable';
import PaymentStatusTable from './PaymentComponent/PaymentStatusTable.js';

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
  highlightRow:{
    backgroundColor: "#CBF6BF",
    color: theme.palette.common.white,
  },
  labelTitle: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // flex: 1,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(13),
    marginTop: 15,
  },  
  rowHeading: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(18),
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
  buttonDisabled: {
    color: theme.palette.secondary,
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
    // color:"white",
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
  centerDate: {
    textAlignb: 'center'
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: theme.typography.pxToRem(13),
  },
  body: {
    fontSize: 11,
  },
}))(TableCell);



export default function paymentStatus({ open, handleClose, orderData}) {

  const classes = useStyles();
  const styleClass = useCommonStyles();
  
  
  const [confirmation, setConfirmation] = React.useState(false);
  const [confirmDishonour, setConfirmDishonour] = React.useState(false);
  const [confirmCompleted, setConfirmCompleted] = React.useState(false);
  
  const [paymentSchedule, setPaymentSchedule] = useState([]);
  const [nextPayment, setNextPayment] = useState({installment_no:0});
  
  const [paymentRecDate, setPaymentRecDate] = useState(new Date());
  const [paymentAmt, setPaymentAmt] = useState('');
  const [orderTypeData, setOrderTypeData] = useState([]);
  const [orderedProductList, setOrderedProductList] = useState([]);
  const [remarkField,setRemarkField] = useState('');
  const [totalPaid, setTotalPaid] = useState(0);
  const [scheduleChangerOpen, setScheduleChangerOpen] = useState(false);
  const [reschedule, setReschedule] = useState(false);
  const [dateToReschedule, setDateToReschedule] = useState();
  const [instNo, setInstNo]  = useState(0);
  const [errors, setErrors] = useState({payment_amt : ''});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await getPaymentSchedule(); 
    await getRequiredData();
    if(orderData.order_type===1){
      await getFixedFormDetail();
    }else if(orderData.order_type===2){
      await getFlexFlexFormDetail();
    }
  }

  function handleDateChange(date){
      setPaymentRecDate(date);    
  }

  const handlePayDateChange = (date) => {
    setNextPayment({
      ...nextPayment,
      'payment_date' : date,
    });
  }

  const handlePriceInput = e => {
    const validDecimalNumber = /^\d*\.?\d*$/;
    if (e.target.value === '' || validDecimalNumber.test(e.target.value)) {
      setPaymentAmt(e.target.value);
    }
  }

  const handleInputChange = e =>{
    setRemarkField(e.target.value);
  }

  const handleSetScheduledData = (result) => {
    setPaymentSchedule(result.paymentSchedule);

    if(result.lastInst[0] != null && result.lastInst[0] != ''){
      setTotalPaid(result.lastInst[0].total_paid);
    }
    if(result.nextInstallmentRow[0] != null && result.nextInstallmentRow[0] != ''){
      setNextPayment(result.nextInstallmentRow[0]);
      setPaymentAmt(result.nextInstallmentRow[0].payment_amt.toFixed(2));
      setInstNo(result.nextInstallmentRow[0].installment_no)
      setPaymentRecDate(result.nextInstallmentRow[0].payment_date);
      setDateToReschedule(result.nextInstallmentRow[0].payment_date);
    }
  }
  
  const getPaymentSchedule = async () => {
    try {
        const result = await Order.getPaymentSchedule({order_id: orderData.id});
        handleSetScheduledData(result);
      } catch (error) {
        console.log('Error..',error);
      }
  };  

  
  const getRequiredData = async () => {
    try {
      const response = await CategoryAPI.getOrderedProductList({ product_ids : orderData.product_id });
      setOrderedProductList(response.productList);
    } catch (error) {
      console.log('Error..',error);
    }
  };

  const getFlexFlexFormDetail = async () => {
    try{
      const flexOrder = await Order.getCurrespondingFlexOrder({flexOrderId: orderData.order_type_id});
      setOrderTypeData(flexOrder[0]);
    }catch (error) {
        console.log('Error..',error);
    }
  }
  
  const getFixedFormDetail = async () => {
    try{
      const fixOrder = await Order.getCurrespondingFixedOrder({fixedOrderId: orderData.order_type_id});
      setOrderTypeData(fixOrder[0]);
    }catch (error) {
        console.log('Error..',error);
    }
  }

  const handleDateIncrease = () => {    
    setDateToReschedule(addOneDay(dateToReschedule));
  }

  const handleDateDecrease = () => {
    setDateToReschedule(subtractOneDay(dateToReschedule));
  }
  
  function handlePaymentSubmit(response){
    if(Number(paymentAmt) === 0){
      setErrors({payment_amt: 'Amount should be greater then $0'});
    }else{
      setErrors({payment_amt:''})
      setConfirmation(true);
    }    
  }

  const handleInstChange = (e) => {
    const validNumber = /^[0-9]*$/;
    if (e.target.value === '' || validNumber.test(e.target.value)) {
      setInstNo(e.target.value);
    }
  }

  const handleConfirmationDialog = async (isConfirm) => {
    setConfirmation(false);
    if(isConfirm === 1){
      try {
        const result = await Order.paymentSubmit({
          order_id : orderData.id,
          customer_id: orderData.customer_id,
          installment_no : instNo,
          payment_date:  nextPayment.payment_date,
          settlement_date : getDate(paymentRecDate),
          payment_amt : nextPayment.payment_amt,
          deposit_amt : Number(paymentAmt).toFixed(2),
          total_paid : totalPaid,
          remark : remarkField,
          order_type : orderData.order_type,
          order_type_id : orderData.order_type_id,
        });
        handleSetScheduledData(result);
        setRemarkField('');
      } catch (error) {
        console.log('Error..',error);
      }        
    }    
  }

  const handleReschedulePayment = async () => {
    let diffBetweenSchedule = [];
    
    const date1 = new Date(nextPayment.payment_date);
    const date2 = new Date(dateToReschedule);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    if(nextPayment.payment_date > dateToReschedule){
      diffBetweenSchedule.push({'subtract': diffDays, 'add' : 0});
    }else if(nextPayment.payment_date < dateToReschedule){
      diffBetweenSchedule.push({'add': diffDays, 'subtract': 0 });
    }else{
      diffBetweenSchedule.push({'add': 0, 'subtract': 0 });
    }

    try{
      const response = await Order.paymentReschedule({
        order_id: orderData.id,
        customer_id : orderData.customer_id,        
        diffBetweenSchedule : diffBetweenSchedule,
       });
       handleSetScheduledData(response);
    }catch(e){
      console.log('error..',e);
    }
  }

  const handleMakeDishounored = async () =>{
    setConfirmDishonour(true);
  }

  const handleCloseDishonourConBox = async (isConfirm) => {
    setConfirmDishonour(false);
    if(isConfirm === 1){
      try {
        const result = await Order.dishonourToPayment({
          order_id : orderData.id,
          customer_id: orderData.customer_id,
          installment_no : instNo,
          payment_amt : nextPayment.payment_amt,
          payment_date:  nextPayment.payment_date,
          settlement_date : getDate(paymentRecDate),
          remark : remarkField,
          order_type : orderData.order_type,
          order_type_id : orderData.order_type_id,
        });
        handleSetScheduledData(result);
        setRemarkField('');
      } catch (error) {
        console.log('Error..',error);
      }        
    }    
  }

  
  const handleContractCompleted = async () =>{
    setConfirmCompleted(true);
  }

  const handleCloseCompleted = async (isConfirm) => {
    setConfirmCompleted(false);
    if(isConfirm === 1){
      try {
        const result = await Order.completeNCloseContract({
          order_id : orderData.id,
          customer_id: orderData.customer_id,          
        });
        handleClose();
      } catch (error) {
        console.log('Error..',error);
      }        
    }    
  }
  
return (
    <div>
      <Dialog maxWidth open={open} TransitionComponent={Transition}>
        <form > 
          <AppBar className={classes.appBar}>
            <Toolbar>              
              <Typography variant="h6" className={classes.title}> Payment Status </Typography>
                <IconButton size="small" onClick={handleClose} className={styleClass.closeIcon}> x </IconButton>
              </Toolbar>
          </AppBar>

          <div className={classes.root}>
          <Paper className={classes.paper}> 
          <Grid container  justify="space-around">  
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" className={classes.labelTitle}>
                  {"Order Id: " + orderData.order_id }
              </Typography> 
              <Typography variant="h6" className={classes.labelTitle}>
                  {"Customer Name: " + orderData.first_name + ' ' + orderData.last_name }
              </Typography>              
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" className={classes.labelTitle}>
                  {"Customer Id:  " + orderData.customer_id }
              </Typography>
              <Typography variant="h6" className={classes.labelTitle}>
                  {"Rental Type: " + orderData.order_type_name }
              </Typography>              
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" className={classes.labelTitle}>
                  {"Order Date:  " + getDateInDDMMYYYY(orderData.order_date) }
              </Typography>
              <Typography variant="h6" className={classes.labelTitle}>
                {"Payment Mode: " + orderData.payment_mode_name }
            </Typography>
            </Grid>         
            <Grid item xs={12} sm={0}></Grid>  
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" className={classes.labelTitle}>
                  {"Each Installment Amt. " + 
                    (orderTypeData.frequency === 1 ? "(Monthly): " :
                     orderTypeData.frequency === 2 ? "(Fortnightly): " :
                     orderTypeData.frequency === 4 ? "(Weekly): " : '')
                   + "$" + orderTypeData.each_payment_amt }
              </Typography>              
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" className={classes.labelTitle}>
                {orderData.order_type===1 ?
                  ("Total Expected:  " + orderTypeData.total_payment_amt) 
                :orderData.order_type===2 ?
                  ("Bond Amt:  " + orderTypeData.bond_amt )
                :''}
              </Typography>                            
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" className={classes.labelTitle}>
                  {"Total Received Amt.:  " + totalPaid.toFixed(2) }
              </Typography>              
            </Grid>
            {orderData.order_type===1 &&
            <Grid item xs={12} sm={11}>
              <Typography variant="h6" className={classes.labelTitle}>
                { ("Bond Amt:  " + orderTypeData.minimum_payment_amt )}
              </Typography>                            
            </Grid>
            }   
            <Grid item xs={12} sm={0}></Grid>  
            <Grid item xs={12} sm={11}>
              <Typography variant="h6" className={classes.labelTitle}>
                {"Rental Product :  " + (orderedProductList.length > 0 ? orderedProductList :[]).map(data => {
                  return(data.name)
                })}
              </Typography>                  
            </Grid>
            <Grid item xs={12} sm={11}>   
              <Divider />
              <Typography variant="h6" className={classes.labelTitle}> {'\n'} </Typography> 
            </Grid>
            </Grid>
            <Grid container  justify="space-around">         
              <Grid item xs={12} sm={11}>
                <Typography variant="h6" className={classes.rowHeading} > Reschedule Remaining Payment </Typography>
              </Grid>
              <Grid item xs={12} sm={11} disabled>
                <Tooltip title="Click to Previous Date">
                  <IconButton  size="small" onClick={ handleDateDecrease}>
                    <RemoveIcon />  
                  </IconButton>
                </Tooltip>
                <TextField
                  style= {{fontSize : 15, fontWeight : "bold", marginLeft: '10px', marginRight: '10px'}}
                  id="date_changer"
                  name="date_changer"
                  value={getDateInDDMMYYYY(dateToReschedule)}
                  margin="dense"                  
                  disabled
                  InputProps={{                     
                    classes: {
                      input: styleClass.centerDate,
                    },                    
                  }}                    
                />
                <Tooltip title="Click to Next Date">
                  <IconButton  size="small" onClick={ handleDateIncrease}>
                    <AddIcon />  
                  </IconButton>
                </Tooltip>
                <Button variant="contained" color="primary" onClick={handleReschedulePayment} className={classes.button} style={{marginLeft : '60px'}}>  Reschedule </Button>
                <Button variant="contained" color="primary" onClick={handleContractCompleted} className={classes.button}>Click to Complete Contract</Button>
              </Grid>

              <Grid item xs={12} sm={11}>
                <Typography variant="h6" className={classes.rowHeading}> Add Payment </Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography variant="h6" className={classes.labelTitle}> Installment No.: </Typography>
                  <TextField 
                    id="installment_no"
                    name="installment_no"
                    value={instNo}
                    fullWidth
                    type="text"
                    margin="dense"
                    InputProps={{                     
                      classes: {
                        input: styleClass.textsize,
                      },                    
                    }}
                    onChange = {handleInstChange}
                    disabled
                  />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography variant="h6" className={classes.labelTitle}> Payment Date:  </Typography>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="dense"
                      autoOk = {true}                    
                      variant = "inline"
                      id="payment_date"
                      name="payment_date"
                      format="dd-MM-yyyy"
                      placeholder="DD-MM-YYYY"                      
                      fullWidth 
                      value = {nextPayment.payment_date}
                      InputProps={{
                        classes: {
                          input: styleClass.textsize,
                        },
                      }}
                      onChange = {handlePayDateChange}
                      disabled
                    />
                  </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography variant="h6" className={classes.labelTitle}> Payment Amount </Typography>
                  <TextField 
                    id="payment_amt"
                    name="payment_amt"
                    value={paymentAmt}
                    onChange={handlePriceInput}
                    fullWidth
                    type="text"
                    margin="dense"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      classes: {
                        input: styleClass.textsize,
                      },
                    }}
                    error = {errors.payment_amt}
                    helperText = {errors.payment_amt}
                  />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography variant="h6" className={classes.labelTitle}> Payment Rec. Date </Typography>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="dense"
                      autoOk = {true}                    
                      variant = "inline"
                      id="payment_rec_date"
                      name="payment_rec_date"
                      format="dd-MM-yyyy"
                      placeholder="DD-MM-YYYY"
                      value={paymentRecDate}
                      fullWidth 
                      InputProps={{
                        classes: {
                          input: styleClass.textsize,
                        },                                        
                      }}                                      
                      onChange={handleDateChange}                    
                    />
                  </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="h6" className={classes.labelTitle}>Remark </Typography>
                  <TextField 
                    id="remark"
                    name="remark"
                    value={remarkField}
                    onChange={handleInputChange}
                    fullWidth
                    type="text"
                    margin="dense"
                    multiline
                    InputProps={{
                      classes: {
                        input: styleClass.textsize,
                      },
                    }}
                  />
              </Grid>
              <Grid item xs={12} sm={2} style={{marginTop: '30px', textAlign: 'right'}}>
                <Button variant="contained" color="primary" onClick={handlePaymentSubmit} className={classes.button}> Submit</Button> 
                <Button variant="contained" color="primary" onClick={handleMakeDishounored} className={classes.button}>Dishonoured</Button>                
              </Grid>

              <Grid item xs={12} sm={12}  style={{marginTop: '20px', marginBottom : '15px'}}>
                <PaymentStatusTable paymentSchedule ={paymentSchedule} installmentBeforeDelivery={orderTypeData.before_delivery_amt} />
              </Grid>
           
              <Grid item xs={12} sm={12} style={{marginTop: '10px', marginBottom : '15px', textAlign: 'right'}}>                      
                <Button variant="contained" color="primary" onClick={handleClose} className={classes.button}>
                  Close
                </Button> 
              </Grid>
          </Grid>
        </Paper>
        </div>
      </form>
    </Dialog>
      
      {confirmation ? <ConfirmationDialog open = {confirmation} lastValue={1} handleConfirmationClose={handleConfirmationDialog}  currentState={0} title={""} content={"Is this installment paid by customer ?"} />: null }
      {confirmDishonour ? <ConfirmDialogDishonour open = {confirmDishonour} lastValue={1} handleConfirmationClose={handleCloseDishonourConBox}  currentState={0} title={""} content={"Click Yes to Make it Dishonored!"} />: null }
      {confirmCompleted ? <ConfirmDialogCompleted open = {confirmCompleted} lastValue={1} handleConfirmationClose={handleCloseCompleted}  currentState={0} title={""} content={"Click Yes to complete & close contract!"} />: null }
    </div>
  );
}
