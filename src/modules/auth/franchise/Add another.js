import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip'; 
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import LinearProgress from '@material-ui/core/LinearProgress';

import {useCommonStyles} from '../../common/StyleComman';
import validate from '../../common/validation/FranchiseRuleValidation';
// import validateEdit from '../../common/validation/FranchiseEditValidation';

// API CALL
import UserAPI from '../../../api/User';
import ConfirmationDialog from '../ConfirmationDialog.js';
import LocationAPI from '../../../api/Location';

import useSignUpForm from './CustomHooks';

const RESET_VALUES = {
  city: '',
  suburb: '',
  franchise_name: '',
  uid: '',
  
  city_code: '',
  abn: '',

  company_name: '',
  nbzn: '',
  company_location: '',
  director: '',
  email: '',
  contact: '',
  alt_contact: '',
  website: '',

  accountant_name: '',
  accountant_email: '',
  accountant_contact: '',

  uid: '',
  password: '',
};

const StyledTableCell = withStyles(theme => ({
  head: {
    // backgroundColor: theme.palette.common.black,
    // color: theme.palette.common.white,
    fontSize: theme.typography.pxToRem(15),
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    height: theme.spacing(5),
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    fontSize: theme.typography.pxToRem(14),
    color:"white",
    marginTop:theme.spacing(-3),
  },
  closeIcon: {
    marginTop:theme.spacing(-3),
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    flexGrow: 1,
    padding: theme.spacing(2),
    // padding: theme.spacing(3, 2),
    textAlign: 'left',
    backgroundColor: '#E5E9EA',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 100,
  },
  heading: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightBold,
  },
  errorHeading: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightBold,
    color:'red',
  },
  addButton:{
    backgroundColor:'#CBDF90',
  },
  expansionTitle: {
    fontWeight: theme.typography.fontWeightBold,
  },
  margin: {
    margin: theme.spacing(1),
  },
  deleteBtn: {
    margin: theme.spacing(1),
  },
  button:{
    color:"white",
    fontSize: theme.typography.pxToRem(10),
    marginRight: theme.spacing(1),
    marginTop:theme.spacing(3),
    marginLeft:theme.spacing(1),
    marginBottom:theme.spacing(3),
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  }
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Add({ open, handleClose, handleSnackbarClick, setFranchiseList, setFranchiseId }) {
  const classes = useStyles();
  const styleClass = useCommonStyles();

  const [cityList, setCityList] = useState([]);
  const [directorList, setDirectorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedArea, setSelectedArea] = useState([]);
  const [tempCity, setTempCity] = useState();
  const [expanded, setExpanded] = React.useState('panel1');
  const [chkEmail, SetChkEmail] = useState();
  const [confirmation, setConfirmation] = React.useState(false);
  const [directorDeletedIndex, setDirectorDeletedIndex] = useState();
  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(true);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  function handleConfirmationDialog (response){
    // setFranchise({ ...franchise, 'state': response});
    // console.log(franchise);
    if(response === 0){
      const directorListTemp = [...directorList];
      directorListTemp.splice(directorDeletedIndex, 1);
      setDirectorList(directorListTemp);
    }
    setConfirmation(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const LocationResult = await LocationAPI.list();
        setCityList(LocationResult.cityList);
      } catch (error) {
        console.log('Error', error);
      }
    };

    fetchData();
  }, []);

 
  function close(){
    handleReset(RESET_VALUES);
    handleClose(false);
  }

  // function IDGenerator() {
  //   this.length = 4;
  //   this.timestamp = +new Date;
    
  //   var _getRandomInt = function( min, max ) {
  //   return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
  //   }
  // }

  // const handleSuburb = async () => {
  //   const response = await UserAPI.add({
   
  //   });
  // }

  const addFranchise = async () => {

    if(directorList==''){
      handleDirectorList();
    }
    else{
      if(inputs.accountant_email===chkEmail){
        alert('Email already registered')
      }
      else{
        let check = false;
        (directorList || []).map((list, index) =>{
           list.email==inputs.accountant_email?
           check = true :''
          });
        if(check===false){
          setpLoading(true);
          setSavebtn(false);
          const response = await UserAPI.add({
            // cancelToken: this.isTokenSource.token,
            
            id: '',
            city: tempCity,
            suburb: inputs.suburb,
            franchise_name: inputs.franchise_name,

            city_code: inputs.city_code,
            abn: "1234",

            company_name: inputs.company_name,
            nbzn: inputs.nbzn,
            company_location: inputs.company_location,
            // director: inputs.director,
            // email: inputs.email,
            // contact: inputs.contact,
            // alt_contact: inputs.alt_contact,
            directorList: directorList,
            website: inputs.website,

            accountant_name: inputs.accountant_name,
            accountant_email: inputs.accountant_email,
            accountant_contact: inputs.accountant_contact,

            user_name : inputs.director,
            // uid: inputs.uid,
            // password: inputs.password,
            designation: "2",
            role_id: "2",
            state:1,
          });
          if(response.isExist === 0){
          const franchiseIdTemp = [];

          response.userList.map(data => {
            const found = franchiseIdTemp.some(el => el.franchise_id === data.franchise_id);

            if(!found) {
              franchiseIdTemp.push({
                director_id: data.director_id,
                franchise_id: data.franchise_id,
                franchise_name: data.franchise_name,
                company_name: data.company_name,
                suburb: data.suburb,
                city: data.city,
                status:data.state
              });
            }
          });

          setFranchiseId(franchiseIdTemp);
          setTempCity('');

          handleSnackbarClick(true);
          setFranchiseList(response.userList);
          setDirectorList([]);
          handleReset(RESET_VALUES);
          setpLoading(false);
          setSavebtn(true);
          handleClose(false);
          }else{
            alert('DB Already Exist for this location, contact to engineer..');
            setpLoading(false);
            setSavebtn(true);
          }
        }
        else{          
          alert('Director Email and Accountant Email cannot be same')
        }
      }
    }
  };

 

  function handleEmailVerification(event){
    // console.log(event.target.value);
    const email = event.target.value;
    console.log('email--',email)
    const validEmail =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!validEmail.test(email)) {
      errors.demail = 'Email Address is invalid';
    }
    else{
      
      errors.demail = '';
    }
    // console.log('email--',errors.demail)

    const checkEmail = async () => {
      const response = await UserAPI.verifyEmail({email : email});
      
      if(response.isVerified!=''){
      SetChkEmail(response.isVerified[0].email);
      errors.demail = 'Email already registered';
      // alert('Email already registered');
      }
    }
    checkEmail();
  }


  function handleDirectorList(){
    if(errors.demail==''||errors.demail==null){
    const directorListTemp = [...directorList];

    if(inputs.email === chkEmail){
      alert('Email already registered')
    }else{
    if(inputs.director === '' || inputs.email === '' || inputs.contact === '' || inputs.uid === '' || inputs.password === '') {
     
      alert('Please provide director information')    
    
    } else{
        let checkDuplicateMail = false;
      
        (directorList.length>0 ? directorList : []).map(data =>{
          if(data.email===inputs.email){
            checkDuplicateMail =true;
          }
        });
      if(checkDuplicateMail===false){
        directorListTemp.push({
          'director': inputs.director,
          'email' : inputs.email,
          'contact': inputs.contact,
          'alt_contact': inputs.alt_contact,
          'uid' : inputs.uid,
          'password': inputs.password,          
        });
            inputs.director = '';
            inputs.email = '';
            inputs.contact = '';
            inputs.alt_contact = '';
            inputs.uid = '';
            inputs.password = '';
        
            setDirectorList(directorListTemp);
      }else{
        alert('Given email address already assign to another director.');
      }
    }
  }
  }
  else{
    if(inputs.email===''){
      
    alert('Please Enter Director Email Address');
    }
    else{
    alert('Please Enter Correct Email Address of Director');
    }
  }
}
  // function setCityHandler(city){
  //   setInput('city',city)
  // }
  function setCityCodeHandler(event){
    setInput('city_code',event.target.value.split('_')[2])
  }
  function handleCityChange(event){
    // setTempCity(event.target.value)
    const city_name = event.target.value.split('_')[0];
    const city_id = event.target.value.split('_')[1];
    const city_code = event.target.value.split('_')[2];

    setTempCity(city_name);
    setInput('city', event.target.value);
    
    // setInput('city_code', city_code);

    // setCityHandler(city_name);
    // setCityCodeHandler(city_code);
    

    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await LocationAPI.arealist({
          city_id : city_id,
          city_name : city_name,
          city_code : city_code,
        });
        // console.log('suburb', result.selectedArea);
        if(result.selectedArea != ""){
          setSelectedArea(result.selectedArea);
        }else{
          alert('All existing area already assigned to other franchise..');
        }
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    
    fetchData();
    
  }
