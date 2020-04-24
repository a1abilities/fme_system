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
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

import Task from '../../../../task/TaskList';
import LeadAPI from '../../../../../../api/Lead';


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  tableWrapper: {
    maxHeight: 200,
    overflow: 'auto',
  },
  tableCellFontSize: {
    fontSize: '12px',
  },
});

const StyledTableCell = withStyles(theme => ({  
  body: {
    fontSize: 11,
  },
}))(TableCell);



export default function LeadList({leadList, roleName, handleLeadClick }) {
  const [showTask, setShowTask] = useState(false);
  const [franchiseListd, setFranchiseList] = useState({});
  
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

  useEffect(()=>{
    const fetch = async () => {
      const result = await LeadAPI.franchiseList();
      setFranchiseList(result.franchiseList);
    }
    fetch();
  },[])

  
const columns = [
  { id: 'sno', label: '#', minWidth: 10, align: 'right'},
  { id: 'task_id', label: 'Lead\u00a0Id', minWidth: 50, align: 'left' },
  { id: 'for_franchise', label: ' For Franchise', minWidth: 200, align: 'left'},
  { id: 'created_by', label: 'Created\u00a0By', minWidth: 300, align: 'left'},
  { id: 'message', label: 'Message', minWidth: 200, align: 'left',},
  { id: 'action', label: 'Action', minWidth: 100, align: 'left' },
];

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
        {(leadList.length > 0 ? leadList : []).map((data, index) => {      
        return(
        <TableRow hover role="checkbox" tabIndex={-1} >        
            <StyledTableCell style={{minWidth: 10, align: 'right'}}> {index+1}       </StyledTableCell>
            <StyledTableCell style={{minWidth: 50, align: 'left'}}> {data.lead_id}  </StyledTableCell>
            {data.franchise_id!=0 ? 
              (franchiseListd.length > 0 ? franchiseListd : []).map((dataf, index1)=>{
                return( data.franchise_id===dataf.id ?
                  <StyledTableCell style={{minWidth: 200, align: 'left'}}> {dataf.name} </StyledTableCell> :''
                  )
              }) : <StyledTableCell style={{minWidth: 200, align: 'left'}}> All</StyledTableCell>
            }
            {data.f_id!=0 ?    
              (franchiseListd.length > 0 ? franchiseListd : []).map((datafr, index1)=>{
                return(
                  data.f_id===datafr.id ?
                  <StyledTableCell style={{minWidth: 300, align: 'left'}}> {datafr.name +'  ('+ datafr.city + ' ,' + datafr.suburb + ' )'} </StyledTableCell> :''
                  )
              }) : <StyledTableCell style={{minWidth: 300, align: 'left'}}> Master Admin</StyledTableCell>
            }
          <StyledTableCell style={{minWidth: 200, align: 'left'}}>{data.message}</StyledTableCell>
          <StyledTableCell style={{minWidth: 100, align: 'left'}}>
            <Button variant="text" size="small" color="primary" onClick={() => handleLeadClick(roleName, data)} style={{fontSize:'10px'}}>View</Button>
          </StyledTableCell>
        </TableRow>
          );
      })}       
        </TableBody>
      </Table>
    </div>
    <TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      component="div"
      count={leadList.length}
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
  </div>
  )
}