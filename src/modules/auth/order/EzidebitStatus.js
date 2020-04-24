import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { APP_TOKEN } from '../../../api/Constants';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';
import CachedIcon from '@material-ui/icons/Cached';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import { Divider } from '@material-ui/core';


import {getDate, getDateInDDMMYYYY} from '../../../utils/datetime'
import useSignUpForm from '../franchise/CustomHooks';
import BadgeComp from '../../common/BadgeComp';
import validate from '../../common/validation/EzidebitParamsRule.js';
import EzidebitStatusTable from './PaymentComponent/EzidebitStatusTable.js';

// API CALL
import EzidebitAPI from '../../../api/Ezidebit.js';
import OrderAPI from '../../../api/franchise/Order.js';
import UserAPI from '../../../api/User.js';
import StaticContentAPI from '../../../api/StaticContent.js';

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

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    // width: 1000
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    fontSize: theme.typography.pxToRem(18),
    marginTop:theme.spacing(-3),
  },
  title1:{
    flexGrow: 1,
    fontSize: theme.typography.pxToRem(18),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
 
  padding: {
    padding: theme.spacing(0, 2),
  },
  button:{
    color:"white",
    fontSize: theme.typography.pxToRem(10),
    marginRight: theme.spacing(1),
  },
  fonttransform:{
    textTransform:"initial",
    fontSize: theme.typography.pxToRem(13),
  },
  textsize:{
    fontSize: theme.typography.pxToRem(14),    
  },
  root: {
    width: '100%',
  },
  tableWrapper: {
    maxHeight: 440,
    overflow: 'auto',
  },
}));


const RESET_VALUES = {
  payment_type : 'ALL',
  payment_method : 'ALL',
  payment_source : 'ALL',
  date_field : 'NONE',
  date_from : null,
  date_to: null,
};


