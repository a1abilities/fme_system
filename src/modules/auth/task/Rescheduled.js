import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import {getDate, getCurrentDate} from '../../../utils/datetime';

import LinearProgress from '@material-ui/core/LinearProgress';
// API CALL
import Task from '../../../api/Task';
import Role from '../../../api/franchise/Role';
// import Staff from '../../../api/franchise/Staff';
import FranchiseUsers from '../../../api/FranchiseUsers';
import {useCommonStyles} from '../../common/StyleComman'; 

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
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  },
  expansionTitle: {
    fontWeight: theme.typography.fontWeightBold,
  },
  button:{
    color:"white",
    fontSize: theme.typography.pxToRem(10),
    marginRight: theme.spacing(1),
  },
  closeIcon: {
    marginTop:theme.spacing(-3),
    color: 'white',
   },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Rescheduled({open, handleRescheduledClose, handleSnackbarClick,  inputs, setTaskList, roleName}) {
  const classes = useStyles();
  const styleClass = useCommonStyles();
  const [staffListn, setStaffList] = useState({});
  const [taskList, setTasksList] = React.useState(inputs);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [franchiseUsersList, setFranchiseUsersList] = useState({});
  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(true);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message,setMessage] =useState('');

  const [role, setRole] = useState([]);
 
  function validate(values) {
   
    let errors = {};
    if (!values.task_description) {
      errors.task_description = 'Task Description is required';
    } 
  
    if (!values.assign_to) {
      errors.assign_to = 'Assigned To is required';
    } 
    if (!values.assign_to_role_id) {
      errors.assign_to_role_id = 'Assigned Role is required';
    } 
    if(!values.reschedule_date){
      errors.reschedule_date = 'Date is required'; 
    }
    if (!values.due_date) {
      errors.due_date = 'Due Date is required';
    } 
    
    return errors;
  };
    
    
  const rescheduleTask = async () => {
    setSavebtn(false);
    setpLoading(true);
    const data={      
      id : taskList.id,
      task_id : taskList.task_id,
      task_description : taskList.task_description,
      assign_to_role : taskList.assign_to_role_id,
      assigned_to : taskList.assign_to,
      due_date : getDate(taskList.reschedule_date),
      start_date : taskList.start_date,
      reschedule_req_date : taskList.reschedule_req_date,
      last_due_date : taskList.due_date,
      
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
    const response = await Task.reschedule({ formData: formData });

    handleSnackbarClick(true,'Task Rescheduled Successfully');
    setTaskList(response.taskList);
    handleRescheduledClose(false);
  };


  function handleRoleChange(e){

    let selectedRole = e.target.value;
    const { name, value } = e.target
    setTasksList({ ...taskList, [name]: value })

    try{
      const stafflistForRole = async () => {
        const response = await FranchiseUsers.staffRoleList({
          selectedRole:selectedRole
        });
        setStaffList(response.staffList);
      };
     stafflistForRole();
    }catch(error){
      console.log('event',error)
    }
  }
  
  
  useEffect(() => {

    // taskList.message = '';
    handleInputChange({target:{name: 'reschedule_date', value: taskList.due_date}});    
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const response = await FranchiseUsers.staffRoleList({
          selectedRole : taskList.assign_to_role_id
        });
        setStaffList(response.staffList);        
        
        const result = await Role.list();
        setRole(result.role);

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

  function handleNewDueDate(date){    
    handleInputChange({target:{name: 'reschedule_date', value: date}})
  }


  return (
    <div>
      <Dialog maxWidth="sm" open={open} TransitionComponent={Transition}>
        <from >
          <AppBar className={classes.appBar}>
            <Toolbar>             
              <Typography variant="h6" className={classes.title}>
                Rescheduled Task
              </Typography>
              <IconButton size="small" onClick={handleRescheduledClose} className={styleClass.closeIcon}> x </IconButton>              
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
          
          <Grid item xs={12} sm={12}>{ploading ?  <LinearProgress />: null}</Grid>
          <Paper className={classes.paper}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <InputLabel  className={classes.textsize} htmlFor="task_id">Task ID</InputLabel>
              <TextField 
                InputProps={{
                  classes: {
                    input: classes.textsize,
                  },
                }}
              id="task_id"
              name="task_id"
              value={taskList.task_id}
              fullWidth
              disabled
              type="text"
              margin="dense"
            /> 
            </Grid>
            <Grid item xs={12} sm={4}>  
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
                  fullWidth                       
                  disabled
                  error={errors.due_date}
                  helperText={errors.due_date}                               
                />
              </MuiPickersUtilsProvider>
            </Grid>            
              <Grid item xs={12} sm={4}>  
                <InputLabel  className={classes.textsize} htmlFor="reschedule_date">Reissue Due Date</InputLabel>
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
                    id="reschedule_date"
                    name="reschedule_date"
                    format="dd-MM-yyyy"
                    placeholder="DD-MM-YYYY"
                    disablePast = {true}
                    value={taskList.reschedule_date}
                    fullWidth                                     
                    onChange={handleNewDueDate}
                    error={errors.reschedule_date}
                    helperText={errors.reschedule_date}                               
                  />
                </MuiPickersUtilsProvider>
            </Grid>
            
            <Grid item xs={12} sm={6}>  
              <InputLabel  className={classes.textsize} htmlFor="assign_to_role_id">Role List</InputLabel>
              <Select
                value={taskList.assign_to_role_id}
                inputProps={{
                  name: 'assign_to_role_id',
                  id: 'assign_to_role_id',
                }}
                onChange={handleRoleChange}
                className={classes.textsize}
                fullWidth
                required
              >
                <MenuItem className={classes.textsize} value={2}>Director</MenuItem>
                {role.map((ele,index) =>{
                  return(
                  <MenuItem className={classes.textsize} value={ele.id}>{ele.name}</MenuItem>
                  )
                })}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>  
              <InputLabel  className={classes.textsize} htmlFor="assign_to">Assigned To</InputLabel>
              <Select
                disabled={taskList.status ===2}
                  value={taskList.assign_to}
                  onChange={handleInputChange}
                  inputProps={{
                    name: 'assign_to',
                    id: 'assign_to',
                  }}
                  className={classes.textsize}
                  fullWidth
                  required
                >
                  {/* <MenuItem className={classes.textsize} value={'0'}>{'All'} </MenuItem> */}
                    { (staffListn.length > 0 ? staffListn : []).map((staff, index)=>{
                      return(
                        <MenuItem className={classes.textsize} value={staff.id}>{staff.name} </MenuItem>
                    )})
                    }
              </Select>
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
                required
                error={errors.task_description}
                helperText={errors.task_description}
                type="text"
                multiline
                margin="dense"
                disabled
              /> 
            </Grid>
            <Grid item xs={12} sm={6}>  
                  <InputLabel  className={classes.textsize} htmlFor="message">Message Box</InputLabel> 
                    <TextField 
                        InputProps={{
                          classes: {
                            input: classes.textsize,
                          },
                        }}
                        id="message"
                        name="message"
                        // label="Task Description"
                        value={message}
                        onChange={handleMessageChange}
                        // error={errors.message}
                        // helperText={errors.message}
                        fullWidth
                        // required 
                        className={classes.tbrow}
                        type="text"
                        multiline
                        // placeholder="Franchise Name"
                        margin="dense"
                      />                  
                  </Grid>
                  <Grid item xs={12} sm={6}>  
                  <InputLabel  className={classes.textsize} htmlFor="document">Document</InputLabel> 
                  <TextField  
                    InputProps={{
                      classes: {
                        input: classes.textsize,
                      },
                    }}
                    id="document"
                    name="document"
                    // label="Task Id"
                    value={taskList.document}
                    onChange={handleInputChange}
                    fullWidth
                    type="file"
                    // placeholder="Franchise Name"
                    margin="dense"
                  />                 
                  </Grid>
            <Grid item xs={12} sm={12}>  
              {savebtn? 
                <Button variant="contained" color="primary" className={classes.button} onClick={ rescheduleTask }  type="submit">
                  {/* disabled={(taskList.status !=1 && taskList.status !=3) ? true : false}  */}
                  Update
                </Button>: 
                <Button variant="contained" color="primary" className={classes.button}  type="submit" disabled>
                  Update
                </Button>
              }
                <Button variant="contained" color="primary" className={classes.button} onClick={handleRescheduledClose}  type="submit">
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
