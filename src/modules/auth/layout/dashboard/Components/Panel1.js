import React, { useState, useEffect } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography  from '@material-ui/core/Typography';
import Grid  from '@material-ui/core/Grid';
import Paper  from '@material-ui/core/Paper';
import Divider  from '@material-ui/core/Divider';

 

// Component Call
import TaskList from './SubComponents/TaskList';
import LeadList from './SubComponents/LeadList';

//API Calls
import TaskAPI from '../../../../../api/Task';
import LeadAPI from '../../../../../api/Lead';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },

  labelTitle: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(16),
  },  
}));

export default function Panel1({roleName, roleId, handleLeadClick,  handleTaskClick}) {
  const classes = useStyles();

  const [taskList, setTaskList] = React.useState([]);
  const [leadList, setLeadList] = React.useState([]);

  const fetchRequiredData = async () => {
    try{
      if(roleName!='Super Admin' && roleId !=0){
        const result = await TaskAPI.fetchAssignedTask({
          assign_to_role : roleId,
        });   
        setTaskList(result);
      }
      
      const resultLead = await LeadAPI.fetchLeads();
      setLeadList(resultLead.leadList);
    }catch(e){
      console.log("Error...", e);
    }
  }

  useEffect(() => {
    fetchRequiredData();
  },[]);
  


  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={4} >
          <Grid item xs={12} sm={12} >
            <Typography variant="h6" className={classes.labelTitle} color="primary"> Latest Lead </Typography>
            <Divider />
          </Grid>
          
          <Grid item xs={12} sm={12}>   
            <LeadList leadList={leadList} roleName={ roleName} handleLeadClick={handleLeadClick}/>
          </Grid>
        </Grid>
      </Paper>
      
    { (roleName != 'Super Admin' && roleId != 0) && 
      <Paper className={classes.paper}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h6" className={classes.labelTitle} color="primary"> Latest Task </Typography>
            <Divider />
          </Grid>
          
          <Grid item xs={12} sm={12}>   
            <TaskList taskList={taskList} roleName={roleName} handleTaskClick={handleTaskClick} />   
          </Grid>
        </Grid>
      </Paper>
    }
    </div>
  );
}
