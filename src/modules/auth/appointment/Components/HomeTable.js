import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import TablePagination from '@material-ui/core/TablePagination';
import Grid from '@material-ui/core/Grid';
import TableFooter from '@material-ui/core/TableFooter';
import {Link} from 'react-router-dom';

// Components
import {TablePaginationActions} from '../../../common/Pagination';
import SelectFilter from './SelectFilter.js';


const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: 'black',
    color: 'white',
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
  root: {
    flexGrow: 1,
  },
  
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
}));

export default function HomeTable({membersList, fdbName, roleList, franchiseList, handleSubmit, inputs, errors, handleInputChange,
  page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) {
  
  const classes = useStyles();   


  const handleUserRoles = (data) => {
    let roles = '';

    ((data.role_id && data.role_id.split(',')) || []).map((a, index) => {      
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
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={4}  direction="row" justify="center" alignItems="center">
          <Grid item xs={12} sm={10}>
            <Typography variant="h6" className={classes.labelTitle}> Franchise Members </Typography>
          </Grid>
          <Grid item xs={12} sm={10}>
            <SelectFilter franchiseList ={franchiseList} roleList={roleList} inputs={inputs} errors={errors} 
            handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
          </Grid>
          <Grid item xs={12} sm={10}>
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
                            {/* <IconButton  size="small" onClick={(event) => { handleBookAppointment(data); }} > */}
                              <Link to= {{pathname:"/bookappointment", state : {data:data, fdbName: fdbName}}}>
                                <ContactPhoneIcon />
                              </Link>
                            {/* </IconButton> */}
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
    </Paper>
  </div> 
  )
}