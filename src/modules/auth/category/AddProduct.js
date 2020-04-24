import React, { useState, useEffect } from 'react';
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
import Toolbar from '@material-ui/core/Toolbar';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LinearProgress from '@material-ui/core/LinearProgress';
import {useCommonStyles} from '../../common/StyleComman'; 
import validate from '../../common/validation/ProductRuleValidation';
import AddColor from './AddColor';
import AddBrand from './AddBrand';
// API CALL
import Category from '../../../api/Category';
import Brand from '../../../api/product/Brand';
import Color from '../../../api/product/Color';
import Status from '../../../api/product/Status';
import useSignUpForm from '../franchise/CustomHooks';

import { store, useStore } from '../../../store/hookStore';

const RESET_VALUES = {
  productname:'',
  color:'',
  brand:'',
  buying_price:'',
  description:'',
  specification:'',
  brought:'',
  invoice:'',
  rental:'',
  meta_keywords:'',
  meta_description:'',
  status:''
  
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
  margin:{
    fontSize: theme.typography.pxToRem(12),
    marginTop: theme.spacing(2),
  },
  marginStatus:{
    fontSize: theme.typography.pxToRem(12),
    marginTop: theme.spacing(2.5),
  },
  drpdwn:{
    marginTop: theme.spacing(1),
    fontSize: theme.typography.pxToRem(12),
  },
  input: {
    display: 'none',
  },
  closeIcon: { marginTop:theme.spacing(-3) },   
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddProduct(props) {
  const styleClass = useCommonStyles();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('panel1');
  
  const [isError, setIsError] = useState(false);
  const [brandList, setBrandList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(true);

  const [colorOpen, setColorOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await Brand.list();
        setBrandList(result.brandList);
        const color_result = await Color.list();
        setColorList(color_result.colorList);
        const status_result = await Status.list();
        setStatusList(status_result.statusList);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const categoryadd = async () => {
    setpLoading(true);
    setSavebtn(false);

    const response = await Category.addproduct({
      maincat:props.productCatList.maincategory,
      category:props.productCatList.category,
      subcat:props.productCatList.subcategory,
      name:inputs.name,
      color_id:inputs.color_id,
      brand_id:inputs.brand_id,
      buying_price:inputs.buying_price,
      description:inputs.description,
      specification:inputs.specification,
      brought:inputs.brought,
      invoice:inputs.invoice,
      rental:inputs.rental,
      meta_keywords:inputs.meta_keywords,
      meta_description:inputs.meta_description,
      status:inputs.status,
    });
    props.productData(response.categoryList);
    setpLoading(false);
    setSavebtn(true);
    props.handleClose(false);
  };

  function handleReset() {
    cleanInputs()
    console.log(inputs);
  };
  
  function updatedData(response){   
    setColorList(response);
     
  }

  const { inputs, handleInputChange,  handleNumberInput, handlePriceInput, handleSubmit,  setInput ,cleanInputs,errors } = useSignUpForm(
    RESET_VALUES,
    categoryadd,
    validate
  );

  function handleColorInputChange(e){
    handleInputChange(e);
    if(e.target.value==='0'){
      setColorOpen(true);      
    }
  }
  
  function handleColorClose() {
    setColorOpen(false);
  }
  function handleBrandInputChange(e){
    handleInputChange(e);
    if(e.target.value==='0'){
      setBrandOpen(true);      
    }
  }
  
  function handleBrandClose() {
    setBrandOpen(false);
  } 
   function updatedBrandData(response){   
    setBrandList(response);
     
  }
  return (
    <div>
      <Dialog maxWidth="sm" open={props.open}>
        <form>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h4" className={classes.title}>
                Add Product
              </Typography>
              <IconButton size="small" onClick={props.handleClose} className={styleClass.closeIcon}> x </IconButton>
            </Toolbar>
          </AppBar>

          <div className={classes.root}>

          <Grid item xs={12} sm={12}>   {ploading ?  <LinearProgress />: null}</Grid>
        
          <Paper className={classes.paper}> 
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="product_name">Product Title/Name *</InputLabel>
                    
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="name"
                      name="name"
                      value={inputs.name}
                      error={errors.name}
                      helperText={errors.name}
                      fullWidth
                      type="text"
                      margin="dense"
                      required                      
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="choose_color">Choose Color *</InputLabel>
                    <Select
                        name="color_id"
                        onChange={handleColorInputChange}
                        value={inputs.color_id}
                        inputProps={{
                          name: 'color_id',
                          id: 'color_id',
                        }}
                        className={classes.drpdwn}
                        error={errors.color_id}
                        helperText={errors.color_id}
                        fullWidth
                        // label="Choose Color"
                        required
                      >
                        { (colorList || []).map((data, index)=>{
                          return(
                          <MenuItem className={classes.textsize} value={data.id}>{data.color}</MenuItem>
                            )
                          })
                        }
                        <MenuItem className={classes.textsize} value="0" >Others</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="city_selection">Choose Brand *</InputLabel>
                    <Select
                        name="brand_id"
                        onChange={handleBrandInputChange}
                        value={inputs.brand_id}
                        inputProps={{
                          name: 'brand_id',
                          id: 'brand_id',
                        }}
                        className={classes.drpdwn}
                        fullWidth
                        error={errors.brand_id}
                        helperText={errors.brand_id}
                        required
                      >
                        { (brandList || []).map((data, index)=>{
                          return(
                            <MenuItem className={classes.textsize} value={data.id}>{data.brand_name}</MenuItem>
                              )
                          })
                        }
                        <MenuItem className={classes.textsize} value="0" >Others</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="productprice">Product Buying Price</InputLabel>
                    <TextField
                    
                      id="buying_price"
                      name="buying_price"
                      value={inputs.buying_price}
                      onChange={handlePriceInput}
                      fullWidth
                      type="text"
                      margin="dense"
                      error={errors.buying_price}
                      helperText={errors.buying_price}
                      required
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="description">Product Description</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                        id="description"
                        name="description"
                        fullWidth
                        multiline
                        error={errors.description}
                        helperText={errors.description}
                        margin="dense"
                        type="text"
                        value={inputs.description}
                        onChange={handleInputChange}
                      />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="specification">Product Specification</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                        id="specification"
                        multiline
                        fullWidth
                        name="specification"
                        margin="dense"
                        type="text"
                        value={inputs.specification}
                        onChange={handleInputChange}
                        error={errors.specification}
                        helperText={errors.specification}
                      />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="product_name">Brought From</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="brought"
                      name="brought"
                      value={inputs.brought}
                      onChange={handleInputChange}
                      error={errors.brought}
                      helperText={errors.brought}
                      fullWidth
                      margin="dense"
                      type="text"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="product_name">Invoice Number</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="invoice"
                      name="invoice"
                      value={inputs.invoice}
                      onChange={handleInputChange}
                      error={errors.invoice}
                      helperText={errors.invoice}
                      fullWidth
                      margin="dense"
                      type="text"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="product_name">Rental Price </InputLabel>
                    <TextField
                      id="rental"
                      name="rental"
                      value={inputs.rental}
                      onChange={handlePriceInput}
                      fullWidth
                      required
                      margin="dense"
                      error={errors.rental}
                      helperText={errors.rental}
                      type="text"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="product_name">Meta Keywords</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.margin,
                        },
                      }}
                      id="meta_keywords"
                      name="meta_keywords"
                      value={inputs.meta_keywords}
                      onChange={handleInputChange}
                      fullWidth
                      margin="dense"
                      type="text"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="meta_description">Meta Description</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                        id="meta_description"
                        name="meta_description"
                        multiline
                        margin="normal"
                        fullWidth
                        value={inputs.meta_description}
                        onChange={handleInputChange}                        
                        type="text"
                      />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="city_selection">Choose Status</InputLabel>
                    <Select
                        name="status"
                        onChange={handleInputChange}
                        value={inputs.status}
                        inputProps={{
                          name: 'status',
                          id: 'status',
                        }}
                        className={classes.marginStatus}
                        error={errors.status}
                        helperText={errors.status}
                        fullWidth
                        required
                      >
                        { (statusList || []).map((datastatus, index)=>{
                          
                          return(datastatus.id!=3 ?
                        <MenuItem value={datastatus.id}>{datastatus.status}</MenuItem>:''
                          )
                      })
                    }
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                   {savebtn?   
                      <Button variant="contained" color="primary" onClick={handleSubmit} className={classes.button} > Save</Button>
                   :  <Button variant="contained" color="primary" className={classes.button} disabled>  Save  </Button>
                   }
                    <Button variant="contained" color="primary" onClick={props.handleClose} className={classes.button}>
                      Close
                    </Button> 
                  </Grid>
                
              </Grid>
            </Paper>
            { colorOpen ?    <AddColor open={colorOpen} handleClose={handleColorClose}  updatedData={updatedData}/> : null }
            { brandOpen ?    <AddBrand open={brandOpen} handleClose={handleBrandClose}  updatedBrandData={updatedBrandData}/> : null }

          </div>
      </form>
      </Dialog>
    </div>
  );
}
