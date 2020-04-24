import React, { useEffect } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Grid from '@material-ui/core/Grid';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CachedIcon from '@material-ui/icons/Cached';
import IconButton from '@material-ui/core/IconButton';
import BackArrowIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
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
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';
import UpdateIcon from '@material-ui/icons/Update';
import AccountBalanceIcon from '@material-ui/icons/AccountBalanceWallet';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TableFooter from '@material-ui/core/TableFooter';
import DetailsIcon from '@material-ui/icons/Details';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import Popover from '@material-ui/core/Popover';
import PropTypes from 'prop-types';
import moment from 'moment';

// Components
import {TablePaginationActions} from '../../../common/Pagination';
import {useCommonStyles} from '../../../common/StyleComman.js';
import useSignUpForm from '../../franchise/CustomHooks';
import validate from '../../../common/validation/AppointmentTimeslotDialog';
import {getDate, setTime, getCurrentDate, getTimeinDBFormat, get12HourTime } from '../../../../utils/datetime'

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
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  button:{
    color:"white",
    fontSize: theme.typography.pxToRem(10),
    margin: theme.spacing(1),
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
  const styleClass = useCommonStyles();
  const classes = useStyles();    

  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(false);
  
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
    try{     
      const result = await AppointmentAPI.addOrUpdateTimeslot({
        userId: selectedTimeslot.user_id,
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
  }
  
  const { inputs, handleDateChange, handleSubmit, handleRandomInput, setInput, errors } = useSignUpForm(    
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
            <IconButton size="small" onClick={handleClose} className={styleClass.closeIcon}> x </IconButton>
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
                      autoOk
                      variant = "inline"
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