import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';

// Components
import customHooks from '../../../common/CustomHooks';
import validate from '../../../common/validation/AppointmentTimeslotDialog.js';
import {getDate, setTime, getCurrentDate, getTimeinDBFormat, get12HourTime } from '../../../../utils/datetime'

// API 
//import AppointmentAPI from '../../../api/Appointment.js';

import AppointmentAPI from '../../../../api/Appointment.js'



const useStyles = makeStyles(theme => ({
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  },
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
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  },
  button:{
    color:"white",
    fontSize: theme.typography.pxToRem(10),
    margin: theme.spacing(1),
  },
  closeIcon: {
    marginTop:theme.spacing(-3),
    color: 'white', 
    fontSize: theme.typography.pxToRem(14),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginRight:theme.spacing(-1),
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});


const RESET_VALUES = {
  date : new Date(),
  start_time : null, 
  end_time : null, 
};

export default function AddUpdateTimeslot({open, handleClose, operation, selectedTimeslot, setCurrentTimeslotList}) {
  
  const classes = useStyles();    

  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(false);
  console.log(selectedTimeslot);
  useEffect(()=>{
    checkOperationIsUpdate();    
  },[]);

  const checkOperationIsUpdate = async () => {
    if(operation === 'update'){
      handleRandomInput([
        {name: 'date', value:   selectedTimeslot.date},
        {name: 'start_time', value: setTime(selectedTimeslot.start_time)},
        {name: 'end_time', value: setTime(selectedTimeslot.end_time)}
      ]);      
    }
  }

  const submitTimeslot = async () => {
    setSavebtn(true);
    setpLoading(true);
    try{     
      const result = await AppointmentAPI.addOrUpdateTimeslot({
        date : getDate(inputs.date),
        start_time : getTimeinDBFormat(inputs.start_time),
        end_time : getTimeinDBFormat(inputs.end_time), 
        appointmentId : selectedTimeslot.id,
        operation : operation,
      });
      setCurrentTimeslotList(result.timeSlot);
      handleClose();
    }catch(e){
      console.log('handleLeave Error...', e);
    }
    setSavebtn(false);
    setpLoading(false);
  }
  
  const { inputs, handleDateChange, handleSubmit, handleRandomInput, setInput, errors } = customHooks(    
    RESET_VALUES,
    submitTimeslot,
    validate
  );


  return (    
    <Dialog maxWidth="sm" open={open} TransitionComponent={Transition}>      
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Add Timeslot
            </Typography>              
            <IconButton size="small" onClick={handleClose} className={classes.closeIcon}> x </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          <Grid item xs={12} sm={12}>   {ploading ?  <LinearProgress />: null}</Grid>
          <Paper className={classes.paper}>            
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12}>
                <InputLabel  className={classes.textsize} htmlFor="date">Date *</InputLabel>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="dense"
                      id="date"
                      name="date"
                      format="dd-MM-yyyy"
                      placeholder="DD-MM-YYYY"
                      disablePast = {true}
                      value={inputs.date}
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      fullWidth
                      onChange={(date) => {handleDateChange('date', date)}}
                    />
                  </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputLabel  className={classes.textsize} htmlFor="start_time">Start Time *</InputLabel>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                      margin="dense"
                      id="start_time"
                      name="start_time"                            
                      value={inputs.start_time}
                      onChange={(date) => {handleDateChange('start_time', date)}}
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputLabel  className={classes.textsize} htmlFor="end_time">End Time *</InputLabel>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardTimePicker
                        margin="dense"
                        id="end_time"
                        name="end_time"
                        value={inputs.end_time}
                        onChange={(date) => {handleDateChange('end_time', date)}}
                        InputProps={{
                          classes: {
                            input: classes.textsize,
                          },
                        }}
                        fullWidth
                      />
                  </MuiPickersUtilsProvider>
              </Grid>
              
              <Grid item xs={12} sm={12}>
                <Button variant="contained" color="primary" className={classes.button}  disabled= {savebtn == true} onClick = {handleSubmit}> save </Button> 
                <Button variant="contained" color="primary" onClick={handleClose} className={classes.button}> Close  </Button> 
            </Grid>
          </Grid>
          </Paper>
        </div>
    </Dialog>
  )
}