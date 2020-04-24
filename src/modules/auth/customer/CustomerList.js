import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles, fade } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tooltip from '@material-ui/core/Tooltip';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';


// API CALL
import Customer from '../../../api/franchise/Customer';
import Order from '../../../api/franchise/Order';
import { APP_TOKEN } from '../../../api/Constants';

// Components
import Active from './components/Active';
import Hold from './components/Hold';
import FinancialHardship from './components/FinancialHardship';
import BornToday from './components/BornToday';
import MissedPayment from './components/MissedPayment';

import Add from './Add';
import Edit from './Edit';
import EditBudget from '../order/EditBudget';
import CustomerBankDetails from './CustomerBankDetails';
import ViewOrder from '../order/Edit';
import Loader from '../../common/Loader.js';
import CommentView from './CommentView';
import BadgeComp from '../../common/BadgeComp';
import BudgetHistory from '../order/BudgetHistory';
import { getDate} from '../../../utils/datetime';
import {TabPanel} from '../../common/TabPanel.js'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  tableWrapper: {
    maxHeight: 800,
    overflow: 'auto',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,    
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
   padding: {
    padding: theme.spacing(0, 2),
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
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  fonttransform:{
    textTransform:"initial",
    fontSize: theme.typography.pxToRem(13),
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
    color: 'white',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    backgroundColor:'gray',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
}));



