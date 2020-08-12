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
import {TabPanel} from '../../common/TabPanel.js';
import Loader from '../../common/Loader.js';

// Page Component
import All from './Component/All.js';
import CSR from './Component/CSR.js';
import Finance from './Component/Finance.js';
import Delivery from './Component/Delivery.js';
import HR from './Component/HR.js';
import SNM from './Component/SNM.js';
import InactiveUser from  './Component/InactiveUser.js';



const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
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


export default function FranchiseStaff({roleName}) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [staffData, setStaffData]= useState({});
  
  const [staffList, setStaffList] = useState([]);
  const [role, setRole] = useState([]);
  const [searchText, setSearchText]  = useState('');
  const [value, setValue] = React.useState(0);
  const [tabsCount, setTabsCount] = React.useState([]);
  
  
  const roleData = async () => {
    try {
      const result = await Role.list();
      setRole(result.role);
    } catch (error) {
      console.log("Error",error);
    }
  };

  useEffect(() => {   
    roleData();
  }, []);

  
  useEffect(() => {
    fetchStaffList();
  }, [value]);


  
  const fetchStaffList = async () => {
    setIsLoading(true);
    try {
      const result = await Staff.list({
        tabValue : value,
        searchText : searchText,
      });
      setTabsCount(result.tabCounts[0]);
      setStaffList(result.staffList);
    } catch (error) {
      console.log('error...', error);
    }
    setSearchText('');
    setIsLoading(false); 
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

  function handleClickEditOpen(data) {
    setStaffData(data);
    setEditOpen(true);
  }

  
  return (
    <div>
      <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Fab variant="extended" size="small" className={classes.fonttransform} onClick={handleClickOpen} >
              <AddIcon className={classes.extendedIcon} /> Organisation Staff
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
                    fetchStaffList()
                    ev.preventDefault();
                  }
                }}
                onChange={handleSearchText}
                InputProps={{
                  endAdornment: <InputAdornment position='end'>
                                  <Tooltip title="Search">
                                    <IconButton onClick={ fetchStaffList}><SearchIcon /></IconButton>
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
                  <Tab label={<BadgeComp count={tabsCount.total} label="All" />} />
                  <Tab label={<BadgeComp count={tabsCount.csr} label=" 	Executive 1 	" />} />
                  <Tab label={<BadgeComp count={tabsCount.finance} label=" 	Executive 2" />} />
                  <Tab label={<BadgeComp count={tabsCount.delivery} label=" 	Executive 3" />} />                  
                  <Tab label={<BadgeComp count={tabsCount.hr} label=" 	Executive 4" />} />
                  <Tab label={<BadgeComp count={tabsCount.snm} label=" 	Executive 5" />} />
                  <Tab label={<BadgeComp count={tabsCount.inactive_staff} label="Inactive Staff" />} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                {value === 0 && <All staffList={staffList}  roles={role} handleClickEditOpen={handleClickEditOpen} roleName={roleName} />}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {value === 1 && <CSR staffList={staffList}  roles={role} handleClickEditOpen={handleClickEditOpen} roleName={roleName} />}
              </TabPanel>
              <TabPanel value={value} index={2}>
                {value === 2 && <Finance staffList={staffList}  roles={role} handleClickEditOpen={handleClickEditOpen} roleName={roleName} />}
              </TabPanel>
              <TabPanel value={value} index={3}>
                {value === 3 && <Delivery staffList={staffList}  roles={role} handleClickEditOpen={handleClickEditOpen} roleName={roleName} />}
              </TabPanel>
              <TabPanel value={value} index={4}>
                {value === 4 && <HR staffList={staffList}  roles={role} handleClickEditOpen={handleClickEditOpen} roleName={roleName} />}
              </TabPanel>
              <TabPanel value={value} index={5}>
                {value === 5 && <SNM staffList={staffList}  roles={role} handleClickEditOpen={handleClickEditOpen} roleName={roleName} />}
              </TabPanel>
              <TabPanel value={value} index={6}>
                {value === 6 && <InactiveUser staffList={staffList}  handleClickEditOpen={handleClickEditOpen} roles={role} roleName={roleName} />}
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      {open? <Add open={open} setOpen={setOpen} setIsLoading ={setIsLoading} fetchStaffList={fetchStaffList} role={role} /> :null}
      {editOpen ? <Edit open={editOpen} setEditOpen={setEditOpen} setIsLoading ={setIsLoading} fetchStaffList={fetchStaffList}  role={role} inputValues={staffData} /> : null}
      {isLoading ? <Loader /> : null}
    </div>
  );
}
