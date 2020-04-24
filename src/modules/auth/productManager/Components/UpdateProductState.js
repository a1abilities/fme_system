import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';

// Components
import useSignUpForm from '../../franchise/CustomHooks.js';
import validate from '../../../common/validation/productManagerUpdateState';

// API CALL
import ProductManagerAPI from '../../../../api/ProductManager.js';
import StaticContentAPI from '../../../../api/StaticContent.js';

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
    margin: theme.spacing(1),
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  },
  drpdwn:{
    marginTop: theme.spacing(1),
    fontSize: theme.typography.pxToRem(12),
  },
  group: {
    // margin: theme.spacing(1, 0),
    fontSize: theme.typography.pxToRem(12),
  },
  errorHeading: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightBold,
    color:'red',
  },
  closeIcon: {
    marginTop:theme.spacing(-3),
    color: 'white', 
    fontSize: theme.typography.pxToRem(14),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginRight:theme.spacing(-1),
  },
  dobMsg : {
    marginTop : theme.spacing(-1),
    fontSize: theme.typography.pxToRem(12),
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RESET_VALUES = {
  product_code : '',
  product_state : '',
  comment : ''
}

export default function UpdateProductState({ open, handleClose, orderData, productId, tabValue, setRentedProductList, setRentedOrderList, setTabCounts }) {  
  const classes = useStyles();

  const [ploading, setpLoading] = useState(false);
  const [savebtn, setSavebtn] = useState(false);

  const [productStateList, setProductStateList] = useState([]);
  const [commonProducts, setCommonProducts] = useState([]);

  useEffect(() => {
    getProductState();
    getCommonProductForOrder();
  },[]);

  const getProductState = async () => {
    try{
      const result = await StaticContentAPI.getProductState({});
      setProductStateList(result.stateList);
    }catch(error){
      console.log('Error...', error);
    }
  }

  const getCommonProductForOrder = async () => {
    try{
      const result = await ProductManagerAPI.getCommonProductForOrder({
        orderId : orderData.id,
        productId : productId,
        tabValue: tabValue,
      });
      setCommonProducts(result)
    }catch(error){
      console.log('Error...', error);
    }
  }
  
  const SubmitForm= async () =>{
    setpLoading(true);
    setSavebtn(true);
    try{
      const result = await ProductManagerAPI.changeProductState({
        orderId : orderData.id,
        customerId: orderData.customer_id,
        productId : productId,
        productCode : inputs.product_code,
        tabValue: tabValue,
        newState: inputs.product_state,
        comment: inputs.comment,
      });
      setRentedProductList(result.productList);
      setRentedOrderList(result.orderList);
      setTabCounts(result.tabCounts[0]);
      setpLoading(false);
      setSavebtn(false);
      handleClose(false);
    }catch(error){
      console.log('Error...', error)
    }
  }


const { inputs, handleInputChange, handleSubmit, handleReset, setInput, errors } = useSignUpForm(
  RESET_VALUES,
  SubmitForm,
  validate
);


return (
    <div>
      <Dialog maxWidth="sm" open={open} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Update Product State
              </Typography>
            <IconButton size="small" onClick={handleClose} className={classes.closeIcon}> x </IconButton>
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
          <Grid item xs={12} sm={12}>   {ploading ?  <LinearProgress />: null}</Grid>
          <Paper className={classes.paper}>            
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12}>
                <InputLabel  className={classes.textsize} htmlFor="product_code">Select Product (using product code)*</InputLabel>
                  <Select                      
                    value={inputs.product_code}
                    onChange={handleInputChange}
                    name= 'product_code'
                    id= 'product_code'
                    fullWidth
                    className={classes.textsize}
                    required
                    error={errors.product_code}
                    helperText={errors.product_code}
                  > 
                    {(commonProducts.length > 0 ? commonProducts : []).map((data)=>{
                    return(
                      <MenuItem className={classes.textsize} value={data.product_code}>{data.product_code}</MenuItem>
                      )
                    })}
                  </Select>
              </Grid>  
              <Grid item xs={12} sm={12}>
                <InputLabel  className={classes.textsize} htmlFor="product_state">Select State *</InputLabel>
                  <Select
                    value={inputs.product_state}
                    onChange={handleInputChange}
                    name= 'product_state'
                    id= 'product_state'
                    fullWidth
                    className={classes.textsize}
                    required
                    error={errors.product_state}
                    helperText={errors.product_state}
                  > 
                    {(productStateList.length > 0 ? productStateList : []).map((data)=>{
                    return(
                      (data.id !== 1) &&
                      <MenuItem className={classes.textsize} value={data.id}>{data.status_name}</MenuItem>
                      )
                    })}
                  </Select>
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputLabel  className={classes.textsize} htmlFor="comment">Comment *</InputLabel>
                  <TextField
                    multiline
                    InputProps={{
                      classes: {
                        input: classes.textsize,
                      },
                    }}
                    id="comment"
                    name="comment"
                    value={inputs.comment}
                    onChange={handleInputChange}                    
                    fullWidth
                    type="text"                    
                    margin="dense"
                    error={errors.comment}
                    helperText={errors.comment}
                  />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button variant="contained" color="primary" className={classes.button} onClick = {handleSubmit} disabled= {savebtn == true}> Submit </Button> 
                <Button variant="contained" color="primary" onClick={handleClose} className={classes.button}> Close </Button> 
            </Grid>
          </Grid>
          </Paper>
        </div>
      </Dialog>
    </div>
  );
}
