import React, { useEffect, useState, Fragment } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';



// Components
import {getDateWithFullMonthNDay, setTime, get12HourTime} from '../../../../utils/datetime.js'
import AddUpdateTimeslot from './AddUpdateTimeslot';

// API Call
import AppointmentAPI from '../../../../api/Appointment.js';

const useStyles = makeStyles(theme => ({
  fonttransform:{
    textTransform:"initial",
    fontSize: theme.typography.pxToRem(13),
  },
  labelTitle: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(20),
    color: theme.palette.text.secondary,        
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
  closeIcon: {
    marginTop:theme.spacing(-3),
    color: 'white',
    // fontSize: '10px',
    marginRight:theme.spacing(-4),
  },
  listPrimaryItem: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(18),
    color: theme.palette.text.secondary,
    marginBottom : '30px',
  },
  listSecondaryItem: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.text.secondary,
    marginBottom : '10px',
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function UpdateTimeslot({open, setTimeslotShow}) {
  const classes = useStyles();
  const [currentTimeslotList, setCurrentTimeslotList] = useState([]);
  const [showTimslotDialog, setShowTimslotDialog] = useState(false);
  const [uniqueAppointment, setUniqueAppointment] = useState([]);
  const [selectedTimeslot, setSelectedTimeslot] = useState([]);
  const [operation, setOperation] = useState('');

  useEffect(() => {
    getCurrentTimeslot();
  },[]);

  useEffect(() => {
    handleDistinctAppointment(currentTimeslotList);
  },[currentTimeslotList]);

  const getCurrentTimeslot = async () => {
    try{
      const result = await AppointmentAPI.getCurrentTimeslot({ });
      setCurrentTimeslotList(result.timeSlot);      
    }catch(e){
      console.log('getCurrentTimeslot Error...', e);
    }
  }

  const handleDistinctAppointment = (timeSlotList) => {
    const uniqueAppoint = timeSlotList.filter((value, index, self) => {
        if(self.length !== (index + 1)){
          return value.date !== self[index+1].date
        } else{
          return value
        }
    })
    setUniqueAppointment(uniqueAppoint);
  }

  const handleLeave = async (data) => {
    try{      
      let status = data.status === 2 ? 1 : data.status === 1 ? 2 : '';
      const result = await AppointmentAPI.handleLeave({
        appointmentId : data.id,
        userId: data.user_id,
        appointment_status : status,
        date : data.date,
      });
      setCurrentTimeslotList(result.timeSlot);   
      console.log(result)   ;
    }catch(e){
      console.log('handleLeave Error...', e);
    }
  }

  const removeTimeSlot = async (data) => {
    try{      
      const result = await AppointmentAPI.removeTimeSlot({ 
        appointmentId : data.id,
        userId: data.user_id,        
      });
      console.log('result.....0',result.timeSlot)
      setCurrentTimeslotList(result.timeSlot);      
    }catch(e){
      console.log('removeTimeSlot Error...', e);
    }
  }

  const handleOpenTimeslotDialog = (data, operation) => {
    setOperation(operation);
    if(operation === 'add'){
      setSelectedTimeslot({});
    }else if(operation === 'update'){
      setSelectedTimeslot(data);
    }
    setShowTimslotDialog(true);
  }

  const handleCloseTimeslotDialog = async () => {
    setShowTimslotDialog(false);
  }

  const handleSameDaysTime = (currentRow) => {
    let gridList =[];
    currentTimeslotList.map((data, index) => {
      if(currentRow.date === data.date){
        gridList.push(
          <Grid container spacing={4}  direction="row" justify="center" alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography className={classes.listSecondaryItem} color="textPrimary" >
                { get12HourTime(setTime(data.start_time)) + '  -  ' + get12HourTime(setTime(data.end_time))}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} align="right">
              <Button variant="text" color="primary" className={classes.button} onClick = {() => handleOpenTimeslotDialog(data, 'update' )}> Update </Button>                                
              <Button variant="text" color="primary" className={classes.button} onClick = {() => removeTimeSlot(data)}> Delete Timeslot</Button>
            </Grid>
          </Grid>
        );
      }
    })
    
    return gridList
  }


  return (  
  <div>
    <Dialog maxWidth="lg" open={open} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {/* Add Customer */}
          </Typography>
          <IconButton size="small" onClick={() => {setTimeslotShow(false)}} className={classes.closeIcon}> x </IconButton>
        </Toolbar>
      </AppBar>
    <Grid container spacing={4}  direction="row" justify="center" alignItems="center">
      <Grid item xs={12} sm={5}>
        <div style = {{display: 'flex', marginTop: '20px'}}>
          <Typography variant="h6" className={classes.labelTitle}> UPDATE TIMESLOT </Typography>
        </div>        
      </Grid>
      <Grid item xs={12} sm={5} justify = "flex-start" align="right">
        <Fab variant="extended" size="small" color="primary" style = {{marginTop: '20px'}} className={classes.fonttransform}  onClick = {() => {handleOpenTimeslotDialog([], 'add')}}>
          <AddIcon className={classes.extendedIcon} /> ADD TIMESLOT
        </Fab>        
      </Grid>      
      <Grid item xs={12} sm={10}>
        <List className={classes.root}>
          {(uniqueAppointment.length > 0 && uniqueAppointment != "" ? uniqueAppointment : []).map((data, index) => {
            return(
              <div>
                <Paper>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={
                        <Fragment>
                            <Grid container alignItems = "center">
                            <Grid item xs={12} sm={6}>
                              <Typography className={classes.listPrimaryItem} color="textPrimary" >
                                {getDateWithFullMonthNDay(data.date) + ' (' + data.status_name + ')'}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} align="right">
                              <Button variant="text" color="primary" className={classes.button} onClick = {() => handleLeave(data)}>
                                { data.status === 1 ? "Going On Leave" : data.status === 2 ? 'Cancel Leave' : '' }
                              </Button>
                            </Grid>
                          </Grid>
                        </Fragment>
                      }
                      secondary = {
                        <Fragment>
                          {handleSameDaysTime(data)}                            
                        </Fragment>                          
                      }
                    />
                  </ListItem>
                  <Divider variant="fullWidth" component="li" />
                </Paper>
              </div>
            )
          })}
        </List>
      </Grid>
    </Grid>
    { showTimslotDialog ? <AddUpdateTimeslot open = {showTimslotDialog} handleClose = {handleCloseTimeslotDialog} operation={operation} selectedTimeslot = {selectedTimeslot} setCurrentTimeslotList={setCurrentTimeslotList} /> : null }
    </Dialog>
  </div>
  )
}