import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import {useCommonStyles} from '../../common/StyleComman'; 
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';
import LinearProgress from '@material-ui/core/LinearProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip'; 


import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import Budget from './Budget';
import AddCustomer from '../customer/Add';
import SearchCustomer from './SearchCustomer';
import FlexOrder from './FlexOrder';
import FixedOrder from './FixedOrder';

// API CALL
import { APP_TOKEN } from '../../../api/Constants';
import Category from '../../../../src/api/Category';
import OrderAPI from '../../../api/franchise/Order';
import Customer from '../../../api/franchise/Customer';
import StaticContentAPI from  '../../../api/StaticContent.js'
import useSignUpForm from '../franchise/CustomHooks';
import {getDate, getCurrentDate } from '../../../utils/datetime'
import validate from '../../common/validation/OrderRuleValidation';

const RESET_VALUES = {
  order_date: getCurrentDate(),  
  ezidebit_uid_checked : true,  
  ezidebit_uid : '',
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
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(13),
    marginTop: 15,
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
  fab:{
    marginRight: theme.spacing(1),
    fontSize: 12
  },
  errorHeading: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightBold,
    color:'red',
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Add({ open, handleClose, convertId, converted_name, conversionData, handleOrderViewFromBudget}) {

  const styleClass = useCommonStyles(); 
  const classes = useStyles();
  const uid = APP_TOKEN.get().uid;

  const [budgetOpen, setBudgetOpen] = useState(false);
  const [customerOpen, setCustomerOpen] = useState(false);
  const [fixedOrderOpen, setFixedOrderOpen] = useState(false);
  const [flexOrderOpen, setFlexOrderOpen]  = useState(false);
  const [searchCustomerOpen, setSearchCustomerOpen] = useState(false);
  const [budgetList,setBudgetList] = useState([]);
  const [fixedOrderList,setFixedOrderList] = useState(null);
  const [flexOrderList,setFlexOrderList] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [productList, setProductList] = useState([]);
  const [isNewCustomer,setIsNewCustomer] = useState(0);
  const [assignInterest, setAssignInterest] = React.useState([]);    
  const [mainCategory, setMainCategory] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [subCategory, setSubCategory] = React.useState('');
  
  const [mainCategoryList, setMainCategoryList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [salesTypeList, setSalesTypeList] = useState([]);
  const [rentingForList, setRentingForList] = useState([]);
  const [salesPersonList, setSalesPersonList]  = useState([]);
  const [totalProductList, setTotalProductList] = useState([]);
  const [totalOfRental, setTotalOfRental] = useState(0);
  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(true);
  const [paymentModeList, setPaymentModeList] = useState([]);
  
  function handleBudgetClose(){
    setBudgetOpen(false);
  }
  
  function handleBudgetOpen(){
    setBudgetOpen(true);
  }
  
  function handleFixedClose(){      
    setFixedOrderOpen(false);
  }
  
  function handleFixedOpen(){
    setFlexOrderList(null);
    setFixedOrderOpen(true);
  }

  function handleFlexClose(){      
    setFlexOrderOpen(false);
  }
  
  function handleFlexOpen(){
    setFixedOrderList(null);
    setFlexOrderOpen(true);
  }

  function handleCustomerClose(){
    setCustomerOpen(false);
  }
  function handleCustomerOpen(){
    
    setCustomerOpen(true);
  }
  function handleSearchCustomerClose(){
    setSearchCustomerOpen(false);
  }
  function handleSearchCustomerOpen(){
    
    setSearchCustomerOpen(true);
  }

  function handleFixedOrderType(response){
    inputs.order_type = 1;
  }

  function handleFlexOrderType(response){
    inputs.order_type = 2;
  }

  const fetchCustomerList = async (customerId) => {
    inputs.customer_type = 1;
    setIsNewCustomer(1);
    setBudgetList([]);
    const customer = await Customer.getSingleCustomer({customer_id: customerId});        
    setCustomer(customer.customer[0]);
  }
  function handleIsExistCustomer(response){
    inputs.customer_type = 2;
    setIsNewCustomer(0);
    setBudgetList([]);
  }

   function handleDateChange(date){    
    handleInputChange({target:{name: 'order_date', value: date}})
  }

  useEffect(() => {
    fetchConversionData();
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

 const fetchConversionData = async () => {
    if(conversionData !== "" && conversionData !== undefined){
      if(conversionData.customer_id === 0){
        inputs.customer_type = 1;
        setIsNewCustomer(1);
        setBudgetList([]);          
      }else{          
        const result = await Customer.getSingleCustomer({customer_id: conversionData.customer_id});
        setCustomer(result.customer[0]);
        inputs.customer_type = 2;
        setIsNewCustomer(0);
        setBudgetList([]);                   
      }    
        let assignProductList = [];

        (conversionData.product_id.split(',')).map((product) =>{
          assignProductList.push(parseInt(product));
        });    
        setAssignInterest(assignProductList);
    }
  }

  useEffect(()=>{
      if(productList=="" || assignInterest == ""){
        setInput('product','');
      }
      if(categoryList == "" || category == ""){
        setInput('category','');
      }
      if(subCategoryList=="" || subCategory == ""){
        setInput('sub_category','');
      }
  },[productList,categoryList,subCategoryList,mainCategory,category,subCategoryList,assignInterest]);

  useEffect(() => {
    let totalRental = 0;   
    (totalProductList.length > 0 ? totalProductList : []).map((proData,proIndex)=>{
      (assignInterest.length > 0 ? assignInterest : []).map((data, index) =>{      
        if(data === proData.id) { totalRental = (parseFloat(totalRental) + parseFloat(proData.rental)); }
      })
    })
    
    setTotalOfRental(totalRental);

    if(parseFloat(budgetList.afford_amt) < parseFloat(totalRental)){
      alert("you can't afford payment for this product. kindly update your budget or choose other product")
    } 
  },[assignInterest, budgetList]);
  
  const handleChangeMultiple = async (event) => {
    const product = [...assignInterest];
    product.push(event.target.value)
    setAssignInterest(product);
  }
 
  
  const handleMainCategory = async (event) => {
    
    handleRandomInput([ {name: 'main_category', value:  event.target.value}]);
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
    handleRandomInput([ {name: 'category', value:  event.target.value}]);
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
    handleRandomInput([ {name: 'sub_category', value:  event.target.value}]);
    setSubCategory(event.target.value);
    setProductList('');    

    try {
        const result = await Category.RelatedproductList({subcategory: event.target.value});
        setProductList(result.productList);        
      } catch (error) {
        console.log('error:',error);
      }
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const category_list = await Category.mainCategoryList();
        setMainCategoryList(category_list.mainCategoryList);

        const order_id = await OrderAPI.getnewid();
        let zero = 0;
        
        let code = uid.split('_')[1].toUpperCase();
        if(order_id == ""){
            inputs.ezidebit_uid = ( code + '0000001');
            setInput('order_id',( code + '0000001'));
        }else{
          zero = 7 - (order_id[0].id.toString().length);
          let orderId='';
          for(let i=0; i< zero ; i++){
            orderId += '0';
          }
            inputs.ezidebit_uid = (code + orderId + (order_id[0].id+ 1));
            setInput('order_id',(code + orderId + (order_id[0].id+ 1)));                        
        }
      } catch (error) {
        console.log(error);
      }
  };
  fetchData();

  }, []);

  
  const handleRemoveProduct = (index) => {
    const tempProduct = [...assignInterest];
    tempProduct.splice(index, 1);
    setAssignInterest(tempProduct);
  }


  const addOrder = async () => {
    setpLoading(true);
    setSavebtn(true);
    const response = await OrderAPI.postOrder({
      order_id :  inputs.order_id,
      customer_id : customer.id,
      customer_type: inputs.customer_type,
      products_id :  assignInterest.join(),
      order_type : inputs.order_type,
      flexOrderType : flexOrderList,
      fixedOrderType : fixedOrderList,
      payment_mode: inputs.payment_mode,
      order_date  : getDate(inputs.order_date),
      assigned_to :  3,
      budget_list : budgetList,
      is_active : 1,
      converted_to : convertId,
      converted_name : converted_name,  
      sales_type_id : inputs.sales_type,
      renting_for_id : inputs.renting_for,
      sales_person_id : inputs.sales_person_id,
      ezidebit_uid : inputs.ezidebit_uid,
     });
    
      assignInterest.length = 0;
      setSavebtn(false);
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

  const { inputs, handleInputChange, handleCheckBoxChange,  handleRandomInput, handleSubmit, handleReset, setInput, errors } = useSignUpForm(
    RESET_VALUES,
    addOrder,
    validate
  );

  return (
  <div>
      <Dialog maxWidth="sm" open={open} TransitionComponent={Transition}>
        <form onSubmit={handleSubmit}> 
          <AppBar className={classes.appBar}>
            <Toolbar>
              
              <Typography variant="h6" className={classes.title}>
                New Order
              </Typography>
              
            <IconButton size="small" onClick={handleClose} className={styleClass.closeIcon}> x </IconButton>

            </Toolbar>
          </AppBar>

          <div className={classes.root}>
           {ploading ?  <LinearProgress />: null}
          <Paper className={classes.paper}>            
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="order_id">Order#</InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="order_id"
                      name="order_id"
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
                        autoOk = {true}                    
                        variant = "inline"
                        margin="dense"
                        id="order_date"
                        name="order_date"
                        format="dd-MM-yyyy"
                        placeholder="DD-MM-YYYY"
                        disabled
                        value={inputs.order_date}
                        fullWidth 
                        InputProps={{
                          classes: {
                            input: classes.textsize,
                          },
                        }}
                        onChange={handleDateChange}
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
                            startAdornment: 
                            <InputAdornment position="start">
                              <Checkbox color="default" defaultChecked value="ezidebit_uid_checked" onChange={handleCheckBoxChange("ezidebit_uid_checked")}/> 
                            </InputAdornment>,
                          }}
                          id="ezidebit_uid"
                          name="ezidebit_uid"
                          value={inputs.ezidebit_uid}
                          onChange={handleInputChange}                          
                          type="text"
                          margin="dense"
                          fullWidth
                          disabled = {inputs.ezidebit_uid_checked}
                          error={errors.ezidebit_uid}
                          helperText={errors.ezidebit_uid}
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
                      style={{marginTop : 10}}
                      error={errors.sales_person_id}
                      helperText={errors.sales_person_id}
                    > 
                    {(salesPersonList.length > 0 ? salesPersonList : []).map((data,index)=>{
                      return(
                        <MenuItem className={classes.textsize} value={data.id}>{data.name}</MenuItem>  
                        )
                     })}
                    </Select>
                  </Grid>                  
                  <Grid item xs={12} sm={12}>                    
                    <Typography variant="h6" className={errors.customer_type ? classes.errorHeading : classes.labelTitle}>
                      Select Customer*
                    </Typography>
                    <Button variant= {inputs.customer_type === 1 ? "contained" : "outlined" } size="small" color="primary"  value="1"  onClick={handleCustomerOpen} className={classes.textField} > New </Button>
                    <Button variant= {inputs.customer_type === 2 ? "contained" : "outlined" } size="small" color="primary"  value="2" onClick={handleSearchCustomerOpen}  className={classes.textField}>Existing </Button>
                    
                    {customer == null && inputs.customer_type === 1 ? 
                      <Typography variant="h6" className={classes.errorHeading}>Add customer detail</Typography>
                      : ''
                    }

                    {customer  != null && isNewCustomer === 1 ? 
                      <Button variant={customer  != null && budgetList!="" ? "contained" : "outlined" } size="small" color="primary"  onClick={handleBudgetOpen}  className={classes.textField}>Calculate Budget </Button>
                      : ''
                    }
                    {customer  != null && isNewCustomer === 0 ? 
                      <Button variant={customer  != null && budgetList!="" ? "contained" : "outlined" } size="small" color="primary"  onClick={handleBudgetOpen}  className={classes.textField}> Update Budget </Button>                       
                      : ''
                    }  
                     {customer  != null  ? 
                      <Typography variant="h6" className={classes.labelTitle}>
                        {customer.first_name + ' ' + customer.last_name + ", " + customer.address + ", " + customer.city}
                      </Typography>
                    : ''}

                    {customer  != null && budgetList!="" ? 
                      <Typography variant="h6" className={classes.labelTitle}> TOTAL SURPLUS $ {budgetList.surplus} {"  "}AFFORD TO PAY: ${budgetList.afford_amt}</Typography>
                    : ''}                  
                  </Grid>                 
              
                  <Grid item xs={12} sm={4}>
                    <InputLabel className={classes.textsize} htmlFor="main_category">Main Category*</InputLabel>
                    <Select
                      value={inputs.main_category}
                      onChange={handleMainCategory}
                      name= 'main_category'
                      id= 'main_category'
                      
                      fullWidth
                      className={classes.textsize}
                      required
                      disabled = {conversionData=="" && budgetList =="" ? true : false}
                      error={errors.main_category}
                      helperText={errors.main_category}
                      
                    > 
                    <MenuItem className={classes.textsize} disabled value={""}>Select Main Category</MenuItem>
                    {(mainCategoryList.length > 0 ? mainCategoryList : []).map((data,index)=>{
                      return(
                        data.type === 1 ? 
                         <MenuItem className={classes.textsize} value={data.id}>{data.category}</MenuItem>
                         : ''
                      ) 
                     })}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="category">Category*</InputLabel>
                    <Select
                      value={inputs.category}
                      onChange={handleCategory}
                      name= 'category'
                      id= 'category'
                      className={classes.textsize}
                      
                      fullWidth
                      required
                      disabled = { mainCategory =="" ? true : false}
                      error={errors.category}
                      helperText={errors.category}
                    >    
                    <MenuItem className={classes.textsize} disabled value={""}>Select Category</MenuItem>
                     {(categoryList.length > 0 ? categoryList : []).map((data,index)=>{
                      return(
                        data.type === 2 ? 
                         <MenuItem className={classes.textsize} value={data.id}>{data.category}</MenuItem>
                         : ''
                      ) 
                     })}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="sub_category">Sub Category*</InputLabel>
                    <Select
                      value={inputs.sub_category}
                      onChange={handleSubCategory}
                      name= 'sub_category'
                      id= 'sub_category'                      
                      fullWidth className={classes.textsize}
                      required
                      disabled = { category =="" ? true : false}
                      error={errors.sub_category}
                      helperText={errors.sub_category}
                    >    
                    <MenuItem className={classes.textsize} disabled value={""}>Select Sub Category</MenuItem>
                    {(subCategoryList.length > 0 ? subCategoryList : []).map((data,index)=>{
                      return(
                        data.type === 3 ? 
                         <MenuItem className={classes.textsize} value={data.id}>{data.category}</MenuItem>
                         : ''
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
                        disabled = {subCategory == "" || budgetList == "" ? true : false}
                      >                          
                        <MenuItem className={classes.textsize} disabled value={""}>Select Product</MenuItem>
                        {(productList.length > 0 ? productList : []).map((data,index)=>{
                          return(
                            <MenuItem className={classes.textsize} value={data.id}>{data.description}</MenuItem>
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
                        className={classes.textsize}
                        // disabled = {subCategory == "" || budgetList == "" ? true : false}
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
                    <Typography variant="h6" className={errors.order_type? classes.errorHeading : classes.labelTitle}>
                      Order Type*
                    </Typography>                    
                    {/* <InputLabel  className={errors.order_type? classes.errorHeading : classes.textsize} htmlFor="order_type">Order Type*</InputLabel> */}
                    <Button variant= {inputs.order_type === 1 ? "contained" : "outlined" } size="small" color="primary"  value="1"  onClick={handleFixedOpen} className={classes.textField} disabled={budgetList == "" || assignInterest == "" || (parseFloat(budgetList.afford_amt) < totalOfRental)}> Fix Order </Button>
                    <Button variant= {inputs.order_type === 2 ? "contained" : "outlined" } size="small" color="primary"  value="2" onClick={handleFlexOpen}  className={classes.textField} disabled={budgetList == "" || assignInterest == "" ||  (parseFloat(budgetList.afford_amt) < totalOfRental)}>Flex Order </Button>
                    {/* <Typography variant="h6" className={classes.labelTitle}>{fixedOrderList ? 'Fixed Order Method Applied' : flexOrderList ? 'Flex Order Method Applied' : 'Enter Payment Details'}</Typography>  */}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="payment_mode">Payment Mode*</InputLabel>
                    <Select
                      value={inputs.payment_mode}
                      onChange={handleInputChange}
                      name= 'payment_mode'
                      id= 'payment_mode'                      
                      fullWidth
                      className={classes.textsize}
                      error={errors.payment_mode}
                      helperText={errors.payment_mode}
                      required
                      disabled = {budgetList ==""}
                    >  
                     {(paymentModeList != undefined && (paymentModeList.length > 0 ? paymentModeList : []).map((data,index) => {
                        return(
                          <MenuItem className={classes.textsize} value={data.id}>{data.payment_mode}</MenuItem>
                        )
                      }))}                       
                    </Select>
                   </Grid>
                    
            {savebtn? <Grid item xs={12} sm={12}> 
                          <Button  variant="contained" color="primary" onClick={handleSubmit} className={classes.button}>save</Button>
                          <Button variant="contained" color="primary"  onClick={handleClose} className={classes.button}>Close</Button> 
                      </Grid> 
                    : <Grid item xs={12} sm={12}>
                          <Button  variant="contained"  color="primary" className={classes.button} disabled>save</Button>
                          <Button variant="contained" color="primary" className={classes.button} disabled>Close</Button> 
                      </Grid>
            }
                </Grid>
          </Paper>
          </div>
        </form>
      </Dialog>
    {budgetOpen ?<Budget open={budgetOpen} handleBudgetClose={handleBudgetClose} budgetList={budgetList} setBudgetList={setBudgetList} customer_id= {customer.id} handleOrderViewFromBudget={handleOrderViewFromBudget}/> : null }
    {customerOpen ? <AddCustomer open={customerOpen} handleClose={handleCustomerClose} fetchCustomerList={fetchCustomerList} conversionData={conversionData}/> : null }
    {fixedOrderOpen ?<FixedOrder open={fixedOrderOpen} handleFixedClose={handleFixedClose} setFixedOrderList={setFixedOrderList} fixedOrderList= {fixedOrderList} handleOrderType = {handleFixedOrderType} totalOfRental={totalOfRental} productQuantity = {assignInterest.length} /> : null }
    {flexOrderOpen ?<FlexOrder open={flexOrderOpen} handleFlexClose={handleFlexClose} setFlexOrderList={setFlexOrderList} flexOrderList={flexOrderList} handleOrderType = {handleFlexOrderType} totalOfRental={totalOfRental} productQuantity = {assignInterest.length}/> : null }
    {searchCustomerOpen ?<SearchCustomer open={searchCustomerOpen} handleClose={handleSearchCustomerClose} setCustomerList={handleIsExistCustomer} setCustomer={setCustomer} />  : null }
    </div>
  );
}
