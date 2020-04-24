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
import CommentIcon from '@material-ui/icons/Comment';
import DoneIcon from '@material-ui/icons/Done';
import { API_URL } from '../../../../api/Constants';
import {useCommonStyles} from '../../../common/StyleComman';
import PropTypes from 'prop-types';

import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';

import {TablePaginationActions} from '../../../common/Pagination';


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



export default function Active({productList, roleName, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage}) { 
  const styleClass = useCommonStyles();
  
return (  
  <Table stickyHeader>
    <TableHead>
      <TableRow>
        <StyledTableCell>#</StyledTableCell>
        <StyledTableCell>Product Name</StyledTableCell>
        <StyledTableCell>Color</StyledTableCell>
        <StyledTableCell>Brand</StyledTableCell>
        <StyledTableCell>Invoice Number</StyledTableCell>
        <StyledTableCell>Rental Price</StyledTableCell>
        <StyledTableCell>Status</StyledTableCell>
        {/* <StyledTableCell>Options</StyledTableCell> */}
      </TableRow>
    </TableHead>
    <TableBody>
      {productList != undefined && (productList.length > 0 ? productList : []).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index)=>{
        return(
          <TableRow key={data.id} >
            <StyledTableCell component="th" scope="row"> {data.id} </StyledTableCell>
            <StyledTableCell>{data.description}</StyledTableCell>
            <StyledTableCell>{data.colorName}</StyledTableCell>
            <StyledTableCell>{data.brandName}</StyledTableCell>
            <StyledTableCell>{data.invoice}</StyledTableCell>
            <StyledTableCell>{data.rental}</StyledTableCell>
            <StyledTableCell>{data.statusName}</StyledTableCell>
            {/* <StyledTableCell>
              <Tooltip title="Edit">
                <IconButton  size="small" value={data.id} name={data.id}  onClick={(event) => { handleClickEditOpen(data); }}>
                    <EditIcon />  
                </IconButton>
              </Tooltip>
            </StyledTableCell> */}
          </TableRow>  
          )
        })
      }
    </TableBody>      
    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[20, 50, 100]}
          colSpan={10}
          count={productList.length}
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