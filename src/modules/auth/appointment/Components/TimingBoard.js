import React, { useEffect, useState, Fragment } from 'react';

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
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import BackArrowIcon from '@material-ui/icons/ArrowBack';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import UpdateIcon from '@material-ui/icons/Update';
import AccountBalanceIcon from '@material-ui/icons/AccountBalanceWallet';
import TableFooter from '@material-ui/core/TableFooter';
import DetailsIcon from '@material-ui/icons/Details';
import { API_URL } from '../../../../api/Constants';
import {useCommonStyles} from '../../../common/StyleComman';
import Popover from '@material-ui/core/Popover';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import {TablePaginationActions} from '../../../common/Pagination';
import moment from 'moment';

// Components
import AddUpdateTimeslot from './AddUpdateTimeslot';
import {getDate, getCurrentDate, getTimeinDBFormat, getTime, get12HourTime } from '../../../../utils/datetime';

// API Call
import AppointmentAPI from '../../../../api/Appointment.js';


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
  fonttransform:{
    textTransform:"initial",
    fontSize: theme.typography.pxToRem(13),
  },
  labelTitle: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(20),
    color: theme.palette.text.secondary,        
  },
  listPrimaryItem: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(18),
    color: theme.palette.text.secondary,
    marginBottom : '30px',
  },
  listSecondaryItem: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.text.secondary,
    marginBottom : '10px',
  },
  timeButton: {
    height : theme.typography.pxToRem(50),
    width : theme.typography.pxToRem(50),    
  },
  timeButtonFont: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(10),
    color: theme.palette.text.secondary,
  }
}));

export default function TimingBoard({selectedDate, currentTimeslotList, timingTable, handleAppointTimeSelection, submitTime, viewOnly}) {
  const classes = useStyles();
  const [bookedAppointmentList, setBookedAppointmentList] = useState([]);

  useEffect(() => {
    fetchBookedAppointmentList();
  },[selectedDate, submitTime, currentTimeslotList]);

  const fetchBookedAppointmentList = async () => {
    try{
      if(currentTimeslotList != "" && currentTimeslotList != undefined && currentTimeslotList != null) {
        const result = await AppointmentAPI.fetchBookedAppointmentList({
          userId : currentTimeslotList[0].user_id,
          date : selectedDate,
        });
        setBookedAppointmentList(result.bookedList);
      }
    }catch(e){
      console.log('Error...', e);
    }
  }

  
  const handleTimingBoardLayout = (data, index, row) => {
    let isRowInsert = false;

    row === 1 && data.time.split(':')[1] === '00' ? isRowInsert = true :
    row === 2 && data.time.split(':')[1] === '15' ? isRowInsert = true :
    row === 3 && data.time.split(':')[1] === '30' ? isRowInsert = true :
    row === 4 && data.time.split(':')[1] === '45' ? isRowInsert = true : isRowInsert = false


    let isAvailable = false;
    const found = (currentTimeslotList !== undefined && currentTimeslotList.length > 0 ? currentTimeslotList : []).find((row, index) => {
      return row.date === selectedDate && row.status === 1 && moment(data.original_time).isBetween(moment(row.start_time,'HH:mm'), moment(row.end_time,'HH:mm'));
    })

    let isAlreadyBooked = false;

      if(found === undefined) { 
        isAvailable = true;
        timingTable[index].is_free = false;
      }else{

          const foundedResult = (bookedAppointmentList !== undefined && bookedAppointmentList.length > 0 ? bookedAppointmentList : []).find((row, index) => {
            return moment(data.original_time).isBetween(moment(row.start_time,'HH:mm'), moment(row.end_time,'HH:mm'));
          });
          if(foundedResult === undefined){
            isAvailable = false;
            timingTable[index].is_free = true;
            isAlreadyBooked = false;
          }else{
            isAvailable = true;
            timingTable[index].is_free = false;
            isAlreadyBooked = true;
          }
      }
    

    return(
      isRowInsert === false ? '' :
      isRowInsert === true && 
      <TableCell style={{padding : '5px'}}>
          <Button 
            variant="contained" 
            color="primary" 
            id = {data.time} 
            className={classes.timeButton} 
            style =   {
              isAvailable === false && isAlreadyBooked === false ? {backgroundColor : 'yellowgreen'} : 
              isAlreadyBooked === true ? {backgroundColor : 'darkseagreen'} : null
            } 
            onClick = {()=> {handleAppointTimeSelection(data)}} 
            disabled = {isAvailable || viewOnly}
          >
            <Typography variant="body1" className = {classes.timeButtonFont}>
              {data.start_time}
              <Divider />
              {data.end_time}
            </Typography>
          </Button>
      </TableCell>
    )
  }  

  return (  
    <Paper style={{ width: '68%' }}>
      <Table>
        <TableBody>
          {
            ([1,2,3,4]).map(row => {
              return(
                <TableRow>{
                  (timingTable).map((data, index )=> {
                    return(
                      handleTimingBoardLayout(data, index, row)
                    )
                  })  
                }</TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </Paper>   
  )
}