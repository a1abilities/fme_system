import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
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
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import { APP_TOKEN } from '../../../api/Constants';
import Edit from './Edit';
import Add from './Add';
import ArchivedList from './ArchivedList';
import Tooltip from '@material-ui/core/Tooltip'; 
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContentWrapper from '../../common/MySnackbarContentWrapper';
import BadgeComp from '../../common/BadgeComp';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

//Import Components
import Active from './ProductComponent/Active.js';
import Onhold from './ProductComponent/OnHold';
import Discontinued from './ProductComponent/Discontinued';

// API CALL
import Product from '../../../../src/api/Category';


const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    // width: 900
  },
  title: {
    flexGrow: 1,
    fontSize: theme.typography.pxToRem(14),
    color:"white",
    marginTop:theme.spacing(-3),
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
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  padding: {
    padding: theme.spacing(0, 2),
  },
  fonttransform:{
    textTransform:"initial",
    fontSize: theme.typography.pxToRem(13),
  },
  button:{
    color:"white",
    fontSize: theme.typography.pxToRem(10),
  },
  textsize:{
    color:"white",
    fontSize: theme.typography.pxToRem(12),
  }
}));


export default function ProductList({roleName}) {

  const classes = useStyles();


  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [receivedData, setReceivedData]= useState([]);
  
  const [openArchived, setArchivedOpen] = useState(false);
  const [productList, setProductList] = useState([]);
  
  const [activeTab,setActiveTab] = useState([]);
  const [onholdTab,setOnholdTab] = useState([]);
  const [discontinuedTab,setDiscontinuedTab] = useState([]);

  const [searchText, setSearchText]  = useState('');
  const [value, setValue] = React.useState(0);
  
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 20));
    setPage(0);
  };    

  

  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  function handleSnackbarClick() {
    setSnackbarOpen(true);
  }
  function handleArchivedClickOpen(){
    setArchivedOpen(true);
  }
  function handleArchivedClose() {
    setArchivedOpen(false);
  }

  const fetchProductlist = async () => {
    const result = await Product.productlist();
    setProductList(result.productList);
    handleTabData(result.productList);
  }

  // const fetchBrandList = async () => {
  //   const brand_result = await Brand.list();
  //   setBrandList(brand_result.brandList);
  // }

  // const fetchColorList = async () => {
  //   const color_result = await Color.list();
  //   setColorList(color_result.colorList);
  // }
  
  useEffect(() => {
    fetchProductlist();
    // fetchBrandList();    
    // fetchColorList();
  }, []);

  function handleTabData(productList) {
    let active = [];
    let onhold = [];
    let discontinued = []; 

    productList != undefined && (productList.length> 0 ? productList : []).map( data => {
      if(data.status === 1){
        active.push(data);
      }
      if(data.status === 2){
        onhold.push(data);
      }
      if(data.status === 3){
        discontinued.push(data);
      }
    });
    setActiveTab(active);
    setOnholdTab(onhold);
    setDiscontinuedTab(discontinued);
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleClickEditOpen(response) {
    setReceivedData(response);
    setEditOpen(true);
  }
  
  function handleEditClose() {
    setEditOpen(false);
    
  }

  function handleSearchText(event){
    setSearchText(event.target.value);
  }

  function setCategoryListFn(response) {
    setProductList(response);
    handleTabData(response);    
  }

  
  const searchHandler = async () => {
    try {
    if(searchText!=''){
        const result = await Product.search({searchText: searchText});        
        setProductList(result.productList);        
        setSearchText('');
        handleTabData(result.productList);           
    }else{
      const result = await Product.productlist();
      setProductList(result.productList);
      setSearchText('');
      handleTabData(result.productList);      
    }} catch (error) {
      console.log('error',error);
    }
  }


  
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

  function handleTabChange(event, newValue) {
    setValue(newValue);
    setPage(0);
    setRowsPerPage(20);
  }


  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Fab variant="extended" size="small" className={classes.fonttransform} onClick={handleClickOpen} >
            <AddIcon className={classes.extendedIcon} /> Product
          </Fab>
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              id="search"
              name="search"
              placeholder = "Type (Product Name/Bought From/Invoice Number/Meta Keywords/Description) to Search Product..."
              type="text"
              autoComplete='off'
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
          
        <Grid item xs={12} sm={12} md={12}>
          <Paper style={{ width: '100%' }}> 
            <AppBar position="static"  className={classes.appBar}>
              <Tabs value={value} onChange={handleTabChange} className={classes.textsize}  variant="scrollable" scrollButtons="auto">
                <Tab label={<BadgeComp count={activeTab.length} label="Active" />} /> 
                <Tab label={<BadgeComp count={onholdTab.length} label="OnHold" />} /> 
                <Tab label={<BadgeComp count={discontinuedTab.length} label="Discontinued" />} /> 
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              {activeTab && <Active productList= {activeTab} roleName={roleName} handleClickEditOpen={handleClickEditOpen} 
              page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage}/>}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {onholdTab && <Onhold productList= {onholdTab} roleName={roleName} handleClickEditOpen={handleClickEditOpen} 
              page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage}/>}
            </TabPanel>
            <TabPanel value={value} index={2}>
              {discontinuedTab && <Discontinued productList= {discontinuedTab} roleName={roleName}
              page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />}
            </TabPanel>
          </Paper>
        </Grid>   
      </Grid>
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
          message="Category Created successfully!"
        />
      </Snackbar>
      
      {open? <Add open={open} handleClose={handleClose} handleSnackbarClick={handleSnackbarClick} updateProductList = {setCategoryListFn} /> :null}
      {editOpen ? <Edit open={editOpen} handleEditClose={handleEditClose} handleSnackbarClick={handleSnackbarClick} inputValues={receivedData} updateProductList={setCategoryListFn}/> : null}
      {openArchived ?  <ArchivedList open={openArchived} handleArchivedClose={handleArchivedClose}  />: null}
    </div>
  );
}