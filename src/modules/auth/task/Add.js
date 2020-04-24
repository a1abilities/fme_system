import React, { useState, useEffect } from 'react';
import {component} from 'react-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LinearProgress from '@material-ui/core/LinearProgress';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import * as Yup from 'yup';
import Paper from '@material-ui/core/Paper';

import validate from '../../common/validation/TaskRuleValidation';
import {useCommonStyles} from '../../common/StyleComman'; 
import {getDate, getCurrentDate} from '../../../utils/datetime';

// Helpers
import { APP_TOKEN } from '../../../api/Constants';
// API CALL
import Task from '../../../api/Task';
// import Staff from '../../../api/franchise/Staff';

import Role from '../../../api/franchise/Role';
import FranchiseUsers from '../../../api/FranchiseUsers';

import useSignUpForm from '../franchise/CustomHooks';
import { width } from '@material-ui/system';

const RESET_VALUES = {
  task_id:'',
  task_description:'',
  assigned_to:'',
  due_date:getDate(),
  document: '',
  message : '',
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
    marginRight: theme.spacing(1),
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  },
  tbrow:{
    marginTop:theme.spacing(2),
    marginBottom:theme.spacing(2),
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

export default function Add({ open, handleClose, handleSnackbarClick, setTaskList, roleName}) {
  const classes = useStyles();  
  const styleClass = useCommonStyles();
  
  const [taskLast, setTaskLast] = useState({});
  const [taskId, setTaskId] = useState();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [staffListn, setStaffList] = useState([]);
  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(true);

  const [staffRole, setStaffRole] = useState();
  
  const [otherDisable, setOtherDisable] = useState(true);
  const [role, setRole] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const roleResult = await Role.list();
        setRole(roleResult.role);

        const result = await Task.last();
        let zero = 0;
        if(result[0]!=null){ 
          zero = 6 - (result[0].id.toString().length); 
          let task_id='';
          for(let i=0; i< zero ; i++){
            task_id += '0';
          }
         setInput('task_id',('T' + task_id + (result[0].id + 1)));
        }else{
          setInput('task_id','T000001');
        }
       
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

 

  const addTaskMaster = async () => {
    setpLoading(true);
    setSavebtn(false);
    const data = {
      task_id : inputs.task_id,
      task_description : inputs.task_description,
      assign_to_role : staffRole,
      assigned_to : inputs.assigned_to,
      due_date : getDate(inputs.due_date),
      creator_role : roleName,
      message : inputs.message,
      document : inputs.document,
    }

    let formData = new FormData();
    formData.append('data', JSON.stringify(data));

    for (var x = 0; x < document.getElementById('document').files.length; x++) {
        formData.append('avatar', document.getElementById('document').files[x])
    }
    
    const response = await Task.add({ formData : formData });
    handleSnackbarClick(true);
    setTaskList(response.taskList);
    handleReset(RESET_VALUES);
    setpLoading(false);
    setSavebtn(true);
    handleClose(false);
  };

 function handleRoleChange(e){
    setStaffRole(e.target.value);
    let selectedRole = e.target.value;
    setInput('assign_role',e.target.value)

    try{
   const stafflistForRole = async () => {
    const response = await FranchiseUsers.staffRoleList({
      selectedRole:selectedRole
    });
    setStaffList(response.staffList);
    setOtherDisable(false);
  };

  
    stafflistForRole();
  }catch(error){
    console.log('event',error)
  }

}

function handleDate(date){
  handleInputChange({target:{name: 'due_date', value: date}});
}

 const { inputs=null, handleInputChange, handleSubmit, handleReset, errors, setInput } = useSignUpForm(
    RESET_VALUES,
    addTaskMaster,
    validate
  );


return (
    <div>
      <Dialog maxWidth="sm" open={open}  TransitionComponent={Transition}>
        <form onSubmit={handleSubmit}> 
          <AppBar className={classes.appBar}>
            <Toolbar>           
              <Typography variant="h6" className={classes.title}>
                Assign Task
              </Typography>
              <IconButton size="small" onClick={handleClose} className={styleClass.closeIcon}> x </IconButton>              
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
          <Grid item xs={12} sm={12}> {ploading ?  <LinearProgress />: null} </Grid>
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
                        value={inputs.task_id}
                        fullWidth
                        disabled className={classes.tbrow}
                        type="text"
                        // placeholder="Franchise Name"
                        margin="dense"
                      /> 
              </Grid>
              <Grid item xs={12} sm={6}>  
              <InputLabel  className={classes.textsize} htmlFor="due_date">Due Date</InputLabel> 
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      autoOk
                      variant = "inline"
                      margin="dense"
                      id="due_date"
                      name="due_date"
                      format="dd-MM-yyyy"
                      placeholder="DD-MM-YYYY"
                      disablePast = {true}
                      value={inputs.due_date}
                      fullWidth 
                      onChange={handleDate}
                      error={errors.due_date}
                      helperText={errors.due_date}
                    />
                </MuiPickersUtilsProvider>              
                </Grid>
                <Grid item xs={12} sm={6}>  
                <InputLabel  className={classes.textsize} htmlFor="assign_role">Assigned Role</InputLabel> 
                    <Select
                      value={inputs.assign_role}
                      inputProps={{
                        name: 'assign_role',
                        id: 'assign_role',
                      }}
                      onChange={handleRoleChange}
                      className={classes.textsize}
                      fullWidth
                      error={errors.assign_role}
                      helperText={errors.assign_role}
                    >
                      {roleName === 'Admin' && <MenuItem className={classes.textsize} value={2}>Director</MenuItem>}
                      {role.map((ele) =>{
                        return( <MenuItem className={classes.textsize} value={ele.id}>{ele.name}</MenuItem> )
                      })}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>  
                <InputLabel  className={classes.textsize} htmlFor="assigned_to">Assigned To</InputLabel> 
                    <Select
                      value={inputs.assigned_to}
                      onChange={handleInputChange}
                      inputProps={{
                        name: 'assigned_to',
                        id: 'assigned_to',
                        label:'assigned_to'
                      }}
                      disabled = {otherDisable}
                      fullWidth className={classes.dropdwn}
                      error={errors.assigned_to}
                      helperText={errors.assigned_to}
                      label="assigned_to" required 
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
                        value={inputs.task_description}
                        onChange={handleInputChange}
                        error={errors.task_description}
                        helperText={errors.task_description}
                        fullWidth
                        className={classes.tbrow}
                        type="text"
                        multiline
                        margin="dense"
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
                        value={inputs.message}
                        onChange={handleInputChange}
                        error={errors.message}
                        helperText={errors.message}
                        fullWidth
                        className={classes.tbrow}
                        type="text"
                        multiline
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
                    value={inputs.document}
                    onChange={handleInputChange}
                    fullWidth
                    type="file"
                    margin="dense"
                  />                 
                  </Grid>
                  <Grid item xs={12} sm={12}> 
                    {savebtn? 
                      <Button variant="contained" color="primary" className={classes.button}  type="submit">
                        Assign
                      </Button> : <Button variant="contained" color="primary" className={classes.button}  type="submit" disabled>
                        Assign
                      </Button> }
                      <Button variant="contained" color="primary" className={classes.button} onClick={handleClose} type="submit">
                        Close
                      </Button>  
                  </Grid>               
                </Grid>
              </Paper>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
