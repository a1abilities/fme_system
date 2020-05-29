import React, {useState, useEffect, Fragment} from 'react';
import ReactDOM from 'react-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';

// Component
import {generateTimingTable} from '../lib/TimingTable';
import {getDate} from '../../../../utils/datetime.js';
import TimingBoard from './TimingBoard.js';
import ClientTable from './ClientTable.js';
import {APP_TOKEN} from '../../../../api/Constants.js';
import UpdateTimeslot from './UpdateTimeslot.js';

// API
import AppointmentAPI from '../../../../api/Appointment.js'
import { updateLocale } from 'moment';

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

export default function ViewAppointment() { 
  const classes = useStyles();

  const [appointmentDate, setAppointmentDate] = useState(null);
  const [timingTable, setTimingTable] = useState(generateTimingTable);
  const [currentTimeslotList, setCurrentTimeslotList] = useState([]);
  const [appointedClientList, setAppointedClientList] = useState([]);
  const [timeslotShow, setTimeslotShow] = useState(false);
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };    

  const  handleTimeslotOpen = () => {
    setTimeslotShow(true)
   }


  useEffect(() => {    
    getCurrentTimeslot();    
  },[]);

  const getCurrentTimeslot = async () => {
    try{
      const result = await AppointmentAPI.getCurrentTimeslot({ });
      setCurrentTimeslotList(result.timeSlot);
      setFirstAvailableDate(result.timeSlot);
    }catch(e){
      console.log('getCurrentTimeslot Error...', e);
    }
  }

  const getAppointedClientList = async () => {
    try{
      const result = await AppointmentAPI.getAppointedClientList({date: getDate(appointmentDate)});      
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
    <div>
    <Grid container direction="row" justify="flex-start" alignItems="center">
        <Grid item xs={12} sm={6}>
          <div style = {{display: 'flex'}}>
            <Typography variant="h6" className={classes.labelTitle}> View Appointment </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={5}>
          <div style = {{float: 'right'}}>            
          <Button variant="text" color="primary" className={classes.button} onClick={handleTimeslotOpen} >
            Update Timeslot
          </Button>
          </div>
        </Grid>
        <Grid item xs={12} sm={11} style={{marginTop:'15px'}}>
          <Typography  className={classes.textHeading} htmlFor="appointment_date">Appointment Date</Typography>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
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
        <Grid item xs={12} sm={11}>
          <Typography  className={classes.textHeading} htmlFor="">TIMING BOARD</Typography>
          <Paper style={{ width: '100%' }}>
            <div id = "timingBoard"></div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={11}>
          <ClientTable ClientList = {appointedClientList} page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage}/>
        </Grid>
    </Grid>
    {timeslotShow ? <UpdateTimeslot open={timeslotShow} setTimeslotShow={setTimeslotShow} /> : null}
    </div>
  )
}