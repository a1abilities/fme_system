import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
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
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import {useCommonStyles} from '../../common/StyleComman'; 
import InputAdornment from '@material-ui/core/InputAdornment';
import LinearProgress from '@material-ui/core/LinearProgress';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import 'date-fns';

import { APP_TOKEN } from '../../../api/Constants';

// API CALL
import Order from '../../../api/franchise/Order';
import ConfirmationDialog from '../ConfirmationDialog.js';
import { getDate, getCurrentDate, getDateInDDMMYYYY } from '../../../utils/datetime';

import useSignUpForm from '../franchise/CustomHooks';
import validate from '../../common/validation/CancelOrderRuleValidation';

import { FormLabel } from '@material-ui/core';



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
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(13),
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

const RESET_VALUES  = {
  cancellation_charge : '',
  cancel_by : '',
  refund : '',
  cancel_reason : '',
}

export default function OrderCancellationForm({ open, handleClose, orderData, fetchOrderDataList}) {

  const classes = useStyles();
  const styleClass = useCommonStyles();
  const [paymentStatus, setPaymentStatus] = useState([]);
  const [confirmation, setConfirmation] = React.useState(false);
  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(false);

  
  const getRequiredDataToCancel = async () => {
      try {
        const result = await Order.getRequiredDataToCancel({id: orderData.id});
        setPaymentStatus(result[0]);  
      } catch (error) {
        console.log('Error..',error);
      }
  };
  
  useEffect(() => {
     getRequiredDataToCancel();
  },[]);

  const submit = async () => {
    setpLoading(true);
    setSavebtn(true);

    const result = await Order.submitCancel({
      id: orderData.id,
      budget_id : orderData.budget_id,
      order_type: orderData.order_type,
      order_type_id : orderData.order_type_id,
      refund : inputs.refund,
      cancel_by : inputs.cancel_by,
      cancel_reason : inputs.cancel_reason,
      cancellation_charge : inputs.cancellation_charge,
    });
    fetchOrderDataList();
    handleClose();
  }

  // function handleConfirmationOpen(){      
  //     setConfirmation(true);
  // }

  // function handleConfirmationDialog (response){
  //   if(response === 1){     
  //     // submit();      
  //   }
  //   setConfirmation(false);
  // }


  const { inputs, handleInputChange,  handleNumberInput, handlePriceInput, handleRandomInput, handleSubmit, handleReset, setInputsAll, setInput, errors } = useSignUpForm(
    RESET_VALUES,
    submit,
    validate
  ); 


return (
    <div>
      <Dialog maxWidth="sm" open={open} TransitionComponent={Transition}>
        <form > 
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Order Cancellation Form
              </Typography>              
              <IconButton size="small" onClick={handleClose} className={styleClass.closeIcon}> x </IconButton>
            </Toolbar>
          </AppBar>
          
          <div className={classes.root}>
          {ploading ?  <LinearProgress />: null}
          <Paper className={classes.paper}>            
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" className={classes.labelTitle}>
                     {"Order Id: " + orderData.order_id }
                  </Typography> 
                  <Typography variant="h6" className={classes.labelTitle}>
                     {"Customer Name: " + orderData.first_name + ' ' + orderData.last_name }
                  </Typography> 
                  <Typography variant="h6" className={classes.labelTitle}>
                     {"Total Received Amt.:  " + (paymentStatus.total_rec_amt != undefined && paymentStatus.total_rec_amt != null ? paymentStatus.total_rec_amt : '') }
                  </Typography>                  
                </Grid>               
           {console.log(paymentStatus)}
                <Grid item xs={12} sm={6}>     
                  <Typography variant="h6" className={classes.labelTitle}>
                     {"Total Installment Paid.:  " + (paymentStatus.total_paid_installment != undefined && paymentStatus.total_paid_installment != null ? paymentStatus.total_paid_installment : '') }
                  </Typography>
                  <Typography variant="h6" className={classes.labelTitle}>
                     {"Last Installment Paid on.:  " + (paymentStatus.last_payment_date != undefined && paymentStatus.last_payment_date != null ? getDateInDDMMYYYY(paymentStatus.last_payment_date) : '') }
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>   
                    <Divider />
                </Grid> 
                <Grid item xs={12} sm={6}>     
                  <InputLabel className={classes.textsize}  htmlFor="cancel_by">Cancel By *</InputLabel>
                    <Select
                      value={inputs.cancel_by}
                      onChange={handleInputChange}
                      name ='cancel_by'
                      id = 'cancel_by'
                      fullWidth
                      className={classes.textsize} 
                      error={errors.cancel_by}
                      helperText={errors.cancel_by}
                    >
                      <MenuItem className={classes.textsize}  value="9" >Rentronics</MenuItem>
                      <MenuItem className={classes.textsize}  value="10" >Customer</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>     
                  <InputLabel className={classes.textsize}  htmlFor="cancel_reason">Cancel Reason </InputLabel>
                  <TextField                       
                      id="cancel_reason"
                      name="cancel_reason"
                      value={inputs.cancel_reason}
                      onChange={handleInputChange}                      
                      fullWidth   
                      multiline                   
                      InputProps={{                        
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      error={errors.cancel_reason}
                      helperText={errors.cancel_reason}
                    />
                  </Grid>
                
                <Grid item xs={12} sm={6}>     
                  <InputLabel className={classes.textsize}  htmlFor="refund">Refund </InputLabel>
                  <TextField 
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="refund"
                      name="refund"
                      value={inputs.refund}
                      onChange={handlePriceInput}                      
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>     
                  <InputLabel className={classes.textsize}  htmlFor="cancellation_charge">Cancellation Charge </InputLabel>
                  <TextField 
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="cancellation_charge"
                      name="cancellation_charge"
                      value={inputs.cancellation_charge}
                      onChange={handlePriceInput}                      
                      fullWidth
                      error={errors.cancellation_charge}
                      helperText={errors.cancellation_charge}
                    />
                  </Grid>
                <Grid item xs={12} sm={12}>                                     
                  <Button variant="contained" color='primary' className={classes.button} onClick={ handleSubmit } disabled = {savebtn} >Submit</Button>
                  <Button variant="contained" color="primary" onClick={handleClose} className={classes.button}>
                    Cancel
                  </Button> 
                </Grid>
            </Grid>
          </Paper>
          </div>
        </form>
      </Dialog>
      {/* {confirmation ? <ConfirmationDialog open = {confirmation} lastValue={1} handleConfirmationClose={handleConfirmationDialog}  currentState={0} title={""} content={"Sure to cancel this order ?"} />: null } */}
    </div>
  );
}
