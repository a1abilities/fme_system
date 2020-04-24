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
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import TablePagination from '@material-ui/core/TablePagination';
import CreateIcon from '@material-ui/icons/Create';
import DetailsIcon from '@material-ui/icons/Details';
import UpdateIcon from '@material-ui/icons/Update';
import AccountBalanceIcon from '@material-ui/icons/AccountBalanceWallet';
import TableFooter from '@material-ui/core/TableFooter';

// Components
import {getDate, setTime, getDateInDDMMYYYY, getCurrentDate, getTimeinDBFormat, getTime, get12HourTime } from '../../../../utils/datetime';
import {useCommonStyles} from '../../../common/StyleComman';
import {TablePaginationActions} from '../../../common/Pagination';


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

export default function ClientTable({ClientList, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) { 
  const styleClass = useCommonStyles();
  const classes = useStyles();
   

return (  
    <Table stickyHeader  className={classes.table}>
      <TableHead>
        <TableRow>
          <StyledTableCell>#</StyledTableCell>
          <StyledTableCell>Client Name</StyledTableCell>
          <StyledTableCell>Contact</StyledTableCell>
          <StyledTableCell>Reference</StyledTableCell>          
          <StyledTableCell>Meeting Time</StyledTableCell>
          <StyledTableCell>Start At</StyledTableCell>          
        </TableRow>
      </TableHead>
      <TableBody>        
          {ClientList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data,index) => {          
            return(
              <TableRow key={Math.random()}>
                  <StyledTableCell> {index + 1}</StyledTableCell>
                  <StyledTableCell> {data.first_name + ' ' + data.last_name}</StyledTableCell>
                  <StyledTableCell> {data.contact}  </StyledTableCell>
                  <StyledTableCell> {data.reference} </StyledTableCell>
                  <StyledTableCell> {data.meeting_time + ' Minutes'} </StyledTableCell>
                  <StyledTableCell> {get12HourTime(setTime(data.start_time))}  </StyledTableCell>
               </TableRow>
             )
          })
        }
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            colSpan={6}
            count={ClientList.length}
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