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
import {getDate, getCurrentDate } from '../../../../utils/datetime'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


import Paper from '@material-ui/core/Paper';

import OrderReportDoc from './OrderReportDoc';
import AutoSuggestDropdown from '../../lead/AutoSuggestDropdown';
import Customer from '../../../../api/franchise/Customer';
import Report from '../../../../api/Report';
import Product from '../../../../api/Category';
import SingleOrderReport from './Components/SingleOrderReport';
import TaskDueDate from './Components/TaskDueDate';


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
    // display: 'flexGrow',
    // alignItems: 'center',
    // boxSizing: 'border-box',
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
    // width: "100%",
    // overflow: hidden,
  },
  selectType:{
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    // fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(12),   
  },
  orderDetail: {
    fontSize: theme.typography.pxToRem(12),
    // marginTop: 15,
    // marginBottom: 20,
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TaskReport({roleName}) {
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
  const [taskReport, setTaskReport] = useState(false);
  const [reportData,setReportData] = useState([]);
  const [taskDueReport, setTaskDueReport] = useState(false);
  
  const [dateToday, setTodayDate]= useState();
  useEffect(() => {
    
    currentDate();
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
        try {
        
          
        } catch (error) {
          setIsError(true);
        }
          setIsLoading(false);
      };
    fetchData();
  }, []);


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


  function currentDate(){
    const dtToday=new Date();
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();
    const date= year + '-' + month + '-' + day;
    setTodayDate(date);
  }
  

  const handleDueTask = async () => {
    try{
      const result = await Report.getDueTaskReport({
        today_date : dateToday,
      });
      if(result != ""){
        setReportData(result);
        setTaskDueReport(true);
      }else{
        setReportData([]);
        setTaskDueReport(false);
        alert('No task are due.');
      }
    }catch (error) {
      console.log('error',error);
    }
  }

  const handleSubmit = async () => {
    try{
      const result = await Report.getTaskReport({
        from_date : fromDate,
        to_date : toDate,
      });
      if(result != ""){
        setReportData(result);
        setTaskReport(true);
      }else{
        setReportData([]);
        setTaskReport(false);
        alert('No task are due in this duration');
      }
    }catch (error) {
      console.log('error',error);
    }
  }

  
  return (
    <div>
      <Paper className={classes.paper} style={{'width':'70%'}}>
        <Typography variant="h6" className={classes.labelTitle}>
            Generate Task Report
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Table className={classes.table}>
                <TableRow>                  
                  <TableCell className={classes.textHeading}> From:
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          autoOk = {true}                    
                          variant = "inline"
                          margin="dense"
                          id="from_date"
                          name="from_date"
                          format="dd-MM-yyyy"
                          placeholder="DD-MM-YYYY"
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
                      <Button  variant="contained"  color="primary" className={classes.button} onClick={handleDueTask}>
                        Generate Due Task Report
                      </Button>
                    </TableCell>
                </TableRow>              
            </Table>    
          </Grid>
        
        <Grid item xs={12} sm={12}>
              {taskReport || taskDueReport ? <TaskDueDate data={reportData} dateToday={dateToday} /> : '' }
              {/* {taskDueReport ? <TaskDueDate data={reportData} dateToday={dateToday} /> : '' } */}
        </Grid>
      </Grid>
    </Paper>
  </div>
  );
}
