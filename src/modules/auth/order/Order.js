import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';


// Components
import {TabPanel} from '../../common/TabPanel.js'

import BadgeComp from '../../common/BadgeComp';
import Add from './Add';
import Edit from './Edit';
import PaymentStatus from './PaymentStatus';
import Loader from '../../common/Loader.js';

import Open from './OrderComponent/Open';
import Finance from './OrderComponent/Finance';
import UnderDelivery from './OrderComponent/UnderDelivery';
import Delivered from './OrderComponent/Delivered';
import Completed from './OrderComponent/Completed';
import Cancelled from './OrderComponent/Cancelled';
import Archived from './OrderComponent/Archived';

import OrderCancellationForm from './OrderCancellationForm';
import YesNoDialog from '../../common/YesNoDialog.js';
import CommentDialog from '../CommentDialog.js';
import CommentView from './CommentView.js';
import UpdateDeliveredProduct from './UpdateDeliveredProduct.js';
import ViewDeliveredProductDetails from './ViewDeliveredProductDetails';

import RentFlexContract from './Documentation/RentFlexContract';
import RentFixContract from './Documentation/RentFixContract';
import BudgetAssistant from './Documentation/BudgetAssistant';
import FixedOrderForm from './Documentation/FixedOrderForm';
import FlexOrderForm from './Documentation/FlexOrderForm';
import EezyDebitForm from './Documentation/EezyDebitForm';

// API CALL
import OrderAPI from '../../../api/franchise/Order';
import FileReader from '../../../utils/fileReader';
import { APP_TOKEN } from '../../../api/Constants';


const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  fonttransform: {
    textTransform: "initial",
    fontSize: theme.typography.pxToRem(13),
  },
  textsize: {
    fontSize: theme.typography.pxToRem(12),
    color: 'white',
  }
}));


