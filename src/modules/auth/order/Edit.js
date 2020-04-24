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
import Fab from '@material-ui/core/Fab';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip'; 


import {useCommonStyles} from '../../common/StyleComman'; 
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';

// import validate from '../../common/validation/OrderRuleValidation';
import LinearProgress from '@material-ui/core/LinearProgress';
import { APP_TOKEN } from '../../../api/Constants';

import EditBudget from './EditBudget';
import ViewCustomer from '../customer/ViewCustomer';
import EditFlexOrder from './EditFlexOrder';
import EditFixedOrder from './EditFixedOrder';

// API CALL
import Order from '../../../api/franchise/Order';
import Category from '../../../../src/api/Category';
import OrderAPI from '../../../api/franchise/Order';
import useSignUpForm from '../franchise/CustomHooks';
import StaticContentAPI from  '../../../api/StaticContent.js'

const RESET_VALUES = {
    
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
  labelTitle: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // flex: 1,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(14),
    marginTop: 10,
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
  },
  buttonMargin: {
    margin: theme.spacing(1),
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Edit({ open, handleClose, editableData, viewOnly, handleOrderViewFromBudget}) {
  const styleClass = useCommonStyles();
  const classes = useStyles();

  const [budgetOpen, setBudgetOpen] = useState(false);
  const [customerOpen, setCustomerOpen] = useState(false);
  const [fixedOrderOpen, setFixedOrderOpen] = useState(false);
  const [flexOrderOpen, setFlexOrderOpen]  = useState(false);
  const [searchCustomerOpen, setSearchCustomerOpen] = useState(false);
  const [customerId, setCustomerId] = useState();
  
  const [budgetId, setBudgetId] = useState();
  const [fixedOrderId, setFixedOrderId] = useState();
  const [flexOrderId, setFlexOrderId] = useState();

  const [budgetList,setBudgetList] = useState(null);
  const [totalBudgetList,setTotalBudgetList] = useState(null);
  const [fixedOrderList,setFixedOrderList] = useState(null);
  const [flexOrderList,setFlexOrderList] = useState(null);
  
  const [customer, setCustomer] = useState(null);
  const [productList, setProductList] = useState([]);
  const [assignInterest, setAssignInterest] = React.useState([]);
  const [recData, setRecData] = React.useState(editableData);
  
  const [mainCategoryList, setMainCategoryList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [salesTypeList, setSalesTypeList] = useState([]);
  const [rentingForList, setRentingForList] = useState([]);

  const [mainCategory, setMainCategory] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [subCategory, setSubCategory] = React.useState('');
  const [salesPersonList, setSalesPersonList] = useState([]);
  const [totalProductList, setTotalProductList] = useState([]);
  const [totalOfRental, setTotalOfRental] = useState(0);
  const [paymentModeList, setPaymentModeList] = useState([]);

  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(true);
  
  useEffect(() => {
    fetchSalesTypeList();
    fetchRentingForList();
    fetchSalesPersonList();
    fetchTotalProductList();
    getPaymentModeList();
  },[]);
  
  const getPaymentModeList = async () => {
    const result = await StaticContentAPI.getPaymentModeList({});
    setPaymentModeList(result.paymentModeList);
  }

  
  const fetchSalesPersonList = async () =>{
    try {
      const result = await OrderAPI.getSalesPersonList({});
      setSalesPersonList(result);
    } catch (error) {
      console.log('error:',error);
    }
  };

  const fetchSalesTypeList = async () => {
    try {
      const result = await OrderAPI.getSalesTypeList({});
      setSalesTypeList(result);
    } catch (error) {
      console.log('error:',error);
    }
  };

  const fetchRentingForList = async () => {
    try {
      const result = await OrderAPI.getRentingForList({});
      setRentingForList(result);
    } catch (error) {
      console.log('error:',error);
    }
  };
  
  const fetchTotalProductList = async () => {
    try {
      const result = await Category.productlist();
      setTotalProductList(result.productList);
    } catch (error) {
      console.log('error:',error);
    }
  }
  
  const handleChangeMultiple = async (event) => {
    const product = [...assignInterest];
    product.push(event.target.value)
    setAssignInterest(product);
  }

  
  const handleRemoveProduct = (index) => {
    const tempProduct = [...assignInterest];
    tempProduct.splice(index, 1);
    setAssignInterest(tempProduct);
  }


  
  const fetchData = async () => {
    try {
      const category_list = await Category.mainCategoryList();
      setMainCategoryList(category_list.mainCategoryList);
      
      const budget = await Order.getExistingBudget({customer_id: editableData.customer_id});
      (budget != undefined && budget != ""  && budget != [] ? budget : []).map((data) =>{
        if(data.id === editableData.budget_id){
          setBudgetList(data);
        }
      });        
      setTotalBudgetList(budget);


      if(editableData.order_type==2){
        const order = await Order.getCurrespondingFlexOrder({flexOrderId: editableData.order_type_id});
        setFlexOrderList(order[0]);
      }
      
      if(editableData.order_type==1){
        const order = await Order.getCurrespondingFixedOrder({fixedOrderId: editableData.order_type_id});
        setFixedOrderList(order[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    inputs.ezidebit_uid_checked = true;
    let assignProductList = [];
    let proId = editableData.product_id;
    
    if(proId !== undefined && proId !== null && proId !== ""){
      (proId.split(',')).map((product, index) =>{
        assignProductList.push(parseInt(product));
      });  
      setAssignInterest(assignProductList);    
    }
  fetchData();
  }, []);


  
  useEffect(() => {
    let totalRental = 0;
    (totalProductList.length > 0 ? totalProductList : []).map((proData,proIndex)=>{
      (assignInterest.length > 0 ? assignInterest : []).map((data, index) =>{      
        if(data === proData.id) { totalRental = (parseFloat(totalRental) + parseFloat(proData.rental)); }
      })
    })
    
    setTotalOfRental(totalRental);
    if(budgetList != null && budgetList != undefined && budgetList != ""){
      if(parseFloat(budgetList.afford_amt) < parseFloat(totalRental)){
        alert("you can't afford payment for this product. kindly update your budget or choose other product")
      } 
    }
  },[assignInterest, budgetList]);
  
  

  function validate(values) {
    let errors = {};    
    return errors;
  }

  function handleBudgetClose(){
    setBudgetOpen(false);
  }
  
  function handleBudgetOpen(budgetId, customerId){
    setBudgetId(budgetId);
    setCustomerId(customerId);
    setBudgetOpen(true);
  }
  
  function handleFixedClose(){
    setFixedOrderOpen(false);
  }
  
  function handleFixedOpen(fixedOrderId){    
    setFixedOrderId(fixedOrderId);
    setFlexOrderList(null);
    setFixedOrderOpen(true);
  }

  function handleFlexClose(){
    setFlexOrderOpen(false);
  }
  
  function handleFlexOpen(flexOrderId){
    setFlexOrderId(flexOrderId);
    setFixedOrderList(null);
    setFlexOrderOpen(true);
  }

  function handleCustomerClose(){
    setCustomerOpen(false);
  }
  function handleCustomerOpen(customerId){
    setCustomerId(customerId);
    setCustomerOpen(true);
  }
 
  function handleSearchCustomerClose(){
    setSearchCustomerOpen(false);
  }
  function handleSearchCustomerOpen(){
    setSearchCustomerOpen(true);
  }

  const handleMainCategory = async (event) => {
    setMainCategory(event.target.value);

    setCategoryList('');
    setSubCategoryList('');    
    setProductList('');
    setCategory('');
    setSubCategory('');

    try {
      const result = await Category.categoryList({maincategory: event.target.value});
      setCategoryList(result.categoryList);
    } catch (error) {
      console.log('error:',error);
    }
  }

  const handleCategory = async (event) => {
    setCategory(event.target.value);

    setSubCategoryList('');
    setProductList('');
    setSubCategory('');

    try {
      const result = await Category.subCategoryList({category: event.target.value});
      setSubCategoryList(result.subCategoryList);
    } catch (error) {
      console.log('error:',error);
    }
  }

  const handleSubCategory = async (event) => {
    setSubCategory(event.target.value);
    setProductList('');

    try {
        const result = await Category.RelatedproductList({subcategory: event.target.value});
        setProductList(result.productList);       
    } catch (error) {
        console.log('error:',error);
    }
  }


  const editOrder = async (event) => {

    setpLoading(true);
    setSavebtn(true);
    const response = await OrderAPI.editPost({ 
      id : inputs.id,
      products_id :  assignInterest.join(),
      budget_list : budgetList,
      flexOrderType : flexOrderList,
      fixedOrderType : fixedOrderList,
      payment_mode: inputs.payment_mode,
      order_type : inputs.order_type,
      order_type_id : inputs.order_type_id,
      budget_id: inputs.budget_id,
      is_active : 1,
      assigned_to : 3,
      sales_type_id : inputs.sales_type,
      renting_for_id : inputs.renting_for,
      sales_person_id : inputs.sales_person_id,
      ezidebit_uid : inputs.ezidebit_uid,
      order_status : editableData.order_status,
     });    
    
      assignInterest.length = 0;
      setpLoading(false);
      setSavebtn(true);
      handleClose(true);
  };
  
    
  const selectedProductList = () => {
    return(
      <Paper style={{width : '100%'}}>
        <Table size="small">                          
          <TableBody size="small">
            {(assignInterest.length > 0 ? assignInterest : []).map((data, index) =>{
              return(
                (totalProductList.length > 0 ? totalProductList : []).map((proData,proIndex)=>{                                
                  return(                                  
                    proData.id === data ?
                      <TableRow size="small">
                        <TableCell  className={classes.textsize}  >{proData.description}</TableCell>
                        <TableCell  className={classes.textsize}  >{proData.rental}</TableCell>
                        <TableCell  className={classes.textsize}  style={{maxWidth:70}}>
                          <Tooltip title="Click to Remove">
                            <IconButton className={classes.marginIconBtn} onClick = { () => { handleRemoveProduct(index); }}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>  
                        </TableCell>
                      </TableRow>
                    : null
                  )                                
                })
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    )
  }



  const { inputs, handleInputChange, handleCheckBoxChange, handleSubmit, handleReset, setInputsAll, setInput, errors } = useSignUpForm(
    editableData != "" ? editableData : RESET_VALUES,
    editOrder,
    validate
  ); 

  
return (
    <div>
      <Dialog maxWidth="sm" open={open} TransitionComponent={Transition}>
        <form> 
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                {viewOnly ? "View Order Details" : "Update Order" }
              </Typography>            
              <IconButton size="small" onClick={handleClose} className={styleClass.closeIcon}> x </IconButton>
            </Toolbar>
          </AppBar>
          
          <div className={classes.root}>
           {ploading ?  <LinearProgress />: null}
          <Paper className={classes.paper}>            
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="first_name">Order #</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="orderid"
                      name="orderid"
                      // label="Order #"
                      value={inputs.order_id}
                      fullWidth
                      type="text"
                      margin="dense"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <InputLabel  className={classes.textsize} htmlFor="order_date">Date*</InputLabel>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        margin="dense"
                        autoOk = {true}                    
                        variant = "inline"
                        id="order_date"
                        name="order_date"
                        format="dd-MM-yyyy"
                        value={inputs.order_date}
                        fullWidth 
                        disabled
                        InputProps={{
                          classes: {
                            input: classes.textsize,
                          },
                        }}   
                      />
                    </MuiPickersUtilsProvider>                                        
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>    
                    <Typography variant="h6" className={classes.textsize}> EziDebit UID * </Typography>                      
                        <TextField 
                          InputProps={{
                            classes: {
                              input: classes.textsize,
                            },
                            startAdornment: <InputAdornment position="start">
                              <Checkbox color="default" defaultChecked value="ezidebit_uid_checked" onChange={handleCheckBoxChange("ezidebit_uid_checked")}/> 
                            </InputAdornment>,                            
                          }}
                          fullWidth
                          id="ezidebit_uid"
                          name="ezidebit_uid"
                          value={inputs.ezidebit_uid}
                          onChange={handleInputChange}                          
                          type="text"
                          margin="dense"                          
                          disabled = {inputs.ezidebit_uid_checked}
                        />                
                  </Grid>    
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="sales_person_id">Sales Person *</InputLabel>
                    <Select                      
                      value={inputs.sales_person_id}
                      onChange={handleInputChange}
                      name= 'sales_person_id'
                      id= 'sales_person_id'
                      fullWidth
                      className={classes.textsize}
                      required                      
                      error={errors.sales_person_id}
                      helperText={errors.sales_person_id}
                      disabled= {viewOnly}
                      style={{marginTop : 10}}                      
                    > 
                    {(salesPersonList.length > 0 ? salesPersonList : []).map((data,index)=>{
                      return(
                        <MenuItem className={classes.textsize} value={data.id}>{data.name}</MenuItem>  
                        )
                     })}
                    </Select>
                  </Grid>               
                  <Grid item xs={12} sm={4}>
                   <InputLabel  className={classes.textsize} htmlFor="customer">Customer</InputLabel>
                    <Typography variant="h6" className={classes.labelTitle}>{inputs.first_name + ' ' + inputs.last_name} </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button variant="outlined" size="small" color="primary" onClick={(event) => { handleCustomerOpen(inputs.customer_id); }}>View Profile </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>                    
                    <Button variant="outlined" size="small" color="primary" className={classes.textsize}  onClick={(event) => { handleBudgetOpen(inputs.budget_id, inputs.customer_id); }}>Update Budget </Button>
                  </Grid>                                                   
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="main_category">Main Category*</InputLabel>
                    <Select
                      // multiple
                      value={mainCategory}
                      onChange={handleMainCategory}
                      name= 'main_category'
                      id= 'main_category'
                      // label='customer'
                      fullWidth
                      required
                      className={classes.textsize}
                      disabled= {viewOnly}
                    > 
                    <MenuItem className={classes.textsize} disabled value={""}>Select Main Category</MenuItem>
                     {(mainCategoryList.length > 0 ? mainCategoryList : []).map((data,index)=>{
                      return(
                         <MenuItem value={data.id}>{data.category}</MenuItem>
                      ) 
                     })}   
                    
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="category">Category*</InputLabel>
                    <Select
                      // multiple
                      value={category}
                      onChange={handleCategory}
                      name= 'category'
                      id= 'category'
                      // label='customer'
                      fullWidth
                      required
                      className={classes.textsize}
                      disabled= {viewOnly}
                    >    
                     {(categoryList.length > 0 ? categoryList : []).map((data,index)=>{
                      return(
                         <MenuItem value={data.id}>{data.category}</MenuItem>
                      ) 
                     })}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="sub_category">Sub Category*</InputLabel>
                    <Select
                      // multiple
                      value={subCategory}
                      onChange={handleSubCategory}
                      name= 'sub_category'
                      id= 'sub_category'
                      // label='customer'
                      fullWidth
                      required
                      className={classes.textsize}
                      disabled= {viewOnly}
                    >    
                     {(subCategoryList.length > 0 ? subCategoryList : []).map((data,index)=>{
                      return(
                         <MenuItem value={data.id}>{data.category}</MenuItem>
                      ) 
                     })}
                    </Select>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <InputLabel  className={classes.textsize} htmlFor="product">Product*</InputLabel>
                    <Select
                      value={assignInterest}
                      onChange={handleChangeMultiple}
                      name= 'product'
                      id= 'product'
                      fullWidth
                      required
                      className={classes.textsize}
                      disabled= {viewOnly}
                    >    
                     {(productList.length > 0 ? productList : []).map((data,index)=>{
                      return(
                         <MenuItem value={data.id}>{data.description}</MenuItem>
                      ) 
                     })}
                    </Select>
                  </Grid>
                    <Grid item xs={12} sm={12}> 
                      {selectedProductList()}
                    </Grid>
                   <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="sales_type">Sales Type *</InputLabel>
                      <Select
                        value={inputs.sales_type}
                        onChange={handleInputChange}
                        name= 'sales_type'
                        id= 'sales_type'
                        fullWidth
                        required
                        disabled= {viewOnly}
                        className={classes.textsize}
                        error={errors.sales_type}
                        helperText={errors.sales_type}
                      >    
                        {(salesTypeList.length > 0 ? salesTypeList : []).map((data,index)=>{
                          return(
                            <MenuItem className={classes.textsize} value={data.id}>{data.sales_type_name}</MenuItem>
                          ) 
                        })}
                      </Select>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="renting_for">Purpose of Rent *</InputLabel>
                      <Select
                        value={inputs.renting_for}
                        onChange={handleInputChange}
                        name= 'renting_for'
                        id= 'renting_for'
                        fullWidth
                        required
                        disabled= {viewOnly}
                        className={classes.textsize}                        
                        error={errors.renting_for}
                        helperText={errors.renting_for}
                      >    
                        {(rentingForList.length > 0 ? rentingForList : []).map((data,index)=>{
                          return(
                            <MenuItem className={classes.textsize} value={data.id}>{data.renting_for_name}</MenuItem>
                          ) 
                        })}
                      </Select>
                    </Grid>


                   <Grid item xs={12} sm={6}>
                     {editableData.order_type ===1 ? 
                      <Button variant="outlined" size="small" color="primary"  onClick={(event) => { handleFixedOpen(inputs.order_type_id); }}>Update Fix Order Type Details </Button> :
                      <Button variant="outlined" size="small" color="primary"    onClick={(event) => { handleFlexOpen(inputs.order_type_id); }}>Update Flex Order Type Details </Button>
                     }
                    </Grid>

                    
                    <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="payment_mode">Payment Mode*</InputLabel>
                    <Select
                      value={inputs.payment_mode}
                      onChange={handleInputChange}
                      name= 'payment_mode'
                      id= 'payment_mode'
                      // label='customer'
                      fullWidth
                      required
                      className={classes.textsize}
                      disabled= {viewOnly}
                    > 
                      {(paymentModeList != undefined && (paymentModeList.length > 0 ? paymentModeList : []).map((data,index) => {
                        return(
                          <MenuItem className={classes.textsize} value={data.id}>{data.payment_mode}</MenuItem>
                        )
                      }))}
                    </Select>
                   </Grid>
                   
                   
                   <Grid item xs={12} sm={12}>                    
                    <Button  variant="contained"  color="primary" className={classes.button} onClick={handleSubmit} disabled = {!savebtn || viewOnly}>
                      save
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleClose} className={classes.button}>
                      Close
                    </Button>
                  </Grid>                   
                </Grid>
          </Paper>
            
          </div>
        </form>
      </Dialog>
    {budgetOpen ?<EditBudget open={budgetOpen} handleBudgetClose={handleBudgetClose} setBudgetList={setBudgetList} budgetList={budgetList} totalBudgetList={totalBudgetList} customer_id={customerId} isEditable={0} handleOrderViewFromBudget={handleOrderViewFromBudget} /> : null }
    {fixedOrderOpen ?<EditFixedOrder open={fixedOrderOpen} handleFixedClose={handleFixedClose} setFixedOrderList={setFixedOrderList} fixedOrderList={fixedOrderList} fixedOrderId ={fixedOrderId} totalOfRental={totalOfRental} viewOnly={viewOnly} productQuantity = {assignInterest.length} /> : null }
    {flexOrderOpen ?<EditFlexOrder open={flexOrderOpen} handleFlexClose={handleFlexClose} setFlexOrderList={setFlexOrderList} flexOrderList={flexOrderList} flexOrderId={flexOrderId} totalOfRental={totalOfRental}  viewOnly={viewOnly} productQuantity = {assignInterest.length}  /> : null }
    {customerOpen ? <ViewCustomer open={customerOpen} handleClose={handleCustomerClose} customerId={customerId}/> : null }
    </div>
  );
}
