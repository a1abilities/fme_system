import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { APP_TOKEN } from '../../../api/Constants';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContentWrapper from '../../common/MySnackbarContentWrapper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';

//files
import Add from './Add';
import Edit from './Edit';
import StaffEdit from './StaffEdit';
import Rescheduled from './Rescheduled';
import TaskHistory from './OtherComponents/TaskHistory';

import All from './OtherComponents/All';
import AssignedToME from './OtherComponents/AssignedToMe';
import AssignedByMe from './OtherComponents/AssignedByMe';
import RescheduleRequestBy from './OtherComponents/RescheduleRequestBy';
import RescheduleRequestTo from './OtherComponents/RescheduleRequestTo';
import Completed from './OtherComponents/Completed';

// API CALL
import TaskAPI from '../../../api/Task';

//Components
import BadgeComp from '../../common/BadgeComp.js';
import {TabPanel} from '../../common/TabPanel.js';

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: 240,
      flexShrink: 0,
    },
    drawerPaper: {
      width: 240,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
    title: {
      flexGrow: 1,
      fontSize: theme.typography.pxToRem(14),
      color:"white",
      marginTop:theme.spacing(-3),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    padding: {
      padding: theme.spacing(0, 2),
    },
    fonttransform:{
      textTransform:"initial",
      fontSize: theme.typography.pxToRem(13),
    },
    button:{
      color:"white",
      fontSize: theme.typography.pxToRem(10),
      marginRight: theme.spacing(2),
      padding:theme.spacing(2),
      borderRadius: theme.spacing(7),
    },
    tbrow:{      
      marginTop:theme.spacing(10),
    },
    bgtaskpending:{
      backgroundColor:"yellow",
      padding: theme.spacing(1),
    },
    bgtaskoverdue:{
      backgroundColor:"red",
      padding: theme.spacing(1),
    },
    fab: {
      margin: theme.spacing(1),
    },
    textsize:{
      color:"white",
      fontSize: theme.typography.pxToRem(12),
    },
    drpdwn:{
      color: 'white',
      fontSize: theme.typography.pxToRem(13),
    },
    icon: {
      fill: 'white',
    },
    textsize:{
      fontSize: theme.typography.pxToRem(12),
      color: 'white',
    }
  }));


