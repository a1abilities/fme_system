import React, { useEffect, useState, Fragment } from 'react';

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
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
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
import BackArrowIcon from '@material-ui/icons/ArrowBack';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import UpdateIcon from '@material-ui/icons/Update';
import AccountBalanceIcon from '@material-ui/icons/AccountBalanceWallet';
import TableFooter from '@material-ui/core/TableFooter';
import DetailsIcon from '@material-ui/icons/Details';
import { API_URL } from '../../../../api/Constants';
import {useCommonStyles} from '../../../common/StyleComman';
import Popover from '@material-ui/core/Popover';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import {TablePaginationActions} from '../../../common/Pagination';

// Components
import {getDateWithFullMonthNDay, setTime, get12HourTime} from '../../../../utils/datetime.js'
import AddUpdateTimeslot from './AddUpdateTimeslot';

// API Call
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
  fonttransform:{
    textTransform:"initial",
    fontSize: theme.typography.pxToRem(13),
  },
  labelTitle: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(20),
    color: theme.palette.text.secondary,        
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

export default function UpdateTimeslot({handleMainPage, userData}) {
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
      const result = await AppointmentAPI.getCurrentTimeslot({ userId : userData.id });
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
      setSelectedTimeslot({user_id : userData.id});
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
          <Grid container alignItems = "center">
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
    <Grid container spacing={2} alignItems = "center">
      <Grid item xs={12} sm={6}>
        <div style = {{display: 'flex'}}>
          <Tooltip title="Back to Home">
            <IconButton  size="small" component="span" onClick = {handleMainPage}> <BackArrowIcon/> </IconButton>
          </Tooltip>
          <Typography variant="h6" className={classes.labelTitle}> UPDATE TIMESLOT </Typography>
        </div>        
      </Grid>
      <Grid item xs={12} sm={6} justify = "flex-start" align="right">
        <Fab variant="extended" size="small" color="primary" className={classes.fonttransform}  onClick = {() => {handleOpenTimeslotDialog([], 'add')}}>
          <AddIcon className={classes.extendedIcon} /> ADD TIMESLOT
        </Fab>        
      </Grid>      
      <Grid item xs={12} sm={12}>
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
  </div>
  )
}