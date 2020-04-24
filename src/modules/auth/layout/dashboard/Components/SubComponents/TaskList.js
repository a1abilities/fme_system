import React, {useEffect, useState} from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import PrintIcon from '@material-ui/icons/Print';
import PaymentIcon from '@material-ui/icons/Payment';
import CloudUpload from '@material-ui/icons/CloudUpload';
import SendIcon from '@material-ui/icons/Send.js';
import TablePagination from '@material-ui/core/TablePagination';

import Task from '../../../../task/TaskList';
import MainLayout from '../../../MainLayout';
import { getCurrentDateDBFormat, getDateInDDMMYYYY } from '../../../../../../utils/datetime';

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



const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  tableWrapper: {
    maxHeight: 200,
    overflow: 'auto',
  },
  tableBodyCell: {
    fontSize: '12px',
  },
});



export default function TaskList({taskList, roleName, handleTaskClick}) {
  const [showTask, setShowTask] = useState(false);
  
const columns = [
  { id: 'sno', label: '#', minWidth: 10, align: 'right'},
  { id: 'task_id', label: 'Task\u00a0Id', minWidth: 50, align: 'left' },
  { id: 'description', label: 'Description', minWidth: 250, align: 'left'},
  { id: 'assigned_by', label: 'Assigned\u00a0By', minWidth: 200, align: 'left'},
  { id: 'due_date', label: 'Due Date', minWidth: 150, align: 'left',},
  { id: 'action', label: 'Action', minWidth: 100, align: 'left' },
];
  
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

return (  
  <div>
    <div className={classes.tableWrapper}>
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          {columns.map(column => (
            <TableCell
              key={column.id}
              align={column.align}
              style={{ minWidth: column.minWidth, fontWeight:'bolder', color:'black'}}
            >
              {column.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    <TableBody>
    {(taskList.length > 0 ? taskList : []).map((data, index) => {      
      return(
        <TableRow hover role="checkbox" tabIndex={-1} >        
          <StyledTableCell style={{minWidth: 10, align: 'right'}}>{index + 1}</StyledTableCell>
          <StyledTableCell style={{minWidth: 50, align: 'left'}}>{data.task_id}</StyledTableCell>
          <StyledTableCell style={{minWidth: 250, align: 'left'}}>{data.task_description}</StyledTableCell>
          <StyledTableCell style={{minWidth: 200, align: 'left'}}> {data.task_created_by_name + " (" + data.creator_role + ")"}</StyledTableCell>
          <StyledTableCell style={{minWidth: 150, align: 'left'}}>{ getDateInDDMMYYYY(data.due_date)}</StyledTableCell>
          <StyledTableCell style={{minWidth: 100, align: 'left'}}> 
            <Button variant="text" size="small" color="primary" onClick={() => handleTaskClick(roleName, data)} style={{fontSize:'10px'}}>View</Button>
        </StyledTableCell>
      </TableRow>
      )      
    })
  }                              
    </TableBody>
  </Table>
  </div>
  <TablePagination
    rowsPerPageOptions={[10, 25, 100]}
    component="div"
    count={taskList.length}
    rowsPerPage={rowsPerPage}
    page={page}
    backIconButtonProps={{
      'aria-label': 'previous page',      
    }}
    nextIconButtonProps={{
      'aria-label': 'next page',      
    }}
    onChangePage={handleChangePage}
    onChangeRowsPerPage={handleChangeRowsPerPage}
  />
  
  { showTask ? <Task roleName={roleName}/> : null }
  </div>
  )
}