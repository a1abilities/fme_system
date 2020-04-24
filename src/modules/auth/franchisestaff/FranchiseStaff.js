import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { APP_TOKEN } from '../../../api/Constants';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';

import Add from './Add';
import Edit from './Edit';

// API CALL
import Staff from '../../../api/franchise/Staff';
import Role from '../../../api/franchise/Role';

import BadgeComp from '../../common/BadgeComp';

// Page Component
import All from './Component/All.js';
import CSR from './Component/CSR.js';
import Finance from './Component/Finance.js';
import Delivery from './Component/Delivery.js';
import HR from './Component/HR.js';
import SNM from './Component/SNM.js';
import InactiveUser from  './Component/InactiveUser.js';






const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    // width: 1010
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    fontSize: theme.typography.pxToRem(14),
    color:"white",
    marginTop:theme.spacing(-3),
  },
  button:{
    color:"white",
  fontSize: theme.typography.pxToRem(10),
    marginRight: theme.spacing(2),
    padding:theme.spacing(2),
    borderRadius: theme.spacing(7),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  fonttransform:{
    textTransform:"initial",
    fontSize: theme.typography.pxToRem(13),
  },
  drpdwn:{
    color: 'white',
    fontSize: theme.typography.pxToRem(13),
  },
  padding: {
    padding: theme.spacing(0, 2),
  },
  icon: {
    fill: 'white',
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
    color: 'white',
  }
}));


TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}


