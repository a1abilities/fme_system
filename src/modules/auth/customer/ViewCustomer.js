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
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Radio from "@material-ui/core/Radio";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from "@material-ui/core/FormControl";
import LinearProgress from '@material-ui/core/LinearProgress';
import {useCommonStyles} from '../../common/StyleComman'; 
import { APP_TOKEN } from '../../../api/Constants';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';

// API CALL
import Customer from '../../../api/franchise/Customer';
import useSignUpForm from '../franchise/CustomHooks';

const RESET_VALUES = {
  id: '',
  customer_name : '',
  address : '',
  city : '',
  postcode : '',
  telephone : '',  
  mobile : '',
  email : '',
  gender : '',
  is_working : '',
  dob : '',
  id_type : '',
  id_number: '',
  expiry_date : '',
  is_adult :'',
  id_proof : '',

  alt_c1_name:'',
  alt_c1_address:'',
  alt_c1_contact:'',
  alt_c1_relation:'',
  alt_c2_name: '',
  alt_c2_address: '',
  alt_c2_contact:'',
  alt_c2_relation:'',

  employer_name:'',
  employer_address:'',
  employer_telephone:'',
  employer_email:'',
  employer_tenure:'',
  updated_by : '',
  state: '',
  // is_active:1,
  // created_by: 1,
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
  drpdwn:{
    marginTop: theme.spacing(1),
    fontSize: theme.typography.pxToRem(12),
  },
  group: {
    // margin: theme.spacing(1, 0),
  },

}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function ViewCustomer({ open, handleClose, customerId}) {
  
  const styleClass = useCommonStyles();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('panel1');
  const [customerList, setDataCustomerList] = React.useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [idTypeList, setIdTypeList] = useState([]);
  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(true);


  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  
 
  
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const customer = await Customer.getSingleCustomer({customer_id: customerId});        
        setDataCustomerList(customer.customer[0]);

        const idType = await Customer.idtypelist();
        setIdTypeList(idType.idTypeList);

      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
    
  }, []);


  const editCustomer = async (e) => {
      e.preventDefault();

      setpLoading(true);
      setSavebtn(false);
      const data = {
      id: customerList.id,
      first_name : customerList.first_name,
      last_name : customerList.last_name,            
      address : customerList.address,
      suburb : customerList.suburb,
      city : customerList.city,
      postcode : customerList.postcode,
      telephone : customerList.telephone,  
      mobile : customerList.mobile,
      email : customerList.email,
      gender : customerList.gender,
      is_working : customerList.is_working,
      dob : customerList.dob,
      id_type :  customerList.id_type,
      id_number:  customerList.id_number,
      expiry_date :  customerList.expiry_date,
      is_adult : customerList.is_adult,
      id_proof :  customerList.id_proof,

      alt_c1_name: customerList.alt_c1_name,
      alt_c1_address: customerList.alt_c1_address,
      alt_c1_contact: customerList.alt_c1_contact,
      alt_c1_relation: customerList.alt_c1_relation,
      alt_c2_name:  customerList.alt_c2_name,
      alt_c2_address:  customerList.alt_c2_address,
      alt_c2_contact: customerList.alt_c2_contact,
      alt_c2_relation: customerList.alt_c2_relation,

      employer_name: customerList.employer_name,
      employer_address: customerList.employer_address,
      employer_telephone: customerList.employer_telephone,
      employer_email: customerList.employer_email,
      employer_tenure: customerList.employer_tenure,

      is_active: customerList.is_active,
      state : customerList.state,
      other_id_type: otherIdTypeValue,
    }

    let formData = new FormData();
    
    formData.append('data', JSON.stringify(data));
    
    for (var x = 0; x < document.getElementById('id_proof').files.length; x++) {
      formData.append('avatar', document.getElementById('id_proof').files[x])
    }

    const response = await Customer.register({ formData: formData });
    setCustomerList(response.customerList);
    setpLoading(false);
    setSavebtn(true);
    handleClose(false);
  };


const handleInputChange = event => {
  const { name, value } = event.target
  setDataCustomerList({ ...customerList, [name]: value })
}

function handleIdType(event){
  if(event.target.value===0){
    setOtherIdType(false)
  }else{
    setOtherIdType(true)
    setOtherIdTypeValue('');
  }
  setDataCustomerList({...customerList,  id_type: event.target.value});
  }


