import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BusinessIcon from '@material-ui/icons/Home';
import FinanceIcon from '@material-ui/icons/Timeline';
import CustomerIcon from '@material-ui/icons/PersonAdd';
import DateRangeIcon from '@material-ui/icons/DateRange';
import TaskIcon from '@material-ui/icons/Assignment';
import LeadIcon from '@material-ui/icons/TouchApp';
import OrderIcon from '@material-ui/icons/Store';
import EnquiryIcon from '@material-ui/icons/DialerSip';
import MenuIcon from '@material-ui/icons/Menu';
import UpdateIcon from '@material-ui/icons/Update';
import FranchiseIcon from '@material-ui/icons/LocationCity';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StaffIcon from '@material-ui/icons/PersonPin';
import ProductIcon from '@material-ui/icons/AddShoppingCart';

import DeliveryIcon from '@material-ui/icons/LocalShipping';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/GroupAdd';
import PDFIcon from '@material-ui/icons/PictureAsPdf';
import TreeView from "@material-ui/lab/TreeView";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

import Button from '@material-ui/core/Button';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';

import MySnackbarContentWrapper from '../../common/MySnackbarContentWrapper';
import Franchise from '../franchise/Franchise';
import Product from '../category/ProductList';
import Staff from '../staff/Staff';
import FranchiseStaff from '../franchisestaff/FranchiseStaff';

import Customer from '../customer/CustomerList';
import Profile from '../setting/Profile';
import ChangePassword from '../setting/ChangePassword';
import Enquiry from '../enquiry/Enquiry';
import Lead from '../lead/Lead';
import Order from '../order/Order';
import FranchiseDetail from '../setting/FranchiseDetail';
import MainDashboard from './dashboard/MainDashboard';
import FinanceReport from './report/FinanceReport';
import DeliveryReport from './report/DeliveryReport';
import TaskList from '../task/TaskList';
import TaskReport from './report/TaskReport';
import AppointmentSystem from '../../auth/appointment/AppointmentHome'
import EzidebitStatus from '../order/EzidebitStatus';
import EditDiscountEMI from './options/admin/EditEMIDiscount.js';
import ProductManager from '../productManager/Home.js';
import Tab from './Tab';

// Helpers
import { APP_TOKEN } from '../../../api/Constants';
import { API_URL } from '../../../api/Constants';

// API CALL
import RoleAPI from '../../../api/franchise/Role';

import ViewAppointment from '../appointment/Components/ViewAppointment.js'
//import AppointmentHome from '../appointment/AppointmentHome.js'

import StyledTreeItem from './StyledTreeItem';
import EMICalculator from './Component/EMICalculator';


const drawerWidth = 220;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: theme.spacing(5),
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
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,        
  },
  fonttransform:{
    textTransform:"initial",
    color:"white",
    marginTop:theme.spacing(-3),
  },
  menu:{
    fontSize: theme.typography.pxToRem(14),
    color:"white",
    marginTop:theme.spacing(-3),
    textTransform:'initial'
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  },
  treeRoot: {
    flexGrow: 1,
    marginTop:theme.spacing(8),
    maxWidth: 250,
    minWidth: 200
  },
  
}));

