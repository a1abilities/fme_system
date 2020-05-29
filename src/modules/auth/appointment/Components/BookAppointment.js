// import React, {useState, useEffect} from 'react';
// import ReactDOM from 'react-dom';
// import { makeStyles, withStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import Grid from '@material-ui/core/Grid';
// import TableRow from '@material-ui/core/TableRow';
// import TableCell from '@material-ui/core/TableCell';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
// import Paper from '@material-ui/core/Paper';
// import Select from '@material-ui/core/Select';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import 'date-fns';
// import DateFnsUtils from '@date-io/date-fns';
// import { MuiPickersUtilsProvider, DatePicker, useStaticState} from '@material-ui/pickers';
// import Divider from '@material-ui/core/Divider';
// import TextField from '@material-ui/core/TextField';



// // Component
// import validate from '../../../validations/BookingAppointment.js';
// import {getDate, setTime, getTime } from '../../../utils/datetime';
// import {generateTimingTable} from '../lib/TimingTable';
// import TimingBoard from './TimingBoard.js';
// import customHooks from '../../../common/CustomHooks';


// // API
// //import AppointmentAPI from '../../../api/Appointment.js';
// import AppointmentAPI from '../../../../api/Appointment.js'
// import moment from 'moment';



// const useStyles = makeStyles(theme => ({
//   textsize:{
//     fontSize: theme.typography.pxToRem(12),
//   },
//   labelTitle: {
//     fontWeight: theme.typography.fontWeightBold,
//     fontSize: theme.typography.pxToRem(20),
//     color: theme.palette.text.secondary,        
//   },
//   textHeading:{
//     fontWeight: theme.typography.fontWeightBold,
//     fontSize: theme.typography.pxToRem(13),   
//     width: "100%",
//   },  
// }));


// const RESET_VALUES = {
//   appointment_date : null,
//   meeting_time : 15,
//   start_time : '',
//   end_time : '',
//   first_name : '',
//   last_name : '',
//   contact : '',
//   reference : ''
// };


// export default function BookAppointment(props) {
//   const classes = useStyles();
//   const userData = props.data;
//   const fdbName = props.fdbName;
//   const [currentTimeslotList, setCurrentTimeslotList] = useState([]);
//   const [timingTable, setTimingTable] = useState(generateTimingTable);
//   const [submitTime, setSubmitTime] = useState(0);
//   const [rerenderTimingBoard, setRerenderTimingBoard] = useState(0);
  
//   useEffect(() => {
//     getCurrentTimeslot();
//   },[]);

//   const getCurrentTimeslot = async () => {
//     try{
//       const result = await AppointmentAPI.getCurrentTimeslot({ userId : userData.id, franchiseId: userData.franchise_id });
//       setCurrentTimeslotList(result.timeSlot);
//       setFirstAvailableDate(result.timeSlot);
//     }catch(e){
//       console.log('getCurrentTimeslot Error...', e);
//     }
//   }
  
  
//   const setFirstAvailableDate = (timeSlot) => {    
//     const firstDate = (timeSlot.length > 0 ? timeSlot : []).find((data) => {
//       return data.status === 1
//     });    
//     setInput('appointment_date', firstDate.date);
//   }
  

//   const handleDateAvaibility = (date) => {
//     const found = (currentTimeslotList.length > 0 ? currentTimeslotList : []).find((data) => {
//       return data.date === getDate(date) && data.status === 1;
//     })
//     return found === undefined;
//   }

//   const resetTiming = () => {
//     handleRandomInput([
//       {name: 'start_time', value : ''},
//       {name: 'end_time', value : ''}
//     ]);

//     timingTable.map((row) => {
//       if(row.is_free === true){
//         document.getElementById(row.time).style.backgroundColor =  'yellowgreen';
//       }
//     })
//   }


//   const handleAppointTimeSelection = async (data) => {
//     let startTime = setTime(data.time);
//     let endTime = moment(startTime).add(inputs.meeting_time, 'minute');
    
//     let totalNeed = Number(inputs.meeting_time / 15);
//     let available = 0;

