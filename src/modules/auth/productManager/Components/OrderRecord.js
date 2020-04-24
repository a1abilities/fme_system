import React, {Fragment, useState, useEffect} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ViewArrayIcon from '@material-ui/icons/ViewArray'
import PrintIcon from '@material-ui/icons/Print';
import HistoryIcon from '@material-ui/icons/History';
import EditIcon from '@material-ui/icons/Edit';


import {getDateInDDMMYYYY} from '../../../../utils/datetime';

// Component
import { API_URL } from '../../../../api/Constants';
import ViewOrder from '../../order/Edit.js';
import UpdateProductState from '../Components/UpdateProductState.js'
import ProductSelection from '../Components/SubComponents/ProductSelection.js';
import ProductTracker from './ProductTracker.js';

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
  button:{
    color:"white",
    fontSize: theme.typography.pxToRem(10),
    margin: theme.spacing(1),
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  },
  closeIcon: {
    marginTop:theme.spacing(-3),
    color: 'white', 
    fontSize: theme.typography.pxToRem(14),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginRight:theme.spacing(-1),
  },  
  button:{
    color:"white",
    fontSize: theme.typography.pxToRem(10),
    margin: theme.spacing(1),
  },
}));


const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: theme.typography.pxToRem(13),
  },
  body: {
    fontSize: 11,
  },
}))(TableCell);

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function OrderRecord({open, handleClose, tabValue, productId, orderList, setRentedProductList, setRentedOrderList, setTabCounts, roleName}) {
  const classes = useStyles();

  const [orderData, setOrderData] = useState([]);
  const [showOrder, setShowOrder] = useState(false);
  const [showUpdateStateScreen, setShowUpdateStateScreen] = useState(false);
  const [showProductSelection, setShowProductSelection] = useState(false);
  const [showProductTracker, setShowProductTracker] = useState(false);
  const [rowIdInHistory, setRowIdInHistory] = useState();

  function handleOrderView(data) {
    setOrderData(data);
    setShowOrder(true);
  }

  function handleCloseViewOrder (){
    setShowOrder(false);    
  }

  const handleViewUpdateScreen = (data) => {
    setOrderData(data)
    setShowUpdateStateScreen(true);
  }

  const handleCloseUpdateScreen = () => {
    setShowUpdateStateScreen(false);
  }

  const handleViewProductSelection = (data) => {
    setOrderData(data)
    setShowProductSelection(true);
  }

  const handleCloseProductSelection = () =>{
    setShowProductSelection(false);
  }

  const openHistoryDialog = (data) => {
    setRowIdInHistory(data.id);
    setShowProductTracker(true);
  }

  const handleCloseProductTrancker = () => {
    setShowProductTracker(false);
  }


  return (
    <div>
    <Dialog maxWidth="lg" open={open} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Order List
          </Typography>              
          <IconButton size="small" onClick={handleClose} className={classes.closeIcon}> x </IconButton>
        </Toolbar>
      </AppBar>
      <Paper className = {classes.paper}> 
      <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell>Order No.</StyledTableCell>
                  <StyledTableCell>Customer Name</StyledTableCell>
                  <StyledTableCell>Contact</StyledTableCell>
                  <StyledTableCell>Order Date</StyledTableCell>                  
                  <StyledTableCell>Product Status</StyledTableCell>
                  <StyledTableCell>Product Quantity</StyledTableCell>
                  <StyledTableCell>Rental Type</StyledTableCell>
                  <StyledTableCell>Payment Mode</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(orderList.length > 0 ? orderList : []).map((data, index) => {          
                    return(
                      <TableRow key={Math.random()}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{data.order_id}</TableCell>
                        <TableCell>{data.first_name + ' ' + data.last_name}</TableCell>
                        <TableCell>{data.mobile}</TableCell>
                        <TableCell>{getDateInDDMMYYYY(data.order_date)}</TableCell>
                        <TableCell>{data.product_status_name}</TableCell>
                        <TableCell>{data.product_quantity}</TableCell>
                        <TableCell>{data.order_type==1 ? 'Fix' : 'Flex'}</TableCell>
                        <TableCell>{data.payment_mode_name} </TableCell>     
                        <TableCell>
                          <Tooltip title="View Order Detail">
                            <span><IconButton  size="small" onClick={(event) => { handleOrderView(data); }} >
                              <ViewArrayIcon />
                            </IconButton></span>
                          </Tooltip>
                          {tabValue !== 0 &&
                           <Fragment>
                              <Tooltip title="Download Delivered Doc">
                                {(data.delivery_document != null && data.delivery_document != undefined && data.delivery_document != "") ? 
                                  <a href={API_URL + "/api/download?path=DeliveredDoc/" + data.delivery_document }  download >
                                    <span><IconButton  size="small" >
                                      <PrintIcon />
                                    </IconButton></span>
                                  </a> :
                                  <span><IconButton  size="small" >
                                    <PrintIcon />
                                  </IconButton></span>
                                }
                              </Tooltip>
                          { roleName === 'Finance' &&
                              <Tooltip title="Update Product Status" onClick={(event) => { handleViewUpdateScreen(data); }}>
                                <IconButton  size="small" >
                                  <EditIcon/>
                                </IconButton>
                              </Tooltip>
                          }
                              <Tooltip title="View Product History" onClick={(event) => { handleViewProductSelection(data); }}>
                                <IconButton  size="small" >
                                  <HistoryIcon />
                                </IconButton>
                              </Tooltip>                          
                            </Fragment>
                            }
                          </TableCell>                                                  
                      </TableRow>
                    )}
                )}
              </TableBody>
            </Table>
          </Grid>
        <Grid item xs={12} sm={12}>
          <Button variant="contained" color="primary" className = {classes.button} onClick={handleClose}> Close </Button> 
        </Grid>
      </Grid>
    </Paper>
  </Dialog>
    {showOrder ? <ViewOrder open={showOrder} handleEditClose={handleCloseViewOrder} editableData={orderData} viewOnly={true} /> : null}
    {showUpdateStateScreen ? <UpdateProductState open = {showUpdateStateScreen} handleClose = {handleCloseUpdateScreen} orderData = {orderData} productId={productId} tabValue = {tabValue} setRentedProductList= {setRentedProductList} setRentedOrderList = {setRentedOrderList} setTabCounts = {setTabCounts} /> : null}
    {showProductSelection ? <ProductSelection open = {showProductSelection} handleClose = {handleCloseProductSelection} orderData = {orderData} productId={productId} tabValue = {tabValue} openHistoryDialog = {openHistoryDialog} /> : null}
    {showProductTracker ? <ProductTracker open = {showProductTracker} handleClose = {handleCloseProductTrancker} rowIdInHistory = {rowIdInHistory} /> : null}
    </div>
  ) 
}