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
import validate from '../../common/validation/BankDetailRules';
import { APP_TOKEN } from '../../../api/Constants';
import {useCommonStyles} from '../../common/StyleComman';
// API CALL
import Customer from '../../../api/franchise/Customer';
import UserAPI from '../../../api/User';
import useSignUpForm from '../franchise/CustomHooks';
import Budget from '../../auth/order/Budget'
import {getDate, getCurrentDate} from '../../../utils/datetime';

const RESET_VALUES = {
  acc_holder_name : '',
  institution_name : '',
  bank_branch : '',
  bank_address : '',  
  bank_code : '',
  branch_number : '',
  acc_number : '',
  suffix : '',
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


export default function CustomerBankDetails({ open, handleClose, bankDetailArray, setBankDetailArray, customer_id, isAddingDirect }) {
  const styleClass = useCommonStyles();
  const classes = useStyles();

  
  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(false);

  const detailSubmit = async () =>{
    setpLoading(true);
    setSavebtn(true);
    const data = {
      customer_id : customer_id,
      acc_holder_name : inputs.acc_holder_name,
      institution_name : inputs.institution_name,
      bank_branch : inputs.bank_branch,
      bank_address : inputs.bank_address,  
      bank_code : inputs.bank_code,
      branch_number : inputs.branch_number,
      acc_number : inputs.acc_number,
      suffix : inputs.suffix,
    }
      if(isAddingDirect === true){
        if(bankDetailArray != ""){
          const bankDetails = await Customer.updateBankDetail({bankDetailData: data, customer_id: customer_id});
          if(bankDetails.isUpdated == 1){
            alert('Customer Bank Detail Updated Successfully');
          }
        }else{
          const bankDetails = await Customer.addBankDetail({bankDetailData: data, customer_id: customer_id});
          if(bankDetails.isUpdated == 1){
            alert('Customer Bank Detail Added Successfully');
          }
        }
        
      }else if(isAddingDirect === false){
        setBankDetailArray(data);        
      }      
      setpLoading(false);
      setSavebtn(false);
      handleClose(false);
  }

 const { inputs, handleInputChange, handleNumberInput, handleRandomInput, handlePriceInput, handleSubmit, handleReset, setInput,errors } = useSignUpForm(
    bankDetailArray == "" ?  RESET_VALUES : bankDetailArray,
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
              <Grid item xs={12} sm={12}>
                <InputLabel  className={classes.textsize} htmlFor="acc_holder_name">Name of the Account Holder *</InputLabel>
                <TextField
                  InputProps={{
                    classes: {
                      input: classes.textsize,
                    },
                  }}
                  id="acc_holder_name"
                  name="acc_holder_name"
                  value={inputs.acc_holder_name}
                  onChange={handleInputChange}
                  error={errors.acc_holder_name}
                  helperText={errors.acc_holder_name}
                  fullWidth
                  required
                  type="text"
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputLabel  className={classes.textsize} htmlFor="institution_name">Financial Institution Name *</InputLabel>
                <TextField
                  InputProps={{
                    classes: {
                      input: classes.textsize,
                    },
                  }}
                  id="institution_name"
                  name="institution_name"
                  value={inputs.institution_name}
                  onChange={handleInputChange}
                  error={errors.institution_name}
                  helperText={errors.institution_name}
                  fullWidth
                  required
                  type="text"
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputLabel  className={classes.textsize} htmlFor="bank_branch">Bank Branch *</InputLabel>
                <TextField
                  InputProps={{
                    classes: {
                      input: classes.textsize,
                    },
                  }}
                  id="bank_branch"
                  name="bank_branch"
                  value={inputs.bank_branch}
                  onChange={handleInputChange}
                  error={errors.bank_branch}
                  helperText={errors.bank_branch}
                  fullWidth
                  required
                  type="text"
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputLabel  className={classes.textsize} htmlFor="bank_address">Bank Address *</InputLabel>
                <TextField
                  InputProps={{
                    classes: {
                      input: classes.textsize,
                    },
                  }}
                  id="bank_address"
                  name="bank_address"
                  value={inputs.bank_address}
                  onChange={handleInputChange}
                  error={errors.bank_address}
                  helperText={errors.bank_address}
                  fullWidth
                  required
                  type="text"
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputLabel  className={classes.textsize} htmlFor="bank_code">Bank Account Number *</InputLabel>
              </Grid>
              <Grid item xs={12} sm={3}>
                <InputLabel  className={classes.textsize} htmlFor="bank_code">Bank *</InputLabel>
                <TextField
                  InputProps={{
                    classes: {
                      input: classes.textsize,
                    },
                  }}
                  id="bank_code"
                  name="bank_code"
                  value={inputs.bank_code}
                  onChange={handleNumberInput}
                  error={errors.bank_code}
                  helperText={errors.bank_code}
                  fullWidth
                  required
                  type="text"
                  margin="dense"
                  onInput={(e)=>{ 
                    e.target.value =(e.target.value).toString().slice(0,2)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <InputLabel  className={classes.textsize} htmlFor="branch_number">Branch Number *</InputLabel>
                <TextField
                  InputProps={{
                    classes: {
                      input: classes.textsize,
                    },
                  }}
                  id="branch_number"
                  name="branch_number"
                  value={inputs.branch_number}
                  onChange={handleNumberInput}
                  error={errors.branch_number}
                  helperText={errors.branch_number}
                  fullWidth
                  required
                  type="text"
                  margin="dense"
                  onInput={(e)=>{ 
                    e.target.value =(e.target.value).toString().slice(0,4)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <InputLabel  className={classes.textsize} htmlFor="acc_number">Account Number *</InputLabel>
                <TextField
                  InputProps={{
                    classes: {
                      input: classes.textsize,
                    },
                  }}
                  id="acc_number"
                  name="acc_number"
                  value={inputs.acc_number}
                  onChange={handleNumberInput}
                  error={errors.acc_number}
                  helperText={errors.acc_number}
                  fullWidth
                  required
                  type="text"
                  margin="dense"
                  onInput={(e)=>{ 
                    e.target.value =(e.target.value).toString().slice(0,7)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <InputLabel  className={classes.textsize} htmlFor="suffix">Suffix *</InputLabel>
                <TextField
                  InputProps={{
                    classes: {
                      input: classes.textsize,
                    },
                  }}
                  id="suffix"
                  name="suffix"
                  value={inputs.suffix}
                  onChange={handleNumberInput}
                  error={errors.suffix}
                  helperText={errors.suffix}
                  fullWidth
                  required
                  type="text"
                  margin="dense"
                  onInput={(e)=>{ 
                    e.target.value =(e.target.value).toString().slice(0,3)
                  }}
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
