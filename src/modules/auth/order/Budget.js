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
import Input from "@material-ui/core/Input";
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';
import {useCommonStyles} from '../../common/StyleComman'; 
import BudgetCommentView from './BudgetCommentView';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip'; 
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import { APP_TOKEN } from '../../../api/Constants';

// API CALL
import Order from '../../../api/franchise/Order';
import StaticContentAPI from  '../../../api/StaticContent.js'
import validate from '../../common/validation/BudgetValidation';
import useSignUpForm from '../franchise/CustomHooks';
import { async } from 'q';


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
  buttonMargin: {
    margin: theme.spacing(1),
  },  
  drpdwn:{
    marginTop: theme.spacing(1),
    fontSize: theme.typography.pxToRem(12),
  },
  marginIconBtn: {
    margin: theme.spacing(1),
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Budget({ open, handleBudgetClose, budgetList, setBudgetList, customer_id, handleOrderViewFromBudget}) {
  const classes = useStyles();
  const styleClass = useCommonStyles();
  
  const [surplusBool, setSurplusBool] = useState();
  const [oldBudgetList,setOldBudgetList] = useState([]);
  const [oldBudget, setOldBudget] = useState(0);  
  const [openCommentView, setOpenCommentView]  = useState(false);
  const [otherIncome, setOtherIncome] = useState([]);
  const [otherExpenses, setOtherExpenses] = useState([]);
  const [weekDayList, setWeekDayList] = useState([]);
  
  const getWeekDayList = async () => {
    const result = await StaticContentAPI.getWeekDayList({});
    setWeekDayList(result.weekDayList);
  }
 
  function handleInputBlur(e){
    if(e.target.value===''){
      setInput([e.target.name], 0);
    }
  }

  function handleInputFocus(e){
    if(e.target.value==='0'){
      setInput([e.target.name], '');     
    }
  }

  const fetchExistingBudget = async () => {
    try {
      const order = await Order.getExistingBudget({customer_id: customer_id});   
      setOldBudgetList(order);
      if(order.length > 0 && budgetList.length === 0 ){
        handleReset(order[0]);
        setPrimaryValues(order[0]);
      }
    } catch (error) {
      console.log('Error..',error);
    }
  }
  
  const { inputs, handleInputChange,  handleRandomInput, handleNumberInput, handlePriceInput, handleSubmit, handleReset, setInput, errors } = useSignUpForm(
    budgetList,
    submit,
    validate
  );

  useEffect(() => {
    fetchExistingBudget();
    getWeekDayList();
  },[]);


  function setPrimaryValues(dataRow){

    inputs.other_expenses = '';
    inputs.other_expenses_amt = '';
    inputs.other_incomes = '';
    inputs.other_income_amt = '';      
    
    if( 
      dataRow.other_income != "" && 
      dataRow.other_income != undefined && 
      dataRow.other_income != null && 
      dataRow.other_income != []
      ){        
        setOtherIncome(JSON.parse(dataRow.other_income));
      }

    if( 
        dataRow.other_expenditure != "" && 
        dataRow.other_expenditure != undefined && 
        dataRow.other_expenditure != null && 
        dataRow.other_expenditure != []
        ){        
          setOtherExpenses(JSON.parse(dataRow.other_expenditure));
        }
  }


  const handleOtherIncome = () => {
    if(inputs.other_incomes != "" && inputs.other_income_amt != ""){
      const income = [...otherIncome];
      income.push({
        'source_name' : inputs.other_incomes, 
        'source_amt' : inputs.other_income_amt
      });
        
      inputs.other_income_amt = '';
      inputs.other_incomes = '';

      setOtherIncome(income);
    }else {      
      alert('Fill both fields');
    }
  }

  const handleRemoveIncome = (index) => {
    const tempIncome = [...otherIncome];
    tempIncome.splice(index, 1);
    setOtherIncome(tempIncome);
  }


  const handleOtherExpenses = () =>{
    if(inputs.other_expenses != "" && inputs.other_expenses_amt != ""){
      const expenses = [...otherExpenses];
      expenses.push({
        'source_name' : inputs.other_expenses, 
        'source_amt' : inputs.other_expenses_amt
      });
        
      inputs.other_expenses_amt = '';
      inputs.other_expenses = '';

      setOtherExpenses(expenses);
    }else {      
      alert('Fill both fields');
    }
  }

  const handleRemoveExpenses = (index) => {
    const tempExpenses = [...otherExpenses];
    tempExpenses.splice(index, 1);
    setOtherExpenses(tempExpenses);
  }


  function handleCommentViewOpen(){
    setOpenCommentView(true);
  }

  function handleCommentViewClose() {
    setOpenCommentView(false);
  }

  function submit(e){
      const data = {
        work: parseFloat(inputs.work),
        benefits : parseFloat(inputs.benefits),
        accomodation : parseFloat(inputs.accomodation),
        childcare : parseFloat(inputs.childcare),
        rent : parseFloat(inputs.rent),
        power : parseFloat(inputs.power),
        telephone : parseFloat(inputs.telephone),
        mobile : parseFloat(inputs.mobile),
        vehicle : parseFloat(inputs.vehicle),
        vehicle_fuel : parseFloat(inputs.vehicle_fuel),
        transport : parseFloat(inputs.transport),
        food : parseFloat(inputs.food),
        credit_card : parseFloat(inputs.credit_card),
        loan : parseFloat(inputs.loan),
        income  : parseFloat(inputs.income),
        expenditure : parseFloat(inputs.expenditure),
        surplus  : parseFloat(inputs.surplus),
        afford_amt : parseFloat(inputs.afford_amt),
        pre_order_exp : parseFloat(oldBudget),
        paid_day : inputs.paid_day,
        debited_day : inputs.debited_day,
        budget_note : inputs.budget_note,
        other_expenditure : JSON.stringify(otherExpenses),
        other_income : JSON.stringify(otherIncome),  
      }      
      setBudgetList(data);
      handleBudgetClose(false);
  }


  useEffect(() => {
    if(inputs.work == 0 &&
      inputs.benefits == 0 &&
      inputs.accomodation == 0 &&
      inputs.childcare == 0 &&
      inputs.rent == 0 &&
      inputs.power == 0 &&
      inputs.telephone == 0 &&
      inputs.mobile == 0 &&
      inputs.vehicle == 0 &&
      inputs.vehicle_fuel == 0 &&      
      inputs.transport == 0 &&
      inputs.food == 0 &&
      inputs.credit_card == 0 &&
      inputs.loan == 0 &&
      otherExpenses == "" && 
      otherIncome == "" 
      )
    {
      setSurplusBool(false);
      
    }else{
      setSurplusBool(true);            
    }
    if(oldBudgetList!= ''){
      let sum = oldBudgetList.reduce((acc, val) =>{
        return (val.is_active == 1 ? acc + val.each_payment_amt : acc )
      }, 0 );
      setOldBudget(sum);
      inputs.expenditure = (sum);
    }
  });

  if(surplusBool===true){
    let otherIncomeTotal = 0;
    let otherExpensesTotal = 0;

    if(otherIncome.length > 0 && otherIncome != "" && otherIncome != undefined){
      otherIncomeTotal = otherIncome.reduce((acc, val) => {
        return (acc + Number(val.source_amt))
      }, 0);
    }    

    if(otherExpenses.length > 0 && otherExpenses != "" && otherExpenses != undefined){
      otherExpensesTotal = otherExpenses.reduce((acc, val) => {
        return (acc + Number(val.source_amt))
      }, 0);
    }    
    
   
    inputs.income = Number(parseFloat(inputs.work) + parseFloat(inputs.benefits) + parseFloat(inputs.accomodation) + parseFloat(inputs.childcare) + parseFloat(otherIncomeTotal)).toFixed(2);
    inputs.expenditure = Number(parseFloat(inputs.rent) + parseFloat(inputs.power) + parseFloat(inputs.telephone) + parseFloat(inputs.mobile) + parseFloat(inputs.vehicle) + parseFloat(inputs.vehicle_fuel) + parseFloat(inputs.transport) + parseFloat(inputs.food) + parseFloat(inputs.credit_card) + parseFloat(inputs.loan) + parseFloat(oldBudget) + parseFloat(otherExpensesTotal)).toFixed(2);
    inputs.surplus = Number(inputs.income - inputs.expenditure).toFixed(2);
  }

return (
    <div>
      <Dialog maxWidth="sm" open={open} TransitionComponent={Transition}>
        <form onSubmit={handleSubmit}> 
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Budget
              </Typography>
              <IconButton size="small" onClick={handleBudgetClose} className={styleClass.closeIcon}> x </IconButton>              
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
          <Paper className={classes.paper}>            
            <Grid container spacing={4}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h6" className={classes.labelTitle}>
                  Weekly Income (After Tax) (A)
              </Typography>
              </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="work"
                      name="work"
                      label="Work"
                      value={inputs.work}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="benefits"
                      name="benefits"
                      label="Benefits"
                      value={inputs.benefits}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      id="accomodation"
                      name="accomodation"
                      label="Accomodation Allowance"
                      value={inputs.accomodation}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="childcare"
                      name="childcare"
                      label="Childcare"
                      value={inputs.childcare}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Grid>
                    
                  <Grid item xs={12} sm={12}>
                    <Typography variant="h6" className={classes.labelTitle}>
                        Other Income Source
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="other_incomes" style={{fontSize: '11px'}}>Income Source Name </InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="other_incomes"
                      name="other_incomes"
                      value={inputs.other_incomes}
                      onChange={handleInputChange}
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      fullWidth
                      type="text"
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel htmlFor="other_income_amt" style={{fontSize: '11px'}}>Income Amt. </InputLabel>
                    <TextField 
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="other_income_amt"
                      name="other_income_amt"
                      value={inputs.other_income_amt}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      type="text"
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Tooltip title="Click to Add">
                      <IconButton className={classes.marginIconBtn}  onClick={() => { handleOtherIncome(); }} >
                          <AddIcon  />                                    
                      </IconButton>
                    </Tooltip>   
                  </Grid>
                  {otherIncome != "" &&
                    <Grid item xs={12} sm={12}>
                      <Paper className={classes.tablePaper} >
                        <Table size="small">
                        <TableHead >
                            <TableRow size="small">
                              <TableCell className={classes.labelTitle}>Other Income Source Name</TableCell>
                              <TableCell className={classes.labelTitle}>Amount</TableCell>
                              <TableCell className={classes.labelTitle}>Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody size="small">
                            {(otherIncome.length > 0 ? otherIncome : []).map((data, index) =>{
                              return(
                                <TableRow size="small">
                                  <TableCell > {data.source_name} </TableCell>
                                  <TableCell >{data.source_amt}</TableCell>
                                  <TableCell >
                                    <Tooltip title="Click to Remove">
                                      <IconButton className={classes.marginIconBtn} onClick = { () => { handleRemoveIncome(index); }}>
                                        <DeleteIcon />
                                      </IconButton>
                                    </Tooltip>  
                                  </TableCell>
                                </TableRow>
                              )
                            })}
                          </TableBody>
                        </Table>
                      </Paper>
                    </Grid>
                  }
                  <Grid item xs={12} sm={12}>
                    <Typography variant="h6" className={classes.labelTitle}>
                        Weekly Expenditure (B)
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="rent"
                      name="rent"
                      label="Rent/Mortgage"
                      value={inputs.rent}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="power"
                      name="power"
                      label="Power"
                      value={inputs.power}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="telephone"
                      name="telephone"
                      label="Landline Phone"
                      value={inputs.telephone}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="mobile"
                      name="mobile"
                      label="Mobile Phone"
                      value={inputs.mobile}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="vehicle"
                      name="vehicle"
                      label="Vehicle Finance"
                      value={inputs.vehicle}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="vehicle_fuel"
                      name="vehicle_fuel"
                      label="Vehicle Fuel"
                      value={inputs.vehicle_fuel}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="transport"
                      name="transport"
                      label="Public Transport"
                      value={inputs.transport}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="food"
                      name="food"
                      label="Food"
                      value={inputs.food}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="credit_card"
                      name="credit_card"
                      label="Credit/Store Cards"
                      value={inputs.credit_card}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <InputLabel htmlFor="first_name">Franchise Name *</InputLabel> */}
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="loan"
                      name="loan"
                      label="Loans/Hire Purchase"
                      value={inputs.loan}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      // required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Typography variant="h6" className={classes.labelTitle}>
                        Other Expenses Source
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel htmlFor="other_expenses" style={{fontSize: '11px'}}>Expenses Source Name </InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="other_expenses"
                      name="other_expenses"
                      value={inputs.other_expenses}
                      onChange={handleInputChange}                      
                      fullWidth
                      type="text"
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel htmlFor="other_expenses_amt" style={{fontSize: '11px'}}>Expenses Amt. </InputLabel>
                    <TextField 
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="other_expenses_amt"
                      name="other_expenses_amt"
                      value={inputs.other_expenses_amt}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      type="text"
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Tooltip title="Click to Add">
                      <IconButton className={classes.marginIconBtn}  onClick={() => { handleOtherExpenses(); }} >
                          <AddIcon />                                    
                      </IconButton>
                    </Tooltip>   
                  </Grid>
                  {otherExpenses != "" &&
                    <Grid item xs={12} sm={12}>
                      <Paper className={classes.tablePaper} >
                        <Table size="small">
                        <TableHead >
                            <TableRow size="small">
                              <TableCell className={classes.labelTitle}>Other Expenses Source Name</TableCell>
                              <TableCell className={classes.labelTitle}>Amount</TableCell>
                              <TableCell className={classes.labelTitle}>Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody size="small">
                            {(otherExpenses.length > 0 ? otherExpenses : []).map((data, index) =>{
                              return(
                                <TableRow size="small">
                                  <TableCell > {data.source_name} </TableCell>
                                  <TableCell >{data.source_amt}</TableCell>
                                  <TableCell >
                                    <Tooltip title="Click to Remove">
                                      <IconButton className={classes.marginIconBtn} onClick = { () => { handleRemoveExpenses(index); }}>
                                        <DeleteIcon />
                                      </IconButton>
                                    </Tooltip>  
                                  </TableCell>
                                </TableRow>
                              )
                            })}
                          </TableBody>
                        </Table>
                      </Paper>
                    </Grid>
                  }
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="paid_day">Day You Get Paid *</InputLabel>
                    <Select
                        margin="dense"
                        name="paid_day"
                        onChange = {handleInputChange}
                        value={parseInt(inputs.paid_day)}
                        name = 'paid_day'
                        id = 'paid_day'
                        className={classes.drpdwn}
                        fullWidth
                        error={errors.paid_day}
                        helperText={errors.paid_day}                        
                        label="Day You Get Paid"
                        required
                      >
                        {(weekDayList != undefined && (weekDayList.length > 0 ? weekDayList : []).map((data,index) => {
                          return(
                            <MenuItem className={classes.textsize} value={data.id}>{data.week_day}</MenuItem>
                          )
                        }))}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>                  
                    <InputLabel  className={classes.textsize} htmlFor="paid_day">Day Payment Debited *</InputLabel>
                    <Select
                        margin="dense"
                        name="debited_day"
                        onChange = {handleInputChange}
                        value={parseInt(inputs.debited_day)}
                        name = 'debited_day'
                        id = 'debited_day'
                        className={classes.drpdwn}
                        fullWidth
                        error={errors.debited_day}                        
                        helperText={errors.debited_day}
                        label="Day Payment Debited"
                        required
                      >
                        {(weekDayList != undefined && (weekDayList.length > 0 ? weekDayList : []).map((data,index) => {
                          return(
                            <MenuItem className={classes.textsize} value={data.id}>{data.week_day}</MenuItem>
                          )
                        }))}
                    </Select>                    
                  </Grid>
                  {(oldBudgetList.length > 0) &&
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" className={classes.labelTitle}>
                        Total Amt. of Orders Going on Rent:
                      </Typography>
                    </Grid>                  
                  }
                  {(oldBudgetList.length > 0) ?
                    <Grid item xs={12} sm={6}>
                      {(oldBudgetList.length > 0 ? oldBudgetList : []).map(data =>{
                        if(data.is_active == 1) return(
                            <Typography variant="h6" className={classes.labelTitle} align="right">
                              <IconButton size="small" className={classes.labelTitle} style={{color: 'blue', marginTop : -7}} value={data.id} name={data.id} onClick={(event) => { handleOrderViewFromBudget(data); }}>
                                {("OrderId: " + data.order_id + '  ($' +(data.each_payment_amt) + ')')}
                              </IconButton>
                            </Typography>   
                        )})
                      }
                      <Typography variant="h6" className={classes.labelTitle}  align="right">
                        {"Total:  $" + Number(oldBudget).toFixed(2) }  
                      </Typography>
                  </Grid>
                  : null
                  }
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" className={classes.labelTitle}>
                     Total Income = {"$" + inputs.income}
                  </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" className={classes.labelTitle}>
                     Total Expenses = {"$" + inputs.expenditure}
                  </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" className={classes.labelTitle}>
                    TOTAL SURPLUS/DEFICT (A-B) *
                  </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" className={classes.labelTitle}>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="surplus"
                      name="surplus"
                      // label="Other"
                      value={inputs.surplus}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      error={errors.surplus}
                      helperText={errors.surplus}
                      disabled = {surplusBool}
                      required
                      type="text"
                      // placeholder="Franchise Name"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" className={classes.labelTitle}>
                      How much you can afford to pay on weekly basis? *
                  </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" className={classes.labelTitle}>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="afford_amt"
                      name="afford_amt"
                      // label="Other"
                      value={inputs.afford_amt}
                      onChange={handlePriceInput}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      fullWidth
                      required
                      error={errors.afford_amt}
                      helperText={errors.afford_amt}
                      type="text"
                      margin="dense"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                    />
                  </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button variant="text" size="small" color="primary" style={{fontSize:'10px'}} onClick={handleCommentViewOpen}>View Existing Notes About Budget</Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="budget_note">Budget Note Box</InputLabel>
                      <TextField 
                        multiline
                        id="budget_note"
                        name="budget_note"
                        value={inputs.budget_note}
                        onChange={handleInputChange}                      
                        fullWidth
                        required
                        type="text"
                        margin="dense"
                        InputProps={{                          
                          classes: {
                            input: classes.textsize,
                          },
                        }}
                      /> 
                  </Grid>
                    <Grid item xs={12} sm={12}>
                      
                      <Button  variant="contained"  color="primary" className={classes.button} onClick={handleSubmit}>
                        save
                      </Button>
                      <Button variant="contained" color="primary" onClick={handleBudgetClose} className={classes.button}>
                        Close
                      </Button> 
                    </Grid>
                </Grid>
          </Paper>
          </div>
        </form>
      </Dialog>
      {openCommentView ? <BudgetCommentView open={openCommentView} handleViewClose={handleCommentViewClose} customer_id = {customer_id} />: null}
        
    </div>
  );
}
