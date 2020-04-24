import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import TableFooter from '@material-ui/core/TableFooter';

// Components
import {PaginationBar} from '../../../common/PaginationBar.js';
import {StyledTableCell} from '../../../common/TableStyles.js';
import {useCommonStyles} from '../../../common/StyleComman';
import {getDateInDDMMYYYY} from '../../../../utils/datetime';



export default function Delivered({order, count, roleName, handleViewDeliveredDetailOpen, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage}) {
  const styleClass = useCommonStyles();

return (  
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <StyledTableCell>#</StyledTableCell>
          <StyledTableCell>Order No.</StyledTableCell>
          <StyledTableCell>Customer Name</StyledTableCell>
          <StyledTableCell>Contact</StyledTableCell>
          <StyledTableCell>Order Date</StyledTableCell>
          {/* <StyledTableCell>Order Status</StyledTableCell> */}
          <StyledTableCell>Delivered Date</StyledTableCell>
          <StyledTableCell>Delivered Time</StyledTableCell>
          {/* <StyledTableCell>Assigned To</StyledTableCell> */}
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
            <StyledTableCell>{getDateInDDMMYYYY(data.delivered_date)}</StyledTableCell>
            <StyledTableCell>{data.delivered_time}</StyledTableCell>
            {/* <StyledTableCell>{'In Progress'}</StyledTableCell> */}
            <StyledTableCell>{data.order_type==1 ? 'Fix' : 'Flex'}</StyledTableCell>
            <StyledTableCell>{data.payment_mode_name} </StyledTableCell>     
            <StyledTableCell>
              <Tooltip title="View Delivered Product Detail">
                <IconButton  size="small" className={styleClass.fab}  value={data.id} name={data.id} onClick={(event) => { handleViewDeliveredDetailOpen(data); }} >
                  <DoneIcon />
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
          <PaginationBar colSpan={10} count={count} rowsPerPage={rowsPerPage} page={page} handleChangePage = {handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
        </TableRow>
      </TableFooter>
  </Table>
  )
}