return (
    <div>
      <Dialog maxWidth="sm" open={open} TransitionComponent={Transition}>
        <form > 
          <AppBar className={classes.appBar}>
            <Toolbar>
              
              <Typography variant="h6" className={classes.title}>
                Customer Detail
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
                <Typography className={classes.heading}>Personal Details</Typography>
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
                      value={customerList.first_name}
                      onChange={handleInputChange}                      
                      fullWidth
                      required
                      type="text"
                      margin="dense"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="last_name">Last Name *</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="last_name"
                      name="last_name"
                      value={customerList.last_name}
                      onChange={handleInputChange}                     
                      fullWidth
                      required
                      type="text"
                      margin="dense"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize} htmlFor="address">Address *</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="address"
                      name="address"
                      // label="Address"
                      type="text"
                      value={customerList.address} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="suburb">Suburb *</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="suburb"
                      name="suburb"
                      type="text"
                      value={customerList.suburb}                       
                      onChange={handleInputChange}
                      required
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize} htmlFor="city">City *</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="city"
                      name="city"
                      // label="City"
                      type="text"
                      value={customerList.city} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize} htmlFor="postcode">Postcode *</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="postcode"
                      name="postcode"
                      // label="Postcode"
                      type="text"
                      value={customerList.postcode}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize} htmlFor="telephone">Telephone</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="telephone"
                      name="telephone"
                      // label="Telephone"
                      type="text"
                      value={customerList.telephone} 
                      onChange={handleInputChange}
                      required= {customerList.mobile==='' ? true : false}
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize} htmlFor="mobile">Mobile *</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="mobile"
                      name="mobile"
                      // label="Mobile"
                      type="text"
                      value={customerList.mobile} 
                      onChange={handleInputChange}
                      required = {customerList.telephone===''?true : false}
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize} htmlFor="email">Email Id *</InputLabel>
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
                      value={customerList.email} 
                      onChange={handleInputChange}
                      required
                      disabled
                      fullWidth
                      type="email"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {console.log(customerList.gender)}
                    <InputLabel className={classes.textsize} htmlFor="gender">Gender *</InputLabel>
                    <RadioGroup
                      id = "gender"
                      name="gender"
                      className={classes.group}                      
                      value={customerList.gender == 'female' ? 'female' : customerList.gender== 'male' ? 'male' : ''}
                      row
                    >
                      <FormControlLabel labelPlacement="start" value="female"  control={<Radio color="primary" />} label="Female" disabled />
                      <FormControlLabel labelPlacement="start" value="male"  control={<Radio color="primary" />} label="Male" disabled />
                    </RadioGroup>
                    
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize} htmlFor="is_working">Are you working? *</InputLabel>
                    <RadioGroup 
                      aria-label="is_working" 
                      name="is_working" 
                      className={classes.group}
                      value={parseInt(customerList.is_working)} 
                      onChange={handleInputChange} 
                      row
                      disabled
                    >
                      <FormControlLabel value={1}  control={<Radio color="primary" />} label="Yes" labelPlacement="start" disabled />
                      <FormControlLabel value={0}  control={<Radio color="primary" />} label="No" labelPlacement="start" disabled />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize} htmlFor="dob">Date Of Birth *</InputLabel>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        autoOk
                        variant = "inline"
                        margin="dense"
                        id="dob"
                        name="dob"
                        format="dd/MM/yyyy"
                        disableFuture = {true}
                        value={customerList.dob}
                        fullWidth 
                        InputProps={{
                          classes: {
                            input: classes.textsize,
                          },
                        }}
                        disabled
                      />
                    </MuiPickersUtilsProvider>
                    
                    {customerList.is_adult === 1 && customerList.dob != "" ?  <p className={classes.dobMsg} style={{'color':'#75C019'}} A2B631>Person is over 18 year</p> 
                    :customerList.is_adult === 0 && customerList.dob != ""  ?  <p className={classes.dobMsg} style={{'color':'#F5BB00'}}>Person is not over 18 year</p>
                    : ''}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize} htmlFor="id_type">ID Proof *</InputLabel>
                    <Select
                        margin="dense"
                        name="id_type"
                        onChange = {handleIdType}
                        value={parseInt(customerList.id_type)}
                        name = 'id_type'
                        id = 'id_type'
                        className={classes.drpdwn}
                        fullWidth
                        label="Select Id Proof"
                        required
                        disabled
                      >
                        {
                          
                          ( idTypeList.length > 0 ? idTypeList : []).map((ele,index) => {
                            return(
                                <MenuItem value={ele.id}>{ele.name}</MenuItem>    
                            )
                          })
                        }
                    </Select>
                    </Grid>
                   
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize} htmlFor="id_number">Id# *</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="id_number"
                      name="id_number"
                      type="text"
                      value={customerList.id_number} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize} htmlFor="expiry_date">Expiry Date</InputLabel>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        autoOk
                        variant = "inline"
                        margin="dense"
                        id="expiry_date"
                        name="expiry_date"
                        format="dd/MM/yyyy"
                        value={customerList.expiry_date}
                        fullWidth 
                        InputProps={{
                          classes: {
                            input: classes.textsize,
                          },
                        }}
                        disabled                                               
                      />
                    </MuiPickersUtilsProvider>   
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize} htmlFor="id_proof">Upload Copy of Selected ID *</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="id_proof"
                      name="id_proof"
                      type="file"
                      onChange={handleInputChange}
                      fullWidth
                      disabled
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
                <Typography className={classes.heading}>Alternate Contact Details</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12}>
                    <Typography className={classes.heading}>Alternate Contact Details #1</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize} htmlFor="alt_c1_name">Name *</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="alt_c1_name"
                      name="alt_c1_name"
                      type="text"
                      value={customerList.alt_c1_name} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize} htmlFor="alt_c1_address">Address *</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="alt_c1_address"
                      name="alt_c1_address"
                      type="text"
                      value={customerList.alt_c1_address} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize} htmlFor="contact">Contact# *</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="alt_c1_contact"
                      name="alt_c1_contact"
                      type="text"
                      value={customerList.alt_c1_contact} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                      disabled
                    />
                  </Grid>
              
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize} htmlFor="alt_c1_relation">Relationship To You *</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="alt_c1_relation"
                      name="alt_c1_relation"
                      type="text"
                      value={customerList.alt_c1_relation} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Typography className={classes.heading}>Alternate Contact Details #2</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize} htmlFor="alt_c2_name">Name *</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="alt_c2_name"
                      name="alt_c2_name"
                      // label="Name"
                      type="text"
                      value={customerList.alt_c2_name} 
                      onChange={handleInputChange}
                      required
                      disabled
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize} htmlFor="alt_c2_address">Address *</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="alt_c2_address"
                      name="alt_c2_address"
                      // label="Address"
                      type="text"
                      value={customerList.alt_c2_address} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize} htmlFor="alt_c2_contact">Contact# *</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="alt_c2_contact"
                      name="alt_c2_contact"
                      type="text"
                      value={customerList.alt_c2_contact} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                      disabled
                    />
                  </Grid>
              
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize} htmlFor="alt_c2_relation">Relationship To You *</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="alt_c2_relation"
                      name="alt_c2_relation"
                      type="text"
                      value={customerList.alt_c2_relation} 
                      onChange={handleInputChange}
                      required
                      disabled
                      fullWidth
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
                id="panel3a-header"
              >
                <Typography className={classes.heading}>Income Details</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize} htmlFor="employer_name">{customerList.is_working == 1 ? "Employer Name *" : "Beneficiary Name *" }</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="employer_name"
                      name="employer_name"
                      type="text"
                      value={customerList.employer_name} 
                      onChange={handleInputChange}
                      required
                      disabled
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize} htmlFor="employer_address">{customerList.is_working == 1 ? "Employer Address " : "Beneficiary Address" }</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="employer_address"
                      name="employer_address"
                      type="text"
                      value={customerList.employer_address} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize} htmlFor="employer_telephone">{customerList.is_working == 1 ? "Employer Telephone#" : "Beneficiary Telephone#" }</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="employer_telephone"
                      name="employer_telephone"
                      type="text"
                      value={customerList.employer_telephone} 
                      onChange={handleInputChange}
                      required
                      disabled
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize} htmlFor="employer_email">Email Id</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="employer_email"
                      name="employer_email"
                      type="email"
                      disabled
                      value={customerList.employer_email} 
                      onChange={handleInputChange}
                      required
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel className={classes.textsize} htmlFor="employer_tenure">{customerList.is_working == 1 ? "Tenure of Employer(in Years) *" : "Tenure with Beneficiary(in Years) *" }</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id="employer_tenure"
                      name="employer_tenure"
                      type="text"
                      value={customerList.employer_tenure} 
                      onChange={handleInputChange}
                      required
                      disabled
                      fullWidth
                    />
                  </Grid>
                 
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
