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
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {getDate, getCurrentDate, getDateInDDMMYYYY } from '../../../../utils/datetime'

import Paper from '@material-ui/core/Paper';

import Report from '../../../../api/Report';
import Product from '../../../../api/Category';

import SingleOrderReport from './Components/SingleOrderReport';
import OrderAPI from '../../../../api/franchise/Order';
import FinanceReportDoc from './Documentation/FinanceReportDoc';
import StaticContentAPI from  '../../../../api/StaticContent.js'

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
    width: '100%',
    tableLayout: "fixed"
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
  },
  orderDetail: {
    fontSize: theme.typography.pxToRem(12),
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FinanceReport({roleName}) {
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
  const [toDate, setToDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [orderReport, setOrderReport] = useState(false);
  const [reportData,setReportData] = useState([]);
  const [paymentModeList, setPaymentModeList] = useState([]);



  useEffect(() => {  
    fetchproductList();
    getPaymentModeList();
  }, []);

  const fetchproductList = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const result = await Product.productlist();
      setProductList(result.productList);      
    } catch (error) {
      setIsError(true);
    }
      setIsLoading(false);
  };

  const getPaymentModeList = async () => {
    const result = await StaticContentAPI.getPaymentModeList({});
    setPaymentModeList(result.paymentModeList);
  }


  function handleChangeOrder(event) {
    {(orderData.length > 0 ? orderData : []).map(data => {
      if(data.id === event.target.value)  {
        setOrder(data);
      }
    })}
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
  

  const searchHandler = async () => {
    try{
      if(searchText != ''){
        
        let customer_name = "";
        let customer_contact = "";
        let customer_id = "";

        if(searchName === "customer_name"){
          customer_name = searchText;
        }else if(searchName === "customer_contact"){
          customer_contact = searchText;
        }else if(searchName === "customer_id"){
          customer_id = searchText;
        }
        
        const result = await Report.FinanceOrderReport({
          customer_name : customer_name,
          customer_contact : customer_contact,
          customer_id : customer_id,
        });    
        if(result.isAvailable === 1){
          setCustomerData(result.customerData[0]);
          if(result.OrderData != ""){
            setOrderData(result.OrderData);
          }else{
            alert('Nothing ordered by this person');
            setOrderData([]);
          }
        }else{
          alert('customer not found');
          setOrderData([]);
          setCustomerData([]);
        }        
      }
      setReportData([]);
      setOrderReport(false);
      setOrder("");
    }catch (error) {
      console.log('error',error);
    }
  }


  const handleFlexOrderDataForPDF = async (reportData) => {
    try {
      const result = await OrderAPI.getFlexOrderDataForPDF({data: order});
      pdfmake.vfs = pdfFonts.pdfMake.vfs;      
      let doc = {
        pageSize: "A4",
        pageOrientation: "portrait",
        pageMargins: [30, 30, 30, 30],
        content: []
      };
      let financeReportDoc = FinanceReportDoc(result, order, reportData, fromDate, toDate);
      
      if(financeReportDoc.content) {
        doc.content.push(financeReportDoc.content);
      }
      pdfmake.createPdf(doc).open();
    } catch (error) {
      console.log(error);
    }
  }

  const handleFixedOrderDataForPDF = async (reportData) => {
    try {
      const result = await OrderAPI.getFixedOrderDataForPDF({data: order});
      pdfmake.vfs = pdfFonts.pdfMake.vfs;

      let doc = {
        pageSize: "A4",
        pageOrientation: "portrait",
        pageMargins: [30, 30, 30, 30],
        content: []
      };
      let financeReportDoc = FinanceReportDoc(result, order, reportData, fromDate, toDate);          
      if(financeReportDoc.content) {
        doc.content.push(financeReportDoc.content);
      }     
      pdfmake.createPdf(doc).open();
    } catch (error) {
      console.log(error);
    }
  }

  
  const handleOrderReport = async() => {
    try{
      const result = await Report.getOrderReport({
        order_id : order.id,
        customer_id : order.customer_id,
        from_date : fromDate,
        to_date : toDate,
      });
      if(result != ""){
        setReportData(result);
        return result;
      }else{        
        setReportData([]);
        alert('No single Transaction by this person');
        return [];
      }
    }catch (error) {
      console.log('error',error);
    }
  }


  const createAndDownloadPdf = async() => {
    const result = await handleOrderReport();
    if(result != ""){
      if(order.order_type === 2){
        handleFlexOrderDataForPDF(result);
      }
      if(order.order_type === 1){
        handleFixedOrderDataForPDF(result);
      }
    }
  }
  

  const handleSubmit = async () => {
    const result = await handleOrderReport();
    if(result != ""){
      setOrderReport(true);
    }else{
      setOrderReport(false);
    }
  }


  return (
    <div>
      <Paper className={classes.paper} style={{'width':'60%'}}>
        <Typography variant="h6" className={classes.labelTitle}>
            Generate Transaction Report
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <InputLabel  className={classes.textHeading}   htmlFor="customer_contact">Customer Contact</InputLabel>
            <TextField 
              InputProps={{
                classes: {
                  input: classes.textsize,
                },
                endAdornment: <InputAdornment position='end'>
                <Tooltip title="Search">
                  <IconButton onClick = {searchHandler} ><SearchIcon /></IconButton>
                </Tooltip>
              </InputAdornment>,
              }}
              onChange={handleSearchText}
              value = {searchName === "customer_contact" ? searchText : customerData.mobile}
              id="customer_contact"
              name="customer_contact"
              fullWidth
              type="text"
              margin="dense"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <InputLabel  className={classes.textHeading}  htmlFor="customer_id">Customer Id</InputLabel>
            <TextField 
              InputProps={{
                classes: {
                  input: classes.textsize,
                },
              }}
              onChange={handleSearchText}
              id="customer_id"
              name="customer_id" 
              value = {searchName === "customer_id" ? searchText : customerData.id}
              // value={customer_id}
              fullWidth
              type="text"
              margin="dense"
            />
          </Grid>
            <Grid item xs={12} sm={3}>
            <InputLabel  className={classes.textHeading}  htmlFor="customer_name">Customer Name</InputLabel>
              <TextField 
                InputProps={{
                  classes: {
                    input: classes.textsize,
                  },
                }}
                id="customer_name"
                name="customer_name"  
                value = {customerData.first_name+ ' ' + customerData.last_name}
                fullWidth
                type="text"
                margin="dense"
                // disabled
              />
          </Grid>
          <Grid item xs={12} sm={3}>
            <InputLabel  className={classes.textHeading}  htmlFor="order_id">Order List</InputLabel>
            <Select              
              value={order.id}
              onChange={handleChangeOrder}
              style= {{'marginTop':'4px'}}
              inputProps={{
                name: 'order_id',
                id: 'order_id',                                         
              }}
              fullWidth
              required
              className={classes.textsize} 
            >
              {orderData.map((ele) =>{
                return(
                  <MenuItem  className={classes.textsize} value={ele.id}>{ele.order_id}</MenuItem>                                   
                )
              })}
            </Select>
          </Grid>   
          { order != "" ? 
          <Grid item xs={12} sm={12}>
            <Table className={classes.table}>
                <TableRow >
                  <TableCell  className={classes.textHeading} >{'Order Id:  '}
                      <p className={classes.textsize}>{order.order_id }</p> 
                  </TableCell>
                  <TableCell className={classes.textHeading}>{"Order Date: "}
                    <p className={classes.textsize}> {getDateInDDMMYYYY(order.order_date)} </p> 
                  </TableCell>
                  <TableCell className={classes.textHeading}>{"Status: "}
                    <p className={classes.textsize}> {order.order_status_name} </p>
                  </TableCell> 
                  <TableCell className={classes.textHeading}>{"Payment Mode: "}
                    <p className={classes.textsize}> 
                    {(paymentModeList != undefined && (paymentModeList.length > 0 ? paymentModeList : []).map((data,index) => {
                      if(order.payment_mode === data.id)
                        return( data.payment_mode)
                    }))}                       
                  </p>
                  </TableCell>                
                </TableRow>
                <TableRow>                  
                  <TableCell className={classes.textHeading} >{"Rental Type: "}
                    <p className={classes.textsize}> {order.order_type === 1 ? "Fix" : order.order_type === 2 ? "Flex" : ''} </p>
                  </TableCell>
                  <TableCell className={classes.textHeading}>{"Delivery Date: "}
                    <p className={classes.textsize}> {getDateInDDMMYYYY(order.delivery_date)  === 'Invalid date' ? '' : getDateInDDMMYYYY(order.delivery_date)} </p>
                  </TableCell>
                  <TableCell className={classes.textHeading}>{"Delivered Date: "}
                    <p className={classes.textsize}> {getDateInDDMMYYYY(order.delivered_date) === 'Invalid date' ? '' : getDateInDDMMYYYY(order.delivered_date) } </p>
                  </TableCell>
                </TableRow>
                <TableRow>                  
                  <TableCell className={classes.textHeading}> From:
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          margin="dense"
                          id="from_date"
                          autoOk = {true}                    
                          variant = "inline"
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
                    </TableCell>
                    <TableCell className={classes.textHeading}>To:
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          margin="dense"
                          autoOk = {true}                    
                          variant = "inline"
                          id="to_date"
                          name="to_date"
                          format="dd-MM-yyyy"
                          placeholder="DD-MM-YYYY"
                          value={toDate}
                          InputProps={{
                            classes: {
                              input: classes.orderDetail,
                            },
                          }}
                          onChange={handleToDate}
                        />
                      </MuiPickersUtilsProvider>
                    </TableCell>
                    <TableCell>
                    <Button  variant="contained"  color="primary" className={classes.button} onClick={handleSubmit}>
                      Generate Report
                    </Button>
                    </TableCell>
                    <TableCell>
                    <Button  variant="contained"  color="primary" className={classes.button} onClick={createAndDownloadPdf}>
                      Download Report
                    </Button>
                    </TableCell>
                </TableRow>              
            </Table>    
          </Grid>
        : ''}
        
        <Grid item xs={12} sm={12}>
              {orderReport ? <SingleOrderReport data={reportData}/> : '' }
        </Grid>
      </Grid>
    </Paper>

  </div>
  );
}
