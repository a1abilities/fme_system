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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LinearProgress from '@material-ui/core/LinearProgress';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {getDate, getCurrentDate } from '../../../../utils/datetime'

import Paper from '@material-ui/core/Paper';

import OrderReportDoc from './OrderReportDoc';
import AutoSuggestDropdown from '../../lead/AutoSuggestDropdown';
import Customer from '../../../../api/franchise/Customer';
import Report from '../../../../api/Report';
import Product from '../../../../api/Category';
import DeliveryOrderReport from './Components/DeliveryOrderReport';


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
    marginRight: theme.spacing(1),
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightMedium,
  },
  table: {
    minWidth: 650,    
  },
  labelTitle: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(22),
    marginTop: 15,
    marginBottom: 20,
  },
  textHeading:{
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(13),   
    width: "100%",
    // overflow: hidden,
  },
  selectType:{
    fontSize: theme.typography.pxToRem(12),   
  },
  orderDetail: {
    fontSize: theme.typography.pxToRem(12), 
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeliveryReport({roleName}) {
 const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedOption,setSelectedOption] = useState('');
  const [customerListData, setCustomerListData] = useState([]);
  const [customerData,setCustomerData] = useState([]);
  const [orderData,setOrderData] = useState([]);
  const [searchText, setSearchText]  = useState('');
  const [searchName,setSearchName] = useState('');
  const [order, setOrder] = useState([]);
  const [productList, setProductList] = useState([]);
  const [toDate, setToDate] = useState(getCurrentDate());
  const [fromDate, setFromDate] = useState(getCurrentDate());
  const [orderReport, setOrderReport] = useState(false);
  const [reportData,setReportData] = useState([]);
  const [requiredType, setRequiredType]  = useState('');

  useEffect(() => {
  const fetchData = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      // const resultCustomer = await Customer.list();        
      // setCustomerListData(resultCustomer.customerList);

      const result = await Product.productlist();
      setProductList(result.productList);
      
    } catch (error) {
      setIsError(true);
    }
      setIsLoading(false);
  };
  fetchData();
}, []);


  function handleChangeOrder(event) {
   setRequiredType(event.target.value);
  }

  function handleSearchText(event){    
    setSearchText(event.target.value);
    setSearchName(event.target.name);
  }
  
  function handleFromDate(date){    
    setFromDate(date);
  }
  
  function handleToDate(date){    
    setToDate(date);
  }

  // const handleManualReportSubmit = async () => {
  //   try{
  //     // const result = await Report.getOrderReport({
  //     //   order_id : order.id,
  //     //   customer_id : order.customer_id,
  //     //   from_date : fromDate,
  //     //   to_date : toDate,
  //     // });
  //     // if(result != ""){
  //     //   setReportData(result);
  //     //   setOrderReport(true);
  //     // }else{
  //     //   setReportData([]);
  //     //   setOrderReport(false);
  //     // }
  //   }catch (error) {
  //     console.log('error',error);
  //   }
  // }
  
  const handleSubmit = async () => {
    try{
      const result = await Report.getDeliveryReport({
        required_type : requiredType,
        from_date : fromDate,
        to_date : toDate,
      });
      if(result.isAvailable != 0){
        setReportData(result.orderData);
        setOrderReport(true);
      }else{
        setReportData([]);
        setOrderReport(false);
      }
    }catch (error) {
      console.log('error',error);
    }
  }

  // const searchHandler = async () => {
  //   try{
  //     if(searchText != ''){
        
  //       let customer_name = "";
  //       let customer_contact = "";
  //       let customer_id = "";

  //       if(searchName === "customer_name"){
  //         customer_name = searchText;
  //       }else if(searchName === "customer_contact"){
  //         customer_contact = searchText;
  //       }else if(searchName === "customer_id"){
  //         customer_id = searchText;
  //       }
        
  //       const result = await Report.FinanceOrderReport({
  //         customer_name : customer_name,
  //         customer_contact : customer_contact,
  //         customer_id : customer_id,
  //       });    
  //       if(result.isAvailable === 1){
  //         setCustomerData(result.customerData[0]);
  //         if(result.OrderData != ""){
  //           setOrderData(result.OrderData);
  //         }else{
  //           alert('Nothing ordered by this person');
  //           setOrderData([]);
  //         }
  //       }else{
  //         alert('customer not found');
  //         setOrderData([]);
  //         setCustomerData([]);
  //       }        
  //     }
  //     setReportData([]);
  //     setOrderReport(false);
  //     setOrder("");
  //   }catch (error) {
  //     console.log('error',error);
  //   }
  // }

  // console.log('ocdd',orderData, customerData);
  
  return (
    <div>
      <Paper className={classes.paper} style={{'width':'60%'}}>
        <Typography variant="h6" className={classes.labelTitle}>
          Delivery Report
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
              <InputLabel  className={classes.textHeading} htmlFor="order_id">Report Type</InputLabel>
              <Select
                className = {classes.textsize}
                style= {{'marginTop':'4px'}}
                value={requiredType}
                onChange={handleChangeOrder}
                inputProps={{
                  name: 'order_id',
                  id: 'order_id',  
                }}
                className={classes.textsize}
                fullWidth
                required
              >
                 {/* <MenuItem className={classes.textsize} value={1}>{'Pending'}</MenuItem> */}
                  <MenuItem className={classes.textsize} value={2}>{'Upcoming'}</MenuItem>
                 {/* <MenuItem className={classes.textsize} value={3}>{'Completed'}</MenuItem> */}
              </Select>
            </Grid>   
          <Grid item xs={12} sm={3}>
            <InputLabel  className={classes.textHeading} htmlFor="order_id">From:</InputLabel>            
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="dense"
                  autoOk = {true}                    
                  variant = "inline"
                  id="from_date"
                  name="from_date"
                  placeholder="DD-MM-YYYY"
                  format="dd-MM-yyyy"
                  value={fromDate}
                  InputProps={{
                    classes: {
                      input: classes.orderDetail,
                    },
                  }}
                  onChange={handleFromDate}
                />
            </MuiPickersUtilsProvider> 
          </Grid>
          <Grid item xs={12} sm={3}>
            <InputLabel  className={classes.textHeading} htmlFor="order_id">To:</InputLabel>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="dense"
                  autoOk = {true}                    
                  variant = "inline"
                  id="to_date"
                  name="to_date"
                  placeholder="DD-MM-YYYY"
                  format="dd-MM-yyyy"
                  value={toDate}
                  InputProps={{
                    classes: {
                      input: classes.orderDetail,
                    },
                  }}
                  onChange={handleToDate}
                />
              </MuiPickersUtilsProvider>
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <Button  variant="contained"  color="primary" className={classes.button} style={{'marginTop':'5px'}} onClick={handleSubmit}>
              Generate Report
            </Button>
          </Grid>
        {/* {console.log('rec. data',reportData)} */}
          <Grid item xs={12} sm={12}>
              {orderReport ? <DeliveryOrderReport data={reportData} /> : '' }
          </Grid> 
      </Grid>
    </Paper>

  </div>
  );
}
