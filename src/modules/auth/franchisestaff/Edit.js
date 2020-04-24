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
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import InputAdornment from '@material-ui/core/InputAdornment';
import LinearProgress from '@material-ui/core/LinearProgress';
import validate from '../../common/validation/FranchiseStaffRuleValidation';
import {useCommonStyles} from '../../common/StyleComman'; 
import * as c from '../../../api/Constants';

// API CALL
import Staff from '../../../api/franchise/Staff';

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
  employment_doc : '',  
  user_id : '',
  password : '',
  role : '',
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
  labelTitle: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(13),
    marginTop: 15,
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
  closeIcon: {
     marginTop:theme.spacing(-3),
     color: 'white',
    },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Edit({open, handleEditClose, handleSnackbarClick, franchiseId, role, inputValues, setFranchiseList}) {
  const classes = useStyles();
  const styleClass = useCommonStyles();
  const [expanded, setExpanded] = React.useState('panel1');
  const [staffList, setStaffList] = React.useState(inputValues);
  const [assignRole, setAssignRole] = React.useState([]);
  const [checkRole, setCheckRole] = React.useState(["Delivery","CSR","Finance","HR"]);
  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(true);
  const [assignError, setAssignError] = React.useState();

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  function handleChangeMultiple(event) {
    setAssignRole(event.target.value);
  }
  
  useEffect(() => {
    let assignRoleList = [];
    (inputValues.role.split(',')).map((role,index) =>{
      assignRoleList.push(role);
    });
    setAssignRole(assignRoleList);
  }, []);

  const addFranchiseStaff = async () => {

    if(assignRole!=''){

      setpLoading(true);
      setSavebtn(true);
      const data = {
        franchise_id: franchiseId,
        id: inputs.id,
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
        employment_doc: inputs.employment_doc,
        
        user_id: inputs.user_id,
        password: inputs.password,
        role: assignRole.join(),        
        is_active : inputs.is_active,
      };

      let formData = new FormData();
      formData.append('data', JSON.stringify(data));
      
      for (var x = 0; x < document.getElementById('employment_docs').files.length; x++) {
        formData.append('avatar', document.getElementById('employment_docs').files[x])
      }

      const response = await Staff.register( { formData: formData } );
      handleSnackbarClick(true,'Franchise Updated Successfully');
      setFranchiseList(response.staffList);      
      setSavebtn(true);
      handleEditClose(false);
    }
    else{
      setAssignError('Role is required');
    }
  };

  
  const { inputs, handleInputChange, handleNumberInput, handlePriceInput, handleSubmit, handleReset, setInputsAll, setInput, errors } = useSignUpForm(
    inputValues != "" ? inputValues : RESET_VALUES,
    addFranchiseStaff,
    validate
  ); 
  console.log('inputs',inputs)

  return (
    <div>
      <Dialog maxWidth="sm" open={open} TransitionComponent={Transition}>
        <from >
          <AppBar className={classes.appBar}>
            <Toolbar>            
              <Typography variant="h6" className={classes.title}>
                Edit Staff
              </Typography>
              <IconButton size="small" onClick={handleEditClose} className={styleClass.closeIcon}> x </IconButton>
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
              <Typography className={classes.heading}>Staff Details</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="first_name">First Name</InputLabel>
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
                      error={errors.email}
                      helperText={errors.email}
                      required
                      fullWidth
                      type="email"
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
                <Typography className={classes.heading}>Previous Employer Details</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="last_name">Name of Previous Company</InputLabel>
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
                      error={errors.pre_company_name}
                      helperText={errors.pre_company_name}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="last_name">Address of Previous Company</InputLabel>
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
                    <InputLabel  className={classes.textsize} htmlFor="contact">Contact# of Previous Company</InputLabel>
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
                  <InputLabel  className={classes.textsize} htmlFor="pre_position">Position/JobRole in Previous Company</InputLabel>
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
                      onChange={handleInputChange}
                      helperText={errors.pre_position}
                      onChange={handleInputChange}
                      required
                      fullWidth
                  />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="last_name">Work Experience (In Years)*</InputLabel>
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
                      value={inputs.employment_doc} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" className={classes.labelTitle}>
                        Last Uploaded Document :   
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <a href={c.API_URL + "/api/download?path=franchiseStaff/" + inputs.employment_docs }  download >{inputs.employment_docs}</a>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              className={classes.expansionTitle}
              expanded={expanded === 'panel3'}
              onChange={handleChange('panel3')}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls=""
                id="panel3a-header"
              >
                <Typography className={classes.heading}>Current Job Role</Typography>
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
                    <InputLabel className={classes.textsize} htmlFor="password">Password</InputLabel>
                    <TextField
                      margin="dense"
                      id="password"
                      name="password"
                      value={inputs.password} 
                      required
                      fullWidth
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <InputLabel  className={classes.textsize} htmlFor="assign_role">Assign Role</InputLabel>
                    <Select
                      multiple
                      value={assignRole}
                      onChange={handleChangeMultiple}
                      inputProps={{
                        name: 'assign_role',
                        id: 'assign_role',
                      }}
                      className={classes.textsize}
                      fullWidth
                      error={assignError}
                      helperText={assignError}
                      required
                    >
                      {role.map((ele,index) =>{ return( <MenuItem value={ele.id.toString()}>{ele.name}</MenuItem> ) })}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="is_active">Status</InputLabel>
                    <Select
                      value={inputs.is_active}
                      onChange={handleInputChange}
                      inputProps={{
                        name: 'is_active',
                        id: 'is_active',
                      }}
                      className={classes.textsize}
                      fullWidth                      
                      required
                    >
                      <MenuItem value={1}>{"Active"}</MenuItem>
                      <MenuItem value={0}>{"Inactive"}</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <Grid item xs={12} sm={12}>
              <Button variant="contained" onClick={handleSubmit} color="primary" className={classes.button} disabled = {savebtn === false}> Update </Button>
              <Button variant="contained" onClick={handleEditClose} color="primary" className={classes.button} > Close </Button>
            </Grid>
          </div>
        </from>
      </Dialog>
    </div>
  );
}
