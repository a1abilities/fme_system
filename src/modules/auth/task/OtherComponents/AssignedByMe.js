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
import HistoryIcon from '@material-ui/icons/History';
import { API_URL } from '../../../../api/Constants';
import {useCommonStyles} from '../../../common/StyleComman';
import PropTypes from 'prop-types';
import {getDateInDDMMYYYY} from '../../../../utils/datetime.js';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
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



export default function AssignedByMe({task, handleClickEditOpen, handleHistoryOpen }) {
  const classes = useStyles();
return (  
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <StyledTableCell>#</StyledTableCell>
          <StyledTableCell>Task ID</StyledTableCell>
          <StyledTableCell>Task Description</StyledTableCell>
          {/* <StyledTableCell>Assign Role</StyledTableCell> */}
          <StyledTableCell>Assigned To</StyledTableCell>
          <StyledTableCell>Status</StyledTableCell>
          <StyledTableCell>Due Date</StyledTableCell>
          <StyledTableCell>Start Date</StyledTableCell>
          {/* <StyledTableCell>Completed Date</StyledTableCell> */}
          {/* <StyledTableCell>Document</StyledTableCell> */}
          <StyledTableCell>Options</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      { (task.length > 0 ? task : []).map((data, index)=>{
          return(
            <TableRow>
              <StyledTableCell> {index+1}  </StyledTableCell>
              <StyledTableCell> {data.task_id}  </StyledTableCell>
              <StyledTableCell> {data.task_description}  </StyledTableCell>
              {/* <StyledTableCell> {data.assign_role_name}</StyledTableCell> */}
              <StyledTableCell> {data.assign_to_name + " (" + data.assign_to_role_name + ")"}</StyledTableCell>
              {/* <StyledTableCell> {data.status === 3 ? <p className = {classes.bgtaskoverdue}> Requesting for Rescheduling </p> : data.task_status_name}</StyledTableCell> */}
              <StyledTableCell> {data.task_status_name}</StyledTableCell>
              <StyledTableCell> {getDateInDDMMYYYY(data.due_date)}</StyledTableCell>
              <StyledTableCell> {data.start_date != undefined && data.start_date != null ? getDateInDDMMYYYY(data.start_date) : ''}</StyledTableCell>
              {/* <StyledTableCell> {data.completed_date}</StyledTableCell> */}
              {/* <StyledTableCell>
                <a href={"server\\files\\taskFile\\" + data.document }  download >{data.document}</a>                          
              </StyledTableCell> */}
              <StyledTableCell>
                <Tooltip title="View History">                              
                  <IconButton  size="small" className={classes.fab} value={data.id} name={data.id} component="span"  onClick={(event) => { handleHistoryOpen(data); }}>
                    <HistoryIcon />
                  </IconButton>
                </Tooltip>     
                { data.status !==3 ? 
                  <Tooltip title="Update Task"> 
                      <IconButton  size="small" className={classes.fab} value={data.id} name={data.id} component="span"  onClick={(event) => { handleClickEditOpen(data); }}>
                        <CreateIcon/>
                      </IconButton>
                  </Tooltip>  : ''
                }                      
              </StyledTableCell>
            </TableRow>
          )
        })
      }
      </TableBody>
    </Table>
  )
}