import React, { useEffect, useState, Fragment } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import {Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Divider, 
  Button,
} from '@material-ui/core';
import moment from 'moment';

// Components
import {getTime} from '../../../../utils/datetime';

// API Call
import AppointmentAPI from '../../../../api/Appointment.js'


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
          franchiseId : currentTimeslotList[0].franchise_id,
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
              isAlreadyBooked === true ? {backgroundColor : 'cornflowerblue'} : null
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
  )
}