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



export default function DeliveryOrderReport({data }) {
  const styleClass = useCommonStyles();
  let total = 0;
return (  
  <Table >
    <TableHead>
      <TableRow>
        <StyledTableCell>#</StyledTableCell>
        <StyledTableCell>Order No</StyledTableCell>
        <StyledTableCell>Customer Name</StyledTableCell>
        <StyledTableCell>Contact</StyledTableCell>     
        <StyledTableCell>Delivery Date</StyledTableCell>     
        <StyledTableCell>Delivery Time</StyledTableCell>        
      </TableRow>
    </TableHead>
    <TableBody>
    {(data.length > 0 ? data : []).map((data, index) => {  
      total = total + data.payment_amt;          
      return(
        <TableRow>
          <StyledTableCell>{index + 1}</StyledTableCell>
          <StyledTableCell>{data.order_id}</StyledTableCell>
          <StyledTableCell>{data.first_name + ' ' + data.last_name}</StyledTableCell>
          <StyledTableCell>{data.mobile}</StyledTableCell>
          <StyledTableCell>{getDateInDDMMYYYY(data.delivery_date)}</StyledTableCell>
          <StyledTableCell>{data.delivery_time}</StyledTableCell>
        </TableRow>
        )
      })
    }
      {/* <TableRow >
          <StyledTableCell style={{'fontWeight':'bold', 'fontSize':'15px'}} colSpan="3" align="right">{"Total   "}</StyledTableCell>
          <StyledTableCell style={{'fontWeight':'bold', 'fontSize':'15px'}}>{total}</StyledTableCell>
      </TableRow>                               */}
    </TableBody>
  </Table>
  )
}