export default function CustomerList({roleName}) {  
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [customerListData, setCustomerListData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [searchText, setSearchText]  = useState('');



  const [budgetOpen, setBudgetOpen] = useState(false);
  const [budgetList,setBudgetList] = useState(null);
  const [totalBudgetList,setTotalBudgetList] = useState(null);  
  const [customerId, setCustomerId] = useState();
  const [budgetHistoryOpen,setBudgetHistoryOpen] = useState(false);
  const [openCommentView, setOpenCommentView]  = useState(false);
  const [value, setValue] = React.useState(0); 
  const [bankDetailOpen, setBankDetailOpen] = useState(false);
  const [bankDetailArray, setBankDetailArray] = useState([]);

  const [tabsCount, setTabsCount] = useState({});
  
  const [editableData,setEditableData] = useState({});
  const [viewOrder,setViewOrder] = useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };
      
  console.log(searchText)
  useEffect(() => {   
    fetchCustomerList();
  }, [page, rowsPerPage, value]);


  const fetchCustomerList = async () => {
    setIsLoading(true);
    try {
      const result = await Customer.customerList({
        tabValue : value,
        rowsPerPage : rowsPerPage,
        pageNo : page,
        searchText : searchText,
      });
      setCustomerListData(result.customerList);
      setTabsCount(result.tabCounts[0]);
    } catch (error) {
      console.log('Error...', error);
    }
    setSearchText('');
    setIsLoading(false);
  };

  function handleClose() {
    setOpen(false);
  }

  function handleClickEditOpen(data) {
    setCustomerData(data),
    setEditOpen(true);
  }

  const handleHistoryOpen = async (data) => {
    setCustomerId(data.id);
    setBudgetHistoryOpen(true);    
  }

  function handleHistoryClose(){
    setBudgetHistoryOpen(false);
  }
  
  
  const handleOpenEditBudget = async (data) =>{      
    const budget = await Order.getExistingBudget({customer_id: data.id});
    setBudgetList(budget[0]);
    setTotalBudgetList(budget);
    setCustomerId(data.id);
    setBudgetOpen(true);
  }

  const handleBudgetClose = async () => {
    setBudgetOpen(false);
  }

  const handleClickCommentOpen = (data) => {
    setCustomerId(data.id);
    setOpenCommentView(true);
  }

  
  function handleBankDetailClose(){
    setBankDetailOpen(false);
  }
  
  const handleBankDetailOpen = async(data) => {
    const bankDetails = await Customer.getCustomerBankDetail({customer_id: data.id});
    if(bankDetails == "" || bankDetails == undefined || bankDetails == [] ){
      setBankDetailArray([]);
    }else if(bankDetails.length > 0){
      setBankDetailArray(bankDetails[0]);
    }
    setCustomerId(data.id);
    setBankDetailOpen(true);
  }


  const handleViewClose = () => {
    setOpenCommentView(false);
  }

  function handleEditClose() {
    setEditOpen(false);
  }
 
  function handleSearchText(event){
    setSearchText(event.target.value);
  }
  
  async function handleOrderView (data){
    const result = await Order.getSingleOrderData({order_id: data.order_id});
    setEditableData(result[0]);
    setViewOrder(true);
  }

  async function handleOrderViewFromBudget (data){
    const result = await Order.getSingleOrderData({order_id: data.o_id});
    setEditableData(result[0]);
    setViewOrder(true);
  }


  function handleOrderViewClose(){
    setViewOrder(false);
  }


  const handlePaymentFilter = async (searchText,  fromPaymentDate, toPaymentDate) => {
    let paymentData = [];

    if(searchText!='' || (fromPaymentDate !== null && toPaymentDate !== null)){
      let fromDate = getDate(fromPaymentDate);
      let toDate = getDate(toPaymentDate);
      paymentData = await filterMissedPaymentData({searchText: searchText, fromPaymentDate: fromDate, toPaymentDate: toDate });
    }else{
      paymentData = await fetchMissedPaymentData();            
    }
      setCustomerListData(paymentData.customerList);
      setTabsCount(paymentData.tabCounts[0]);
  }

  const fetchMissedPaymentData = async () =>{
    const result = await Order.fetchMissedPaymentData({});
    return result;
  }

  const filterMissedPaymentData = async (searchText) =>{
    const result = await Order.filterMissedPaymentData({searchText : searchText});      
    return result;
  }  

  function handleTabChange(event, newValue) {
    setValue(newValue);    
    setPage(0);
    setRowsPerPage(20);
  }



  return (
    <div>     
      <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Fab variant="extended" size="small" className={classes.fonttransform} onClick={()=> {setOpen(true)}}>
              <AddIcon className={classes.extendedIcon} />Customers
            </Fab>
          </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth
                id="search" 
                name="search" 
                margin="dense" 
                type="text"
                autoComplete='off' 
                value={searchText} 
                placeholder ="Type (Id/Name/Address/City/Postcode/Telephone/Mobile/DOB) to Search Customer..."
                onKeyPress={(ev) => { if (ev.key ===  'Enter') { fetchCustomerList(); ev.preventDefault(); } }}
                onChange={handleSearchText}
                InputProps={{ endAdornment: <InputAdornment position='end'>
                    <Tooltip title="Search"> 
                      <IconButton onClick={ fetchCustomerList}><SearchIcon /></IconButton>
                    </Tooltip>
                  </InputAdornment>,
                }}
              />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Paper style={{ width: '100%' }}>
              <AppBar position="static"  className={classes.appBar}>
                <Tabs value={value} onChange={handleTabChange} className={classes.textsize} variant="scrollable" scrollButtons="auto">
                  <Tab label={<BadgeComp count={tabsCount.active} label="Open" />} /> 
                  <Tab label={<BadgeComp count={tabsCount.hold} label="Hold" />} /> 
                  <Tab label={<BadgeComp count={tabsCount.financial_hardship} label="Financial Hardship" />} /> 
                  <Tab label={<BadgeComp count={tabsCount.todays_birthday} label="Today's Birthday" />} />
                  <Tab label={<BadgeComp count={tabsCount.missed_payment} label="Missed Payment" />} />
                </Tabs>
              </AppBar>
              <div >
                <TabPanel value={value} index={0}>
                  {value === 0 && <Active customerList={customerListData} count={tabsCount.active} handleClickEditOpen={handleClickEditOpen} handleOpenEditBudget={handleOpenEditBudget} handleClickCommentOpen={handleClickCommentOpen} handleHistoryOpen={handleHistoryOpen} handleBankDetailOpen = {handleBankDetailOpen} 
                  page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} /> }
                </TabPanel>

                <TabPanel value={value} index={1}>
                  {value === 1 && <Hold customerList={customerListData} count={tabsCount.hold} handleClickEditOpen={handleClickEditOpen} handleOpenEditBudget={handleOpenEditBudget} handleClickCommentOpen={handleClickCommentOpen} handleHistoryOpen={handleHistoryOpen} handleBankDetailOpen = {handleBankDetailOpen} 
                  page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} /> }
                </TabPanel>
                <TabPanel value={value} index={2}>
                  {value === 2 && <FinancialHardship customerList={customerListData} count={tabsCount.financial_hardship} handleClickEditOpen={handleClickEditOpen} handleOpenEditBudget={handleOpenEditBudget} handleClickCommentOpen={handleClickCommentOpen} handleHistoryOpen={handleHistoryOpen} handleBankDetailOpen = {handleBankDetailOpen}  
                  page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} /> } 
                </TabPanel>
                <TabPanel value={value} index={3}>
                  {value === 3 && <BornToday customerList={customerListData} count={tabsCount.todays_birthday} handleClickEditOpen={handleClickEditOpen} handleOpenEditBudget={handleOpenEditBudget} handleClickCommentOpen={handleClickCommentOpen} handleHistoryOpen={handleHistoryOpen} handleBankDetailOpen = {handleBankDetailOpen}  
                  page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} /> } 
                </TabPanel>
                <TabPanel value={value} index={4}>
                  {value === 4 && <MissedPayment missedPaymentData={customerListData} count={tabsCount.missed_payment} handleClickEditOpen={handleClickEditOpen} handleOpenEditBudget={handleOpenEditBudget} handleClickCommentOpen={handleClickCommentOpen} handleHistoryOpen={handleHistoryOpen} handleBankDetailOpen = {handleBankDetailOpen} handleOrderView={handleOrderView} handlePaymentFilter={handlePaymentFilter} 
                  page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} /> } 
                </TabPanel>
              </div>
            </Paper>                            
          </Grid>
        </Grid>  

      {open ? <Add open={open} handleClose={handleClose} fetchCustomerList={fetchCustomerList} />: null}
      {editOpen ? <Edit open={editOpen} handleEditClose={handleEditClose} inputValues={customerData} fetchCustomerList={fetchCustomerList} /> : null}
      {budgetOpen ?<EditBudget open={budgetOpen} handleBudgetClose={handleBudgetClose} setBudgetList={setBudgetList} budgetList={budgetList}   totalBudgetList={totalBudgetList} customer_id={customerId} isEditable={1} handleOrderViewFromBudget={handleOrderViewFromBudget} /> : null }
      {budgetHistoryOpen ? <BudgetHistory open={budgetHistoryOpen} handleClose={handleHistoryClose} customer_id={customerId} roleName={roleName} /> : null }
      {openCommentView ?<CommentView open={openCommentView} handleViewClose={handleViewClose} customer_id = {customerId}  /> :null}
      {bankDetailOpen ?<CustomerBankDetails open={bankDetailOpen} handleClose={handleBankDetailClose} bankDetailArray={bankDetailArray} setBankDetailArray = {setBankDetailArray} customer_id={customerId} isAddingDirect={true} /> : null }
      {viewOrder ? <ViewOrder open={viewOrder} handleEditClose={handleOrderViewClose} handleOrderRecData= {[]} editableData={editableData} viewOnly={ true } /> : null}
      {isLoading ? <Loader /> : null}
    </div>
  );
}
