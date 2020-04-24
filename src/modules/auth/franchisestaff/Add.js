import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
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
import {useCommonStyles} from '../../common/StyleComman'; 
             
import validate from '../../common/validation/FranchiseStaffRuleValidation';
import { APP_TOKEN } from '../../../api/Constants';

// API CALL
import Staff from '../../../api/franchise/Staff';
import UserAPI from '../../../api/User';
import useSignUpForm from '../franchise/CustomHooks';

const RESET_VALUES = {
  id: '',
  first_name : '',
  last_name : '',
  location : '',
  contact : '',
  email : '',  
  pre_company_name : '',
  pre_company_address : '',
  pre_company_contact : '',
  pre_position : '',
  duration : '',
  resume : '',
  cover_letter : '',
  employment_docs : '',
  
  user_id : '',
  password : '',
  assign_role : [],
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
    marginTop:theme.spacing(3),
    marginLeft:theme.spacing(1),
    marginBottom:theme.spacing(3),
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  },
  errorHeading: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightBold,
    color:'red',
  },
  drpdwn:{
    marginTop: theme.spacing(1),
  },
  closeIcon: {
    marginTop:theme.spacing(-3),
    color: 'white',
   },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Add({ open, handleClose, handleSnackbarClick, franchiseId, role, setFranchiseList}) {
  const styleClass = useCommonStyles();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('panel1');
  
  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(true);
  

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  
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

  const addFranchiseStaff = async () => {
    setpLoading(true);
    setSavebtn(true);
    const data = {
      franchise_id: franchiseId,
      id: '',
      first_name: inputs.first_name,
      last_name: inputs.last_name,
      location: inputs.location,
      contact: inputs.contact,
      email: inputs.email,
      
      pre_company_name: inputs.pre_company_name,
      pre_company_address: inputs.pre_company_address,
      pre_company_contact: inputs.pre_company_contact,
      pre_position: inputs.pre_position,
      duration: inputs.duration,      
      employment_docs: inputs.employment_docs,
      
      user_id: inputs.user_id,
      password: inputs.password,
      role: inputs.assign_role.join(),
      is_active : 1,
    };

    let formData = new FormData();
    formData.append('data', JSON.stringify(data));
    
    for (var x = 0; x < document.getElementById('employment_docs').files.length; x++) {
      formData.append('avatar', document.getElementById('employment_docs').files[x])
    }
    
    const response = await Staff.register( { formData: formData } );
    handleSnackbarClick(true);
    setFranchiseList(response.staffList);
    handleReset(RESET_VALUES);
    setpLoading(false);
    setSavebtn(false);
    setSavebtn(true);
    handleClose(false);
  };


 const { inputs = null, handleInputChange, handleNumberInput, handlePriceInput, handleSubmit, handleReset, setInput, errors, setErrors } = useSignUpForm(
    RESET_VALUES,
    addFranchiseStaff,
    validate
  );
  
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
    
    const uid = APP_TOKEN.get().uid;

    return first_name.substring(0, 4).toLowerCase() + '_' + uid.split('_')[1] + '_' + id;
  }
  
  useEffect(() => {
    inputs['password']=='' ? 
    setInput('password', Math.random().toString(36).slice(-8)) :''
  },[]);

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
            <ExpansionPanel
              className={classes.expansionTitle}
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls=""
                id="panel1a-header"
              >
                <Typography className={(errors.first_name||errors.last_name||errors.location||errors.contact||errors.email)?classes.errorHeading:classes.heading}>Staff Details</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
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
                      error={errors.first_name}
                      helperText={errors.first_name}
                      onChange={handleInputChange}
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
                  <Grid item xs={12} sm={12}>
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
                    />
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              className={classes.expansionTitle}
              expanded={expanded === 'panel2'}
              onChange={handleChange('panel2')}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls=""
                id="panel2a-header"
              >
                <Typography className={(errors.pre_company_name||errors.pre_company_address||errors.pre_company_contact||errors.pre_position||errors.duration)?classes.errorHeading:classes.heading}>Previous Employer Details</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="last_name">Name of Previous Company *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="pre_company_name"
                      name="pre_company_name"
                      type="text"
                      value={inputs.pre_company_name} 
                      onChange={handleInputChange}
                      onBlur={handleNameBlurChange}
                      error={errors.pre_company_name}
                      helperText={errors.pre_company_name}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="last_name">Address of Previous Company *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="pre_company_address"
                      name="pre_company_address"
                      type="text"
                      value={inputs.pre_company_address} 
                      onChange={handleInputChange}
                      error={errors.pre_company_address}
                      helperText={errors.pre_company_address}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="contact">Contact of Previous Company *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="pre_company_contact"
                      name="pre_company_contact"                      
                      type="text"
                      value={inputs.pre_company_contact} 
                      onChange={handleNumberInput}
                      error={errors.pre_company_contact}
                      helperText={errors.pre_company_contact}
                      required
                      fullWidth
                      onInput={(e)=>{ 
                        e.target.value =(e.target.value).toString().slice(0,10)
                    }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <InputLabel  className={classes.textsize} htmlFor="pre_position">Position/JobRole in Previous Company *</InputLabel>
                  <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="pre_position"
                      name="pre_position"                      
                      type="text"
                      value={inputs.pre_position} 
                      error={errors.pre_position}
                      helperText={errors.pre_position}
                      onChange={handleInputChange}
                      required
                      fullWidth
                  />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="last_name">Work Experience  (In Years)*</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },                     
                      }}                      
                      margin="dense"
                      id="duration"
                      name="duration"                      
                      type="text"
                      value={inputs.duration} 
                      onChange={handlePriceInput}
                      onBlur={handleNameBlurChange}
                      error={errors.duration}
                      helperText={errors.duration}
                      required
                      fullWidth
                      onInput={(e)=>{ 
                        e.target.value =(e.target.value).toString().slice(0,2)
                    }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="employment_docs">Upload Employement Docs</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="employment_docs"
                      name="employment_docs"
                      multiple
                      type="file"
                      value={inputs.employment_docs} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel className={classes.expansionTitle} expanded={expanded === 'panel3'} onChange={handleChange('panel3')} >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="" id="panel3a-header">
                <Typography className={(errors.password || errors.assign_role) ? classes.errorHeading:classes.heading}>Current Job Role</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="user_id">User Id</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="user_id"
                      name="user_id"
                      type="text"
                      value={inputs.user_id} 
                      required
                      disabled
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="last_name">Password</InputLabel>
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
                      required
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <InputLabel  className={classes.textsize} htmlFor="assign_role">Assign Role</InputLabel>
                    <Select
                      multiple
                      value={inputs.assign_role}
                      onChange={handleInputChange}
                      inputProps={{
                        name: 'assign_role',
                        id: 'assign_role',
                      }}
                      className={classes.textsize}
                      error={errors.assign_role}
                      helperText={errors.assign_role}
                      fullWidth
                      required
                    >
                      {role.map((ele) =>{
                        return( <MenuItem value={ele.id}>{ele.name}</MenuItem> )
                      })}
                    </Select>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <Grid item xs={12} sm={12}>
            {savebtn? <Button variant="contained" onClick={handleSubmit}  color="primary" className={classes.button} >
                Save
              </Button>  :
              <Button variant="contained" onClick={handleSubmit}  color="primary" className={classes.button} >
              Save
            </Button>}
              <Button  variant="contained"   onClick={handleClose} color="primary" className={classes.button} >
                Close
              </Button>
              </Grid>
            
          </div>
        </form>
        

      </Dialog>
    </div>
  );
}
