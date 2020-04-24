import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { APP_TOKEN } from '../../../api/Constants';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';
import CachedIcon from '@material-ui/icons/Cached';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';

// Form Component
import Add from './Add';
import ConvertInOrder from '../order/Add';
import OnGoing from './OtherComponent/OnGoing';
import Converted from './OtherComponent/Converted';
import Archived from './OtherComponent/Archived';
import ArchiveCommentBox from './ArchiveCommentBox.js';
import {TabPanel} from '../../common/TabPanel.js'

// API CALL
import EnquiryAPI from '../../../api/franchise/Enquiry';
import Category from '../../../../src/api/Category';
import BadgeComp from '../../common/BadgeComp';
import { async } from 'q';

const drawerWidth = 240;
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
  padding: {
    padding: theme.spacing(0, 2),
  },
  button:{
    color:"white",
    fontSize: theme.typography.pxToRem(10),
    marginRight: theme.spacing(1),
  },
  fonttransform:{
    textTransform:"initial",
    fontSize: theme.typography.pxToRem(13),
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
    color: 'white',
  }
}));


export default function Enquiry({roleName}) {

  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [enquiryList, setEnquiryList] = useState([]);
  const [openOrder, setOpenOrder] = useState(false);
  const [productList, setProductList] = useState([]);
  const [convertEnquiryId,setConvertEnquiryId]= useState();
  const [conversionData,setConversionData] = useState([]);
  const [searchText, setSearchText]  = useState('');
  const [value, setValue] = React.useState(0);
  const [openArchiveCommentView, setOpenArchiveCommentView]  = useState(false);
  const [enquiryData, setEnquiryData] =  useState('');
  const [onGoingList, setOnGoingList] = useState([]);
  const [convertedList, setConvertedList] = useState([]);
  const [archivedList, setArchivedList] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 20));
    setPage(0);
  };    

  const loadEnquiryList = async () =>{
    const result = await EnquiryAPI.getAll();
    handleTabsData(result.enquiryList);
    setEnquiryList(result.enquiryList);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {      
        const result1 = await Category.productlist();
        setProductList(result1.productList);
        loadEnquiryList();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();    
  },enquiryList);

  
  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
 

  function handleSnackbarClick() {
    setSnackbarOpen(true);
  }

  
  
  const handleDeleteEnquiry = async (data, isDeleted) => {
    setIsDeleted(isDeleted);
    setEnquiryData(data);
    setOpenArchiveCommentView(true);    
  }

  function handleViewClose() {
    setOpenArchiveCommentView(false);
  }


  function handleClickOrderOpen(data){
    let mainCategory, category, subCategory;
    (productList.length >0 ? productList : []).map(product => {
      if(data.interested_product_id == product.id){
          mainCategory = product.maincat;
          category = product.category;
          subCategory = product.subcat;
      }
    });
    setConvertEnquiryId(data.id);
    setConversionData({
      customer_id : data.customer_id,
      product_id : data.interested_product_id,
      customer_name : data.customer_name,
      customer_contact : data.contact,
      main_category :mainCategory,
      category : category,
      sub_category: subCategory,
    });
    setOpenOrder(true);
  }

  function handleOrderClose(){
    loadEnquiryList();    
    setOpenOrder(false);
  }

  function handleSearchText(event){
    setSearchText(event.target.value);
  }

  function setEnquiryListFn(response) {
    setEnquiryList(response);
    handleTabsData(response);    
  }
  

  const searchHandler = async () => {
    try {
    if(searchText!=''){
      const result = await EnquiryAPI.search({searchText: searchText});
      setEnquiryList(result.enquiryList);
      setSearchText('');      
      handleTabsData(result.enquiryList);
    }else{
      loadEnquiryList();
      setSearchText('');
    }} catch (error) {
      console.log('error',error);
    }
  }


  function handleTabsData(enquiryList){  
    let onGoingList = [];
    let convertedList = [];
    let archivedList = [];

    (enquiryList.length > 0 ? enquiryList : []).map((data, index) => {        
      if(data.is_active == 1 && data.converted_to ==0){
        onGoingList.push(data);
      }
      if(data.is_active == 1 && data.converted_to !=0){
        convertedList.push(data);
      }
      if(data.is_active == 0 ){
        archivedList.push(data);
      }
    });
    
    setOnGoingList(onGoingList);
    setConvertedList(convertedList);
    setArchivedList(archivedList);
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
              <Fab
                variant="extended"
                size="small"
                aria-label="Add"
                className={classes.fonttransform}
                onClick={handleClickOpen}
              >
                <AddIcon className={classes.extendedIcon} />
                Enquiry
              </Fab>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                id="search"
                name="search"
                placeholder = "Type (Enquiry Id/Customer Name/Contact) to Search Enquiry..."
                type="text"
                value={searchText} 
                autoComplete='off'
                onKeyPress={(ev) => {
                  if (ev.key ===  'Enter') {
                    searchHandler()
                    ev.preventDefault();
                  }
                }}
                onChange={handleSearchText}
                fullWidth
                InputProps={{
                  endAdornment: <InputAdornment position='end'>
                                  <Tooltip title="Search">
                                    <IconButton onClick={ searchHandler}><SearchIcon /></IconButton>
                                  </Tooltip>
                                </InputAdornment>,
                }}
              />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Paper style={{ width: '100%' }}>
              <AppBar position="static"  className={classes.appBar}>
                <Tabs value={value} onChange={handleTabChange} className={classes.textsize} variant="scrollable" scrollButtons="auto">
                  <Tab label={<BadgeComp count={onGoingList.length} label="On-going" />} /> 
                  <Tab label={<BadgeComp count={convertedList.length} label="Converted" />} /> 
                  <Tab label={<BadgeComp count={archivedList.length} label="Archived" />} /> 
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                {onGoingList && <OnGoing enquiryList={onGoingList} productList={productList} handleDeleteEnquiry={handleDeleteEnquiry} handleClickOrderOpen={handleClickOrderOpen} roleName={roleName} 
                page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage}/> }
              </TabPanel>              

              <TabPanel value={value} index={1}>
                {convertedList && <Converted enquiryList={convertedList} productList={productList}  roleName={roleName} 
                page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage}/> }
              </TabPanel>
              <TabPanel value={value} index={2}>
                {archivedList && <Archived enquiryList={archivedList} productList={productList} handleDeleteEnquiry={handleDeleteEnquiry}  roleName={roleName} 
                page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage}/> } 
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      { open ? <Add leadData={""} open={open} handleClose={handleClose} handleSnackbarClick={handleSnackbarClick}  setEnquiryList={setEnquiryListFn}  convertLead={0} /> : null }      
      {openOrder ? <ConvertInOrder open={openOrder} handleClose={handleOrderClose} convertId={convertEnquiryId} converted_name={'enquiry'} conversionData={conversionData} /> : null }
      {openArchiveCommentView ?<ArchiveCommentBox open={openArchiveCommentView} handleViewClose={handleViewClose} enquiryData={enquiryData} setEnquiryList={setEnquiryList} handleTabsData={handleTabsData} isDeleted={isDeleted} /> :null}
      
      
    </div>
  );
}
