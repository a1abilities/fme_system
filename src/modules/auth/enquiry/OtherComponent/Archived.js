import React from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import CachedIcon from '@material-ui/icons/Cached';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import PrintIcon from '@material-ui/icons/Print';
import PaymentIcon from '@material-ui/icons/Payment';
import CloudUpload from '@material-ui/icons/CloudUpload';
import SendIcon from '@material-ui/icons/Send.js';
import ViewIcon from '@material-ui/icons/RemoveRedEye';
import CommentIcon from '@material-ui/icons/Comment';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import {TablePaginationActions} from '../../../common/Pagination';

import { API_URL } from '../../../../api/Constants';
import {useCommonStyles} from '../../../common/StyleComman';
import PropTypes from 'prop-types';




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
  button:{
    color:"white",
    fontSize: theme.typography.pxToRem(10),
    marginRight: theme.spacing(1),
  },
  fonttransform:{
    textTransform:"initial",
    fontSize: theme.typography.pxToRem(13),
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



export default function Open({enquiryList, productList, handleDeleteEnquiry,  roleName,
  page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) {
  
  const styleClass = useCommonStyles();
  const classes = useStyles();

return (  
  <Table className={classes.table}>
  <TableHead>
    <TableRow>
      <StyledTableCell>#</StyledTableCell>
      <StyledTableCell>Enq ID</StyledTableCell>
      <StyledTableCell>Customer Name</StyledTableCell>
      <StyledTableCell>Contact No.</StyledTableCell>
      <StyledTableCell>Product interested in</StyledTableCell>
      <StyledTableCell>Options</StyledTableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {
      (enquiryList.length > 0 ? enquiryList : []).map((data, index) => {
        return(
          <TableRow>
            <StyledTableCell>{index+1}</StyledTableCell>
            <StyledTableCell>{data.enquiry_id}</StyledTableCell>
            <StyledTableCell>{data.customer_name}</StyledTableCell>
            <StyledTableCell>{data.contact}</StyledTableCell>
            <StyledTableCell>
                {
                 ((data.interested_product_id && data.interested_product_id.split(',')) || []).map((a, index) =>{
                  return(
                    productList.map((ele)=>{
                      return(
                        (data.interested_product_id.split(',').length-1)===index ?
                        data.interested_product_id.split(',')[index] == ele.id ? ele.name :''
                        :
                        data.interested_product_id.split(',')[index] == ele.id ? ele.name + ", " :''
                      )
                    }) 
                  ) 
                  })
                }                                  
            </StyledTableCell>   
            <StyledTableCell>   
              <Tooltip title="View Comment">
                <IconButton  size="small" className={classes.fab}  value={data.id} name={data.id} onClick={(event) => { handleDeleteEnquiry(data, false) }} >
                  <CommentIcon />
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
      <TablePagination
        rowsPerPageOptions={[20, 50, 100]}
        colSpan={9}
        count={enquiryList.length}
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