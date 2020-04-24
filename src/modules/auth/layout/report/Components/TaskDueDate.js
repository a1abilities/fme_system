import React from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import PrintIcon from '@material-ui/icons/Print';
import PaymentIcon from '@material-ui/icons/Payment';
import CloudUpload from '@material-ui/icons/CloudUpload';
import SendIcon from '@material-ui/icons/Send.js';
import PropTypes from 'prop-types';
import {getDateInDDMMYYYY} from '../../../../../utils/datetime.js';

import {useCommonStyles} from '../../../../common/StyleComman';

const useStyles = makeStyles(theme => ({
  bgtaskpending:{
    backgroundColor:"yellow",
    padding: theme.spacing(1),
  },
  bgtaskoverdue:{
    backgroundColor:"red",
    padding: theme.spacing(1),
  },
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



export default function TaskDueDate({data,dateToday }) {
  const styleClass = useCommonStyles();
  
  const classes = useStyles();
  
  let total = 0;
return (  
  <Table >
    <TableHead>
      <TableRow>
        <StyledTableCell>#</StyledTableCell>
        <StyledTableCell>Task ID</StyledTableCell>
        <StyledTableCell>Task Description</StyledTableCell>
        <StyledTableCell>Assigned By</StyledTableCell>
        <StyledTableCell>Status</StyledTableCell>
        <StyledTableCell>Due Date</StyledTableCell>    
      </TableRow>
    </TableHead>
    <TableBody>
    {(data.length > 0 ? data : []).map((data, index) => {  
      total = total + data.payment_amt;          
      return(
        <TableRow>
          <StyledTableCell>{index + 1}</StyledTableCell>
          <StyledTableCell> {data.task_id}  </StyledTableCell>
          <StyledTableCell> {data.task_description}  </StyledTableCell>
          <StyledTableCell> {data.task_created_by_name + " (" + data.creator_role + ")"}</StyledTableCell>
          <StyledTableCell> {data.task_status_name}</StyledTableCell>
          <StyledTableCell><p className={dateToday> data.due_date?classes.bgtaskoverdue:classes.bgtaskpending}>{getDateInDDMMYYYY(data.due_date)}</p></StyledTableCell>
          
        </TableRow>
        )
      })
    }
                                  
    </TableBody>
  </Table>
  )
}