import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import LinearProgress from '@material-ui/core/LinearProgress';
import {getDate, getCurrentDate} from '../../../utils/datetime';
import {useCommonStyles} from '../../common/StyleComman';
import ViewMsgList from './OtherComponents/ViewMsgList';

// API CALL
import Task from '../../../api/Task';
import Staff from '../../../api/franchise/Staff';


const RESET_VALUES = {
  id: '',
  first_name: '',
  last_name:'',
  location:'',
  contact:'',
  email:'',
};

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
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  },
  dropdwn:{
      // marginTop:theme.spacing(2.5),
      fontSize: theme.typography.pxToRem(12),
  },
  closeIcon: {
    marginTop:theme.spacing(-3),
    color: 'white',
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});



const StyledTableCell = withStyles(theme => ({
  head: {
    color: theme.palette.common.black,
    fontSize: theme.typography.pxToRem(13),
  },
  body: {
    fontSize: 11,
  },

}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

export default function StaffEdit({open, handleStaffEditClose, handleSnackbarClick,  inputs, setTaskList }) {
  const classes = useStyles();
  const styleClass = useCommonStyles();
  const [staffList, setStaffList] = useState({});
  const [taskList, setTasksList] = React.useState(inputs);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [dateToday, setTodayDate]= useState();
  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(true);
  const [expanded, setExpanded] = React.useState('');
  const [msgList, setMsgList] =  React.useState([]);
  const [message,setMessage] =useState('');
  const taskStatus = inputs.status;
  const [errors, setErrors] = useState({});

  
  function validate(values) {
    let errors = {};    
    if (!values.due_date) {
      errors.due_date = 'Due Date is required';
    } else if(checkFutureDate(values.due_date)){
      errors.due_date = 'Due Date is invalid';
    }
    return errors;
  };

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  

  const addTaskMaster = async () => {
    
    setpLoading(true);
    setSavebtn(false);

    const data={      
      id: taskList.id,
      task_id : taskList.task_id,
      assign_to_role : taskList.assign_to_role_id,
      assigned_to : taskList.assign_to,
      due_date : getDate(taskList.due_date),
      start_date : taskList.start_date,
      reschedule_req_date : taskList.reschedule_req_date,
      last_due_date : taskList.last_due_date,

      message : message,
      status : taskList.status,
      document : taskList.document,
      lastDataState : inputs,      
    }
    let formData = new FormData();
    formData.append('data', JSON.stringify(data));
    
    for (var x = 0; x < document.getElementById('document').files.length; x++) {
      formData.append('avatar', document.getElementById('document').files[x])
    }
    
    const response = await Task.staffUpdate({ formData: formData });
    handleSnackbarClick(true);
    setTaskList(response.taskList);
    setpLoading(false);
    setSavebtn(true);
    handleStaffEditClose(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        todayDate();
        const result = await Staff.list();
        setStaffList(result.staffList);  
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleInputChange = event => {
    const { name, value } = event.target
    setTasksList({ ...taskList, [name]: value })
  }

  const handleMessageChange = event => {
    setMessage(event.target.value)
  }

  function todayDate(){
    var dtToday = new Date();
    
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();
        var date = year + '-' + month + '-' + day;
    setTodayDate(date);
    setTasksList({ ...taskList, updated_date: date })
  }


  function handleDate(date){    
    handleInputChange({target:{name: 'due_date', value: date}});
  }

  return (
    <div>
      <Dialog maxWidth="sm" open={open} TransitionComponent={Transition}>
        <from >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Update Task
              </Typography>
              <IconButton size="small" onClick={handleStaffEditClose} className={styleClass.closeIcon}> x </IconButton>              

            </Toolbar>
          </AppBar>

          <div className={classes.root}>
          <Grid item xs={12} sm={12}>   {ploading ?  <LinearProgress />: null}</Grid>
          <Paper className={classes.paper}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <InputLabel  className={classes.textsize} htmlFor="task_id">Task ID</InputLabel>
                <TextField 
                  InputProps={{
                    classes: {
                      input: classes.textsize,
                    },
                  }} 
                  id="task_id"
                  name="task_id"
                  // label="Task Id"
                  value={taskList.task_id}
                  fullWidth
                  disabled
                  type="text"
                  margin="dense"
                /> 
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel  className={classes.textsize} htmlFor="due_date">Due Date</InputLabel>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk = {true}                    
                    variant = "inline"
                    InputProps={{
                      classes: {
                        input: classes.textsize,
                      },
                    }} 
                    margin="dense"
                    id="due_date"
                    name="due_date"
                    format="dd-MM-yyyy"
                    placeholder="DD-MM-YYYY"
                    disablePast = {true}
                    value={taskList.due_date}
                    error={errors.due_date}
                    helperText={errors.due_date}
                    fullWidth 
                    disabled
                    onChange={handleDate}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputLabel  className={classes.textsize} htmlFor="task_description">Task Description</InputLabel>
                 <TextField  
                    InputProps={{
                      classes: {
                        input: classes.textsize,
                      },
                    }}
                    id="task_description"
                    name="task_description"
                    value={taskList.task_description}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    disabled
                    type="text"
                    margin="dense"
                  /> 
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel  className={classes.textsize} htmlFor="document">Upload Document</InputLabel>
                  <TextField  
                    InputProps={{
                      classes: {
                        input: classes.textsize,
                      },
                    }}
                    id="document"
                    name="document"
                    value={taskList.document}
                    onChange={handleInputChange}
                    fullWidth
                    type="file"
                    margin="dense"
                  /> 
              </Grid>              
              <Grid item xs={12} sm={6}>
                <InputLabel  className={classes.textsize} htmlFor="status">Action</InputLabel>
                  <Select
                    value={taskList.status}
                    onChange={handleInputChange}
                    inputProps={{
                      name: 'status',
                      id: 'status',
                      label:'status'
                    }}
                    fullWidth
                    label="status"
                    required
                    className={classes.textsize}
                  >
                    { taskStatus === 1 ?
                          <MenuItem className={classes.textsize} disabled  value="1" selected>Scheduled</MenuItem>
                      : ''
                    }
                    {
                      taskStatus === 1 ?
                        <MenuItem className={classes.textsize} value="2">In-progress</MenuItem>
                      : ''
                    }
                    { taskStatus === 4 ?
                          <MenuItem className={classes.textsize} disabled  value="4" selected>Rescheduled</MenuItem>
                      : ''
                    }
                    {
                      taskStatus === 4 ?
                        <MenuItem className={classes.textsize} value="2">In-progress</MenuItem>
                      : ''
                    }
                    {
                      taskStatus === 2 ?
                      <MenuItem className={classes.textsize} value="2" disabled selected>In-progress</MenuItem>
                      : ''
                    }
                    {
                      taskStatus === 2 ?
                      <MenuItem className={classes.textsize} value="3">Request to Reschedule </MenuItem>
                      : ''
                    }
                    {
                      taskStatus === 2 ?
                      <MenuItem className={classes.textsize} value="6">Completed </MenuItem>
                      : ''
                    }
                    {
                      taskStatus !== 2 && taskStatus !== 1 && taskStatus !== 4 ?
                      <MenuItem className={classes.textsize} value="3">Request to Reschedule </MenuItem>
                      : ''
                    }
                    {
                      taskStatus !== 2 && taskStatus !== 1 && taskStatus !== 4 ?
                      <MenuItem className={classes.textsize} value="6">Completed </MenuItem>
                      : ''
                    }
                  </Select>
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputLabel  className={classes.textsize} htmlFor="message">Message</InputLabel>
                <TextField  
                  InputProps={{
                    classes: {
                      input: classes.textsize,
                    },
                  }}
                  id="message"
                  name="message"
                  // label="Task Id"
                  value={message}
                  onChange={handleMessageChange}
                  fullWidth
                  required
                  multiline
                  type="text"
                  // placeholder="Franchise Name"
                  margin="dense"
                /> 
              </Grid>
              {/* <Grid item xs={12} sm={12}>
                <ExpansionPanel className={classes.expansionTitle} expanded={expanded === 'panel1'} onChange={handleChange('panel1')} >
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="" id="panel1a-header">
                    <Typography className={classes.heading}>View Messages </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <ViewMsgList msgList={ msgList } />
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                
                <ExpansionPanel className={classes.expansionTitle} expanded={expanded === 'panel2'} onChange={handleChange('panel2')} >
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="" id="panel1a-header">
                    <Typography className={classes.heading}>Document </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                  
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Grid> */}
              <Grid item xs={12} sm={12}>
                {savebtn? 
                  <Button variant="contained" color="primary" className={classes.button} onClick={addTaskMaster}  type="submit">
                    Update
                  </Button> : <Button variant="contained" color="primary" className={classes.button}  type="submit" disabled>
                    Update
                  </Button>
                }
                  <Button variant="contained" color="primary" className={classes.button} onClick={handleStaffEditClose}  type="submit">
                    Close
                  </Button>
              </Grid>
            </Grid>
          </Paper>
          </div>
        </from>
      </Dialog>
    </div>
  );
}