export default function Order({ roleName }) {
  
  const classes = useStyles();
  const userId = APP_TOKEN.get().userId;

  const [tabsCount, setTabsCount] = useState([]);
  const [orderList, setOrderList] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [addOrderOpen, setAddOrderOpen] = useState(false);  
  const [editOpen, setEditOpen] = useState(false);
  const [paymentStatusOpen, setPaymentStatusOpen] = useState(false);
  const [editableData, setEditableData] = useState({});
  const [orderData, setOrderData] = useState([]);
  const [orderId, setOrderId] = useState();  
  const [order, setOrder] = useState([]);
  const [commentBoxOpen, setCommentBoxOpen] = useState(false);
  const [openCommentView, setOpenCommentView] = useState(false);
  const [commentData, setCommentData] = useState([]);  
  const [response, setResponse] = useState([]);
  const [openCancelForm, setOpenCancelForm] = useState(false);
  const [openProductDelivered, setOpenProductDelivered] = useState(false);
  const [openViewDeliveredDetail, setOpenViewDeliveredDetail] = useState(false);
  
  const [viewOnly, setViewOnly] = useState(false);
  const [openConfirmationPDF, setOpenConfirmationPDF] = useState(false);
  const [orderDataForPDF, setOrderDataForPDF] = useState([]);
  const [value, setValue] = React.useState(0);
  const [searchText, setSearchText] = useState('');

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const handleYesNoClose = (isConfirm) => {
    setOpenConfirmationPDF(false);
    createAndDownloadPdf(orderDataForPDF, isConfirm)
  }

  const handlePDFGenerateType = (data) => {
    setOrderDataForPDF(data)
    setOpenConfirmationPDF(true);
  }


  function createAndDownloadPdf(data, eziDebitFormType) {
    if (data.order_type === 2) {
      const fetchData = async () => {
        try {
          const result = await OrderAPI.getFlexOrderDataForPDF({ data: data });
          pdfmake.vfs = pdfFonts.pdfMake.vfs;

          let doc = {
            pageSize: "A4",
            pageOrientation: "portrait",
            pageMargins: [30, 30, 30, 30],
            content: []
          };
          let flexOrderForm = FlexOrderForm(result, data);
          let rentFlexContract = RentFlexContract(result, data);
          let budgetAssistant = BudgetAssistant(result, data);
          let eezyDebitForm = EezyDebitForm(result, data, eziDebitFormType);


          if (flexOrderForm.content) {
            doc.content.push(flexOrderForm.content);
            doc.content.push({ text: '', pageBreak: "after" });
          }

          if (rentFlexContract.content) {
            doc.content.push(rentFlexContract.content);
            doc.content.push({ text: '', pageBreak: "after" });
          }

          if (budgetAssistant.content) {
            doc.content.push(budgetAssistant.content);
          }

          if (eezyDebitForm.content) {
            doc.content.push(eezyDebitForm.content);
          }

          pdfmake.createPdf(doc).open();
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
    if (data.order_type === 1) {
      const fetchData = async () => {
        try {
          const result = await OrderAPI.getFixedOrderDataForPDF({ data: data });
          pdfmake.vfs = pdfFonts.pdfMake.vfs;

          let doc = {
            pageSize: "A4",
            pageOrientation: "portrait",
            pageMargins: [30, 30, 30, 30],
            content: []
          };
          let fixedOrderForm = FixedOrderForm(result, data);
          let rentFixContract = RentFixContract(result, data);
          let budgetAssistant = BudgetAssistant(result, data);
          let eezyDebitForm = EezyDebitForm(result, data, eziDebitFormType);

          if (fixedOrderForm.content) {
            doc.content.push(fixedOrderForm.content);
            doc.content.push({ text: '', pageBreak: "after" });
          }

          if (rentFixContract.content) {
            doc.content.push(rentFixContract.content);
            doc.content.push({ text: '', pageBreak: "after" });
          }

          if (budgetAssistant.content) {
            doc.content.push(budgetAssistant.content);
          }

          if (eezyDebitForm.content) {
            doc.content.push(eezyDebitForm.content);
          }

          pdfmake.createPdf(doc).open();
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }    
  }

  function handleClickOpen() {
    setAddOrderOpen(true);
  }

  function handleAddOrderClose(refresh) {
    setAddOrderOpen(false);
    if(refresh === true){
      fetchOrderDataList();
    }
  }

  function handleEditOpen(data) {
    setEditableData(data);
    setEditOpen(true);
    setViewOnly(false);
  }

  function handleEditClose(refresh) {
    setEditOpen(false);
    if(refresh === true){
      fetchOrderDataList();
    }    
  }

  function handlePaymentStatusClose() {
    fetchOrderDataList();
    setPaymentStatusOpen(false);
  }

  const handleOrderIdSelection = (orderId) => {
    setOrderId(orderId);
  }

  const uploadFileSelector = async (formType) => {
    setIsLoading(true);
    try {
      let formData = new FormData();
      formData.append('data', JSON.stringify(orderId));
      if (formType === 'upload_contact_form') {
        for (var x = 0; x < document.getElementById('upload_contact_form').files.length; x++) {
          if (document.getElementById('upload_contact_form').files.length != 0) {
            const data = {
              data: orderId,
              file: await FileReader.toBase64(document.getElementById('upload_contact_form').files[x])
            }
            await OrderAPI.uploadDocument(data);
          }
        }
      } else if (formType === 'upload_delivery_doc') {
        for (var x = 0; x < document.getElementById('upload_delivery_doc').files.length; x++) {
          formData.append('avatar', document.getElementById('upload_delivery_doc').files[x])
        }
        if (document.getElementById('upload_delivery_doc').files.length != 0) {
          const result = await OrderAPI.uploadDeliveryDoc({ formData: formData });
        }
      }
    } catch (error) {
      console.log(error);
    }
    fetchOrderDataList();
  };



  function handleCommentBoxClose() {
    setCommentBoxOpen(false);
  }


  function handleOrderView(data) {
    setEditableData(data);
    setEditOpen(true);
    setViewOnly(true);
  }

  const handleAssignToFinance = async (data) => {
    setIsLoading(true);
    try{
      const result = await OrderAPI.assignToFinance({
        assigned_to: 4,
        id: data.id, 
        customer_id: data.customer_id,                
        order_type : data.order_type,
        order_type_id : data.order_type_id,
      });
      fetchOrderDataList();
      setCommentData({order_id: data.id, user_id: userId, roleName: roleName});
      setCommentBoxOpen(true);
    }catch(e){
      console.log('Error...', e);
    }
  }

  
  const handleAssignToDelivery = async (data) => {
    setIsLoading(true);
    try{
      const result = await OrderAPI.assignToDelivery({assigned_to: 5, id: data.id});
      fetchOrderDataList();
      setCommentData({ order_id: data.id, user_id: userId, roleName: roleName });
      setCommentBoxOpen(true);
    }catch(e){
      console.log('Error...', e);
    }
  }


  function handleDeliveredProdcutClose(data) {
    setOpenProductDelivered(false);
  }

  function handleDeliveredProductOpen(data) {
    setOrderData(data);
    setOpenProductDelivered(true);
  }

  function handleViewDeliveredDetail(data) {
    setOpenViewDeliveredDetail(false);
  }

  function handleViewDeliveredDetailOpen(data) {
    setOrderData(data);
    setOpenViewDeliveredDetail(true);
  }

  function handlePaymentStatus(data) {
    setOrderData(data);
    setPaymentStatusOpen(true);
  }

  function handleOrderCancellationOpen(data) {
    setOrderData(data);
    setOpenCancelForm(true);
  }

  function handleOrderCancellationClose() {
    setOpenCancelForm(false);
  }

  function handleClickViewOpen(orderId) {
    setOrderId(orderId)
    setOpenCommentView(true);
  }

  function handleViewClose() {
    setOpenCommentView(false);
  }

  

   
  const fetchOrderDataList = async () => {
    setIsLoading(true);
    try {
      const result = await OrderAPI.getRequeredOrderList({
        tabValue : value,
        user_role: roleName,
        rowsPerPage : rowsPerPage,
        pageNo : page,
        searchText : searchText,
      });
      setTabsCount(result.tabCounts[0]);
      setOrderList(result.orderList);
    } catch (error) {
      console.log(error);
    }
    setSearchText('');
    setIsLoading(false);    
  };

  useEffect(() => {    
    fetchOrderDataList();
  }, [roleName, page, rowsPerPage, value]);



  function handleTabChange(event, newValue) {
    setPage(0);
    setRowsPerPage(20);
    setValue(newValue);
  }

  const handleOrderArchive = async (data) => {
    try{
      setIsLoading(true);
      const result = await OrderAPI.archiveOrder({ order_id: data.id });
      fetchOrderDataList();
    }catch(e){
      console.log('Error..',e);
    }
    
  }


  async function handleOrderViewFromBudget(data) {
    const result = await OrderAPI.getSingleOrderData({ order_id: data.o_id });
    handleOrderView(result[0]);
  }


  function handleSearchText(event) {
    setSearchText(event.target.value);
  }


  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          {roleName === 'CSR' ?
            <Fab variant="extended" size="small" className={classes.fonttransform} onClick={handleClickOpen}>
              <AddIcon className={classes.extendedIcon} />  Order
            </Fab>
            : ''}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            margin="dense"
            id="search"
            name="search"
            placeholder="Type (OrderId/Ezidebit UId/ First/Last Name /Mobile /Telephone /Address /City) to Search Order..."
            type="text"
            autoComplete='off'
            value={searchText}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                fetchOrderDataList();
                ev.preventDefault();
              }
            }}
            onChange={handleSearchText}
            InputProps={{
              endAdornment: <InputAdornment position='end'>
                <Tooltip title="Search">
                  <IconButton onClick={fetchOrderDataList}><SearchIcon /></IconButton>
                </Tooltip>
              </InputAdornment>,
            }}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <Paper style={{ width: '100%' }}>
            <AppBar position="static" className={classes.appBar}>
              <Tabs value={value} onChange={handleTabChange} className={classes.textsize} variant="scrollable" scrollButtons="auto">
                <Tab label={<BadgeComp count={tabsCount.open} label="Open" />} />
                {roleName === 'CSR' ? 
                <Tab label={<BadgeComp count={tabsCount.finance} label="Finance" />} /> : ''}
                {roleName != 'Delivery' ?
                <Tab label={<BadgeComp count={tabsCount.under_delivery} label="Before Delivery" />} /> : ''}
                <Tab label={<BadgeComp count={tabsCount.delivered} label="Delivered" />} />
                {roleName !== 'Delivery' ? 
                <Tab label={<BadgeComp count={tabsCount.completed} label="Completed" />} /> : ''}
                {roleName !== 'Delivery' ? 
                <Tab label={<BadgeComp count={tabsCount.cancelled} label="Cancelled" />} /> : ''}
                {roleName === 'CSR' ? 
                <Tab label={<BadgeComp count={tabsCount.archived} label="Archived" />} /> : ''}
              </Tabs>
            </AppBar>

            {roleName === 'CSR' ? <div>
              <TabPanel value={value} index={0}>
                {value === 0 && <Open order={orderList} count={tabsCount.open} value={value} roleName={roleName}
                  handleAssignToFinance={handleAssignToFinance} handlePaymentStatus={handlePaymentStatus}
                  handleAssignToDelivery={handleAssignToDelivery} uploadFileSelector={uploadFileSelector}
                  handleEditOpen={handleEditOpen} 
                  createAndDownloadPdf={handlePDFGenerateType} handleOrderIdSelection = {handleOrderIdSelection}
                  handleClickViewOpen={handleClickViewOpen} handleDeliveredProductOpen={handleDeliveredProductOpen}
                  handleOrderView={handleOrderView} handleOrderArchive={handleOrderArchive} 
                  page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage}
                  />}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {value === 1 && <Finance order={orderList} count={tabsCount.finance} roleName={roleName} page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />}
              </TabPanel>
              <TabPanel value={value} index={2}>
                {value === 2 && <UnderDelivery order={orderList} count={tabsCount.under_delivery} roleName={roleName} 
                page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage}/>}
              </TabPanel>
              <TabPanel value={value} index={3}>
                {value === 3 && <Delivered order={orderList} count={tabsCount.delivered} roleName={roleName} handleViewDeliveredDetailOpen={handleViewDeliveredDetailOpen} 
                page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage}/>}
              </TabPanel>
              <TabPanel value={value} index={4}>
                {value === 4 && <Completed order={orderList} count={tabsCount.completed} roleName={roleName} handleViewDeliveredDetailOpen={handleViewDeliveredDetailOpen} 
                page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />}
              </TabPanel>
              <TabPanel value={value} index={5}>
                {value === 5 && <Cancelled order={orderList} count={tabsCount.cancelled} roleName={roleName} 
                page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />}
              </TabPanel>
              <TabPanel value={value} index={6}>
                {value === 6 && <Archived order={orderList} count={tabsCount.archived} roleName={roleName} handleEditOpen={handleEditOpen} 
                page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage}/>}
              </TabPanel>
            </div> : ''}

            {roleName === 'Finance' ? <div>
              <TabPanel value={value} index={0}>
                {value === 0 && <Open order={orderList} count={tabsCount.open} value={value} roleName={roleName}
                  handleAssignToFinance={handleAssignToFinance} handlePaymentStatus={handlePaymentStatus}
                  handleAssignToDelivery={handleAssignToDelivery} uploadFileSelector={uploadFileSelector}
                  handleEditOpen={handleEditOpen}
                  createAndDownloadPdf={handlePDFGenerateType} handleOrderIdSelection = {handleOrderIdSelection}
                  handleClickViewOpen={handleClickViewOpen} handleOrderCancellationOpen={handleOrderCancellationOpen}
                  handleDeliveredProductOpen={handleDeliveredProductOpen} handleOrderView={handleOrderView}
                  handleViewDeliveredDetailOpen={handleViewDeliveredDetailOpen} page={page} rowsPerPage={rowsPerPage}
                  handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage}/>}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {value === 1 && <UnderDelivery order={orderList} count={tabsCount.under_delivery} roleName={roleName} 
                 page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />}
              </TabPanel>
              <TabPanel value={value} index={2}>
                {value === 2 && <Delivered order={orderList} count={tabsCount.delivered} roleName={roleName} handleViewDeliveredDetailOpen={handleViewDeliveredDetailOpen} 
                 page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />}
              </TabPanel>
              <TabPanel value={value} index={3}>
                {value === 3 && <Completed order={orderList} count={tabsCount.completed} roleName={roleName} handleViewDeliveredDetailOpen={handleViewDeliveredDetailOpen} 
                 page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />}
              </TabPanel>
              <TabPanel value={value} index={4}>
                {value === 4 && <Cancelled order={orderList} count={tabsCount.cancelled} roleName={roleName}
                page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />}
              </TabPanel>
            </div> : ''}

            {roleName === 'Delivery' ? <div>
              <TabPanel value={value} index={0}>
                {value === 0 && <Open order={orderList} count={tabsCount.open} value={value} roleName={roleName}
                  handleAssignToFinance={handleAssignToFinance} handlePaymentStatus={handlePaymentStatus}
                  handleAssignToDelivery={handleAssignToDelivery} uploadFileSelector={uploadFileSelector}
                  handleEditOpen={handleEditOpen}
                  createAndDownloadPdf={handlePDFGenerateType} handleOrderIdSelection = {handleOrderIdSelection}
                  handleClickViewOpen={handleClickViewOpen} handleDeliveredProductOpen={handleDeliveredProductOpen}
                  handleOrderView={handleOrderView} page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} 
                  handleChangeRowsPerPage={handleChangeRowsPerPage}/>}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {value === 1 && <Delivered order={orderList} count={tabsCount.delivered} roleName={roleName} handleViewDeliveredDetailOpen={handleViewDeliveredDetailOpen}
                 page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />}
              </TabPanel>
            </div> : ''}
          </Paper>
        </Grid>
      </Grid>

      {addOrderOpen ? <Add open={addOrderOpen} handleClose={handleAddOrderClose}  handleOrderViewFromBudget={handleOrderViewFromBudget} /> : null}
      {paymentStatusOpen ? <PaymentStatus open={paymentStatusOpen} handleClose={handlePaymentStatusClose} orderData={orderData} /> : null}
      {editOpen ? <Edit open={editOpen} handleClose={handleEditClose} editableData={editableData} viewOnly={viewOnly} handleOrderViewFromBudget={handleOrderViewFromBudget} /> : null}
      {commentBoxOpen ? <CommentDialog open={commentBoxOpen} handleCommentBoxClose={handleCommentBoxClose} orderData={commentData} setResponse={setResponse} /> : null}
      {openCommentView ? <CommentView open={openCommentView} handleViewClose={handleViewClose} orderId={orderId} /> : null}
      {openCancelForm ? <OrderCancellationForm open={openCancelForm} handleClose={handleOrderCancellationClose} orderData={orderData}  fetchOrderDataList={fetchOrderDataList} /> : null}
      {openProductDelivered ? <UpdateDeliveredProduct open={openProductDelivered} handleClose={handleDeliveredProdcutClose} orderData={orderData} roleName={roleName} fetchOrderDataList={fetchOrderDataList} /> : null}
      {openViewDeliveredDetail ? <ViewDeliveredProductDetails open={openViewDeliveredDetail} handleClose={handleViewDeliveredDetail} orderData={orderData} roleName={roleName} /> : null}
      {openConfirmationPDF ? <YesNoDialog open={openConfirmationPDF} handleYesNoClose={handleYesNoClose} title={"Ezi Debit Filled or Blank ?"} content={"Select Yes to downlaod auto filled form, No to download empty form."} /> : null}
      {isLoading ? <Loader /> : null}
    </div>
  );
}