//     timingTable.map((row) => {
//       console.log(2 + 2);
//       if(row.is_free === true && setTime(row.time).isBetween(startTime, endTime) === true){
//         document.getElementById(row.time).style.backgroundColor =  'slategray';
//         available = available + 1;
//       }else if(row.is_free === true){
//         document.getElementById(row.time).style.backgroundColor =  'yellowgreen';
//       }
//     });

//     if(totalNeed !== available){
//       resetTiming();
//     }else{
//       handleRandomInput([
//         {name: 'start_time', value : getTime(startTime)},
//         {name: 'end_time', value : getTime(endTime)}
//       ]);
//     }
//   }
  


//   const submitForm = async () => {
//     try{
//       const result = await AppointmentAPI.bookAppointment({
//         userId : userData.id,
//         franchiseId : userData.franchise_id,
//         date : getDate(inputs.appointment_date),
//         meeting_time : inputs.meeting_time,
//         start_time : inputs.start_time,
//         end_time : inputs.end_time,
//         first_name : inputs.first_name,
//         last_name : inputs.last_name,
//         contact : inputs.contact,
//         reference : inputs.reference,
//       });
//       setCurrentTimeslotList(result.timeSlot);
//       handleRandomInput([
//         {name : 'first_name', value: ''},
//         {name : 'last_name', value: ''},
//         {name : 'contact', value: ''},
//         {name : 'reference', value: ''},
//       ]);
//       setSubmitTime(submitTime + 1);      
//     }catch(e){
//       console.log('Error...', e);
//     }
//   }

  
//   // const handleRecallTimingBoard = async () => {
//   //   ReactDOM.render(
//   //       <TimingBoard
//   //         selectedDate = {getDate(inputs.appointment_date)} 
//   //         currentTimeslotList={currentTimeslotList}
//   //         timingTable = {timingTable}
//   //         handleAppointTimeSelection = {handleAppointTimeSelection}      
//   //         submitTime = {submitTime}
//   //         viewOnly = {false}
//   //       />, 
//   //       document.getElementById('timingBoard')
//   //   );
//   //   resetTiming();
//   // }
  
//   const { inputs, handleDateChange, handleNumberInput, handleInputChange, handleSubmit, handleReset, handleRandomInput, setInput, errors } = customHooks(    
//     RESET_VALUES,
//     submitForm,
//     validate,
//   );
  
//   useEffect(() => {
//     // handleRecallTimingBoard();
//     setRerenderTimingBoard(rerenderTimingBoard + 1);
//     resetTiming();
//   },[inputs.appointment_date, inputs.meeting_time, submitTime]);

