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
import CreateIcon from '@material-ui/icons/Create';
import { API_URL } from '../../../../api/Constants';
import {useCommonStyles} from '../../../common/StyleComman';
import {getDateInDDMMYYYY, getCurrentDateDBFormat} from '../../../../utils/datetime';

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



export default function CSR({staffList, roles, handleClickEditOpen, roleName }) {
  const styleClass = useCommonStyles();

return (  
  <Table>
    <TableHead>
      <TableRow>
        <StyledTableCell>#</StyledTableCell>
        <StyledTableCell>User ID</StyledTableCell>
        <StyledTableCell>Password</StyledTableCell>
        <StyledTableCell>Full Name</StyledTableCell>
        <StyledTableCell>Role/Position</StyledTableCell>
        <StyledTableCell>Contact</StyledTableCell>
        <StyledTableCell>Action</StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    {(staffList.length > 0 ? staffList : []).map((data, index) => {      
      return(
        <TableRow key={data.id} >
        <StyledTableCell> {index + 1}  </StyledTableCell>
        <StyledTableCell> {data.user_id}  </StyledTableCell>
        <StyledTableCell> {data.password}  </StyledTableCell>
        <StyledTableCell> {data.first_name + ' ' + data.last_name}  </StyledTableCell>
        <StyledTableCell> 
          {( (data.role && data.role.split(',')) || []).map((a, index) =>{
            return(
              (roles != undefined && roles != null && roles.length > 0 ? roles : []).map((ele)=>{
                return(
                  (data.role.split(',').length-1)===index ?
                  data.role.split(',')[index] == ele.id ? ele.name  :''
                  :
                  data.role.split(',')[index] == ele.id ? ele.name + ", " :''
                )
                })
              ) 
          })}
        </StyledTableCell>
        <StyledTableCell>{data.contact}</StyledTableCell>
        <StyledTableCell>
          <Tooltip title="Update">
            <IconButton  size="small" value={data.id} name={data.id} component="span"  onClick={(event) => { handleClickEditOpen(data); }}>
            <CreateIcon/>
            </IconButton>
          </Tooltip>
        </StyledTableCell>
      </TableRow>
      )      
    })
  }
  </TableBody>
  </Table>
  )
}