export default function FranchiseStaff({franchiseId, roleName}) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [staffData,setStaffData]= useState();
  const [staffList, setStaffList] = useState({});
  const [role, setRole] = useState([]);
  const [searchText, setSearchText]  = useState('');
  
  const [allTab, setAllTab] = useState([]);
  const [csrTab,setCsrTab] = useState([]);
  const [financeTab,setFinanceTab] = useState([]);
  const [deliveryTab,setDeliveryTab] = useState([]);
  const [hrTab,setHrTab] = useState([]);
  const [snmTab,setSnmTab] = useState([]);
  const [inactiveUserTab, setInactiveUserTab] = useState([]);

  const [value, setValue] = React.useState(0);
  
  useEffect(() => {    
    fetchData(); 
    roleData();
  }, []);

  const roleData = async () => {      
    try {
      const result = await Role.list();
      setRole(result.role);
    } catch (error) {
      console.log("Error",error);
    }
  };

  const fetchData = async () => {    
    try {
      const result = await Staff.list({});
      setStaffList(result.staffList);
      handleTabsData(result.staffList);
    } catch (error) {
      console.log('error...', error);
    }
  };
  
   
  function handleTabChange(event, newValue) {
    setValue(newValue);    
  }

  function handleSearchText(event){
    setSearchText(event.target.value);
  }

  function handleClickOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  function handleClickEditOpen(data) {
    setStaffData(data),
    setEditOpen(true);
  }
  function handleEditClose() {
    setEditOpen(false);
  }
  
  function setFranchiseListFn(response) {
    setStaffList(response);    
    handleTabsData(response);
  }
  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  function handleSnackbarClick() {
    setSnackbarOpen(true);
  }

 
  function handleTabsData(staff){
    let allActive = [];
    let CSR = [];
    let Finance = [];
    let Delivery = [];
    let HR = [];
    let SNM = [];
    let InactiveUser = [];

    if(staff != undefined && staff != null){
      (staff.length > 0 ? staff : []).map((data, index) =>{
        if(data.is_active === 1){
          allActive.push(data);
        }
        if((data.role.split(',')).find(ele => ele === '3') == '3' && data.is_active === 1){
          CSR.push(data);
        }
        if((data.role.split(',')).find(ele => ele === '4') == '4' && data.is_active === 1){
          Finance.push(data);
        }
        if((data.role.split(',')).find(ele => ele === '5') == '5' && data.is_active === 1){
          Delivery.push(data);
        }
        if((data.role.split(',')).find(ele => ele === '6') == '6' && data.is_active === 1){
          HR.push(data);
        }
        if((data.role.split(',')).find(ele => ele === '7') == '7' && data.is_active === 1){
          SNM.push(data);
        }
        if(data.is_active === 0){
          InactiveUser.push(data);
        }
      });
    }
    setAllTab(allActive);
    setCsrTab(CSR);
    setFinanceTab(Finance);
    setDeliveryTab(Delivery);
    setHrTab(HR);
    setSnmTab(SNM);
    setInactiveUserTab(InactiveUser);
  }

  const searchHandler = async () => {
    try {
      if(searchText!=''){
          const result = await Staff.search({searchText: searchText});
          setStaffList(result.staffList);
          setSearchText('');
          handleTabsData(result.staffList);
      }else{
        const result = await Staff.list({});
        setStaffList(result.staffList);
        setSearchText('');
        handleTabsData(result.staffList);
      }
    } catch (error) { console.log('error',error); }
  }

  return (
    <div>
      <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Fab variant="extended" size="small" className={classes.fonttransform} onClick={handleClickOpen} >
              <AddIcon className={classes.extendedIcon} /> Franchise Staff
            </Fab>
          </Grid>
          <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                id="search"
                name="search"
                autoComplete='off'
                placeholder = "Type (UserId/First Name/Last Name/Location/Email/Contact) to Search Staff..."
                type="text"
                value={searchText} 
                onKeyPress={(ev) => {
                  if (ev.key ===  'Enter') {
                    searchHandler()
                    ev.preventDefault();
                  }
                }}
                onChange={handleSearchText}
                InputProps={{
                  endAdornment: <InputAdornment position='end'>
                                  <Tooltip title="Search">
                                    <IconButton onClick={ searchHandler}><SearchIcon /></IconButton>
                                  </Tooltip>
                                </InputAdornment>,
                }}
                fullWidth
              />              
          </Grid>
          
          <Grid item xs={12} sm={12}>
            <Paper style={{ width: '100%' }}>
              <AppBar position="static"  className={classes.appBar}>
                <Tabs value={value} onChange={handleTabChange} className={classes.textsize} variant="scrollable" scrollButtons="auto">
                  <Tab label={<BadgeComp count={allTab.length} label="All" />} />
                  <Tab label={<BadgeComp count={csrTab.length} label="CSR" />} />
                  <Tab label={<BadgeComp count={financeTab.length} label="Finance" />} />
                  <Tab label={<BadgeComp count={deliveryTab.length} label="Delivery" />} />                  
                  <Tab label={<BadgeComp count={hrTab.length} label="HR" />} />
                  <Tab label={<BadgeComp count={snmTab.length} label="S&amp;M" />} />
                  <Tab label={<BadgeComp count={inactiveUserTab.length} label="Inactive Staff" />} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                {allTab && <All staffList={allTab}  roles={role} handleClickEditOpen={handleClickEditOpen} roleName={roleName} />}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {csrTab && <CSR staffList={csrTab}  roles={role} handleClickEditOpen={handleClickEditOpen} roleName={roleName} />}
              </TabPanel>
              <TabPanel value={value} index={2}>
                {financeTab && <Finance staffList={financeTab}  roles={role} handleClickEditOpen={handleClickEditOpen} roleName={roleName} />}
              </TabPanel>
              <TabPanel value={value} index={3}>
                {deliveryTab && <Delivery staffList={deliveryTab}  roles={role} handleClickEditOpen={handleClickEditOpen} roleName={roleName} />}
              </TabPanel>
              <TabPanel value={value} index={4}>
                {hrTab && <HR staffList={hrTab}  roles={role} handleClickEditOpen={handleClickEditOpen} roleName={roleName} />}
              </TabPanel>
              <TabPanel value={value} index={5}>
                {snmTab && <SNM staffList={snmTab}  roles={role} handleClickEditOpen={handleClickEditOpen} roleName={roleName} />}
              </TabPanel>
              <TabPanel value={value} index={6}>
                {inactiveUserTab && <InactiveUser staffList={inactiveUserTab}  handleClickEditOpen={handleClickEditOpen} roles={role} roleName={roleName} />}
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      {open? <Add open={open} handleClose={handleClose} handleSnackbarClick={handleSnackbarClick} franchiseId={franchiseId.franchiseId} role={role} setFranchiseList={setFranchiseListFn} /> :null}
      {editOpen ? <Edit open={editOpen} handleEditClose={handleEditClose} handleSnackbarClick={handleSnackbarClick} franchiseId={franchiseId.franchiseId} role={role} inputValues={staffData} setFranchiseList={setFranchiseListFn} /> : null}
    </div>
  );
}
