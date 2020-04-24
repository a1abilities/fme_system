import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TextField from '@material-ui/core/TextField';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import {useCommonStyles} from '../../common/StyleComman'; 
import Chip from '@material-ui/core/Chip';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import DoneIcon from '@material-ui/icons/Done';
import InputAdornment from '@material-ui/core/InputAdornment';
import LinearProgress from '@material-ui/core/LinearProgress';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import 'date-fns';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';


// API CALL
import Order from '../../../api/franchise/Order';
import ConfirmationDialog from '../ConfirmationDialog.js';
import { getDate, getCurrentDate, getDateInDDMMYYYY } from '../../../utils/datetime';

import useSignUpForm from '../franchise/CustomHooks';
import validate from '../../common/validation/ProductDeliveryForm';
import CategoryAPI from '../../../api/Category';
import { FormLabel } from '@material-ui/core';



const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    height: theme.spacing(5),
  },
  chip: {
    margin: theme.spacing(0.5),
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
  highlightRow:{
    backgroundColor: "#CBF6BF",
    color: theme.palette.common.white,
  },
  labelTitle: {  
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(13),
    marginTop: 15,
  },
  listItem: {  
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(12),    
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  buttonDisabled: {
    color: theme.palette.secondary,
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

const RESET_VALUES  = {
  comment: '',
  product_brand : '',
  product_color : '',
  product_cost : '',
  specification : '',
  invoice_number : '',
  delivery_date : getCurrentDate(),
  purchase_from : '',
}

export default function UpdateDeliveredProduct({ open, handleClose, orderData, roleName, fetchOrderDataList}) {

  const classes = useStyles();
  const styleClass = useCommonStyles();  
  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(false);
  const [orderedProductList, setOrderedProductList] = useState([]);
  const [productDetail, setProductDetail] = useState([]);
  const [filledProduct, setFilledProduct] = useState([]);
  const [product, setProduct] = useState('');
  const [formError, setFormError] = useState({});

  function handleDateChange(date){
    handleInputChange({target:{name: 'delivery_date', value: date}})
  }
  
  const designProArrayLayout = (products) => {
    let temp = [];
    (products != undefined && products != null && products != "") && products.map((data, index) => {
      temp.push({id: data.id, name: data.name});
    })
    setProductDetail(temp);
  }


  const getRequiredData = async () => {
      try {
        const response = await CategoryAPI.getOrderedProductList({ product_ids : orderData.product_id });
        setOrderedProductList(response.productList);
        designProArrayLayout(response.productList);
      } catch (error) {
        console.log('Error..',error);
      }
  };
  
  useEffect(() => {
     getRequiredData();
  },[]);


  const formSubmit = async () => {
    if(productDetail.length > 0 && inputs.comment === ''){
      setFormError({product: 'Details is required for all product', comment: 'Comment is required'});
    }else if(productDetail.length > 0){
      setFormError({product: 'Details is required for all product'})
    }else if(inputs.comment === ''){
      setFormError({comment: 'Comment is required'})
    }    
    if(inputs.comment !== '' && productDetail.length === 0){
      setFormError({});
      setpLoading(true);
      setSavebtn(true);
      const result = await Order.submitDeliveredProduct({
        id : orderData.id,
        customer_id : orderData.customer_id,
        order_id: orderData.order_id,
        user_role: roleName,
        comment: inputs.comment,      
        delivered_date: getDate(inputs.delivery_date),
        delivered_time: new Date(),

        productDetails : filledProduct,
      });
      fetchOrderDataList();
      handleClose();
    };    
  }

  const saveProduct = () => {
    let temp = [...filledProduct];
    temp.push({
          product_id : product.id,
          product_name : product.name,
          delivery_date : getDate(inputs.delivery_date),
          product_brand : inputs.product_brand,
          product_color : inputs.product_color,
          product_cost : inputs.product_cost,
          specification : inputs.specification,
          invoice_number : inputs.invoice_number,
          purchase_from : inputs.purchase_from,
        });
      setFilledProduct(temp);

      let removeProduct = [];
      productDetail.find(data => {
        if(data.id !== product.id) {removeProduct.push(data)}
      });
      
      if(removeProduct !== undefined){
        setProductDetail(removeProduct)
      }else{
        setProductDetail([]);
      }
  }

  const updateProduct = (product) => {
    handleReset(product);
    let temp = [...productDetail];
    temp.push({id: product.product_id, name: product.product_name})
    setProductDetail(temp);
    

    let removeProduct = [];
      filledProduct.find(data => {
        if(data.product_id !== product.product_id) {removeProduct.push(data)}
      });
      
      if(removeProduct !== undefined){ 
        setFilledProduct(removeProduct);
      }else{
        setFilledProduct([]);
      }
  }

  const { inputs, handleInputChange, handlePriceInput, handleReset, handleSubmit, errors } = useSignUpForm(
    RESET_VALUES,
    saveProduct,
    validate
  );


return (
    <div>
      <Dialog maxWidth="sm" open={open} TransitionComponent={Transition}>
        <form > 
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Update Product
              </Typography>              
              <IconButton size="small" onClick={handleClose} className={styleClass.closeIcon}> x </IconButton>
            </Toolbar>
          </AppBar>
          
          <div className={classes.root}>
          {ploading ?  <LinearProgress />: null}
          <Paper className={classes.paper}>            
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" className={classes.labelTitle}>
                     {"Order Id: " + orderData.order_id }
                  </Typography> 
                  <Typography variant="h6" className={classes.labelTitle}>
                     {"Customer Name: " + orderData.first_name + ' ' + orderData.last_name }
                  </Typography>
                </Grid>               
           
                <Grid item xs={12} sm={6}>     
                  <Typography variant="h6" className={classes.labelTitle}>
                     {"Customer Id:  " + orderData.customer_id }
                  </Typography>
                  <Typography variant="h6" className={classes.labelTitle}>
                     {"Customer Add.:  " + orderData.address }
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="h6" className={classes.labelTitle}> PRODUCT TO DELIVERED:</Typography>
                  <List dense = {true}>
                    {(orderedProductList.length > 0 ? orderedProductList :[]).map(data => {
                      return(
                        <ListItem  style = {{marginBottom : '-12px'}}>
                          <ListItemText
                            primary= {
                              <Typography variant="h6" className={classes.listItem}> {data.name} </Typography>
                            }
                          />
                        </ListItem>                        
                      )
                    })}
                  </List>
                </Grid>
                <Grid item xs={12} sm={12}>   
                    <Divider />
                </Grid> 
                <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="delivery_date">Delivery Date*</InputLabel>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        autoOk = {true}                    
                        variant = "inline"
                        margin="dense"
                        id="delivery_date"
                        name="delivery_date"
                        format="dd-MM-yyyy"
                        placeholder="DD-MM-YYYY"
                        value={inputs.delivery_date}
                        fullWidth 
                        InputProps={{
                          classes: {
                            input: classes.textsize,
                          },
                        }}
                        onChange={handleDateChange}
                        // error={errors.delivery_date}
                        // helperText={errors.delivery_date}                               
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={12} sm={6}>     
                  <InputLabel className={classes.textsize}  htmlFor="invoice_number">Invoice Number </InputLabel>
                  <TextField                       
                      id="invoice_number"
                      name="invoice_number"
                      value={inputs.invoice_number}
                      onChange={handleInputChange}                      
                      fullWidth   
                      InputProps={{                        
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      error={errors.invoice_number}
                      helperText={errors.invoice_number}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>     
                  <InputLabel className={classes.textsize}  htmlFor="purchase_from">Purchase From </InputLabel>
                  <TextField                       
                      id="purchase_from"
                      name="purchase_from"
                      value={inputs.purchase_from}
                      onChange={handleInputChange}                      
                      fullWidth   
                      InputProps={{                        
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      error={errors.purchase_from}
                      helperText={errors.purchase_from}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>     
                  <InputLabel className={classes.textsize}  htmlFor="product_cost">Product Cost </InputLabel>
                  <TextField                       
                      id="product_cost"
                      name="product_cost"
                      value={inputs.product_cost}
                      onChange={handlePriceInput}                      
                      fullWidth                       
                      error={errors.product_cost}
                      helperText={errors.product_cost}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      error={errors.product_cost}
                      helperText={errors.product_cost}
                    />
                  </Grid>
                <Grid item xs={12} sm={6}>     
                  <InputLabel className={classes.textsize}  htmlFor="product_brand">Product Brand *</InputLabel>
                  <TextField                       
                      id="product_brand"
                      name="product_brand"
                      value={inputs.product_brand}
                      onChange={handleInputChange}                      
                      fullWidth   
                      InputProps={{                        
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      error={errors.product_brand}
                      helperText={errors.product_brand}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>     
                  <InputLabel className={classes.textsize}  htmlFor="product_color">Product Color *</InputLabel>
                  <TextField                       
                      id="product_color"
                      name="product_color"
                      value={inputs.product_color}
                      onChange={handleInputChange}                      
                      fullWidth   
                      InputProps={{                        
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      error={errors.product_color}
                      helperText={errors.product_color}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>     
                  <InputLabel className={classes.textsize}  htmlFor="specification">Product Specification *</InputLabel>
                  <TextField                       
                      id="specification"
                      name="specification"
                      value={inputs.specification}
                      onChange={handleInputChange}                      
                      fullWidth   
                      multiline                   
                      InputProps={{                        
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      error={errors.specification}
                      helperText={errors.specification}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} alignItems = "center">     
                    <Typography className={classes.labelTitle}>Details Save to: </Typography>
                    {formError && ( productDetail !== undefined && productDetail !== null && productDetail.length > 0 ? productDetail :[]).map((data, index) => {
                      if(data !== undefined && data !== "")
                      return(
                        <Chip
                          style = {Object.keys(formError)[0] === 'product' ? { backgroundColor : 'red'} : {}}
                          clickable
                          icon={<DoneIcon />}
                          deleteIcon = {<DoneIcon />}                          
                          size = "small"
                          key={data.id}
                          label={data.name}
                          className={classes.chip}
                          onClick = {() => {setProduct(data); handleSubmit()}}                          
                        />
                      )
                    })}
                  </Grid>

                  <Grid item xs={12} sm={6} alignItems = "center">     
                    <Typography className={classes.labelTitle}>Saved Products: </Typography>
                    {(filledProduct.length > 0 ? filledProduct :[]).map((data, index) => {
                      if(data !== undefined && data !== "")
                      return(
                        <Chip
                          size = "small"
                          key={data.id}
                          label={data.product_name}
                          className={classes.chip}
                          clickable
                          icon={<EditIcon />}
                          onClick = {() => {updateProduct(data)}}
                        />
                      )
                    })}
                  </Grid>

                  <Grid item xs={12} sm={12}>     
                  <InputLabel className={classes.textsize}  htmlFor="comment">Write comment about order *</InputLabel>
                  <TextField                       
                      id="comment"
                      name="comment"
                      value={inputs.comment}
                      onChange={handleInputChange}                      
                      fullWidth   
                      multiline                   
                      InputProps={{                        
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      error={formError.comment}
                      helperText={formError.comment}
                    />
                  </Grid>
                <Grid item xs={12} sm={12}>                                     
                  <Button variant="contained" color='primary' className={classes.button} onClick={ formSubmit } disabled = {savebtn} >Submit</Button>
                  <Button variant="contained" color="primary" onClick={handleClose} className={classes.button}>
                    Cancel
                  </Button> 
                </Grid>
            </Grid>
          </Paper>
          </div>
        </form>
      </Dialog>
      {/* {confirmation ? <ConfirmationDialog open = {confirmation} lastValue={1} handleConfirmationClose={handleConfirmationDialog}  currentState={0} title={""} content={"Sure to cancel this order ?"} />: null } */}
    </div>
  );
}