export default function EzidebitStatus({roleName}) {
  const classes = useStyles();

  const [ezidebitPaymentParamsList, setEzidebitPaymentParamsList] = React.useState([]);
  const [paymentList, setPaymentList] = React.useState([]);
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 20));
    setPage(0);
  };

  const getEzidebitPaymentsList = async () => {
    setPaymentList([]);
    try{
      const result = await EzidebitAPI.getPayments({
        payment_type : inputs.payment_type,
        payment_method : inputs.payment_method,
        payment_source : inputs.payment_source,
        date_field : inputs.date_field,
        date_from : getDate(inputs.date_from),
        date_to: getDate(inputs.date_to),
      });
      // console.log('res',result);
      setIsSubmit(false);
      setPaymentList(result);
    }catch(e){
      console.log('error..', e);
    }
  }
  

  const fetchPayment = async () => {
    setIsSubmit(true);
    getEzidebitPaymentsList();
  }

  const getEzidebitPaymentsParamsList = async () => {
    const result = await StaticContentAPI.getEzidebitPaymentsParamsList();
    setEzidebitPaymentParamsList(result.ezidebitPaymentsParamsList);
  }
  
  useEffect(() => {
    getEzidebitPaymentsParamsList();
  },[]);


  const { inputs, handleInputChange, handleReset, handleSubmit, handleRandomInput, handleDateChange, setInput, errors } = useSignUpForm(
    RESET_VALUES,
    fetchPayment,
    validate
  ); 
  
  useEffect(() => {
    handleRandomInput([
      {name: 'date_from', value: null},
      {name: 'date_to', value: null},
    ]);
  },[inputs.date_field === 'NONE']);

  return (
    <div>
      <Paper className={classes.paper}>
        <Typography variant="h6" className = {classes.title}>EZIDEBIT PAYMENT FILTER</Typography>
        <Divider style={{marginBottom: '15px'}} />
        <Grid container spacing={2} justify={"space-around"}>
          <Grid item xs={12} sm={5}>
            <InputLabel  className={classes.textsize} htmlFor="payment_type">Payment Type</InputLabel>
            <Select                      
              value={inputs.payment_type}
              onChange={handleInputChange}
              name= 'payment_type'
              id= 'payment_type'
              fullWidth
              className={classes.textsize}
              required
              error={errors.payment_type}
              helperText={errors.payment_type}
            >
              {(ezidebitPaymentParamsList.length > 0 ? ezidebitPaymentParamsList : []).map((data, index) => {
                if(data.is_active === 1 && data.type === 'paymentType'){
                  return( <MenuItem className={classes.textsize} value={data.value}>{data.value}</MenuItem> )
                }
              })}
            </Select>
          </Grid>
          <Grid item xs={12} sm={5}>
            <InputLabel className={classes.textsize} htmlFor="payment_method">Payment Method</InputLabel>
            <Select                      
              value={inputs.payment_method}
              onChange={handleInputChange}
              name= 'payment_method'
              id= 'payment_method'
              fullWidth
              className={classes.textsize}
              required
              error={errors.payment_method}
              helperText={errors.payment_method}
            > 
              {(ezidebitPaymentParamsList.length > 0 ? ezidebitPaymentParamsList : []).map((data, index) => {
                if(data.is_active === 1 && data.type === 'paymentMethod'){
                  return( <MenuItem className={classes.textsize} value={data.value}>{data.value}</MenuItem> )
                }
              })}
            </Select>
          </Grid>
          <Grid item xs={12} sm={5}>
            <InputLabel  className={classes.textsize} htmlFor="payment_source">Payment Source</InputLabel>
            <Select
              value={inputs.payment_source}
              onChange={handleInputChange}
              name= 'payment_source'
              id= 'payment_source'
              fullWidth
              className={classes.textsize}
              required
              error={errors.payment_source}
              helperText={errors.payment_source}
            > 
              {(ezidebitPaymentParamsList.length > 0 ? ezidebitPaymentParamsList : []).map((data, index) => {
                if(data.is_active === 1 && data.type === 'paymentSource'){
                  return( <MenuItem className={classes.textsize} value={data.value}>{data.value}</MenuItem> )
                }
              })}
            </Select>
          </Grid>
          <Grid item xs={12} sm={5}>
            <InputLabel  className={classes.textsize} htmlFor="date_field">Date Field</InputLabel>
            <Select                      
              value={inputs.date_field}
              onChange={handleInputChange}
              name= 'date_field'
              id= 'date_field'
              fullWidth
              className={classes.textsize}
              required
              // error={errors.date_field}
              // helperText={errors.date_field}
            > 
              <MenuItem className={classes.textsize} value={'NONE'}>NONE</MenuItem>
              {(ezidebitPaymentParamsList.length > 0 ? ezidebitPaymentParamsList : []).map((data, index) => {
                if(data.is_active === 1 && data.type === 'dateField'){
                  return( <MenuItem className={classes.textsize} value={data.value}>{data.value}</MenuItem> )
                }
              })}
            </Select>
          </Grid>
          <Grid item xs={12} sm={5}>
            <InputLabel  className={classes.textsize} htmlFor="date_from">Date From</InputLabel>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="dense"
                  autoOk = {true}                    
                  variant = "inline"
                  id="date_from"
                  name="date_from"
                  format="dd-MM-yyyy"
                  value={inputs.date_from}
                  onChange = {(date) => {handleDateChange('date_from', date)}}                  
                  fullWidth
                  InputProps={{
                    classes: {
                      input: classes.textsize,
                    },
                  }}
                  disabled = {inputs.date_field === 'NONE'}
                  error={errors.date_from}
                  helperText={errors.date_from}
                />
              </MuiPickersUtilsProvider>   
          </Grid>
          <Grid item xs={12} sm={5}>
            <InputLabel  className={classes.textsize} htmlFor="date_to">Date To</InputLabel>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="dense"
                  autoOk = {true}                    
                  variant = "inline"
                  id="date_to"
                  name="date_to"
                  format="dd-MM-yyyy"
                  value={inputs.date_to}
                  onChange = {(date) => {handleDateChange('date_to', date)}}
                  fullWidth
                  InputProps={{
                    classes: {
                      input: classes.textsize,
                    },
                  }}
                  disabled = {inputs.date_field === 'NONE'}
                  error={errors.date_to}
                  helperText={errors.date_to}                  
                />
              </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} sm={11}>
            <Button  variant="outlined" color="primary" onClick = {handleSubmit} disabled = {isSubmit}> Filter </Button>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="h6" className = {classes.title1}>PAYMENTS</Typography>
            <Divider style={{marginBottom: '15px'}} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <EzidebitStatusTable paymentList = {paymentList} 
              page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
          </Grid>
        </Grid>          
      </Paper>
    </div>
  );
}
