import React from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import FolderIcon from '@material-ui/icons/Folder';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';


import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import PrintIcon from '@material-ui/icons/Print';
import PaymentIcon from '@material-ui/icons/Payment';
import CloudUpload from '@material-ui/icons/CloudUpload';
import SendIcon from '@material-ui/icons/Send.js';
import ViewIcon from '@material-ui/icons/RemoveRedEye';
import CommentIcon from '@material-ui/icons/Comment';
import ArchiveIcon from '@material-ui/icons/Archive';

import { API_URL, APP_TOKEN } from '../../../../api/Constants';
import {useCommonStyles} from '../../../common/StyleComman';
import {getDateInDDMMYYYY} from '../../../../utils/datetime.js';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
    fontSize: theme.typography.pxToRem(11),
  },
  msg: {
    display: 'inline',
    fontSize: theme.typography.pxToRem(13),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    // width: 1000
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
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



export default function ViewHistoryList({historyList, roleName}) {
  const classes = useStyles();
  const userId = APP_TOKEN.get().userId;

  return (  
    <List className={classes.root}>
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
                    {data.activity_status == 1 ? 
                      'Task created by ' + data.task_created_by_name + " (" + data.creator_role + ")" +
                      ' for ' + data.assign_to_name +  " (" + data.assign_to_role_name + ")" +
                      ' on ' + data.activity_created_at + ' with due date ' + getDateInDDMMYYYY(data.due_date)
                    :''}
                    {data.activity_status == 2 ?
                      'Task Description Changed by ' +  data.task_created_by_name + " (" + data.creator_role + ")" +
                      ' on ' + data.activity_created_at 
                    :''}
                    {data.activity_status == 3 ?
                    'Task has been started by ' + data.assign_to_name +  " (" + data.assign_to_role_name + ")" +
                    ' on ' + data.activity_created_at
                    :''}
                    {data.activity_status == 4  && data.status == 1 ?
                    'Task assigned to ' + data.assign_to_name +  " (" + data.assign_to_role_name + ")" +
                    ' on ' + data.activity_created_at +
                    ' with due date ' + getDateInDDMMYYYY(data.due_date)
                    :''}
                    {data.activity_status == 4  && data.status == 5 ?
                    'Task assigned to other person' +
                    ' on ' + data.activity_created_at 
                    :''}
                    {data.activity_status == 5 ?
                    'Due date changed by ' +  data.task_created_by_name + " (" + data.creator_role + ")" +
                    ' on ' + data.activity_created_at
                    :''}
                    {data.activity_status == 6 ?
                    'New message or document added by ' 
                    :''}
                    {data.activity_status == 6 ?
                      data.task_created_by == data.activity_created_by ?
                      data.task_created_by_name + " (" + data.creator_role + ")" +
                      ' on ' + data.activity_created_at
                      : 
                      data.assign_to_name +  " (" + data.assign_to_role_name + ")" +
                      ' on ' + data.activity_created_at
                    :''}
                     
                    {data.activity_status == 7 ?
                    'Request to Reschedule by ' + data.assign_to_name +  " (" + data.assign_to_role_name + ")" +
                    ' on ' + data.activity_created_at
                    :''}
                    {data.activity_status == 8 ?
                    'Task rescheduled by ' +  data.task_created_by_name + " (" + data.creator_role + ")" +
                    ' on ' + data.activity_created_at
                    :''}
                    {data.activity_status == 9 ?
                    'Task completed successfully by ' + data.assign_to_name +  " (" + data.assign_to_role_name + ")" +
                    ' on ' + data.activity_created_at
                    :''}
                  </Typography>                 
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    component="header"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                   {data.message_id != 0 ? 
                      'Message:  ' + data.message + '   \n'
                    :''}
                  </Typography>
                  <Typography
                    component="footer"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {data.document_id != 0 ? 
                    <a href={API_URL + "/api/download?path=taskFile/" + data.document } download >{data.document}</a>                          
                      // 'Document :' + data.document 
                    :''}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>     
          {/* } */}
        <Divider variant="inset" component="li" />  
      </div>           
      )
    })}
    </List>
  )
}