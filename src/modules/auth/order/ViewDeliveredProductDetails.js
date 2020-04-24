import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import Chip from '@material-ui/core/Chip';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import DoneIcon from '@material-ui/icons/Done';
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import {useCommonStyles} from '../../common/StyleComman'; 
import InputAdornment from '@material-ui/core/InputAdornment';
import LinearProgress from '@material-ui/core/LinearProgress';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import 'date-fns';

import { APP_TOKEN } from '../../../api/Constants';

// API CALL
import Order from '../../../api/franchise/Order';
import CategoryAPI from '../../../api/Category';
import ConfirmationDialog from '../ConfirmationDialog.js';
import { getDate, getCurrentDate, getCurrentDateDBFormat } from '../../../utils/datetime';

import useSignUpForm from '../franchise/CustomHooks';
import validate from '../../common/validation/ProductDeliveryForm';

import { FormLabel } from '@material-ui/core';
import { API_URL } from '../../../api/Constants';


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
  highlightRow:{
    backgroundColor: "#CBF6BF",
    color: theme.palette.common.white,
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
  buttonDisabled: {
    color: theme.palette.secondary,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 100,
  },
  chip: {
    margin: theme.spacing(0.5),
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
  delivery_date : getCurrentDateDBFormat(), 
  purchase_from : '',
  document : '',
}

export default function ViewDeliveredProductDetails({ open, handleClose, orderData, roleName}) {

  const classes = useStyles();
  const styleClass = useCommonStyles();
  const [inputs, setInputs] = useState(RESET_VALUES);
  const [orderedProductList, setOrderedProductList] = useState([]);
  const [deliveredData, setDeliveredData]  = useState([]);
  const [productId, setProductId] = useState();

  const getRequiredData = async () => {
      try {
        const deliveredData = await Order.getDeliveredProductData({ order_id: orderData.id});
        if(deliveredData != undefined && deliveredData != ""  && deliveredData != null){
          setDeliveredData(deliveredData);
          setInputs(deliveredData[0]);
          setProductId(deliveredData[0].product_id);
        }        
        const response = await CategoryAPI.getOrderedProductList({ product_ids : orderData.product_id });
        setOrderedProductList(response.productList);
      } catch (error) {
        console.log('Error..',error);
      }
  };
  
  useEffect(() => {
    getRequiredData();
  },[]);

  const viewProduct = (data) => {
    setProductId(data.product_id);
    setInputs(data);
  }

return (
    <div>
      <Dialog maxWidth="sm" open={open} TransitionComponent={Transition}>
        <form > 
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                View Delivered Product Detail
              </Typography>              
              <IconButton size="small" onClick={handleClose} className={styleClass.closeIcon}> x </IconButton>
            </Toolbar>
          </AppBar>
          
          <div className={classes.root}>
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
                <Grid item xs={12} sm={12} alignItems = "center">
                  <Typography variant="h6" className={classes.labelTitle}>DELIVERED PRODUCT:</Typography>
                    {productId && (orderedProductList.length > 0 ? orderedProductList :[]).map((data) => {
                      return(
                        (deliveredData !== undefined && deliveredData !== null && deliveredData.length > 0 ? deliveredData :[]).map((product) => {
                          if(data.id === product.product_id){
                            return(
                              <Chip
                                size = "small"
                                key={data.id}
                                label={data.name}
                                className={classes.chip}
                                clickable
                                icon={<DoneIcon />}
                                onClick = {() => {viewProduct(product)}}
                                style = {productId === product.product_id ? {backgroundColor : 'red', color: 'white'} : {}}
                              />
                            )
                          }
                        })
                      )
                    })}
                </Grid>
                <Grid item xs={12} sm={12}>   
                    <Divider />
                </Grid> 
                <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="delivery_date">Delivery Date*</InputLabel>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        margin="dense"
                        id="delivery_date"
                        autoOk = {true}                    
                        variant = "inline"
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
                        disabled
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={12} sm={6}>     
                  <InputLabel className={classes.textsize}  htmlFor="invoice_number">Invoice Number </InputLabel>
                  <TextField                       
                      id="invoice_number"
                      name="invoice_number"
                      value={inputs.invoice_number}
                      fullWidth   
                      InputProps={{                        
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>     
                  <InputLabel className={classes.textsize}  htmlFor="purchase_from">Purchase From </InputLabel>
                  <TextField                       
                      id="purchase_from"
                      name="purchase_from"
                      value={inputs.purchase_from}
                      fullWidth   
                      InputProps={{                        
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>     
                  <InputLabel className={classes.textsize}  htmlFor="product_cost">Product Cost </InputLabel>
                  <TextField                       
                      id="product_cost"
                      name="product_cost"
                      value={inputs.product_cost}
                      fullWidth                       
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      disabled
                    />
                  </Grid>
                <Grid item xs={12} sm={6}>     
                  <InputLabel className={classes.textsize}  htmlFor="product_brand">Product Brand *</InputLabel>
                  <TextField                       
                      id="product_brand"
                      name="product_brand"
                      value={inputs.product_brand}
                      fullWidth   
                      InputProps={{                        
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>     
                  <InputLabel className={classes.textsize}  htmlFor="product_color">Product Color *</InputLabel>
                  <TextField                       
                      id="product_color"
                      name="product_color"
                      value={inputs.product_color}
                      fullWidth   
                      InputProps={{                        
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>     
                  <InputLabel className={classes.textsize}  htmlFor="specification">Current state of product *</InputLabel>
                  <TextField                       
                      id="product_state"
                      name="product_state"
                      value={inputs.product_state}
                      fullWidth
                      multiline
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>     
                  <InputLabel className={classes.textsize}  htmlFor="specification">Product Specification *</InputLabel>
                  <TextField                       
                      id="specification"
                      name="specification"
                      value={inputs.specification}
                      fullWidth   
                      multiline                   
                      InputProps={{                        
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      disabled
                    />
                  </Grid>
                  
                  {(inputs.document != null && inputs.document != undefined && inputs.document != "") &&
                    <Grid item xs={12} sm={12}>
                      <a href={API_URL + "/api/download?path=DeliveredDoc/" + inputs.document }  download >Click here to download product delivered document</a>
                    </Grid>
                  }
                  
                <Grid item xs={12} sm={12}>                                     
                  <Button variant="contained" color="primary" onClick={handleClose} className={classes.button}>
                    Close
                  </Button> 
                </Grid>
            </Grid>
          </Paper>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
