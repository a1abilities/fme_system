// import React, { useState, useEffect } from 'react';
// import { makeStyles  } from '@material-ui/core/styles';


// // Add Components
// import HomeTable from './Components/HomeTable.js';

// //import validate from '../../validations/AppointmentHome.js';


// import customHooks from '../../common/CustomHooks'

// // API CALL

// import AppointmentAPI from '../../../api/Appointment.js'



// const useStyles = makeStyles(theme => ({
//   labelTitle: {
//     fontWeight: theme.typography.fontWeightBold,
//     fontSize: theme.typography.pxToRem(20),
//     color: theme.palette.text.secondary,        
//   },
// }));


// const RESET_VALUES = {
//   franchise_id : '',
//   role_id : '',
// };

// export default function AppointmentHome() {
//   const classes = useStyles();
  
//   const [membersList, setMembersList] = React.useState([]);

//   const [roleList, setRoleList] = useState([]);  
//   const [franchiseList, setFranchiseList] = useState([]);  
//   const [fdbName, setFdName] = useState('');

//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = event => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

  
//   const fetchRequiredList = async () => {
//     try{
//       const result = await AppointmentAPI.fetchRequiredList();
//       setFranchiseList(result.franchiseList);
//       setRoleList(result.roleList);
      
//     }catch(e){
//       console.log('fetchRequiredList error...', e);
//     }
//   }


//   const fetchStaffList = async () => {
//     const dbName = franchiseList.find(ele => {return ele.id  == inputs.franchise_id });
//     setFdName(dbName.fdbname);
//     try{
//       const result = await AppointmentAPI.fetchStaffList({
//         fdbName : dbName.fdbname,
//         franchiseId: inputs.franchise_id, 
//         roleId : inputs.role_id});      
//       setMembersList(result.membersList);
//     }catch(e){
//       console.log('fetchStaffList error...', e);
//     }
//   }

  
//   useEffect(() => {
//     fetchRequiredList();
//   }, []);

//   const { inputs, handleInputChange, handleSubmit, handleReset, setInput, errors } = customHooks(    
//     RESET_VALUES,
//     fetchStaffList,
//     validate,
//   );


//   return (
//     <div>   
//       { membersList && 
//         <HomeTable  membersList = {membersList} fdbName = {fdbName} roleList = {roleList} franchiseList = {franchiseList} handleSubmit={handleSubmit}
//         inputs={inputs} handleInputChange={handleInputChange} errors= {errors}
//         page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
//       }
//     </div>
//   );
// }
