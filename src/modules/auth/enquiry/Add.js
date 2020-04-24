import React, { useState, useEffect } from 'react';
import { component } from 'react-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import AutoSelect from 'react-select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import FormControl from "@material-ui/core/FormControl";
import LinearProgress from '@material-ui/core/LinearProgress';
import { useCommonStyles } from '../../common/StyleComman';
import validate from '../../common/validation/EnquiryRuleValidation';
import { APP_TOKEN } from '../../../api/Constants';
import AutoSuggestDropdown from '../lead/AutoSuggestDropdown';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip'; 



// API CALL
import Category from '../../../../src/api/Category';
import EnquiryAPI from '../../../api/franchise/Enquiry';

import Customer from '../../../api/franchise/Customer';
import useSignUpForm from '../franchise/CustomHooks';

const RESET_VALUES = {
      enquiry_id : '',
      customer_name: '',
      customer_contact: '',
      interested_product_id: '',
      is_active: '',
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
    color: "white",
    marginTop: theme.spacing(-3),
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
  button: {
    color: "white",
    fontSize: theme.typography.pxToRem(10),
    marginRight: theme.spacing(1),
  },
  textsize: {
    fontSize: theme.typography.pxToRem(12),
  },
  drpdwn: {
    marginTop: theme.spacing(1),
    fontSize: theme.typography.pxToRem(12),
  }
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Add({ leadData, open, handleClose, handleSnackbarClick, setEnquiryList, convert }) {

  const styleClass = useCommonStyles();
  const classes = useStyles();
  const [assignInterest, setAssignInterest] = React.useState([]);
  const [assignError, setAssignError] = React.useState();
  const [productList, setProductList] = useState([]);
  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(true);
  const [mainCategoryList, setMainCategoryList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [mainCategory, setMainCategory] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [subCategory, setSubCategory] = React.useState('');

  const [customerListData, setCustomerListData] = useState([]);
  const [single, setSingle] = React.useState(null);
  const [selectedOption,setSelectedOption] = useState('');
  const [customerId,setCustomerId] = useState('');
  const [totalProductList, setTotalProductList] = useState([]); 



  useEffect(() => {
    const fetchData = async () => {
      try {
        const enquiry_id = await EnquiryAPI.getnewid();
        let zero = 0;
        if (enquiry_id[0] != null) {
          zero = 6 - (enquiry_id[0].id.toString().length);
          let enquiryId = '';
          for (let i = 0; i < zero; i++) {
            enquiryId += '0';
          }
          setInput('enquiry_id', ('E' + enquiryId + (enquiry_id[0].id + 1)));
        } else {
          setInput('enquiry_id', 'E000001');
        }

        const category_list = await Category.mainCategoryList();
        setMainCategoryList(category_list.mainCategoryList);

        const resultCustomer = await Customer.list();
        setCustomerListData(resultCustomer.customerList);

      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    if(leadData != ""){
      handleRandomInput([        
        {name: 'customer_contact', value: leadData.customer_contact}, 
        {name: 'lead_id', value : leadData.id}
      ]);
      setCustomerId(leadData.customer_id);
      setSelectedOption(leadData.customer_name);
    }else{
      handleRandomInput([
        {name: 'lead_id', value : 0}
      ]);
    }

    fetchTotalProductList();
  }, []);

  
    
  const handleMainCategory = async (event) => {
    setInput('main_category', event.target.value)
    setMainCategory(event.target.value);
    setCategoryList('');
    setSubCategoryList('');
    setProductList('');

    try {
      const result = await Category.categoryList({ maincategory: event.target.value });
      setCategoryList(result.categoryList);
    } catch (error) {
      console.log('error:', error);
    }
  }

  const handleCategory = async(event) => {
    setInput('category', event.target.value)
    setCategory(event.target.value);
    setSubCategoryList('');
    setProductList('');

    try {
      const result = await Category.subCategoryList({ category: event.target.value });
      setSubCategoryList(result.subCategoryList);
    } catch (error) {
      console.log('error:', error);
    }
  }

  const handleSubCategory = async (event) => {
    setInput('sub_category', event.target.value)
    setSubCategory(event.target.value);
    setProductList('');

    try {
      const result = await Category.RelatedproductList({subcategory: event.target.value});
      setProductList(result.productList);
    } catch (error) {
      console.log('error:', error);
    }
  }

  const fetchTotalProductList = async () => {
    try {
      const result = await Category.productlist();
      setTotalProductList(result.productList);
    } catch (error) {
      console.log('error:',error);
    }
  }

  function handleChangeMultiple(event) {
    setAssignInterest(event.target.value);
  }

  const addEnquiry = async () => {
      
      if(assignInterest!=''){
      setpLoading(true);
      setSavebtn(false);
      const response = await EnquiryAPI.postEnquiry({
        enquiry_id : inputs.enquiry_id,
        customer_id : customerId,
        customer_name: selectedOption,
        contact: inputs.customer_contact,
        interested_product_id: assignInterest.join(),
        lead_id : inputs.lead_id,
        is_active: 1,
        converted_to: 0,
        convert_by_lead: convert
      });

      assignInterest.length = 0;
      setCustomerId('');
      handleSnackbarClick(true);
      setEnquiryList(response.enquiryList);
      handleReset(RESET_VALUES);
      setpLoading(false);
      setSavebtn(true);
      handleClose(false);
    }
    else {
      setAssignError('error')
    }
  };

  const handleRemoveProduct = (index) => {
    const tempProduct = [...assignInterest];
    tempProduct.splice(index, 1);
    setAssignInterest(tempProduct);
  }

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
                        <TableCell  className={classes.textsize}  >{proData.name}</TableCell>
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



  const { inputs = null, handleInputChange, handleRandomInput, handleNumberInput, handlePriceInput, handleSubmit, handleReset, setInput, errors } = useSignUpForm(
    RESET_VALUES,
    addEnquiry,
    validate
  );

  
return (
    <div>
      <Dialog maxWidth="sm" open={open} TransitionComponent={Transition}>
        <form onSubmit={handleSubmit}>
          <AppBar className={classes.appBar}>
            <Toolbar>

              <Typography variant="h6" className={classes.title}>
                Add Enquiry
              </Typography>
              <IconButton size="small" onClick={handleClose} className={styleClass.closeIcon}> x </IconButton>
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
            <Grid item xs={12} sm={12}>   {ploading ? <LinearProgress /> : null}</Grid>
            <Paper className={classes.paper}>
              <Grid container spacing={4}>
                  <Grid item xs={12} sm={4}>
                    <InputLabel className={classes.textsize}  htmlFor="first_name">Enquiry Id</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="enquiry_id"
                      name="enquiry_id"
                      // label="Enquiry Id"
                      value={inputs.enquiry_id}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      disabled
                      type="text"
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                   <InputLabel  className={classes.textsize} htmlFor="customerName">Customer Name</InputLabel>
                   <AutoSuggestDropdown customerListData={customerListData} setSelectedOption={setSelectedOption} setCustomerId={setCustomerId} defaultValue={leadData.customer_name} handleRandomInput={handleRandomInput}/>

                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel className={classes.textsize}  htmlFor="customer_contact">Contact *</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      margin="dense"
                      id='customer_contact'
                      name="customer_contact"
                      // label="customer_contact"
                      type="text"
                      value={inputs.customer_contact} 
                      onChange={handleNumberInput}
                      error={errors.customer_contact}
                      helperText={errors.customer_contact}
                      required
                      fullWidth
                      onInput={(e)=>{ 
                        e.target.value =(e.target.value).toString().slice(0,10)
                      }}
                      
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <InputLabel className={classes.textsize} htmlFor="main_category">Main Category*</InputLabel>
                  <Select
                    // multiple
                    value={inputs.main_category}
                    onChange={handleMainCategory}
                    name='main_category'
                    id='main_category'
                    className={classes.drpdwn}
                    error={errors.main_category}
                    helperText={errors.main_category}
                    // label='customer'
                    fullWidth
                    required
                  >
                    {(mainCategoryList.length > 0 ? mainCategoryList : []).map((data, index) => {
                      return (
                        <MenuItem className={classes.textsize} value={data.id}>{data.category}</MenuItem>
                      )
                    })}
                  </Select>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <InputLabel className={classes.textsize} htmlFor="category">Category*</InputLabel>
                  <Select
                    // multiple
                    value={inputs.category}
                    onChange={handleCategory}
                    name='category'
                    id='category'
                    // label='customer'
                    fullWidth
                    className={classes.drpdwn}
                    required
                    disabled={mainCategory == ""}
                    error={errors.category}
                    helperText={errors.category}
                  >
                    {(categoryList.length > 0 ? categoryList : []).map((data, index) => {
                      return (
                        <MenuItem className={classes.textsize} value={data.id}>{data.category}</MenuItem>
                      )
                    })}
                  </Select>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <InputLabel className={classes.textsize} htmlFor="sub_category">Sub Category*</InputLabel>
                  <Select
                    // multiple
                    value={inputs.sub_category}
                    onChange={handleSubCategory}
                    name='sub_category'
                    id='sub_category'
                    className={classes.drpdwn}
                    // label='customer'
                    fullWidth
                    required
                    disabled={category == ""}
                    error={errors.sub_category}
                    helperText={errors.sub_category}
                  >
                    {(subCategoryList.length > 0 ? subCategoryList : []).map((data, index) => {
                      return (
                        <MenuItem className={classes.textsize} value={data.id}>{data.category}</MenuItem>
                      )
                    })}
                  </Select>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <InputLabel className={classes.textsize} htmlFor="assign_interest">Product *</InputLabel>
                  <Select
                    multiple
                    value={assignInterest}
                    onChange={handleChangeMultiple}
                    name = 'interested_product_id'
                    id = 'interested_product_id'
                    className={classes.textsize}
                    disabled={subCategory == ""}
                    fullWidth
                    required
                    error={assignError}
                  >
                    {
                      (productList.length != '' ? productList : []).map((data) => {
                        return (
                          <MenuItem className={classes.textsize} value={data.id}>{data.name}</MenuItem>
                        )
                      })
                    }
                  </Select>
                </Grid>
                <Grid item xs={12} sm={12}> 
                  {selectedProductList()}
                </Grid>
                <Grid item xs={12} sm={12}>

                  {savebtn ? <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit}>
                    save
                    </Button> : <Button variant="contained" color="primary" className={classes.button} disabled>
                      save
                    </Button>}
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