// console.log("data",inputs);

  function handleRemoveDirector(index){
    setDirectorDeletedIndex(index);
    setConfirmation(true);
    // const directorListTemp = [...directorList];
    // directorListTemp.splice(index, 1);
    // setDirectorList(directorListTemp);
  }

   function handleNameBlurChange(e) {
    setInput('uid', generate(inputs.director, tempCity, inputs.suburb)); 
  }

  function generate(director, city, suburb) {
    const ts = new Date().getTime().toString();
    const parts = ts.split( "" ).reverse();
    let id = "";
    
    for( let i = 0; i < 4; ++i ) {
      let index = Math.floor( Math.random() * (5) );
      id += parts[index];	 
    }
    
    return director.substring(0, 4).toLowerCase() + '_' + city.substring(0,2).toLowerCase() + suburb.substring(0,2).toLowerCase() + '_' + id;
  }
  
  function handlePasswordBlurChange() {
    inputs['password']=='' ? 
    setInput('password', GeneratePassword())
    :''
  }

  function GeneratePassword() {
    return Math.random().toString(36).slice(-8);
  }

  const { inputs, handleInputChange, handleNumberInput, handleSubmit, handleReset, setInput, errors } = useSignUpForm(
    RESET_VALUES,
    addFranchise,
    validate
  );
  
  useEffect(() => {
    errors
  });


  return (
    <div>
      <Dialog maxWidth="sm" open={open} TransitionComponent={Transition}>
        <form  onSubmit={handleSubmit}> 
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Add Franchise
              </Typography>
                <IconButton size="small" onClick={handleClose} className={styleClass.closeIcon}> x </IconButton>
              </Toolbar>
          </AppBar>

          <div className={classes.root}>
            <Grid item xs={12} sm={12}>   {ploading ?  <LinearProgress />: null}</Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <InputLabel className={classes.textsize} htmlFor="franchise">Franchise Name*</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="franchise_name"
                      name="franchise_name"
                      // label=""
                      value={inputs.franchise_name}
                      onChange={handleInputChange}
                      error={errors.franchise_name}
                      helperText={errors.franchise_name}
                      fullWidth
                      // required
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel className={classes.textsize}  htmlFor="city">Select City *</InputLabel>
                    <Select
                      value={inputs.city}
                      onChange={handleCityChange}
                      onBlur = {setCityCodeHandler}
                      name ='city'
                      id = 'city'
                      // label = 'Select City'
                      fullWidth
                      // required
                      className={classes.textsize} 
                      error={errors.city}
                      helperText={errors.city ? errors.city : ' '}
                    >
                      {(cityList.length > 0 ? cityList : []).map(data => {
                          // console.log("City", data);
                          return (
                            <MenuItem  className={classes.textsize}  value={data.city + '_' + data.id + '_' + data.city_code} >{data.city+ ' - ' + data.city_code}</MenuItem>
                          );
                        })}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel className={classes.textsize}  htmlFor="suburb_selection">Area *</InputLabel>
                    <Select
                      value={inputs.suburb}
                      onChange={handleInputChange}
                      name = 'suburb'
                      id = 'suburb_selection'
                      // label = 'Area'
                      fullWidth
                      // label="Suburb"
                      // required
                      error={errors.suburb}
                      helperText={errors.suburb ? errors.suburb : ' '}
                      className={classes.textsize} 
                    >
                      {(selectedArea.length>0 ? selectedArea : []).map((area, index) => {
                        return(
                          <MenuItem className={classes.textsize}  value={area.area_name}>{area.area_name}</MenuItem>
                        )
                      })
                      }
                      
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="company_name">Company Name *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="company_name"
                      name="company_name"
                      // label="Company Name"
                      value={inputs.company_name}
                      error={errors.company_name}
                      helperText={errors.company_name}
                      fullWidth
                      margin="dense"
                      // required
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="nbzn">Company NZBN *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="nbzn"
                      name="nbzn"
                      // label="Company's NBZN"
                      value={inputs.nbzn}
                      error={errors.nbzn}
                      helperText={errors.nbzn}
                      fullWidth
                      margin="dense"
                      type="text"                      
                      onChange={handleNumberInput}
                      onInput={(e)=>{ 
                        e.target.value = (e.target.value).slice(0,13)
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="company_location">Company Location *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="company_location"
                      name="company_location"
                      // label="Comapny Location"
                      value={inputs.company_location}
                      error={errors.company_location}
                      helperText={errors.company_location}
                      margin="dense"
                      // required
                      fullWidth
                      onChange={handleInputChange}
                    />
                  </Grid>
                  {/* <Paper className={classes.paper}>
                  <Grid container spacing={3}> */}
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="director">Director Name *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="director"
                      name="director"
                      // label="Director Name"
                      value={inputs.director}
                      // error={errors.director}
                      // helperText={errors.director}
                      fullWidth
                      type="text"
                      margin="dense"
                      // required
                      onBlur={handleNameBlurChange}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="email">Email Address *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="email"
                      name="email"
                      // label="Email"
                      value={inputs.email}
                      // error={errors.email}
                      // helperText={errors.email}
                      margin="dense"
                      // required
                      type="email"
                      fullWidth
                      onChange={handleInputChange}
                      onBlur={handleEmailVerification}
                      error={errors.demail}
                      helperText={errors.demail ? errors.demail : ' '}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="contact">Contact # *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="contact"
                      name="contact"
                      // label="Contact #"
                      value={inputs.contact}
                      // error={errors.contact}
                      // helperText={errors.contact}
                      margin="dense"
                      // required
                      fullWidth
                      onChange={handleNumberInput}
                      type="text"
                      onInput={(e)=>{ 
                        e.target.value =(e.target.value).toString().slice(0,10)
                    }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="alt_contact">Alternate Contact #</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="alt_contact"
                      name="alt_contact"
                      // label="Alternative Contact"
                      value={inputs.alt_contact}
                      margin="dense"
                      fullWidth
                      onChange={handleNumberInput}
                      type="text"
                      onInput={(e)=>{ 
                        e.target.value =(e.target.value).toString().slice(0,10)
                        // e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                    }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="franchaise_name">User Id</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="uid"
                      name="uid"
                      // label="User Id"
                      type="text"
                      value={inputs.uid} 
                      // onChange={handleInputChange}
                      // onBlur={handlePasswordBlurChange}
                      fullWidth
                      disabled
                      // required
                    />
                    
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <InputLabel  className={classes.textsize} htmlFor="password">Password *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="password"
                      name="password"
                      // label="Password"
                      // onChange={handleInputChange}
                      onFocus={handlePasswordBlurChange}
                      value={inputs.password} 
                      // required
                      fullWidth
                      // error={errors.password}
                      // helperText={errors.password ? errors.password : ' '}
                      // disabled
                    />
                  </Grid>
                  <Grid item xs={6} sm={1}>
                    <Tooltip title="Click to Add Director">
                      <IconButton color="primary"  className={classes.fab}  onClick={() => { handleDirectorList(); }} >
                          <AddIcon  />                                    
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Table >
                    
                          {directorList.length > 0 &&
                          <TableHead>
                              <StyledTableCell>#</StyledTableCell>
                              <StyledTableCell className={classes.textsize}>Name</StyledTableCell>
                              {/* <StyledTableCell>Email</StyledTableCell> */}
                              {/* <StyledTableCell>Contact</StyledTableCell> */}
                              {/* <StyledTableCell>Alt. Contact</StyledTableCell> */}
                              <StyledTableCell  className={classes.textsize}>User _id</StyledTableCell>
                              <StyledTableCell  className={classes.textsize}>Password</StyledTableCell>
                              <StyledTableCell  className={classes.textsize}>Action</StyledTableCell>
                          </TableHead>
                          }
                      
                      
                      <TableBody>
                      {
                        (directorList || []).map((list, index) =>{
                          return(
                            <TableRow className={classes.textsize}>
                              <StyledTableCell  className={classes.textsize}>{index+1}</StyledTableCell>
                              <StyledTableCell  className={classes.textsize}>{list.director}</StyledTableCell>
                              {/* <StyledTableCell  className={classes.textsize}>{list.email}</StyledTableCell> */}
                              {/* <StyledTableCell  className={classes.textsize}>{list.contact}</StyledTableCell> */}
                              {/* <StyledTableCell  className={classes.textsize}>{list.alt_contact}</StyledTableCell> */}
                              <StyledTableCell  className={classes.textsize}>{list.uid}</StyledTableCell>
                              <StyledTableCell  className={classes.textsize}>{list.password}</StyledTableCell>
                              <StyledTableCell  className={classes.textsize}>
                              <Tooltip title="Click to Remove">
                                <IconButton className={classes.deleteBtn} aria-label="Delete" onClick={(event) => { handleRemoveDirector(index); }}>
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>  
                              </StyledTableCell>
                            </TableRow>
                          )
                        })
                      }
                    </TableBody>
                    </Table>
                  <Grid item xs={12} sm={3}>
                    <InputLabel  className={classes.textsize} htmlFor="accountant_name">Name *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="accountant_name"
                      name="accountant_name"
                      error={errors.accountant_name}
                      helperText={errors.accountant_name}
                      // label="Name"
                      value={inputs.accountant_name}
                      // placeholder="Accountant name"
                      fullWidth
                      margin="dense"
                      // required
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <InputLabel  className={classes.textsize} htmlFor="accountant_email">Email Address*</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="accountant_email"
                      name="accountant_email"
                      // label="Email Address"
                      value={inputs.accountant_email}
                      error={errors.accountant_email}
                      helperText={errors.accountant_email}
                      // placeholder="Email"
                      fullWidth
                      margin="dense"
                      // required
                      onChange={handleInputChange}
                      onBlur={handleEmailVerification}
                      type="email"
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <InputLabel  className={classes.textsize} htmlFor="accountant_contact">Contact #*</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="accountant_contact"
                      name="accountant_contact"
                      // label="Contact #"
                      value={inputs.accountant_contact}
                      error={errors.accountant_contact}
                      helperText={errors.accountant_contact}
                      // placeholder="Contact"
                      fullWidth
                      type="text"
                      margin="dense"                                           
                      onInput={(e)=>{                         
                        e.target.value = (e.target.value).toString().slice(0,10)
                       }}                    
                      onChange={handleNumberInput}                   
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <InputLabel  className={classes.textsize} htmlFor="website">Website</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="website"
                      name="website"
                      // label="Website"
                      value={inputs.website}
                      // placeholder="Accountant name"
                      fullWidth
                      margin="dense"
                      onChange={handleInputChange}
                    />
                  </Grid>
                  
                
                <Grid item xs={12} sm={4}>
               
              {savebtn?  <Button variant="contained" color="primary" className={classes.button} type="submit">
                     Save
                    </Button>: <Button variant="contained" color="primary" disabled className={classes.button}  >
                     Save
                    </Button>}
                    <Button variant="contained"  color="primary" className={classes.button} onClick={close} aria-label="Close">
                     Close
                    </Button>
                  </Grid>
              </Grid>
          </div>
        </form>
      </Dialog>
      <ConfirmationDialog open = {confirmation} lastValue={0} handleConfirmationClose={handleConfirmationDialog}  currentState={1} title={"Remove Director ?"} content={"Do you really want to remove director ?"} />
    </div>
  );
}