export default function ClippedDrawer(props) {
  const roleName = APP_TOKEN.get().roleName;
  const roleId = APP_TOKEN.get().role_id;
  const userName = APP_TOKEN.get().userName;
  const franchiseId = APP_TOKEN.get().franchiseId;
  const userId = APP_TOKEN.get().userId;

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showFranchise, setShowFranchise] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showDashboard, setShowdashboard] = useState(roleName === 'Super Admin');
  const [showMasterStaff, setShowMasterStaff] = useState(false);
  const [showFranchiseStaff, setShowFranchiseStaff] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [showCustomer, setShowCustomer] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [showLead, setShowLead] = useState(false);
  const [leadData, setLeadData] = useState({});
  const [taskData, setTaskData] = useState({});
  const [showProfile, setShowProfile] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showFranchiseDetail, setShowFranchiseDetail] = useState(false);
  const [showStaff, setShowStaff] = useState(roleName === 'Admin');
  const [showOrder,setShowOrder] = useState(false);
  const [showFinanceReport, setShowFinanceReport]= useState(false);
  const [showDeliveryReport, setShowDeliveryReport]= useState(false);
  const [showCsrTaskReport, setShowCsrTaskReport]= useState(false);
  const [showPaymentStatus, setShowPaymentStatus]= useState(false);
  const [showAppointment, setShowAppointment] = useState(false);
  const [editEMIDiscountOpen, setEditEMIDiscountOpen]= useState(false);
  const [roles, setRoles] = useState([]);
  const [roleAs, setRoleAs]= useState('');
  const [role_Id, setRole_Id]= useState('');
  const [emiCalculatorOpen, setEmiCalculatorOpen] = useState (false);
  const [showProductManager, setShowProductManager] = useState (false);
  
  useEffect(()=>{
      const fetchData = async () => {
        try {
          const result = await RoleAPI.getAll();
          let roleArray = [];
          (result.role).map((role)=>{
            (roleId.split(',')).map((assignedRole)=>{
              if(role.id==assignedRole){                
                roleArray.push(role.name);
              }
            }); 
          });
          setRoles(roleArray);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
      handleDashboardClick();
  },[]);
  
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleMenuClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  function handleEmiCalculatorOpen() {
    setEmiCalculatorOpen(true);
  }

  function handleEmiCalculatorClose() {
    setEmiCalculatorOpen(false);
  }

  function handleEditEMIDiscountOpen({roleName, roleId}) {
    setEditEMIDiscountOpen(true);
  }

  function handleEditEMIDiscountClose() {
    setEditEMIDiscountOpen(false);
  }

  function handleDashboardClick(role, roleId){
    setRoleAs(role);
    setRole_Id(roleId);
    setShowFranchise(false);
    setShowStaff(false);
    setShowCategory(false);
    setShowMasterStaff(false);
    setShowFranchiseStaff(false);
    setShowProfile(false);
    setShowTask(false);
    setShowPwd(false);
    setShowCustomer(false);
    setShowEnquiry(false);
    setShowLead(false);
    setShowOrder(false);
    setShowFranchiseDetail(false);
    setShowFinanceReport(false);
    setShowDeliveryReport(false);
    
    setShowdashboard(true);
    setShowCsrTaskReport(false); 
    setShowPaymentStatus(false);
    setShowAppointment(false);
    setShowProductManager(false);
  }

  function handleProductManager(role, roleId) {
    setRoleAs(role);
    setRole_Id(roleId);
    setShowFranchise(false);
    setShowStaff(false);
    setShowCategory(false);
    setShowMasterStaff(false);
    setShowFranchiseStaff(false);
    setShowProfile(false);
    setShowTask(false);
    setShowPwd(false);
    setShowCustomer(false);
    setShowEnquiry(false);
    setShowLead(false);
    setShowOrder(false);
    setShowFranchiseDetail(false);
    setShowFinanceReport(false);
    setShowDeliveryReport(false);
    
    setShowdashboard(false);
    setShowCsrTaskReport(false); 
    setShowPaymentStatus(false);
    setShowAppointment(false);
    setShowProductManager(true);
  }


  function handleAppointmentClick(role, role_Id){
    setRoleAs(role);
    setShowFranchise(false);
    setShowStaff(false);
    setShowCategory(false);
    setShowMasterStaff(false);
    setShowFranchiseStaff(false);
    setShowProfile(false);
    setShowTask(false);
    setShowPwd(false);
    setShowCustomer(false);
    setShowEnquiry(false);
    setShowLead(false);
    setShowOrder(false);
    setShowFranchiseDetail(false);
    setShowFinanceReport(false);
    setShowDeliveryReport(false);
    setShowdashboard(false);
    setShowCsrTaskReport(false); 
    setShowPaymentStatus(false);
    setShowProductManager(false);
    setShowAppointment(true);
  }

  function handleFranchiseClick(role) {    
    setRoleAs(role);    
    setShowFranchise(true);
    setShowStaff(false);
    setShowCategory(false);
    setShowMasterStaff(false);
    setShowFranchiseStaff(false);
    setShowProfile(false);
    setShowTask(false);
    setShowPwd(false);
    setShowCustomer(false);
    setShowEnquiry(false);
    setShowLead(false);
    setShowOrder(false);
    setShowFranchiseDetail(false);
    setShowFinanceReport(false);
    setShowDeliveryReport(false);
    setShowdashboard(false);
    setShowCsrTaskReport(false); 
    setShowAppointment(false);
    setShowProductManager(false);
    
    setShowPaymentStatus(false);
  }

  function handleCategoryClick(role) {
    
    setRoleAs(role);
    setShowCategory(true);
    setShowFranchise(false);
    setShowMasterStaff(false);
    setShowStaff(false);
    setShowFranchiseStaff(false);
    setShowTask(false);
    setShowPwd(false);
    setShowProfile(false);
    setShowCustomer(false);
    setShowEnquiry(false);
    setShowLead(false);
    setShowOrder(false);
    setShowFranchiseDetail(false);
    setShowFinanceReport(false);
    setShowDeliveryReport(false);
    setShowdashboard(false);
    setShowCsrTaskReport(false); 
    setShowPaymentStatus(false);
    setShowProductManager(false);
    setShowAppointment(false);
  }

  function handleMasterStaffClick(role){
    
    setRoleAs(role);
    setShowMasterStaff(true);
    setShowFranchise(false);
    setShowCategory(false);
    setShowFranchiseStaff(false);
    setShowTask(false);
    setShowProfile(false);
    setShowPwd(false);
    setShowCustomer(false);
    setShowEnquiry(false);
    setShowLead(false);
    setShowOrder(false);
    setShowFranchiseDetail(false);
    setShowFinanceReport(false);
    setShowDeliveryReport(false);
    setShowdashboard(false);
    setShowCsrTaskReport(false); 
    setShowPaymentStatus(false);
    setShowAppointment(false);
    setShowProductManager(false);
    
  }

  function handleFranchiseStaffClick(role){
    
    setRoleAs(role);

    setShowFranchiseStaff(true);
    setShowMasterStaff(false);
    setShowFranchise(false);
    setShowCategory(false);
    setShowTask(false);
    setShowProfile(false);
    setShowPwd(false);
    setShowCustomer(false);
    setShowEnquiry(false);
    setShowLead(false);
    setShowOrder(false);
    setShowProductManager(false);
    setShowFranchiseDetail(false);
    setShowFinanceReport(false);
    setShowDeliveryReport(false);
    setShowdashboard(false);
    setShowCsrTaskReport(false); 
    setShowPaymentStatus(false);
    setShowAppointment(false);
    
  }
  
  function handleTaskClick(role, data){
    
    setRoleAs(role);
    setShowTask(true);
    setTaskData(data);
    setShowFranchiseStaff(false);
    setShowMasterStaff(false);
    setShowFranchise(false);
    setShowProductManager(false);
    setShowCategory(false);
    setShowProfile(false);
    setShowCustomer(false);
    setShowPwd(false);
    setShowEnquiry(false);
    setShowLead(false);
    setShowOrder(false);
    setShowFranchiseDetail(false);
    setShowFinanceReport(false);
    setShowDeliveryReport(false);
    setShowdashboard(false);
    setShowCsrTaskReport(false); 
    setShowPaymentStatus(false);
    
    setShowAppointment(false);
  }

  function handleProfileClick(role){
    
    setRoleAs(role);
    setShowProfile(true);
    setAnchorEl(null);
    setShowTask(false);
    setShowFranchiseStaff(false);
    setShowMasterStaff(false);
    setShowFranchise(false);
    setShowCategory(false);
    setShowCustomer(false);
    setShowPwd(false);
    setShowEnquiry(false);
    setShowLead(false);
    setShowOrder(false);
    setShowFranchiseDetail(false);
    setShowFinanceReport(false);
    setShowDeliveryReport(false);
    setShowdashboard(false);
    setShowCsrTaskReport(false); 
    setShowProductManager(false);
    setShowPaymentStatus(false);
    setShowAppointment(false);
    
  }
  function handleChangePasswordClick(role){
    
    setRoleAs(role);
    setShowPwd(true);
    setAnchorEl(null);
    setShowProfile(false);
    setShowTask(false);
    setShowFranchiseStaff(false);
    setShowMasterStaff(false);
    setShowFranchise(false);
    setShowCategory(false);
    setShowCustomer(false);
    setShowEnquiry(false);
    setShowLead(false);
    setShowProductManager(false);
    setShowOrder(false);
    setShowFranchiseDetail(false);
    setShowFinanceReport(false);
    setShowDeliveryReport(false);
    setShowdashboard(false);
    setShowCsrTaskReport(false); 
    setShowPaymentStatus(false);
    setShowAppointment(false);
    
  }

  function handleFranchiseDetailClick(role){
    
    setRoleAs(role);
    setShowFranchiseDetail(true);
    setShowPwd(false);
    setAnchorEl(null);
    setShowProfile(false);
    setShowTask(false);
    setShowFranchiseStaff(false);
    setShowMasterStaff(false);
    setShowFranchise(false);
    setShowCategory(false);
    setShowCustomer(false);
    setShowEnquiry(false);
    setShowLead(false);
    setShowOrder(false);
    setShowFinanceReport(false);
    setShowDeliveryReport(false);
    setShowdashboard(false);
    setShowCsrTaskReport(false); 
    setShowPaymentStatus(false);
    setShowAppointment(false);
    setShowProductManager(false);
  }

  function handleCustomerClick(role){
    setRoleAs(role);
    setShowCustomer(true);
    setShowTask(false);
    setShowFranchiseStaff(false);
    setShowMasterStaff(false);
    setShowFranchise(false);
    setShowCategory(false);
    setShowProfile(false);
    setShowPwd(false);
    setShowEnquiry(false);
    setShowLead(false);
    setShowOrder(false);
    setShowFranchiseDetail(false);
    setShowFinanceReport(false);
    setShowDeliveryReport(false);
    setShowdashboard(false);
    setShowProductManager(false);
    setShowCsrTaskReport(false); 
    setShowPaymentStatus(false);
    setShowAppointment(false);
    
  }
  
  function handleEnquiryClick(role){
    setRoleAs(role);

    setShowEnquiry(true);
    setShowCustomer(false);
    setShowTask(false);
    setShowFranchiseStaff(false);
    setShowMasterStaff(false);
    setShowFranchise(false);
    setShowCategory(false);
    setShowProfile(false);
    setShowPwd(false);
    setShowProductManager(false);
    setShowLead(false);
    setShowOrder(false);
    setShowFranchiseDetail(false);
    setShowFinanceReport(false);
    setShowDeliveryReport(false);
    setShowdashboard(false);
    setShowCsrTaskReport(false); 
    setShowPaymentStatus(false);
    setShowAppointment(false);
    

  }
  function handleLeadsClick(role, data){
    setRoleAs(role);    
    setShowLead(true);
    setLeadData(data);
    setShowEnquiry(false);
    setShowCustomer(false);
    setShowTask(false);
    setShowFranchiseStaff(false);
    setShowMasterStaff(false);
    setShowFranchise(false);
    setShowCategory(false);
    setShowProductManager(false);
    setShowProfile(false);
    setShowPwd(false);
    setShowOrder(false);
    setShowdashboard(false);
    setShowFranchiseDetail(false);
    setShowFinanceReport(false);
    setShowDeliveryReport(false);
    setShowCsrTaskReport(false); 
    setShowPaymentStatus(false);
    setShowAppointment(false);
  }

  function handleOrderClick(role){    
    setRoleAs(role);
    setShowOrder(true);
    setShowLead(false);
    setShowEnquiry(false);
    setShowCustomer(false);
    setShowProductManager(false);
    setShowTask(false);
    setShowFranchiseStaff(false);
    setShowMasterStaff(false);
    setShowFranchise(false);
    setShowCategory(false);
    setShowProfile(false);
    setShowPwd(false);
    setShowFranchiseDetail(false);
    setShowdashboard(false);
    setShowFinanceReport(false);
    setShowDeliveryReport(false);
    setShowCsrTaskReport(false); 
    setShowPaymentStatus(false);
    setShowAppointment(false);
    
  }

  function handleFinanceReportClick(role){    
    setRoleAs(role);
    setShowFinanceReport(true);
    setShowOrder(false);
    setShowLead(false);
    setShowEnquiry(false);
    setShowCustomer(false);
    setShowTask(false);
    setShowFranchiseStaff(false);
    setShowProductManager(false);
    setShowMasterStaff(false);
    setShowFranchise(false);
    setShowCategory(false);
    setShowProfile(false);
    setShowPwd(false);
    setShowFranchiseDetail(false);
    setShowdashboard(false);
    setShowDeliveryReport(false);
    setShowCsrTaskReport(false); 
    setShowPaymentStatus(false);
    setShowAppointment(false);
  }
  
  function handleDeliveryReportClick(role){    
    setRoleAs(role);
    setShowDeliveryReport(true);
    setShowOrder(false);
    setShowLead(false);
    setShowEnquiry(false);
    setShowCustomer(false);
    setShowTask(false);
    setShowFranchiseStaff(false);
    setShowMasterStaff(false);
    setShowProductManager(false);
    setShowFranchise(false);
    setShowCategory(false);
    setShowProfile(false);
    setShowPwd(false);
    setShowFranchiseDetail(false);
    setShowdashboard(false);
    setShowFinanceReport(false);   
    setShowCsrTaskReport(false); 
    setShowPaymentStatus(false);
    setShowAppointment(false);
    
  }
  
  function handleCsrTaskReportClick(role){    
    setRoleAs(role);
    setShowCsrTaskReport(true);
    setShowFinanceReport(false);
    setShowOrder(false);
    setShowProductManager(false);
    setShowLead(false);
    setShowEnquiry(false);
    setShowCustomer(false);
    setShowTask(false);
    setShowFranchiseStaff(false);
    setShowMasterStaff(false);
    setShowFranchise(false);
    setShowCategory(false);
    setShowProfile(false);
    setShowPwd(false);
    setShowFranchiseDetail(false);
    setShowdashboard(false);
    setShowDeliveryReport(false);
    setShowPaymentStatus(false);
    setShowAppointment(false);
    
  }

  function handlePaymentStatus(role){
    setRoleAs(role);
    setShowPaymentStatus(true);
    setShowCsrTaskReport(false);
    setShowFinanceReport(false);
    setShowOrder(false);
    setShowLead(false);
    setShowEnquiry(false);
    setShowCustomer(false);
    setShowProductManager(false);
    setShowTask(false);
    setShowFranchiseStaff(false);
    setShowMasterStaff(false);
    setShowFranchise(false);
    setShowCategory(false);
    setShowProfile(false);
    setShowPwd(false);
    setShowFranchiseDetail(false);
    setShowdashboard(false);
    setShowDeliveryReport(false);
    setShowAppointment(false);
    
  }
  

  handleCsrTaskReportClick
  function handleLogout() {
    APP_TOKEN.remove();
    props.history.push('/login');
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}  elevation={0}>
        <Toolbar>
          <Typography variant="h6" className={classes.title} noWrap>
            Welcome {userName.split(' ')[0]}
          </Typography>
          <Typography variant="h6" className={classes.title} noWrap>
            Welcome To FME
          </Typography>
          {roleName === 'Super Admin' ? 
            <Button color="inherit" className={classes.fonttransform} onClick={handleLogout}> Logout </Button>:
            <div>
              <Button aria-haspopup="true" style={{marginRight : '10px'}} className={classes.menu} onClick={handleEmiCalculatorOpen}> EMI Calculator </Button>
              <Button aria-controls="simple-menu" aria-haspopup="true" className={classes.menu} onClick={handleMenuClick}> Settings </Button>
                <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose} >
                  <MenuItem className={classes.textsize} onClick={handleProfileClick}>Profile</MenuItem>
                  <MenuItem className={classes.textsize} onClick={handleChangePasswordClick}>Change Password</MenuItem>
                  {roleName === 'Admin' && (  <MenuItem  className={classes.textsize} onClick={handleFranchiseDetailClick}>Franchise Details</MenuItem>)}
                  <MenuItem className={classes.textsize} onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {roles.find(role => role === 'Super Admin')
        ?
          <TreeView
            className={classes.treeRoot}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
          >

            {/* <StyledTreeItem nodeId="10" labelText="Appointment" color="#1a73e8" bgColor="#e8f0fe" labelIcon={BusinessIcon} onClick={(event) => { handleAppointmentClick('Super Admin', 1); }} />       */}

            <StyledTreeItem nodeId="1" labelText="Dashboard" color="#1a73e8" bgColor="#e8f0fe" labelIcon={BusinessIcon} onClick={(event) => { handleDashboardClick('Super Admin', 1); }} />            
            <StyledTreeItem nodeId="2" labelText="Manage Franchise"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={FranchiseIcon} onClick={(event) => { handleFranchiseClick('Super Admin'); }}/>
            <StyledTreeItem nodeId="3" labelText="Manage Product Catalogue"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={ProductIcon} onClick={(event) => { handleCategoryClick('Super Admin'); }}/>
            <StyledTreeItem nodeId="4" labelText="Manage Staff"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={StaffIcon} onClick={(event) => { handleMasterStaffClick('Super Admin'); }} />
            <StyledTreeItem nodeId="5" labelText="Manage Leads"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={LeadIcon} onClick={(event) => { handleLeadsClick('Super Admin'); }}/>
            <StyledTreeItem nodeId="33" labelText="Options"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={MenuIcon}>  
                <Tab roleName="Super Admin" roleId="1" nodeId="34" handleClick={handleEditEMIDiscountOpen} labelIcon={UpdateIcon} labelText="Update Discount"/>
            </StyledTreeItem>
          </TreeView>
         :<StyledTreeItem style={{"display": 'none'}} nodeId="2" labelText="" labelIcon={AccountCircleIcon} /> }

        {roles.find(role => role === 'Admin')
        ?
          <TreeView
            className={classes.treeRoot}
            // defaultExpanded={["3"]}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
          >
            {/* <StyledTreeItem nodeId="10" labelText="Appointment"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={BusinessIcon} onClick={(event) => { handleAppointmentClick('Admin'); }} />  */}
            <StyledTreeItem nodeId="1" labelText="Dashboard"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={BusinessIcon} onClick={(event) => { handleDashboardClick('Admin', 2); }} />            
            <StyledTreeItem nodeId="2" labelText="Manage Staff"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={StaffIcon} onClick={(event) => { handleFranchiseStaffClick('Admin'); }} />
            <StyledTreeItem nodeId="3" labelText="Manage Task"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={TaskIcon} onClick={(event) => { handleTaskClick('Admin'); }} />
            <StyledTreeItem nodeId="4" labelText="Manage Leads"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={LeadIcon} onClick={(event) => { handleLeadsClick('Admin'); }}/>
          </TreeView>
          :<StyledTreeItem style={{"display": 'none'}} nodeId="2" labelText="" labelIcon={AccountCircleIcon} /> }


        {roleId == 0
        ?
          <TreeView
            className={classes.treeRoot}
            // defaultExpanded={["3"]}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
          >
            {/* <StyledTreeItem nodeId="10" labelText="Appointment"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={BusinessIcon} onClick={(event) => { handleAppointmentClick('Master Staff'); }} />  */}
            <StyledTreeItem nodeId="1" labelText="Dashboard"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={BusinessIcon} onClick={(event) => { handleDashboardClick('Master Staff', 0); }} />            
            <StyledTreeItem nodeId="4" labelText="Manage Leads"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={LeadIcon} onClick={(event) => { handleLeadsClick('Master Staff'); }}/>
          </TreeView>
          :<StyledTreeItem style={{"display": 'none'}} nodeId="2" labelText="" labelIcon={AccountCircleIcon} /> }


        {roles.find(role => role === 'CSR' || role === 'Finance' || role === 'Delivery' || role === 'HR' || role === 'S&M')
        && ( 
          <TreeView
            className={classes.treeRoot}
            defaultExpanded={["1","2","3","4"]}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
          >
            {roles.find(role => role === 'S&M')
            ?
            <StyledTreeItem nodeId="1" labelText="Sales &amp; Marketing"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={PersonAddIcon}>
                 
                 <StyledTreeItem nodeId="35" labelText="Appointment Manager" color="#1a73e8" bgColor="#e8f0fe" labelIcon={DateRangeIcon} onClick={(event) => { handleAppointmentClick(); }} /> 

                <Tab roleName="S&M" roleId="7" nodeId="5" handleClick={handleDashboardClick} labelIcon={BusinessIcon} labelText="Dashboard"/>

                <Tab roleName="S&M" nodeId="6" handleClick={handleEnquiryClick} labelIcon={EnquiryIcon} labelText="Manage Enquiry"/> 

                <Tab roleName="S&M" nodeId="7" handleClick={handleLeadsClick} labelIcon={LeadIcon} labelText="Manage Leads"/> 

                <Tab roleName="S&M" nodeId="8" handleClick={handleTaskClick} labelIcon={TaskIcon} labelText="Manage Task"/> 

              </StyledTreeItem>
            :<StyledTreeItem style={{"display": 'none'}} nodeId="1" labelText="" labelIcon={AccountCircleIcon} /> 
            }


            {roles.find(role => role === 'CSR')
            ?  
              <StyledTreeItem nodeId="2" labelText="CSR"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={PersonAddIcon}>  
                
                 <StyledTreeItem nodeId="36" labelText="Appointment Manager" color="#1a73e8" bgColor="#e8f0fe" labelIcon={DateRangeIcon} onClick={(event) => { handleAppointmentClick(); }} />
                
                <Tab roleName="CSR" roleId="3" nodeId="9" handleClick={handleDashboardClick} labelIcon={BusinessIcon} labelText="Dashboard"/> 
                
                {/* <Tab roleName="CSR" roleId="3" nodeId="38" handleClick={handleProductManager} labelIcon={ShoppingCartIcon} labelText="Product Manager"/>  */}

                <Tab roleName="CSR" nodeId="10" handleClick={handleCustomerClick} labelIcon={CustomerIcon} labelText="Manage Customer"/> 
                   
                <Tab roleName="CSR" nodeId="11" handleClick={handleTaskClick} labelIcon={TaskIcon} labelText="Manage Task"/> 

                <Tab roleName="CSR" nodeId="12" handleClick={handleEnquiryClick} labelIcon={EnquiryIcon} labelText="Manage Enquiry"/> 

                <Tab roleName="CSR" nodeId="13" handleClick={handleLeadsClick} labelIcon={LeadIcon} labelText="Manage Leads"/> 
               
                <Tab roleName="CSR" nodeId="14" handleClick={handleOrderClick} labelIcon={OrderIcon} labelText="Manage Order"/> 
                
                <Tab roleName="CSR" nodeId="15" handleClick={handleCsrTaskReportClick} labelIcon={TaskIcon} labelText="Generate Task Report"/>

                <StyledTreeItem nodeId="16" labelText="Download Doc"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={PDFIcon}>  
                  <a href={API_URL + "/api/download?path=ApplicationFiles/CustomerDeclaration.pdf"} download  >
                    <StyledTreeItem nodeId="17" labelText="Customer Declaration"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={PDFIcon} />
                  </a>
                  <a href={API_URL + "/api/download?path=ApplicationFiles/EasyDebit.pdf"}  download >
                    <StyledTreeItem nodeId="18" labelText="EasyDebit Form"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={PDFIcon}/>
                  </a>
                  <a href={API_URL + "/api/download?path=ApplicationFiles/InsuranceForm.pdf"}  download >
                    <StyledTreeItem nodeId="19" labelText="Insurance Form"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={PDFIcon}/>
                  </a>
                  <a href={API_URL + "/api/download?path=ApplicationFiles/NoticeOfCancellation.pdf"}  download >
                    <StyledTreeItem nodeId="20" labelText="Notice of Cancellation "  color="#1a73e8" bgColor="#e8f0fe" labelIcon={PDFIcon}/>
                  </a>
                  <a href={API_URL + "/api/download?path=ApplicationFiles/Specification.pdf"}  download >
                    <StyledTreeItem nodeId="21" labelText="Specification"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={PDFIcon}/>
                  </a>

                </StyledTreeItem>
             
              </StyledTreeItem>
            :<StyledTreeItem style={{"display": 'none'}} nodeId="2" labelText="" labelIcon={AccountCircleIcon} /> 
            }

            {roles.find(role => role === 'Finance')            
              ?
              <StyledTreeItem nodeId="3" labelText="Finance"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={FinanceIcon}>  
                 
                 <StyledTreeItem nodeId="36" labelText="Appointment Manager" color="#1a73e8" bgColor="#e8f0fe" labelIcon={DateRangeIcon} onClick={(event) => { handleAppointmentClick(); }} />

                 <Tab roleName="Finance" roleId="4" nodeId="22" handleClick={handleDashboardClick} labelIcon={BusinessIcon} labelText="Dashboard"/> 
                 
                 {/* <Tab roleName="Finance" roleId="4" nodeId="39" handleClick={handleProductManager} labelIcon={ShoppingCartIcon} labelText="Product Manager"/>  */}

                 <Tab roleName="Finance" nodeId="23" handleClick={handleTaskClick} labelIcon={TaskIcon} labelText="Manage Task"/> 
              
                 <Tab roleName="Finance" nodeId="24" handleClick={handleLeadsClick} labelIcon={LeadIcon} labelText="Manage Leads"/> 

                 <Tab roleName="Finance" nodeId="25" handleClick={handleOrderClick} labelIcon={OrderIcon} labelText="Manage Order"/> 

                 <Tab roleName="Finance" nodeId="26" handleClick={handlePaymentStatus} labelIcon={TaskIcon} labelText="Ezidebit Status"/> 

                 <Tab roleName="Finance" nodeId="27" handleClick={handleFinanceReportClick} labelIcon={TaskIcon} labelText="Generate Report"/> 

              </StyledTreeItem>
            :<StyledTreeItem style={{"display": 'none'}} nodeId="3" labelText="" labelIcon={AccountCircleIcon} /> 
            }
            

            {roles.find(role => role === 'Delivery')
            ?
              <StyledTreeItem nodeId="4" labelText="Delivery"  color="#1a73e8" bgColor="#e8f0fe" labelIcon={DeliveryIcon}>  

                <StyledTreeItem nodeId="36" labelText="Appointment Manager" color="#1a73e8" bgColor="#e8f0fe" labelIcon={DateRangeIcon} onClick={(event) => { handleAppointmentClick(); }} />
                
                <Tab roleName="Delivery" roleId="6" nodeId="28" handleClick={handleDashboardClick} labelIcon={BusinessIcon} labelText="Dashboard"/> 

                <Tab roleName="Delivery" nodeId="29" handleClick={handleTaskClick} labelIcon={TaskIcon} labelText="Manage Task"/> 

                <Tab roleName="Delivery" nodeId="30" handleClick={handleLeadsClick} labelIcon={LeadIcon} labelText="Manage Leads"/> 

                <Tab roleName="Delivery" nodeId="31" handleClick={handleOrderClick} labelIcon={OrderIcon} labelText="Manage Order"/> 

                <Tab roleName="Delivery" nodeId="32" handleClick={handleDeliveryReportClick} labelIcon={TaskIcon} labelText="Generate Report"/> 

              </StyledTreeItem>
            :<StyledTreeItem style={{"display": 'none'}} nodeId="4" labelText="" labelIcon={AccountCircleIcon} /> 
            }
          </TreeView>
         )}  
      </Drawer>  

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {
          showFranchise ? <Franchise roleName={roleAs}/> : null
        }

        {
          showCategory ? <Product roleName={roleAs}/> : null
        }
        {
          showMasterStaff ? <Staff roleName={roleAs}/> : null
        }
        {
          showFranchiseStaff ? <FranchiseStaff  franchiseId={franchiseId} roleName={roleAs}/> : null
        }
        {
          showTask ? <TaskList roleName={roleAs} showTaskData={taskData} /> : null
        }
        {
          showCustomer ? <Customer roleName={roleAs}/> : null
        }
        {
          showProfile ? <Profile roleName={roleAs}/> : null
        }
        {
          showPwd ? <ChangePassword  franchiseId={franchiseId} roleName={roleAs}/> : null
        }        
        {
          showEnquiry ? <Enquiry roleName={roleAs}/>:null
        }
        {
          showLead ? <Lead roleName={roleAs} showLeadData={leadData} />:null
        }
        {
          showOrder ? <Order roleName={roleAs}/>:null
        }
        {
          showFranchiseDetail ? <FranchiseDetail roleName={roleAs}/>:null
        }
        {
          showDashboard ? <MainDashboard roleName={roleAs} roleId={role_Id}  handleLeadClick={handleLeadsClick} handleTaskClick={handleTaskClick} />:null
        }
        {
          showFinanceReport ? <FinanceReport roleName={roleAs} /> : null
        }
        {
          showDeliveryReport ? <DeliveryReport roleName={roleAs} /> : null
        }
        {
          showCsrTaskReport ? <TaskReport roleName={roleAs} /> : null
        }
        {
          showPaymentStatus ?  <EzidebitStatus roleName={roleAs} /> : null
        }    
        {
          emiCalculatorOpen ? <EMICalculator open = {emiCalculatorOpen} handleClose = {handleEmiCalculatorClose} /> : null
        }  
        {
          editEMIDiscountOpen ? <EditDiscountEMI open = {editEMIDiscountOpen} handleClose = {handleEditEMIDiscountClose}/>: null
        }
        {
          showAppointment ? <ViewAppointment />:null
        }
        {
          showProductManager ? <ProductManager roleName={roleAs}  /> : null 
        }
      </main>


      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MySnackbarContentWrapper
          onClose={handleSnackbarClose}
          variant="success"
          message="Frenchise Created successfully with Admin User!"
        />
      </Snackbar>
    </div>
  );
}

