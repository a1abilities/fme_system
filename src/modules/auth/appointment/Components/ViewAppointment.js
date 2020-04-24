import React, {useState, useEffect, Fragment} from 'react';
import ReactDOM from 'react-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CachedIcon from '@material-ui/icons/Cached';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import PrintIcon from '@material-ui/icons/Print';
import PaymentIcon from '@material-ui/icons/Payment';
import CloudUpload from '@material-ui/icons/CloudUpload';
import SendIcon from '@material-ui/icons/Send.js';
import ViewIcon from '@material-ui/icons/RemoveRedEye';
import CommentIcon from '@material-ui/icons/Comment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import TablePagination from '@material-ui/core/TablePagination';
import CreateIcon from '@material-ui/icons/Create';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import UpdateIcon from '@material-ui/icons/Update';
import AccountBalanceIcon from '@material-ui/icons/AccountBalanceWallet';
import TableFooter from '@material-ui/core/TableFooter';
import DetailsIcon from '@material-ui/icons/Details';
import Popover from '@material-ui/core/Popover';
import Grid from '@material-ui/core/Grid';
import BackArrowIcon from '@material-ui/icons/ArrowBack';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, DatePicker, KeyboardDatePicker} from '@material-ui/pickers';




// Component
import {generateTimingTable} from '../lib/TimingTable';
import {TablePaginationActions} from '../../../common/Pagination';
import { API_URL } from '../../../../api/Constants';
import {useCommonStyles} from '../../../common/StyleComman';
import {getDate, setTime, getCurrentDate, getTimeinDBFormat, getTime, get12HourTime } from '../../../../utils/datetime';
import TimingBoard from './TimingBoard.js';
import ClientTable from './ClientTable.js';

// API
import AppointmentAPI from '../../../../api/Appointment.js';


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

const useStyles = makeStyles(theme => ({
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  },
  labelTitle: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(20),
    color: theme.palette.text.secondary,        
  },
}));

export default function ViewAppointment({handleMainPage, userData}) {  
  const classes = useStyles();    
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [timingTable, setTimingTable] = useState(generateTimingTable);
  const [currentTimeslotList, setCurrentTimeslotList] = useState([]);
  const [appointedClientList, setAppointedClientList] = useState([]);


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };    


  useEffect(() => {    
    getCurrentTimeslot();    
  },[]);

  const getCurrentTimeslot = async () => {
    try{
      const result = await AppointmentAPI.getCurrentTimeslot({ userId : userData.id });
      setCurrentTimeslotList(result.timeSlot);
      setFirstAvailableDate(result.timeSlot);
    }catch(e){
      console.log('getCurrentTimeslot Error...', e);
    }
  }

  const getAppointedClientList = async () => {
    try{
      const result = await AppointmentAPI.getAppointedClientList({ userId : userData.id, date : appointmentDate });      
      setAppointedClientList(result.clientList);
      setPage(0);
      setRowsPerPage(10);
    }catch(e){
      console.log('getAppointedClientList Error...', e);
    }
  }

  
  const setFirstAvailableDate = (timeSlot) => {
    const firstDate = (timeSlot.length > 0 ? timeSlot : []).find((data) => {
      return data.status === 1
    });
    setAppointmentDate(firstDate.date);    
  }


  const handleDateAvaibility = (date) => {
    const found = (currentTimeslotList.length > 0 ? currentTimeslotList : []).find((data) => {
      return data.date === getDate(date) && data.status === 1;
    })
    return found === undefined;
  }
  
  const handleDateChange = (date) => {
    setAppointmentDate(date);
  }

  
  const handleRecallTimingBoard = async () => {
    ReactDOM.render(
        <TimingBoard
          selectedDate = {getDate(appointmentDate)}
          currentTimeslotList={currentTimeslotList}
          timingTable = {timingTable}
          viewOnly = {true}
        />, 
        document.getElementById('timingBoard')
    );
    resetTiming();
  }

  
  const resetTiming = () => {
    timingTable.map((row) => {
      if(row.is_free === true){
        document.getElementById(row.time).style.backgroundColor =  'yellowgreen';
      }
    })
  }

  
  useEffect(() => {
    getAppointedClientList();
    handleRecallTimingBoard();
  },[appointmentDate]);

  
  return (  
    <Grid container spacing={2} alignItems = "center"> 
        <Grid item xs={12} sm={12}>
          <div style = {{display: 'flex'}}>
            <Tooltip title="Back to Home">
              <IconButton  size="small" component="span" onClick = {handleMainPage}> <BackArrowIcon/> </IconButton>
            </Tooltip>
            <Typography variant="h6" className={classes.labelTitle}> View Appointment </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography  className={classes.textHeading} htmlFor="appointment_date">Appointment Date</Typography>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              autoOk
              variant = "inline"              
              margin="dense"
              id="appointment_date"
              name="appointment_date"
              format="dd-MM-yyyy"
              placeholder="DD-MM-YYYY"
              disablePast = {true}
              value={appointmentDate}
              InputProps={{
                classes: {
                  input: classes.textsize,
                },                
              }}
              fullWidth
              onChange = { handleDateChange }
              shouldDisableDate = {(date) => { return handleDateAvaibility(date)}}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography  className={classes.textHeading} htmlFor="">TIMING BOARD</Typography>
          <Paper style={{ width: '100%' }}>
            <div id = "timingBoard"></div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12}>
          <ClientTable ClientList = {appointedClientList} page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage}/>
        </Grid>
    </Grid>
  )
}