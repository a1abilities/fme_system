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

import { API_URL } from '../../../../api/Constants';
import {useCommonStyles} from '../../../common/StyleComman';
import PropTypes from 'prop-types';


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



export default function ViewTaskActivity({activityList}) {
  const classes = useStyles();
  return (  
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <StyledTableCell>#</StyledTableCell>
          <StyledTableCell>Activity</StyledTableCell>
          <StyledTableCell>Date</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>        
      {(activityList.length > 0 ? activityList : []).map((data, index)=>{
          return(          
            <TableRow>
              <StyledTableCell> {index+1}  </StyledTableCell>
              <StyledTableCell> {data.task_status_name}</StyledTableCell>
              <StyledTableCell> {data.close_date}</StyledTableCell>  
            </TableRow>                   
          )
        })
      }
      </TableBody>
    </Table>
    // <List className={classes.root}>
    // {(msgList.length > 0 && msgList != "" ? msgList : []).map((data, index) => {
    //   return(
    //     <div>
    //       <ListItem alignItems="flex-start">
    //         {/* <ListItemAvatar>
    //           <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
    //         </ListItemAvatar> */}
    //         <ListItemIcon>
    //           <PlayArrowIcon />
    //         </ListItemIcon>
    //         <ListItemText
    //           primary={
    //             <React.Fragment>
    //               <Typography
    //                 className={classes.msg}
    //                 color="textPrimary"
    //               >
    //                 {data.message}
    //               </Typography>                 
    //             </React.Fragment>
    //           }
    //           secondary={
    //             <React.Fragment>
    //               <Typography
    //                 component="span"
    //                 variant="body2"
    //                 className={classes.inline}
    //                 color="textPrimary"
    //               >
    //                 {data.user_name + " (" + data.user_role + ")" }
    //                 {" — during convert into \"" + data.status_name + "\"" + " on " + data.created_at }
    //               </Typography>
    //               {/* <Typography
    //                 component="span"
    //                 variant="body2"
    //                 className={classes.inline}
    //                 color="textPrimary"
    //               >
    //                 { " —  " + data.created_at}
    //               </Typography> */}
                  
    //             </React.Fragment>
    //           }
    //         />
    //       </ListItem>     
    //     <Divider variant="inset" component="li" />  
    //   </div>           
    //   )
    // })}
    // </List>

  )
}