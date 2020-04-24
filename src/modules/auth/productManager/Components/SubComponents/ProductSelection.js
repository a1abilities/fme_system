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

// API CALL
import ProductManagerAPI from '../../../../../api/ProductManager.js';

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


export default function ProductSelection({ open, handleClose, orderData, productId, tabValue, openHistoryDialog }) {  
  const classes = useStyles();

  const [commonProducts, setCommonProducts] = useState([]);
  const [productCode, setProductCode] = useState('');
  const [errors, setErrors] = useState({product_code: ''});
  
  useEffect(() => {
    getCommonProductForOrder();
  },[]);


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
   
  const handleSubmit = () => {
    if(productCode === ''){
      setErrors({product_code: 'Field is required'})
    }else{
      setErrors({product_code: ''})
      openHistoryDialog(productCode);
      handleClose(false);
    }
  }

return (
    <div>
      <Dialog maxWidth="sm" open={open} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Select Product
              </Typography>
            <IconButton size="small" onClick={handleClose} className={classes.closeIcon}> x </IconButton>
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
          <Paper className={classes.paper}>            
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12}>
                <InputLabel  className={classes.textsize} htmlFor="product_code">Select Product (using product code)*</InputLabel>
                  <Select
                    value={productCode.product_code}
                    onChange={(e)=> {setProductCode(e.target.value)}}
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
                      <MenuItem className={classes.textsize} key = {data.id} value={data}>{data.product_code}</MenuItem>
                      )
                    })}
                  </Select>
              </Grid>  
                <Button variant="contained" color="primary" className={classes.button} onClick = {handleSubmit} > View </Button> 
                <Button variant="contained" color="primary" onClick={handleClose} className={classes.button}> Close </Button> 
            </Grid>
          </Paper>
        </div>
      </Dialog>
    </div>
  );
}
