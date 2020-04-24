import React from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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
import DateRangeIcon from '@material-ui/icons/DateRange';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import TablePagination from '@material-ui/core/TablePagination';
import CreateIcon from '@material-ui/icons/Create';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import UpdateIcon from '@material-ui/icons/Update';
import AccountBalanceIcon from '@material-ui/icons/AccountBalanceWallet';
import TableFooter from '@material-ui/core/TableFooter';
import DetailsIcon from '@material-ui/icons/Details';

import {useCommonStyles} from '../../../common/StyleComman';
import Popover from '@material-ui/core/Popover';
import PropTypes from 'prop-types';

import {TablePaginationActions} from '../../../common/Pagination';
import { APP_TOKEN } from '../../../../api/Constants';


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
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  },
  labelTitle: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(20),
    color: theme.palette.text.secondary,        
  },
}));

export default function HomeTable({membersList, roleList,  
  handleBookAppointment, handleViewAppointment, handleUpdateTimeSlot, 
  page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) {
  
  const userId = Number(APP_TOKEN.get().userId);
  const classes = useStyles();    

  const handleUserRoles = (data) => {
    let roles = '';

    ((data.role_id && data.role_id.split(',')) || []).map((a, index) =>{      
      (roleList != undefined && roleList != null && roleList.length > 0 ? roleList : []).map((ele)=>{
        if(data.role_id.split(',').length-1 === index && data.role_id.split(',')[index] == ele.id){
          roles = roles + ele.name
        }else if(data.role_id.split(',')[index] == ele.id){
          roles = roles + ele.name + ", "
        }
      })
    })
    return roles;
  }
  
    return (  
    <Grid container spacing={2} alignItems = "center">
      <Grid item xs={12} sm={12}>
        <Typography variant="h6" className={classes.labelTitle}> Franchise Members </Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Table stickyHeader >
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Designation</StyledTableCell>
              <StyledTableCell>Contact</StyledTableCell>
              <StyledTableCell>Email Id</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>        
              {membersList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data,index) => {
                return(
                  <TableRow key={Math.random()}>
                      <StyledTableCell>{index + 1}</StyledTableCell>
                      <StyledTableCell>{data.name}</StyledTableCell>
                      <StyledTableCell> 
                        {handleUserRoles(data)}
                      </StyledTableCell>
                      <StyledTableCell> {data.contact}</StyledTableCell>
                      <StyledTableCell> {data.email}</StyledTableCell>                  
                      <StyledTableCell>
                        <Tooltip title="Book Appointment">
                          <span>
                            <IconButton  size="small" onClick={(event) => { handleBookAppointment(data); }} >
                              <ContactPhoneIcon />  
                            </IconButton>
                          </span>
                        </Tooltip>

                        <Tooltip title="View Appointment">
                          <span>
                            <IconButton  size="small" onClick={(event) => { handleViewAppointment(data); }} disabled = {userId !== data.id} >
                              <DateRangeIcon /> 
                            </IconButton>
                          </span>
                        </Tooltip>

                        <Tooltip title="Update Timeslot">
                          <span>
                            <IconButton  size="small" onClick={(event) => { handleUpdateTimeSlot(data); }} disabled = {userId !== data.id} >
                              <EditIcon />
                            </IconButton>
                          </span>
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
                rowsPerPageOptions={[10, 25, 50]}
                colSpan={6}
                count={membersList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>    
      </Grid>
    </Grid>
  )
}