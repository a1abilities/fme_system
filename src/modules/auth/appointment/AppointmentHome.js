import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles, fade } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import DetailsIcon from '@material-ui/icons/Details';
import BackArrowIcon from '@material-ui/icons/ArrowBack';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tooltip from '@material-ui/core/Tooltip';
import CreateIcon from '@material-ui/icons/Create';
import UpdateIcon from '@material-ui/icons/Update';
import AccountBalanceIcon from '@material-ui/icons/AccountBalanceWallet';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import CommentIcon from '@material-ui/icons/Comment';
import TablePagination from '@material-ui/core/TablePagination';

// Add Components
import BadgeComp from '../../common/BadgeComp';
import {getCurrentDate, getCurrentDateDBFormat, getCurrentDateDDMMYYYY, getDate, getDateInDDMMYYYY} from '../../../utils/datetime';
import HomeTable from './Components/HomeTable.js';
import BookAppointment from './Components/BookAppointment.js';
import ViewAppointment from './Components/ViewAppointment.js';
import UpdateTimeslot from './Components/UpdateTimeslot.js';

// API CALL
import AppointmentAPI from '../../../api/Appointment.js';

const useStyles = makeStyles(theme => ({
  labelTitle: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(20),
    color: theme.palette.text.secondary,        
  },
}));


export default function AppointmentHome() {
  const classes = useStyles();
  
  const [membersList, setMembersList] = React.useState([]);
  const [roleList, setRoleList] = useState([]);  
  
  const [selectedUserData, setSelectedUserData] = React.useState({});

  const [showMainPage, setShowMainPage] = React.useState(true);
  const [showBookAppointment, setShowBookAppointment] = React.useState(false);
  const [showViewAppointment, setShowViewAppointment] = React.useState(false);
  const [showUpdateTimeslot, setShowUpdateTimeslot] = React.useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };    

  
  const handleMainPage = async () => {   
    setShowBookAppointment(false);
    setShowViewAppointment(false);
    setShowUpdateTimeslot(false);
    setShowMainPage(true);
  }

  const handleBookAppointment = async (data) => {
    setSelectedUserData(data);

    setShowMainPage(false);
    setShowViewAppointment(false);
    setShowUpdateTimeslot(false);
    setShowBookAppointment(true);
  }

  const handleViewAppointment = async (data) => {
    setSelectedUserData(data);
    
    setShowMainPage(false);    
    setShowUpdateTimeslot(false);
    setShowBookAppointment(false);
    setShowViewAppointment(true);
  }

  const handleUpdateTimeSlot = async (data) => {
    setSelectedUserData(data);

    setShowMainPage(false);    
    setShowBookAppointment(false);
    setShowViewAppointment(false);
    setShowUpdateTimeslot(true);
  }

  const fetchMemberList = async () => {
    try{
      const result = await AppointmentAPI.membersList();
      setMembersList(result.membersList);
      setRoleList(result.roleList);      
    }catch(e){
      console.log('fetchMemberList error...', e);
    }
  }

  
  useEffect(() => {   
    fetchMemberList();
  }, []);


  return (
    <div>     
      { showMainPage && membersList && <HomeTable membersList = {membersList} roleList = {roleList} 
        handleBookAppointment = {handleBookAppointment} handleViewAppointment = {handleViewAppointment} 
        handleUpdateTimeSlot = {handleUpdateTimeSlot}
        page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} /> 
      }
      {
        showBookAppointment && <BookAppointment handleMainPage = {handleMainPage} userData = {selectedUserData} /> 
      }
      {
        showViewAppointment && <ViewAppointment handleMainPage = {handleMainPage} userData = {selectedUserData}  /> 
      }
      {
        showUpdateTimeslot && <UpdateTimeslot handleMainPage = {handleMainPage} userData = {selectedUserData}  /> 
      }
    </div>
  );
}
