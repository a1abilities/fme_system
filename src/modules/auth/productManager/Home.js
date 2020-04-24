import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';

// API CALL
import ProductManagerAPI from '../../../api/ProductManager.js';

// Components
import BadgeComp from '../../common/BadgeComp';
import TableRecord from './Components/RecordTable.js';
import OrderRecord from './Components/OrderRecord.js';
import {TabPanel} from '../../common/TabPanel.js';

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

export default function ProductManager({roleName}) {
  
  const classes = useStyles();  
  
  const [tabValue, setTabValue] = React.useState(0);
  const [rentedProductList,setRentedProductList] = useState([]);
  const [rentedOrderList,setRentedOrderList] = useState([]);
  const [tabCounts, setTabCounts] = useState([]);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [productId, setProductId] = useState();
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  function handleTabChange(event, newValue) {
    setPage(0);
    setRowsPerPage(10);
    setTabValue(newValue); 
    handleTabData(newValue)
  }

  useEffect(() => {
    handleTabData()
  },[])

  const handleTabData = async (tabValue = 0) => {
    try{
      const result = await ProductManagerAPI.getTabRelatedRecord({tabValue: tabValue});
      setRentedProductList(result.productList);
      setTabCounts(result.tabCounts[0]);
    }catch(error){
      console.log('error...',error);
    }    
  }

  const handleOrderRecord = async (data) => {
    try{
      const result = await ProductManagerAPI.getRentedOrder({productId: data.id, tabValue: tabValue});
      setRentedOrderList(result.orderList)
      setShowOrderDialog(true);
      setProductId(data.id);
    }catch(error){
      console.log('error...',error);
    }
  }
  
  const handleCloseOrderDialog = () => {
    setShowOrderDialog(false);
  }

  return (
    <div>
      <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Paper style={{ width: '100%' }}>
              <AppBar position="static"  className={classes.appBar}>
                <Tabs value={tabValue} onChange={handleTabChange} className={classes.textsize} variant="scrollable" scrollButtons="auto">
                  <Tab label={<BadgeComp count={tabCounts.all} label="All" />} />
                  <Tab label={<BadgeComp count={tabCounts.ordered} label="Ordered" />} />
                  <Tab label={<BadgeComp count={tabCounts.with_customer} label="With Customer" />} />
                  <Tab label={<BadgeComp count={tabCounts.under_repair} label="Under Repair" />} />
                  <Tab label={<BadgeComp count={tabCounts.replaced} label="Replaced" />} />
                  <Tab label={<BadgeComp count={tabCounts.faulty_with_customer} label="Faulty/With Customer" />} />
                  <Tab label={<BadgeComp count={tabCounts.faulty_under_repair} label="Faulty/Under Repair" />} />
                </Tabs>
              </AppBar>
              <Fragment>
                <TabPanel value={tabValue} index={tabValue}>
                  <TableRecord  productList = {rentedProductList} tabValue={tabValue} handleOrderRecord = {handleOrderRecord} 
                                page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} 
                                handleChangeRowsPerPage={handleChangeRowsPerPage}
                  /> 
                </TabPanel>               
              </Fragment>
            </Paper>                            
          </Grid>
        </Grid>
      { showOrderDialog ?
        <OrderRecord
          open = {showOrderDialog} 
          handleClose = {handleCloseOrderDialog} 
          tabValue = {tabValue} 
          productId = {productId} 
          orderList = {rentedOrderList}  
          setRentedProductList = {setRentedProductList} 
          setRentedOrderList = {setRentedOrderList} 
          setTabCounts = {setTabCounts}
          roleName = {roleName}
        />  
        : null 
      }      
    </div>
  );
}
