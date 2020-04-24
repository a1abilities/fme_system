import React, { useState, useEffect } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
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

import {getDateInDDMMYYYY} from '../../../../utils/datetime';
import {TablePaginationActions} from '../../../common/Pagination';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: theme.typography.pxToRem(11),
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
  tableWrapper: {
    maxHeight: 440,
    overflow: 'auto',
  },
  drpdwn:{
    marginTop: theme.spacing(1),
  },
  buttonMargin: {
    margin: theme.spacing(1),
  },
}));


export default function PaymentStatusTable({paymentList, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage}) {
  const classes = useStyles();
  
  const paymentStatusList = [
    {name : 'S', value : 'Successful'},
    {name : 'P', value : 'Pending'},
    {name : 'D', value : 'Dishonoured'},
    {name : 'F', value : 'Fatal Dishonour'},
    {name : 'W', value : 'Waiting'},
  ];  

return (  
    <Table stickyHeader>
      <TableHead style = {{}}>
        <TableRow>
          <StyledTableCell>#</StyledTableCell>
          <StyledTableCell>Customer Name</StyledTableCell>
          <StyledTableCell>Payment Method</StyledTableCell>
          <StyledTableCell>Payment Status</StyledTableCell>
          <StyledTableCell>Bank Failed Reason</StyledTableCell>
          <StyledTableCell>Payment Amount</StyledTableCell>
          <StyledTableCell>Transaction Fee(Client)</StyledTableCell>
          <StyledTableCell>Transaction Fee(Customer)</StyledTableCell>
          <StyledTableCell>Debit Date</StyledTableCell>
          <StyledTableCell>Settlement Date</StyledTableCell>
          {/* <StyledTableCell>Payment Amount.</StyledTableCell>
          <StyledTableCell>Ezidebit Customer Id</StyledTableCell>
            
          <StyledTableCell>Client Contract Ref</StyledTableCell>        
          <StyledTableCell>Payment Source</StyledTableCell> */}
        </TableRow>
      </TableHead>
      <TableBody >
        {paymentList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => {
          return (
            <TableRow> 
              <StyledTableCell>{index + 1}</StyledTableCell>
              <StyledTableCell>{data.customerName}</StyledTableCell>
              <StyledTableCell>{data.paymentMethod==='CR' ? 'Credit Card' : data.paymentMethod==='DR' ? 'Bank Account' : '' }</StyledTableCell>
              <StyledTableCell>
                {
                  paymentStatusList.map(status => {
                    return(
                      status.name === data.paymentStatus ? status.value : ''
                    )
                  })
                }
              </StyledTableCell>
              <StyledTableCell>{data.bankFailedReason}</StyledTableCell>
              <StyledTableCell>{data.paymentAmount}</StyledTableCell>
              <StyledTableCell>{data.transactionFeeClient}</StyledTableCell>
              <StyledTableCell>{data.transactionFeeCustomer}</StyledTableCell>
              <StyledTableCell>{getDateInDDMMYYYY(data.debitDate)  === 'Invalid date' ? '' : getDateInDDMMYYYY(data.debitDate)}</StyledTableCell>
              <StyledTableCell>{getDateInDDMMYYYY(data.settlementDate) === 'Invalid date' ? '' : getDateInDDMMYYYY(data.settlementDate)}</StyledTableCell>
            </TableRow>           
          )
        })}           
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[20,50,100]}
            colSpan={8}
            count={paymentList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: { 'aria-label': 'rows per page' },
              native: true,
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />  
        </TableRow>
      </TableFooter>
    </Table>
  )
}