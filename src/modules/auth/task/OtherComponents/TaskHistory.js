import React, { useState, useEffect } from 'react';
import {component} from 'react-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TextField from '@material-ui/core/TextField';
import TableRow from '@material-ui/core/TableRow';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import {useCommonStyles} from '../../../common/StyleComman';


// API CALL
import Task from '../../../../api/Task';

import ViewMsgList from '../OtherComponents/ViewMsgList';
import ViewHistoryList from '../OtherComponents/ViewHistoryList';

import ViewTaskActivity from '../OtherComponents/ViewTaskActivity';

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
  highlightRow:{
    backgroundColor: "#CBF6BF",
    color: theme.palette.common.white,
  },
  labelTitle: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // flex: 1,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(13),
    marginTop: 15,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  buttonDisabled: {
    color: theme.palette.secondary,
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
  drpdwn:{
    marginTop: theme.spacing(1),
  },
  buttonMargin: {
    margin: theme.spacing(1),
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

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



export default function TaskHistory({ open, handleClose, handleSnackbarClick, historyData, roleName}) {

  const classes = useStyles();
  const styleClass = useCommonStyles();
  const [msgList, setMsgList] =  React.useState([]);
  const [historyList, setHistoryList] =  React.useState([]);

  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
// console.log('historyDate,',historyData)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const msgResult = await Task.getMsgList({id: historyData.id});
        // setMsgList(msgResult);

        const historyResult = await Task.getTaskHistory({
          id: historyData.id, 
          task_id : historyData.task_id,
          assigned_to : historyData.assign_to,
          assign_to_role : historyData.assign_to_role_id,          
          task_created_by : historyData.task_created_by,
          creator_role : historyData.creator_role,
          user_role : roleName,
        });
        console.log('historyResult',historyResult);
        setHistoryList(historyResult);

      } catch (error) {
        console.log('error',error)
      }      
    };
    fetchData();
  }, []);


return (
    <div>
      <Dialog maxWidth open={open} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Task History
            </Typography>
            <IconButton size="small" onClick={handleClose} className={styleClass.closeIcon}> x </IconButton>
          </Toolbar>
        </AppBar>

      <div className={classes.root}>
        <Paper className={classes.paper}>            
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12}>
                {/* <ExpansionPanel className={classes.expansionTitle} expanded={expanded === 'panel1'} onChange={handleChange('panel1')} >
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="" id="panel1a-header">
                    <Typography className={classes.heading}> Task Activities </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <ViewTaskActivity activityList = {historyList} />
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel className={classes.expansionTitle} expanded={expanded === 'panel2'} onChange={handleChange('panel2')} >
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="" id="panel2a-header">
                    <Typography className={classes.heading}>Messages </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <ViewMsgList msgList={ msgList } />
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                
                <ExpansionPanel className={classes.expansionTitle} expanded={expanded === 'panel3'} onChange={handleChange('panel3')} >
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="" id="panel3a-header">
                    <Typography className={classes.heading}>Documents </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                  
                  </ExpansionPanelDetails>
                </ExpansionPanel> */}
              {/* <List className={classes.root}>
                {(historyList.length > 0 && historyList != "" ? historyList : []).map((data, index) => {
                  return(
                    <div>
                    <ListItem alignItems="flex-start">              
                        <ListItemIcon>
                          <PlayArrowIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <React.Fragment>
                              <Typography
                                className={classes.msg}
                                color="textPrimary"
                              >
                                {data.message}
                              </Typography>                 
                            </React.Fragment>
                          }
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                              >
                                {data.user_name + " (" + data.user_role + ")" }
                                {" — during convert into \"" + data.status_name + "\"" + " on " + data.created_at }
                              </Typography>
                              {/* <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                              >
                                { " —  " + data.created_at}
                              </Typography> 
                              
                            </React.Fragment>
                            }
                          />
                        </ListItem>     
                      <Divider variant="inset" component="li" />  
                    </div>           
                    )
                  })}
                  </List> */}
                  <ViewHistoryList historyList={historyList} roleName={roleName} />
              </Grid>
          
            <Grid item xs={12} sm={12}>                      
              <Button variant="contained" color="primary" onClick={handleClose} className={classes.button}>
                Close
              </Button> 
            </Grid>
          </Grid>
        </Paper>
      </div>
      </Dialog>
    </div>
  );
}
