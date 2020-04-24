import React, { useState, useEffect } from 'react';
import {component} from 'react-dom';
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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Paper from '@material-ui/core/Paper';
import {useCommonStyles} from '../../common/StyleComman'; 
// API CALL
import StaffMaster from '../../../api/StaffMasterAdmin';
import UserAPI from '../../../api/User';
import useSignUpForm from '../franchise/CustomHooks';

import validate from '../../common/validation/StaffRuleValidtion';

const RESET_VALUES = {
  id: '',
  first_name: '',
  last_name:'',
  location:'',
  contact:'',
  email:'',
  password: '',
  position: [],
};

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
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
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
  expansionTitle: {
    fontWeight: theme.typography.fontWeightBold,
  },
  button:{
    color:"white",
    fontSize: theme.typography.pxToRem(10),
    marginRight: theme.spacing(1),
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  },
  closeIcon: { marginTop:theme.spacing(-3) },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Add({ open, handleClose, handleSnackbarClick, setFranchiseList, positions}) {

  const classes = useStyles();
  const styleClass = useCommonStyles();
  const [ploading, setpLoading] = React.useState(false);
  
    
  useEffect(() => {
    inputs['password']=='' ? setInput('password', GeneratePassword()) :''
  }, []);
  


  const addStaffMaster = async () => {   
        setpLoading(true);
        const response = await StaffMaster.register({
          id: '',
          first_name: inputs.first_name,
          last_name:inputs.last_name,
          user_id:inputs.user_id,
          password:inputs.password,
          location:inputs.location,
          contact:inputs.contact,
          email:inputs.email,
          position: inputs.position.join(),
          created_by: 1,
        });
        handleSnackbarClick(true);
        setFranchiseList(response.staffList);
        handleReset(RESET_VALUES);
        setpLoading(false);
        handleClose(false);
  }
 
  
  function GeneratePassword() {
    return Math.random().toString(36).slice(-8);
  }

 const { inputs, handleNumberInput, handleInputChange, handleSubmit, handleReset, setInput, errors, setErrors } = useSignUpForm(
    RESET_VALUES,
    addStaffMaster,
    validate
  );

  
  const checkEmail = async (fieldName, email) => {
    try{
      const response = await UserAPI.verifyEmail({email : email});
      if(response.isVerified !== ''){
      setErrors({ ...errors, [fieldName]: 'Email already registered'});
      }
    }catch(e){
      console.log('Error',e);
    }    
  }

  function handleEmailVerification(event){
    const email = event.target.value;    
    const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email === ''){
      setErrors({ ...errors, [event.target.name]: ''});
    }else if(!validEmail.test(email)){
      setErrors({ ...errors, [event.target.name]: 'Email Address is invalid'});
    }else {
      setErrors({ ...errors, [event.target.name]: ''});
    }
    checkEmail(event.target.name, email);
  }

  function handleNameBlurChange(e) {
    setInput('user_id', generate(inputs.first_name, inputs.last_name));
  }
  
  function generate(first_name, last_name) {
    const ts = new Date().getTime().toString();
    const parts = ts.split( "" ).reverse();
    let id = "";
    
    for( let i = 0; i < 4; ++i ) {
      let index = Math.floor( Math.random() * (5) );
      id += parts[index];	 
    }    
    return first_name.substring(0,2).toLowerCase() + last_name.substring(0,2).toLowerCase() + '_' + 'admin' + '_' + id;
  }

return (
    <div>
      <Dialog maxWidth="sm" open={open} TransitionComponent={Transition}>
        <form onSubmit={handleSubmit}> 
          <AppBar className={classes.appBar}>
            <Toolbar>             
              <Typography variant="h6" className={classes.title}>
                Add Staff
              </Typography>
              <IconButton size="small" onClick={handleClose} className={styleClass.closeIcon}> x </IconButton> 
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
                <Grid item xs={12} sm={12}>   {ploading ?  <LinearProgress />: null}</Grid>
            
            <Paper className={classes.paper}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="first_name">First Name *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="first_name"
                      name="first_name"
                      value={inputs.first_name}
                      onChange={handleInputChange}
                      error={errors.first_name}
                      helperText={errors.first_name}
                      fullWidth
                      required
                      type="text"
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="last_name">Last Name</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="last_name"
                      name="last_name"
                      type="text"
                      value={inputs.last_name} 
                      onChange={handleInputChange}
                      error={errors.last_name}
                      helperText={errors.last_name}
                      required
                      fullWidth
                    />
                    
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="location">Location *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="location"
                      name="location"
                      type="text"
                      value={inputs.location}
                      onChange={handleInputChange}
                      onBlur={handleNameBlurChange}
                      error={errors.location}
                      helperText={errors.location}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="contact">Contact *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="contact"
                      name="contact"
                      type="text"
                      value={inputs.contact} 
                      onChange={handleNumberInput}
                      error={errors.contact}
                      helperText={errors.contact}
                      required
                      fullWidth
                      onInput={(e)=>{ 
                        e.target.value =(e.target.value).toString().slice(0,10)
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="email">Email Id *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="email"
                      name="email"
                      type="email"
                      value={inputs.email} 
                      onChange={handleInputChange}
                      onBlur={handleEmailVerification}
                      error={errors.email}
                      helperText={errors.email}
                      required
                      fullWidth
                      type="email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <InputLabel  className={classes.textsize} htmlFor="position">Position *</InputLabel>
                    <Select
                      multiple
                      value={inputs.position}
                      onChange={handleInputChange}
                      error={errors.position}
                      helperText={errors.position}
                      inputProps={{
                        name: 'position',
                        id: 'position',
                      }}
                      className={classes.textsize}
                      fullWidth
                      required
                    >
                      {
                        (positions.length>0 ? positions : []).map((ele, index) => {
                          return(
                          <MenuItem  className={classes.textsize} value={ele.id}>{ele.position}</MenuItem>
                          )
                        })
                      }
                    </Select>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="user_id">User Id *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="user_id"
                      name="user_id"
                      type="user_id"
                      value={inputs.user_id} 
                      disabled
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                      value={inputs.password} 
                      error={errors.password}
                      helperText={errors.password}
                      fullWidth
                      disabled
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={12}>
                    <Button variant="contained" onClick={handleSubmit}  color="primary" className={classes.button} >
                      Save
                    </Button>  
                    <Button  variant="contained"   onClick={handleClose} color="primary" className={classes.button} >
                      Close
                    </Button>
                </Grid>
                </Grid>
              </Paper>

            
          </div>
        </form>
      </Dialog>
    </div>
  );
}