export default function TaskList({roleName, showTaskData}) {

  const classes = useStyles();
  const uid = APP_TOKEN.get().uid;
  const userId = APP_TOKEN.get().userId;
  const [isOpen, setIsOpen] = useState(showTaskData ? true : false);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [rescheduleEditOpen, setRescheduleEditOpen] = useState(false);  
  const [staffEditOpen, setStaffEditOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [taskData,setTaskData] = useState();
  const [taskHistoryOpen,setTaskHistoryOpen] = useState(false);
  const [historyData, setHistoryData] = useState([]);  
  const [tasksList, setTaskList] = useState({});  
  const [dateToday, setTodayDate]= useState();
  
  
  
  
  const [assignedToMeTab,setAssignedToMeTab] = useState([]);
  const [assignedByMeTab,setAssignedByMeTab] = useState([]);
  const [rescheduleRequestToMeTab,setRescheduleRequestToMeTab] = useState([]);
  const [rescheduleRequestByMeTab,setRescheduleRequestByMeTab] = useState([]);
  const [completionRequestToMeTab,setCompletionRequestToMeTab] = useState([]);
  const [completionRequestByMeTab,setCompletionRequestByMeTab] = useState([]);
  const [cancelledTab,setCancelledTab] = useState([]);
  const [onHoldTab,setOnHoldTab] = useState([]);
  const [allTab,setAllTab] = useState([]);
  const [completedTab,setCompletedTab] = useState([]);
  
 

  //value is for tabs  
  const [value, setValue] = React.useState(0);  
 
  useEffect(() =>{
    if(isOpen) {
      handleClickStaffEditOpen(showTaskData);
      setIsOpen(false);
    }
  });
      
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await TaskAPI.list();             
        setTaskList(result.taskList);         
        handleTabsData(result.taskList);
        currentDate();
        todayDate();
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();    
  }, [roleName]);

  

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
// console.log('task data',tasksList)
  function todayDate(){
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



  function handleClickOpen() {
    setOpen(true);
  }
 
  function handleClose() {
    setOpen(false);
  }
  function handleClickEditOpen(data) {
    setTaskData(data);
    setEditOpen(true);
  }
  function handleClickStaffEditOpen(data) {
    setTaskData(data);
    setStaffEditOpen(true);
  }
  function handleEditClose() {
    setEditOpen(false);
  }

  function handleRescheduledClose() {
    setRescheduleEditOpen(false);
  }
  
  function handleRescheduledOpen(data) {
    setTaskData(data);
    setRescheduleEditOpen(true);
  }

  function handleStaffEditClose() {
    setStaffEditOpen(false);
  }
  
  function setTaskListFn(response) {
    setTaskList(response);
    handleTabsData(response);
    currentDate();
  }

  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  function handleSnackbarClick() {
    setSnackbarOpen(true);
  }

  function handleHistoryClose(){
    setTaskHistoryOpen(false);
  }
  
  const handleHistoryOpen = async (response) => {
    setHistoryData(response);
    setTaskHistoryOpen(true);    
  }

  const handleClickDelete = async (response) => {    
    const result = await TaskAPI.delete({
      id: response.id,
      activity_id: response.activity_id,      
    });   
    // console.log('result',result);
    setTaskList(result.taskList);
    handleTabsData(result.taskList);
    currentDate();
  };


  
  function handleTabChange(event, newValue) {
    setValue(newValue);
  }

  
  const handleTabsData = (task) => {
    let assignedToMe = [];
    let assignedByMe = [];
    let rescheduleRequestToMe = [];
    let rescheduleRequestByMe = [];
    let all = [];
    let completed = [];
    let completionRequestToMeTab = [];
    let completionRequestByMeTab = [];
    let cancelledTab = [];
    let onHoldTab = [];
    let roleId='';

    switch (roleName) {
      case 'Admin': roleId = 2;
        break;
      case 'CSR' :  roleId = 3;
        break;
      case 'Finance' :  roleId = 4;
        break;
      case 'Delivery' :  roleId = 5;
        break;
      case 'HR' :  roleId = 6;
    
      default: break;
    }
    
   (task.length > 0 ? task : []).map((data, index) => {
        if((data.task_created_by == userId && data.creator_role == roleName) || ( data.assign_to == userId && data.assign_to_role_name == roleName)){
          all.push(data);
        }
      if(data.assign_to == userId  && data.is_active == 1 && (data.status == 1 || data.status == 2 || data.status == 4) && data.assign_to_role_name == roleName){
          assignedToMe.push(data);
        }
      if(data.is_active == 1 && (data.status == 1 || data.status == 2 || data.status == 4) && data.task_created_by == userId && data.creator_role == roleName){
          assignedByMe.push(data);
        }
      if(data.is_active == 1 && data.status == 3 && data.task_created_by == userId && data.creator_role == roleName ){
          rescheduleRequestToMe.push(data);
        }
      if(data.is_active == 1 && data.status == 3 &&  ( data.assign_to == userId && data.assign_to_role_name == roleName)){
          rescheduleRequestByMe.push(data);
        }
      if(data.status == 6 && data.is_active == 0 && ((data.task_created_by == userId && data.creator_role == roleName) || ( data.assign_to == userId && data.assign_to_role_name == roleName)) ){
          completed.push(data);
        }
    });
      setAssignedToMeTab(assignedToMe);
      setAssignedByMeTab(assignedByMe);
      setRescheduleRequestToMeTab(rescheduleRequestToMe);
      setRescheduleRequestByMeTab(rescheduleRequestByMe);
      setAllTab(all);
      setCompletedTab(completed);    
      setCompletionRequestToMeTab(completionRequestToMeTab);
      setCompletionRequestByMeTab(completionRequestByMeTab);
      setCancelledTab(cancelledTab);
      setOnHoldTab(onHoldTab);       
  }
  
    return (
      <div>        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Fab variant="extended" size="small" aria-label="Add" className={classes.fonttransform} onClick={handleClickOpen} >
              <AddIcon className={classes.extendedIcon} />  Task
            </Fab>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Paper style={{ width: '100%' }}>
              <AppBar position="static"  className={classes.appBar}>
                <Tabs 
                  value={value} 
                  onChange={handleTabChange} 
                  className={classes.textsize} 
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab label={<BadgeComp count={assignedToMeTab.length} label="Assigned to Me" />} /> 
                  <Tab label={<BadgeComp count={assignedByMeTab.length} label="Assigned by Me" />} /> 
                  <Tab label={<BadgeComp count={rescheduleRequestToMeTab.length} label="Reschedule Request (to Me)" />} /> 
                  <Tab label={<BadgeComp count={rescheduleRequestByMeTab.length} label="Reschedule Request (by Me)" />} />                   
                  <Tab label={<BadgeComp count={completedTab.length} label="Completed" />} />
                  <Tab label={<BadgeComp count={allTab.length} label="All" />} />                   
                </Tabs>
              </AppBar>

              <TabPanel value={value} index={0}>
                {assignedToMeTab && <AssignedToME task= {assignedToMeTab} handleClickStaffEditOpen={handleClickStaffEditOpen} dateToday={dateToday}  handleHistoryOpen={handleHistoryOpen}/>}
              </TabPanel>

              <TabPanel value={value} index={1}>
                {assignedByMeTab && <AssignedByMe task= {assignedByMeTab} handleClickEditOpen={handleClickEditOpen}  handleHistoryOpen={handleHistoryOpen} />}
              </TabPanel>
              
              <TabPanel value={value} index={2}>
                {rescheduleRequestToMeTab && <RescheduleRequestTo task= {rescheduleRequestToMeTab} handleRescheduledOpen={handleRescheduledOpen} handleHistoryOpen={handleHistoryOpen} />}
              </TabPanel>
              
              <TabPanel value={value} index={3}>
                {rescheduleRequestByMeTab && <RescheduleRequestBy task= {rescheduleRequestByMeTab} handleClickEditOpen={handleClickEditOpen} handleHistoryOpen={handleHistoryOpen} />}
              </TabPanel>
              
              {/* <TabPanel value={value} index={4}>
                {completionRequestToMeTab && <RescheduleRequestBy task= {completionRequestToMeTab} handleClickEditOpen={handleClickEditOpen} />}
              </TabPanel>
              
              <TabPanel value={value} index={5}>
                {completionRequestByMeTab && <RescheduleRequestBy task= {completionRequestByMeTab} handleClickEditOpen={handleClickEditOpen} />}
              </TabPanel> */}

              {/* <TabPanel value={value} index={6}>
                {cancelledTab && <RescheduleRequestBy task= {cancelledTab} handleClickEditOpen={handleClickEditOpen} />}
              </TabPanel>

              <TabPanel value={value} index={7}>
                {onHoldTab && <RescheduleRequestBy task= {onHoldTab} handleClickEditOpen={handleClickEditOpen} />}
              </TabPanel> */}
              
              <TabPanel value={value} index={4}>
                {completedTab && <Completed task= {completedTab} handleClickDelete={handleClickDelete} handleHistoryOpen={handleHistoryOpen} />}     
              </TabPanel>

              <TabPanel value={value} index={5}>
                {allTab && <All task= {allTab} dateToday={dateToday}  handleHistoryOpen={handleHistoryOpen}/>}              
              </TabPanel>
              
            </Paper>
          </Grid>
        </Grid>

        {open? <Add open={open} handleClose={handleClose} handleSnackbarClick={handleSnackbarClick} setTaskList={setTaskListFn} roleName={roleName}/>:null}
        {editOpen ? <Edit open={editOpen} handleEditClose={handleEditClose} handleSnackbarClick={handleSnackbarClick} inputs={taskData} setTaskList={setTaskListFn} roleName={roleName} /> : null}
        {rescheduleEditOpen ? <Rescheduled open={rescheduleEditOpen} handleRescheduledClose={handleRescheduledClose} handleSnackbarClick={handleSnackbarClick} inputs={taskData} setTaskList={setTaskListFn} roleName={roleName} /> : null}        
        {staffEditOpen ? <StaffEdit open={staffEditOpen} handleStaffEditClose={handleStaffEditClose} handleSnackbarClick={handleSnackbarClick} inputs={taskData} setTaskList={setTaskListFn}  /> : null}        
        {taskHistoryOpen ? <TaskHistory open={taskHistoryOpen} handleClose={handleHistoryClose} handleSnackbarClick={handleSnackbarClick} historyData={historyData} roleName={roleName} /> : null }
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
         <MySnackbarContentWrapper  onClose={handleSnackbarClose} variant="success" message="Task updated successfully!" />
        </Snackbar>
    </div>
  );
}
