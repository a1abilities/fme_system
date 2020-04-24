import React, { useState, useEffect } from 'react';
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
import Paper from '@material-ui/core/Paper';
import useSignUpForm from '../franchise/CustomHooks';
import {useCommonStyles} from '../../common/StyleComman'; 
import validate from '../../common/validation/StaffRuleValidtion';

// API CALL
import StaffMaster from '../../../api/StaffMasterAdmin';

const RESET_VALUES = {
  id: '',
  first_name: '',
  last_name:'',
  location:'',
  contact:'',
  email:'',
  position:[],
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
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  },    
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Edit({open, handleEditClose, handleSnackbarClick,  inputValues, setFranchiseList, positions}) {
  const classes = useStyles();
  const styleClass = useCommonStyles();
    
  useEffect(() => {
    let assignRoleList = [];
    (inputValues.position.toString().split(',')).map((role,index) =>{
      assignRoleList.push(role);
    });
    setInput('position',assignRoleList);
  }, []);

  const addStaffMaster = async () => {
    const response = await StaffMaster.register({
      id: inputs.id,
      first_name: inputs.first_name,
      last_name:inputs.last_name,
      location:inputs.location,
      contact:inputs.contact,
      email:inputs.email,
      password: inputs.password,
      position: inputs.position.join(),
      created_by: 1,
    });
      handleSnackbarClick(true,'Franchise Updated Successfully');
      setFranchiseList(response.staffList);
      handleEditClose(false);
  };

  const { inputs, handleInputChange, handleNumberInput, handleSubmit, setInput, errors } = useSignUpForm(
    inputValues != "" ? inputValues : RESET_VALUES,
    addStaffMaster,
    validate
  ); 
  
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
                      required
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
                      onInput={(e)=>{ 
                        e.target.value =(e.target.value).toString().slice(0,10)
                    }}
                      helperText={errors.contact}
                      required
                      fullWidth
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
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <InputLabel  className={classes.textsize} htmlFor="city">Position *</InputLabel>
                    <Select
                      multiple
                      value={inputs.position}
                      onChange={handleInputChange}
                      inputProps={{
                        name: 'position',
                        id: 'position',
                      }}
                      error={errors.position}
                      helperText={errors.position}
                      fullWidth className={classes.textsize}
                      required
                    > 
                      {
                        positions.map(ele =>{
                          return( <MenuItem className={classes.textsize} value={ele.id.toString()}>{ele.position}</MenuItem> )
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
                  <Grid item xs={6} sm={6}>
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
                      fullWidth
                      disabled
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={12}>
                    <Button variant="contained"  onClick={handleSubmit} color="primary" className={classes.button} >
                      Update
                    </Button>  
                    <Button  variant="contained"   onClick={handleEditClose} color="primary" className={classes.button} >
                      Close
                    </Button>
                </Grid>
                </Grid>
              </Paper>
          </div>
        </from>
      </Dialog>
    </div>
  );
}
