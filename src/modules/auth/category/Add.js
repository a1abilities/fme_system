import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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

// API CALL
import Category from '../../../api/Category';

import AddMainCategory from './AddMainCategory';
import AddCategory from './AddCategory';
import AddSubcategory from './AddSubcategory';
import AddProduct from './AddProduct';
import useSignUpForm from '../franchise/CustomHooks';
import {useCommonStyles} from '../../common/StyleComman'; 

import { store, useStore } from '../../../store/hookStore';

const RESET_VALUES = {
  maincat:'',
  cat:'',
  subcat:'',
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
  closeIcon: { marginTop:theme.spacing(-3) },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 100,
  },
  heading: {
    fontSize: theme.typography.pxToRem(12),
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(3),
    fontWeight: theme.typography.fontWeightBold,
  },
  expansionTitle: {
    fontWeight: theme.typography.fontWeightBold,
  },
  margin:{
    marginTop: theme.spacing(2),
    fontSize: theme.typography.pxToRem(12),
  },
  button:{
    color:"white",
    fontSize: theme.typography.pxToRem(10),
    marginRight: theme.spacing(1),
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  },
  input: {
    display: 'none',
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

export default function Add({ open, handleClose, handleSnackbarClick, updateProductList}) {
  const classes = useStyles();
  const styleClass = useCommonStyles();
  const [expanded, setExpanded] = React.useState('panel1');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [newDataList, setNewDataList] = useState([]);
  const [newCatDataList, setNewCatDataList] = useState([]);
  const [newSubCatDataList, setNewSubCatDataList] = useState([]);
  
  const [productCatList, setProductCatList] = useState([]);

  const [mainCategoryList, setMainCategoryList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  
  const [errorMaincat, setErrorMaincat] = useState('');
  const [errorCat, setErrorCat] = useState('');
  const [errorSubcat, setErrorSubcat] = useState('');
  const [mainOpen, setMainOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [subcatOpen, setSubCatOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  

const { inputs, handleInputChange, handleSubmit, handleReset, setInput, errors } = useSignUpForm(
  RESET_VALUES,
);



  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await Category.getAllFromMainCategoryList();
        setMainCategoryList(result.mainCategoryList);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  function newData(newdata){
    setNewDataList(newdata);
  }

  function updatedData(response){   
    setMainCategoryList(response);
    inputs.maincat = '';
    inputs.cat = '';
    inputs.subcat = '';    
  }

  function productData(newdata){
    updateProductList(newdata);
    // setProductList(newdata);
    handleReset(RESET_VALUES);
    // updateProductList(newdata);
    handleClose(false);
  }
  function close(){
    handleReset(RESET_VALUES);
    handleClose(false);
  }

  function newCatData(newdata){
    setNewCatDataList(newdata);
  }
  
  
  function updatedCatData(response){
    setCategoryList(response);  
    inputs.maincat = '';
    inputs.cat = '';
    inputs.subcat = '';
  }

  
  function newSubCatData(newdata){
    setNewSubCatDataList(newdata);
  }

  function updatedSubCatData(response){
    setSubCategoryList(response); 
    inputs.maincat = '';
    inputs.cat = '';
    inputs.subcat = ''; 
  }

  const handleSelectInputChange = e =>{
    handleInputChange(e);

    setCategoryList([]);
    setSubCategoryList([]);    

    if(e.target.value==='0'){
      setMainOpen(true);      
    }
    else{
      setProductCatList({
        ...productCatList, 'maincategory': e.target.value
      });
    }

    const fetchData = async () => {
      try {
        const result = await Category.getAllFromCategoryList({maincategory: e.target.value});
        setCategoryList(result.categoryList);
      } catch (error) {
        console.log('error:',error);
      }
    };
    fetchData();
  };
  
  const handleSelectCatInputChange = e =>{
    setSubCategoryList([]); 

    handleInputChange(e);
    if(e.target.value==='0'){
      setCatOpen(true);
    }
    else{
      setProductCatList({
        ...productCatList, 'category': e.target.value
      });
    }

    const fetchData = async () => {
      try {
        const result = await Category.getAllFromSubCategoryList({category: e.target.value});
        setSubCategoryList(result.subCategoryList);
      } catch (error) {
        console.log('error:',error);
      }
    };
    fetchData();
  };
  
  const handleSelectSubcatInputChange = e =>{
    handleInputChange(e);
    if(e.target.value==='0'){
      setSubCatOpen(true);
    }
    else{
      setProductCatList({
        ...productCatList, 'subcategory': e.target.value
      });
    }
  };

  function openProductDialog(){
    if(inputs.maincat!='' && inputs.cat!='' && inputs.subcat!='' && inputs.maincat!='0' && inputs.cat!='0' && inputs.subcat!='0' && inputs.maincat!=null && inputs.cat!=null && inputs.subcat!=null){
    setProductOpen(true);
    }
    else{
      if(inputs.maincat=='' || inputs.maincat=='0')
      {setErrorMaincat('category required')}
      else{
        setErrorMaincat('')
      }
      if(inputs.cat=='' || inputs.cat=='0')
      {setErrorCat('category required')}
      else{
        setErrorCat('')
      }
      if(inputs.subcat=='' || inputs.subcat=='0')
      {setErrorSubcat('category required')}
      else{
        setErrorSubcat('')
      }
      // alert('Please select all category details');
    }
  }
  
  function handleProductClose() {
    setProductOpen(false);
  }

  function handleMainClose() {
    setMainOpen(false);
  }

  function handleCatClose() {
    setCatOpen(false);
  }

  function handleSubCatClose() {
    setSubCatOpen(false);
  }

  // function validate(values) {
  //   let errors = {};

  //   return errors;
  // };

 
  return (
    <div>
      <Dialog maxWidth="sm" open={open} TransitionComponent={Transition}>
        <form onSubmit={handleSubmit}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              {/* <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton> */}
              <Typography variant="h6" className={classes.title}>
                Add Product
              </Typography>
              
              <IconButton size="small" onClick={handleClose} className={styleClass.closeIcon}> x </IconButton>

              {/* <Button color="inherit" onClick={handleSubmit}>
                save
              </Button> */}
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
          <Paper className={classes.paper}>    
                <Grid container spacing={5} className={classes.margin}>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={errorMaincat?classes.errorHeading: classes.textsize} htmlFor="maincat">Select Main Category</InputLabel>
                    <Select
                        name="maincat"
                        onChange={handleSelectInputChange}
                        value={inputs.maincat}
                        inputProps={{
                          name: 'maincat',
                          id: 'maincat',
                        }}
                        className={classes.margin}
                        fullWidth
                        error={errorMaincat}
                        label="Main Category"
                        required
                      >
                        { mainCategoryList.map((data, index)=>{                          
                              return(
                                <MenuItem className={classes.textsize} value={data.id}>{data.category}</MenuItem>
                              )
                          })
                        }
                        <MenuItem className={classes.textsize} value="0" >Others</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={errorCat?classes.errorHeading: classes.textsize} htmlFor="cat">Select Category</InputLabel>
                    <Select
                        name="cat"
                        onChange={handleSelectCatInputChange}
                        value={inputs.cat}
                        inputProps={{
                          name: 'cat',
                          id: 'cat',
                        }}
                        className={classes.margin}
                        fullWidth
                        label="Category Type"
                        required
                        error={errorCat}
                        disabled = {inputs.maincat != '' && inputs.maincat != '0' ? false : true}
                      >
                       { categoryList.map((data, index)=>{
                         return(
                            <MenuItem  className={classes.textsize} value={data.id}>{data.category}</MenuItem>
                         )
                          })
                        }
                          <MenuItem className={classes.textsize} value="0">Others</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={errorSubcat?classes.errorHeading: classes.textsize} htmlFor="subcat">Select Sub Category</InputLabel>
                    <Select
                        name="subcat"
                        onChange={handleSelectSubcatInputChange}
                        value={inputs.subcat}
                        inputProps={{
                          name: 'subcat',
                          id: 'subcat',
                        }}
                        className={classes.margin}
                        fullWidth
                        label="Sub Category"
                        required
                        error={errorSubcat}
                        disabled = {inputs.cat != '' && inputs.cat != '0' && inputs.maincat != '' && inputs.maincat != '0' && subCategoryList.length > 0 ? false : true }
                      >
                      { subCategoryList.map((data, index)=>{
                         return(
                           <MenuItem  className={classes.textsize} value={data.id}>{data.category}</MenuItem>
                          )
                        })
                      }
                   <MenuItem className={classes.textsize} value="0">Others</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Button variant="contained" color="primary" onClick={openProductDialog} className={classes.button} 
                      >
                     Add Product
                    </Button>
                    
                    <Button variant="contained" color="primary" onClick={close} className={classes.button}>
                      Close
                    </Button> 
                  </Grid>
                </Grid>
            </Paper>

         { mainOpen ?    <AddMainCategory open={mainOpen} handleClose={handleMainClose}  updatedData={updatedData} newData={newData}/> : null }
         {catOpen ?      <AddCategory open={catOpen} handleClose={handleCatClose} updatedCatData={updatedCatData} newCatData={newCatData} selectedMainCategoryId={inputs.maincat} /> : null }
         {subcatOpen ?   <AddSubcategory open={subcatOpen} handleClose={handleSubCatClose} updatedSubCatData={updatedSubCatData} newSubCatData={newSubCatData} selectedCategoryId={inputs.cat}  />  : null }
         {productOpen?   <AddProduct open={productOpen} handleClose={handleProductClose} productCatList={productCatList} productData={productData} />   :null}
    
          </div>
      </form>
      </Dialog>
    </div>
  );
}
