import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send.js';
import TableFooter from '@material-ui/core/TableFooter';

// Components
import {PaginationBar} from '../../../common/PaginationBar.js';
import {StyledTableCell} from '../../../common/TableStyles.js';
import {getDateInDDMMYYYY} from '../../../../utils/datetime';


export default function Archived({order, count, roleName, handleEditOpen, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) {
    

return (  
  <Table stickyHeader>
    <TableHead>
      <TableRow>
        <StyledTableCell>#</StyledTableCell>
        <StyledTableCell>Order No.</StyledTableCell>
        <StyledTableCell>Customer Name</StyledTableCell>
        <StyledTableCell>Contact</StyledTableCell>
        <StyledTableCell>Order Date</StyledTableCell>
        <StyledTableCell>Rental Type</StyledTableCell>
        <StyledTableCell>Payment Mode</StyledTableCell>
        <StyledTableCell>Action</StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    {(order.length > 0 ? order : []).map((data, index) => {      
      return(
        <TableRow key={Math.random()}>
          <StyledTableCell>{index + 1}</StyledTableCell>
          <StyledTableCell>{data.order_id}</StyledTableCell>
          <StyledTableCell>{data.first_name + ' ' + data.last_name}</StyledTableCell>
          <StyledTableCell>{data.mobile}</StyledTableCell>
          <StyledTableCell>{getDateInDDMMYYYY(data.order_date)}</StyledTableCell>
          <StyledTableCell>{data.order_type==1 ? 'Fix' : 'Flex'}</StyledTableCell>
          <StyledTableCell>{data.payment_mode_name} </StyledTableCell>     
          <StyledTableCell>
            <Tooltip title="Click to Regenerate Order">
              <IconButton  size="small" value={data.id} name={data.id} onClick={(event) => { handleEditOpen(data); }}>
                <SendIcon />
              </IconButton>
            </Tooltip>     
          </StyledTableCell>
      </TableRow>
      )      
    })
  }                              
    </TableBody>
    
    <TableFooter>
        <TableRow>
          <PaginationBar colSpan={9} count={count} rowsPerPage={rowsPerPage} page={page} handleChangePage = {handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />          
        </TableRow>
      </TableFooter>
  </Table>
  )
}