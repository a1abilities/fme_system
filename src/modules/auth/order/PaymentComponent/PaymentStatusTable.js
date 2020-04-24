import React, { useState, useEffect } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import PrintIcon from '@material-ui/icons/Print';
import InputAdornment from '@material-ui/core/InputAdornment';
import PaymentIcon from '@material-ui/icons/Payment';
import CloudUpload from '@material-ui/icons/CloudUpload';
import SendIcon from '@material-ui/icons/Send.js';
import ViewIcon from '@material-ui/icons/RemoveRedEye';
import CancelIcon from '@material-ui/icons/Cancel';
import CommentIcon from '@material-ui/icons/Comment';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import 'date-fns';

import {useCommonStyles} from '../../../common/StyleComman';
import {getDateInDDMMYYYY} from '../../../../utils/datetime';

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
  expansionHeader: {
    fontSize: 13,
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


export default function PaymentStatusTable({paymentSchedule, installmentBeforeDelivery}) {
  const styleClass = useCommonStyles();
  const classes = useStyles();
  
return (  
  <Table>
    <TableHead>
      <TableRow>
        <StyledTableCell>Installment No.</StyledTableCell>
        <StyledTableCell>Payment Date</StyledTableCell>
        <StyledTableCell>Settlement Date</StyledTableCell>
        <StyledTableCell>Payment Amt.</StyledTableCell>
        <StyledTableCell>Total Received</StyledTableCell>
        <StyledTableCell>Status</StyledTableCell>        
        <StyledTableCell>Remark</StyledTableCell>        
        {/* <StyledTableCell>Accept By</StyledTableCell> */}
      </TableRow>
    </TableHead>
    <TableBody >
      { (paymentSchedule !== null && paymentSchedule !== undefined && paymentSchedule) && 
        (paymentSchedule.length > 0 ? paymentSchedule :[]).map((data, index) => {
          return(
            <TableRow  className={data.installment_no === installmentBeforeDelivery ? styleClass.highlightRow : null}> 
              <StyledTableCell>{data.installment_no}</StyledTableCell>
              <StyledTableCell>{getDateInDDMMYYYY(data.payment_date)  === 'Invalid date' ? '' : getDateInDDMMYYYY(data.payment_date)}</StyledTableCell>
              <StyledTableCell>{getDateInDDMMYYYY(data.settlement_date) === 'Invalid date' ? '' : getDateInDDMMYYYY(data.settlement_date)}</StyledTableCell>
              <StyledTableCell>{'$' + Number(data.payment_amt).toFixed(2)}</StyledTableCell>
              <StyledTableCell>{'$' + Number(data.total_paid).toFixed(2)}</StyledTableCell>
              <StyledTableCell>{data.pay_status_name}</StyledTableCell>
              <StyledTableCell>{data.remark}</StyledTableCell>
              {/* <StyledTableCell>{data.accept_by}</StyledTableCell> */}
            </TableRow>
          )
        })
      }   
    </TableBody>
  </Table>
  )
}