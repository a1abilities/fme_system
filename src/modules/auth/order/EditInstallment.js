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
import MoreIcon from '@material-ui/icons/More';
import DetailsIcon from '@material-ui/icons/Details';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import validate from '../../common/validation/EditInstallment';
import { APP_TOKEN } from '../../../api/Constants';
import {useCommonStyles} from '../../common/StyleComman';
// API CALL
import Order from '../../../api/franchise/Order';
import useSignUpForm from '../franchise/CustomHooks';
import {getDate, getCurrentDate} from '../../../utils/datetime';



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
    margin: theme.spacing(1),
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  },
  drpdwn:{
    marginTop: theme.spacing(1),
    fontSize: theme.typography.pxToRem(12),
  },
  group: {
    // margin: theme.spacing(1, 0),
    fontSize: theme.typography.pxToRem(12),
  },
  errorHeading: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightBold,
    color:'red',
  },
  closeIcon: {
    marginTop:theme.spacing(-3),
    color: 'white',
    // fontSize: '10px',
    marginRight:theme.spacing(-4),
  },
  dobMsg : {
    marginTop : theme.spacing(-1),
    fontSize: theme.typography.pxToRem(12),
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function CustomerBankDetails({open, handleClose, editableDataRow, paymentHistory, orderData, setLateFee, setInterestAmt, setPaymentAmt, setPaymentRecDate, handlePaymentSubmit, setCommentForPayment, formData, setDocumentPath}) {
  const styleClass = useCommonStyles();
  const classes = useStyles();

  
  const RESET_VALUES = {
    payment_rec_date : '',
    payment_amt : '',
    interest_amt : '',  
    late_fee : '',
    comment : '',    
    document : '',
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(false);
  const [paymentDate, setPaymentDate] = useState('');

  
  const getSingleTransactionDetail = async () => {
    const result = await Order.getSingleTransactionDetail({transaction_id: editableDataRow.transaction_id});
    handleReset(result[0]);
  }


  useEffect(() => {
    let isCatch = true;
    (paymentHistory.length >0 ? paymentHistory : []).map((data) => {
      if(data.transaction_id === editableDataRow.transaction_id && isCatch === true){
        setPaymentDate(data.payment_date);
        isCatch = false;
      }
    })
    getSingleTransactionDetail();

  },[]);
  

  function handleDateChange(date){
    setInput(date);
  }

  const detailSubmit = async () =>{
    // setpLoading(true);
    // setSavebtn(true);
    
    setPaymentAmt(inputs.payment_amt);
    setInterestAmt(inputs.interest_amt);
    setLateFee(inputs.late_fee);
    setPaymentRecDate(inputs.payment_rec_date);
    setCommentForPayment(inputs.comment);
    setDocumentPath(inputs.document);

    for (var x = 0; x < document.getElementById('document').files.length; x++) {
      formData.append('avatar', document.getElementById('document').files[x])
    }
    handlePaymentSubmit(editableDataRow);


    // setpLoading(false);
    // setSavebtn(false);
    // handleClose(false);
  }

 const { inputs, handleInputChange, handleNumberInput, handleRandomInput, handlePriceInput, handleSubmit, handleReset, setInput,errors } = useSignUpForm(
    RESET_VALUES,
    detailSubmit,
    validate
  );
  

return (
    <div>
      <Dialog maxWidth="sm" open={open} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Bank Details Form
              </Typography>
            <IconButton size="small" onClick={handleClose} className={styleClass.closeIcon}> x </IconButton>
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
          <Grid item xs={12} sm={12}>   {ploading ?  <LinearProgress />: null}</Grid>
          <Paper className={classes.paper}>            
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <InputLabel  className={classes.textsize} htmlFor="payment_date">Payment Date</InputLabel>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk = {true}                    
                    variant = "inline"
                    margin="dense"
                    id="payment_date"
                    name="payment_date"
                    format="dd-MM-yyyy"
                    placeholder="DD-MM-YYYY"
                    value={paymentDate}
                    fullWidth 
                    InputProps={{
                      classes: {
                        input: styleClass.textsize,
                      },                                        
                    }}                                      
                    disabled
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel  className={classes.textsize} htmlFor="payment_rec_date">Payment Rec. Date *</InputLabel>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="dense"
                    autoOk = {true}                    
                    variant = "inline"
                    id="payment_rec_date"
                    name="payment_rec_date"
                    format="dd-MM-yyyy"
                    placeholder="DD-MM-YYYY"
                    value={inputs.payment_rec_date}
                    error={errors.payment_rec_date}
                    helperText={errors.payment_rec_date}
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
              <Grid item xs={12} sm={6}>
                <InputLabel  className={classes.textsize} htmlFor="payment_amt">Payment Amount *</InputLabel>
                <TextField
                  InputProps={{
                    classes: {
                      input: classes.textsize,
                    },
                  }}
                  id="payment_amt"
                  name="payment_amt"
                  value={inputs.payment_amt}
                  onChange={handlePriceInput}
                  error={errors.payment_amt}
                  helperText={errors.payment_amt}
                  fullWidth
                  required
                  type="text"
                  margin="dense"
                />
              </Grid>              
              <Grid item xs={12} sm={6}>
                <InputLabel  className={classes.textsize} htmlFor="interest_amt">Interest Amount *</InputLabel>
                <TextField
                  InputProps={{
                    classes: {
                      input: classes.textsize,
                    },
                  }}
                  id="interest_amt"
                  name="interest_amt"
                  value={inputs.interest_amt}
                  onChange={handlePriceInput}
                  // error={errors.interest_amt}
                  // helperText={errors.interest_amt}
                  fullWidth
                  required
                  type="text"
                  margin="dense"                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel  className={classes.textsize} htmlFor="late_fee">Late Fee *</InputLabel>
                <TextField
                  InputProps={{
                    classes: {
                      input: classes.textsize,
                    },
                  }}
                  id="late_fee"
                  name="late_fee"
                  value={inputs.late_fee}
                  onChange={handlePriceInput}
                  // error={errors.late_fee}
                  // helperText={errors.late_fee}
                  fullWidth
                  required
                  type="text"
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel  className={classes.textsize} htmlFor="comment">Comment *</InputLabel>
                <TextField
                  multiline
                  InputProps={{
                    classes: {
                      input: classes.textsize,
                    },
                  }}
                  id="comment"
                  name="comment"
                  value={inputs.comment}
                  onChange={handleInputChange}
                  // error={errors.comment}
                  // helperText={errors.comment}
                  fullWidth
                  required
                  type="text"
                  margin="dense"                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel  className={classes.textsize} htmlFor="document">Document *</InputLabel>
                <TextField  
                  InputProps={{
                    classes: {
                      input: classes.textsize,
                    },
                  }}
                  id="document"
                  name="document"
                  value={inputs.document}
                  onChange={handleInputChange}
                  fullWidth
                  type="file"
                  margin="dense"
                /> 
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit} disabled= {savebtn == true}> save </Button> 
                <Button variant="contained" color="primary" onClick={handleClose} className={classes.button}> Close </Button> 
            </Grid>
          </Grid>
          </Paper>
        </div>
      </Dialog>
    </div>
  );
}
