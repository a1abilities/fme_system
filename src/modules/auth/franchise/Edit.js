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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ConfirmationDialog from '../ConfirmationDialog.js';
import LinearProgress from '@material-ui/core/LinearProgress';
import useSignUpForm from '../franchise/CustomHooks';
import validateEdit from '../../common/validation/FranchiseEditValidation';
import {useCommonStyles} from '../../common/StyleComman';

// API CALL
import UserAPI from '../../../api/User';
import LocationAPI from '../../../api/Location';

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
  user_name:'',
  uid: '',
  password: '',
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
  expansionTitle: {
    fontWeight: theme.typography.fontWeightBold,
  },
  button:{
    color:"white",
    fontSize: theme.typography.pxToRem(10),
    margin: theme.spacing(1),
  },
  closeIcon: {
    marginTop:theme.spacing(-3),
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  }
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Edit({open, handleEditClose, handleSnackbarClick,  inputValues, setFranchiseList, setFranchiseId}) {
  const classes = useStyles();
  const styleClass = useCommonStyles();
  const [cityList, setCityList] = useState([]);
  const [expanded, setExpanded] = React.useState('panel1');
  const [selectedArea, setSelectedArea] = useState([]);
  const [confirmation, setConfirmation] = React.useState(false);
  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(true);
  
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const LocationResult = await LocationAPI.list();
        setCityList(LocationResult.cityList);
        const result = await LocationAPI.arealist({
          city_name : inputValues.city,
          city_code : inputValues.city_code,
          suburb : inputValues.suburb,
        });
        setSelectedArea(result.selectedArea);
      } catch (error) {
        console.log('Error', error);
      }
    };
    fetchData();
  }, []);

  const handleStateChange = event => {
    const { name, value } = event.target
    console.log(name, value); 
    name =='state' && value =='4' ? setConfirmation(true) : 
    setInput(name,value)
  }

  function handleConfirmationDialog (response){
    setInput('state',response)
    setConfirmation(false);
  }

  
  const editFranchise = async () => {
    setpLoading(true);
    setSavebtn(false);
    const response = await UserAPI.add({
      id: inputs.franchise_id,
      city: inputs.city,
      suburb: inputs.suburb,
      franchise_name: inputs.franchise_name,
      city_code: inputs.city,
      abn: "1234",
      company_name: inputs.company_name,
      nbzn: inputs.nbzn,
      company_location: inputs.company_location,
      director_id: inputs.director_id,
      director: inputs.director,
      email: inputs.email,
      contact: inputs.contact,
      alt_contact: inputs.alt_contact,
      website: inputs.website,
      accountant_id: inputs.accountant_id,
      accountant_name: inputs.accountant_name,
      accountant_email: inputs.accountant_email,
      accountant_contact: inputs.accountant_contact,
      user_name : inputs.director,
      user_id: inputs.user_id,
      password: inputs.password,
      state: inputs.state,
      designation: "2",
      role_id: "2",
      company_id: inputs.company_id,
    });

    let franchiseIdTemp = [];

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
          status: data.state
        });
      }
    });

    setFranchiseId(franchiseIdTemp);    
    handleSnackbarClick(true,'Franchise Updated Successfully');
    setFranchiseList(response.userList);
    setpLoading(false);
    setSavebtn(true);
    handleEditClose(false);
  };



  
  const { inputs, handleNumberInput, handleInputChange, handleSubmit, setInput, errors } = useSignUpForm(
    inputValues,
    editFranchise,
    validateEdit
  );  
  


  return (
    <div>
      <Dialog maxWidth="sm" open={open} TransitionComponent={Transition}>
        <form > 
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Edit Franchise
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
              <Typography className={classes.heading}>Franchise Details</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                    <InputLabel className={classes.textsize} htmlFor="franchaise_name">Franchise Name *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="franchise_name"
                      name="franchise_name"
                      type="text"
                      value={inputs.franchise_name}
                      onChange={handleInputChange}
                      error={errors.franchise_name}
                      helperText={errors.franchise_name}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <InputLabel className={classes.textsize} htmlFor="status">Status *</InputLabel>
                    <Select
                      value={inputs.state}
                      onChange={handleStateChange}
                      inputProps={{
                        name: 'state',
                        id: 'state',
                      }}
                      margin="normal"
                      fullWidth
                       className={classes.textsize}
                    >
                    {inputs.state=== 1 ? <MenuItem className={classes.textsize} value={1}>Open</MenuItem> : ''}
                      <MenuItem className={classes.textsize} value={2}>Active</MenuItem>
                      <MenuItem className={classes.textsize} value={3}>Inactive</MenuItem>
                      <MenuItem className={classes.textsize} value={4}>Close</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <InputLabel className={classes.textsize} htmlFor="city">Select City *</InputLabel>
                    <Select
                      value={inputs.city}
                      onChange={handleInputChange} className={classes.textsize}
                      inputProps={{
                        name: 'city',
                        id: 'city',
                      }}
                      fullWidth
                      error={errors.city}
                      helperText={errors.city ? errors.city : ' '}
                      disabled
                    >
                      {cityList.length > 0 &&
                        cityList.map(data => {
                          return (
                            <MenuItem className={classes.textsize} value={data.city}>{data.city+ ' - ' + data.city_code}</MenuItem>
                          );
                        })}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <InputLabel className={classes.textsize} htmlFor="suburb_selection">Area *</InputLabel>
                    <Select
                      value={inputs.suburb}
                      onChange={handleInputChange} className={classes.textsize}
                      name= 'suburb'
                      id= 'suburb_selection'
                      fullWidth
                      error={errors.suburb}
                      helperText={errors.suburb ? errors.suburb : ' '}
                    >
                    {(selectedArea.length>0 ? selectedArea : []).map((area, index) => {
                        return(
                          <MenuItem className={classes.textsize} value={area.area_name}>{area.area_name}</MenuItem>
                        )
                      })
                    }

                    </Select>
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
                id="panel1a-header"
              >
                <Typography className={classes.heading}>Company Details</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <InputLabel className={classes.textsize} htmlFor="company_name">Company Name *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="company_name"
                      name="company_name"
                      value={inputs.company_name}
                      error={errors.company_name}
                      helperText={errors.company_name}
                      fullWidth
                      margin="dense"
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel className={classes.textsize} htmlFor="nbzn">Company NZBN *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="nbzn"
                      name="nbzn"
                      value={inputs.nbzn}
                      error={errors.nbzn}
                      helperText={errors.nbzn}
                      fullWidth
                      margin="dense"
                      type="text"                      
                      onChange={handleNumberInput}
                      onInput={(e)=>{ 
                        e.target.value =(e.target.value).toString().slice(0,13)
                    }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel className={classes.textsize} htmlFor="company_location">Company Location *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="company_location"
                      name="company_location"
                      value={inputs.company_location}
                      error={errors.company_location}
                      helperText={errors.company_location}
                      margin="dense"
                      fullWidth
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel className={classes.textsize} htmlFor="director">Director Name *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="director"
                      name="director"
                      value={inputs.director}
                      error={errors.director}
                      helperText={errors.director}
                      fullWidth
                      margin="dense"
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel className={classes.textsize} htmlFor="email">Email Address *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="email"
                      name="email"
                      value={inputs.email}
                      error={errors.email}
                      helperText={errors.email}
                      margin="dense"
                      type="email"
                      fullWidth
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel className={classes.textsize} htmlFor="contact">Contact # *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="contact"
                      name="contact"
                      value={inputs.contact}
                      error={errors.contact}
                      helperText={errors.contact}
                      margin="dense"
                      fullWidth
                      type="text"                      
                      onChange={handleNumberInput}
                      onInput={(e)=>{ 
                        e.target.value =(e.target.value).toString().slice(0,10)
                    }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel className={classes.textsize} htmlFor="alt_contact">Alternative #</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="alt_contact"
                      name="alt_contact"
                      value={inputs.alt_contact}
                      margin="dense"
                      fullWidth
                      onInput={(e)=>{ 
                        e.target.value =(e.target.value).toString().slice(0,10)
                    }}
                    type="text"                      
                    onChange={handleNumberInput}
                    />
                  </Grid>
                   
                  <Grid item xs={12} sm={4}>
                    <InputLabel className={classes.textsize} htmlFor="franchaise_name">Unique Id</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="user_id"
                      name="user_id"
                      margin="dense"
                      type="text"
                      value={inputs.user_id} 
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="password">Password</InputLabel>
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
                id="panel1a-header"
              >
                <Typography className={classes.heading}>Accountant Details</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={3}>
                    <InputLabel className={classes.textsize} htmlFor="accountant_name">Name *</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="accountant_name"
                      name="accountant_name"
                      value={inputs.accountant_name}
                      error={errors.accountant_name}
                      helperText={errors.accountant_name}
                      fullWidth
                      margin="dense"
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <InputLabel className={classes.textsize} htmlFor="accountant_email">Email Address*</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="accountant_email"
                      name="accountant_email"
                      value={inputs.accountant_email}
                      error={errors.accountant_email}
                      helperText={errors.accountant_email}
                      fullWidth
                      margin="dense"
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <InputLabel className={classes.textsize} htmlFor="accountant_contact">Contact #*</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="accountant_contact"
                      name="accountant_contact"
                      value={inputs.accountant_contact}
                      error={errors.accountant_contact}
                      helperText={errors.accountant_contact}                                            
                      fullWidth
                      margin="dense"                      
                      type="text"                      
                      onChange={handleNumberInput}
                      onInput={(e)=>{ 
                        e.target.value =(e.target.value).toString().slice(0,10)
                    }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <InputLabel className={classes.textsize} htmlFor="website">Website</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="website"
                      name="website"
                      value={inputs.website}
                      fullWidth
                      margin="dense"
                      onChange={handleInputChange}
                    />
                  </Grid>
                 
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            
            <Grid item xs={12} sm={12}>
            {savebtn? <Button variant="contained"  onClick={handleSubmit} color="primary" className={classes.button} >
                    Update
                  </Button> : <Button  variant="contained"  onClick={handleSubmit} color="primary" className={classes.button}  disabled>
                    Update
                  </Button>} 
                  <Button  variant="contained"   onClick={handleEditClose} color="primary" className={classes.button} >
                    Close
                  </Button>
                  </Grid>
          </div>
        </form>
      </Dialog>
      <ConfirmationDialog open = {confirmation} lastValue={4} handleConfirmationClose={handleConfirmationDialog}  currentState={inputs.state} title={"Close to Frachise ?"} content={"Do you really want to close the franchise ?"} />
    </div>
  );
}
