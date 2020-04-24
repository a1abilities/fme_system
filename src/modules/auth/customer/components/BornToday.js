import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import TablePagination from '@material-ui/core/TablePagination';
import CreateIcon from '@material-ui/icons/Create';
import TableFooter from '@material-ui/core/TableFooter';

// Components
import {PaginationBar} from '../../../common/PaginationBar.js';
import {StyledTableCell} from '../../../common/TableStyles.js';



const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
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


export default function BornToday({customerList, count, handleClickEditOpen, handleOpenEditBudget, handleClickCommentOpen, handleHistoryOpen, handleBankDetailOpen, 
  page, rowsPerPage, handleChangePage, handleChangeRowsPerPage}) {
  const classes = useStyles();
  

return (  
    <Table stickyHeader  className={classes.table}>
      <TableHead>
        <TableRow>
          <StyledTableCell>#        </StyledTableCell>
          <StyledTableCell>Name       </StyledTableCell>
          <StyledTableCell>Contact    </StyledTableCell>
          <StyledTableCell>Email ID   </StyledTableCell>
          <StyledTableCell>Address    </StyledTableCell>
          <StyledTableCell>Created By </StyledTableCell>
          <StyledTableCell>Options    </StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>        
        {(customerList.length > 0 ? customerList : []).map((data,index) => {
            return(
              <TableRow key={data.id}>
                  <StyledTableCell>  {data.id}           </StyledTableCell>
                  <StyledTableCell> {data.first_name + ' ' + data.last_name}  </StyledTableCell>
                  <StyledTableCell> {data.mobile === '' || data.mobile === null || data.mobile === undefined ? data.telephone : data.telephone==='' || data.telephone === null || data.telephone === undefined ? data.mobile : data.mobile + ', ' + data.telephone}  </StyledTableCell>
                  <StyledTableCell> {data.email} { data.is_verified ? <CheckCircleIcon style={{ fill: '#008000' }}/> : <CancelIcon  color="error"/>}</StyledTableCell>
                  <StyledTableCell> {data.address}  </StyledTableCell>
                  <StyledTableCell> {data.created_by_name}  </StyledTableCell>
                  <StyledTableCell>                              
                    <Tooltip title="Update">                              
                      <IconButton  size="small" className={classes.fab} value={data.id} name={data.id} component="span"  onClick={(event) => { handleClickEditOpen(data); }}>
                      <CreateIcon/>
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
          <PaginationBar colSpan={7} count={count} rowsPerPage={rowsPerPage} page={page} handleChangePage = {handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
        </TableRow>
      </TableFooter>
    </Table>    
  )
}