//   return (
//     <Grid container spacing={4}  direction="row" justify="center" alignItems="center">
//         <Grid item xs={12} sm={10}>
//           <div style = {{display: 'flex'}}>
//             <Typography variant="h6" className={classes.labelTitle}> Book Appointment </Typography>
//           </div>
//           <Divider variant="fullWidth" />
//         </Grid>          
//         <Grid item xs={12} sm={4}>
//           <Typography  className={classes.textHeading} htmlFor="meeting_time">Meeting Time</Typography>
//             <Select  
//               variant = "outlined"
//               value= {inputs.meeting_time}
//               onChange={handleInputChange}
//               inputProps={{
//                 name: 'meeting_time',
//                 id: 'meeting_time',                                           
//               }}
//               fullWidth
//               required
//               className={classes.textsize} 
//             >
//               <MenuItem  className={classes.textsize} value={15}>{'15 Minutes'}</MenuItem>
//               <MenuItem  className={classes.textsize} value={30}>{'30 Minutes'}</MenuItem>
//               <MenuItem  className={classes.textsize} value={45}>{'45 Minutes'}</MenuItem>
//               <MenuItem  className={classes.textsize} value={60}>{'1 Hour'}</MenuItem>
//             </Select>        
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <Typography  className={classes.textHeading} htmlFor="appointment_date">Appointment Date</Typography>
//           <MuiPickersUtilsProvider utils={DateFnsUtils}>
//             <DatePicker
//               variant = "inline"              
//               margin="dense"
//               id="appointment_date"
//               name="appointment_date"
//               format="dd-MM-yyyy"
//               placeholder="DD-MM-YYYY"
//               disablePast = {true}
//               value={inputs.appointment_date}
//               InputProps={{
//                 classes: {
//                   input: classes.textsize,
//                 },
//               }}
//               fullWidth
//               onChange={(date) => {handleDateChange('appointment_date', date)}}
//               shouldDisableDate = {(date) => { return handleDateAvaibility(date)}}
//             />
//           </MuiPickersUtilsProvider>
//         </Grid>
//         <Grid item xs={12} sm={8}>
//           <Typography  className={classes.textHeading} htmlFor="">TIMING BOARD</Typography>
//           <Paper style={{ width: '100%' }}>
//             {/* <div id = "timingBoard"></div>*/}
//             {rerenderTimingBoard && 
//                   <TimingBoard
//                     selectedDate = {getDate(inputs.appointment_date)} 
//                     currentTimeslotList={currentTimeslotList}
//                     timingTable = {timingTable}
//                     handleAppointTimeSelection = {handleAppointTimeSelection}      
//                     submitTime = {submitTime}
//                     viewOnly = {false}
//                   />
//             }
//           </Paper>
//         </Grid>
//         <Grid item xs={12} sm={10}>
//           <Typography className={classes.textHeading} htmlFor="">FILL CLIENT's INFORMATION</Typography>
//           <Paper style={{ width: '100%' }}>
//             <Table>
//               <TableBody>
//                 <TableRow>
//                   <TableCell>
//                     <InputLabel  className={classes.textHeading} htmlFor="first_name">First Name *</InputLabel>
//                     <TextField
//                       variant="outlined"
//                       InputProps={{
//                         classes: {
//                           input: classes.textsize,
//                         },
//                       }}
//                       fullWidth
//                       margin="dense"
//                       id="first_name"
//                       name="first_name"
//                       type="text"
//                       value={inputs.first_name} 
//                       onChange={handleInputChange}
//                       error={errors.first_name}
//                       helperText={errors.first_name}
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <InputLabel  className={classes.textHeading} htmlFor="last_name">Last Name *</InputLabel>
//                     <TextField
//                       variant="outlined"
//                       InputProps={{
//                         classes: {
//                           input: classes.textsize,
//                         },
//                       }}
//                       margin="dense"
//                       id="last_name"
//                       name="last_name"
//                       type="text"
//                       value={inputs.last_name} 
//                       onChange={handleInputChange}
//                       fullWidth
//                       error={errors.last_name}
//                       helperText={errors.last_name}
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <InputLabel  className={classes.textHeading} htmlFor="contact">Contact Number *</InputLabel>
//                     <TextField
//                       variant="outlined"
//                       InputProps={{
//                         classes: {
//                           input: classes.textsize,
//                         },
//                       }}
//                       margin="dense"
//                       id="contact"
//                       name="contact"
//                       type="text"
//                       value={inputs.contact} 
//                       onChange={handleNumberInput}
//                       error={errors.contact}
//                       helperText={errors.contact}
//                       fullWidth
//                       onInput={(e)=>{ 
//                         e.target.value =(e.target.value).toString().slice(0,10)
//                       }}
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <InputLabel  className={classes.textHeading} htmlFor="reference">Reference</InputLabel>
//                     <TextField
//                       variant="outlined"
//                       InputProps={{
//                         classes: {
//                           input: classes.textsize,
//                         },
//                       }}
//                       margin="dense"
//                       id="reference"
//                       name="reference"
//                       type="text"
//                       value={inputs.reference} 
//                       onChange={handleInputChange}
//                       // error={errors.reference}
//                       // helperText={errors.reference}
//                       fullWidth
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <Typography className={classes.textHeading} htmlFor="reference">Action</Typography>
//                     <Button variant="contained" id="submitButton" color="primary" onClick = {handleSubmit}> SUBMIT </Button> 
//                   </TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </Paper>
//         </Grid>        
//       </Grid>
//   )
// }