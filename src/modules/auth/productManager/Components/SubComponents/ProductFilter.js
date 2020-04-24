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
import MoreIcon from '@material-ui/icons/More';
import clsx from 'clsx';
import DetailsIcon from '@material-ui/icons/Details';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Divider from '@material-ui/core/Divider';  
import Table  from '@material-ui/core/Table';
import TableBody  from '@material-ui/core/TableBody';
import TableCell  from '@material-ui/core/TableCell';
import TableHead  from '@material-ui/core/TableHead';
import TablePagination  from '@material-ui/core/TablePagination';
import TableRow  from '@material-ui/core/TableRow';
import TableSortLabel  from '@material-ui/core/TableSortLabel';
import Checkbox  from '@material-ui/core/Checkbox';
import Tooltip  from '@material-ui/core/Tooltip';
import FormControlLabel  from '@material-ui/core/FormControlLabel';
import Switch  from '@material-ui/core/Switch';
import ExpansionPanel  from '@material-ui/core/ExpansionPanel';
import FilterListIcon from '@material-ui/icons/FilterList';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ExpansionPanelSummary  from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails  from '@material-ui/core/ExpansionPanelDetails';
import InputLabel  from '@material-ui/core/InputLabel';
import List  from '@material-ui/core';
import ListItem  from '@material-ui/core';
import ListItemText  from '@material-ui/core';
import ListItemSecondaryAction from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';



// Components
import useSignUpForm from '../../../franchise/CustomHooks';
import {getDate, getCurrentDate} from '../../../../../utils/datetime';
import {useCommonStyles} from '../../../../common/StyleComman';
// import validate from '../../common/validation/BankDetailRules';

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
    // fontSize: '10px',
    marginRight:theme.spacing(-4),
  },
  dobMsg : {
    marginTop : theme.spacing(-1),
    fontSize: theme.typography.pxToRem(12),
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function ProductFilter({ }) {
  const styleClass = useCommonStyles();
  const classes = useStyles();
  
  const [ploading, setpLoading] = React.useState(false);
  const [savebtn, setSavebtn] = React.useState(false);

//  const { inputs, handleInputChange, handleNumberInput, handleRandomInput, handlePriceInput, handleSubmit, handleReset, setInput,errors } = useSignUpForm(
//     bankDetailArray == "" ?  RESET_VALUES : bankDetailArray,
//     detailSubmit,
//     validate
//   );
  

// return (
//   <Toolbar className={clsx(classes.root, { [classes.highlight]: numSelected > 0, })} >
//     <ExpansionPanel style={{boxShadow:'none',width:'100%'}}>
//       <ExpansionPanelSummary
//         style={{backgroundColor:'transparent',padding:0}}
//         expandIcon={
//           <Tooltip title="Filter list">
//             <IconButton aria-label="filter list"> <FilterListIcon /> </IconButton>
//           </Tooltip>}
//         aria-controls="panel1a-content"
//         id="panel1a-header"
//       >
//         <Typography className={classes.title} variant="h6" id="tableTitle"> Product Manager </Typography>
//       </ExpansionPanelSummary>
//       <ExpansionPanelDetails>
//         <Grid container spacing={4} style={{ 'padding': '10px'}}>
//           <Grid item xs={12} sm={4}>
//             <InputLabel className={classes.textsize} htmlFor="main_category">Main Category*</InputLabel>
//               <Select
//                 value={inputs.main_category}
//                 onChange={handleMainCategory}
//                 name='main_category'
//                 id='main_category'
//                 className={classes.drpdwn}
//                 fullWidth
//                 required
//               >
//                 <MenuItem className={classes.textsize} value={false}>All</MenuItem>
//                 {(mainCategoryList.length > 0 ? mainCategoryList : []).map((data, index) => {
//                   return (
//                     <MenuItem key={Math.random()} className={classes.textsize} value={data.id}>{data.category}</MenuItem>
//                   )
//                 })}
//             </Select>
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <InputLabel className={classes.textsize} htmlFor="category">Category*</InputLabel>
//               <Select
//                 value={inputs.category}
//                 onChange={handleCategory}
//                 name='category'
//                 id='category'
//                 fullWidth
//                 className={classes.drpdwn}
//                 required
//                 disabled={mainCategory == ""}
//               >
//                 {(categoryList.length > 0 ? categoryList : []).map((data, index) => {
//                   return (
//                     <MenuItem key={Math.random()} className={classes.textsize} value={data.id}>{data.category}</MenuItem>
//                   )
//                 })}
//               </Select>
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <InputLabel className={classes.textsize} htmlFor="sub_category">Sub Category*</InputLabel>
//               <Select
//                 value={inputs.sub_category}
//                 onChange={handleSubCategory}
//                 name='sub_category'
//                 id='sub_category'
//                 className={classes.drpdwn}
//                 fullWidth
//                 required
//                 disabled={category == ""}
//               >
//                 {(subCategoryList.length > 0 ? subCategoryList : []).map((data, index) => {
//                   return (
//                     <MenuItem key={Math.random()} className={classes.textsize} value={data.id}>{data.category}</MenuItem>
//                   )
//                 })}
//             </Select>
//           </Grid>
//         </Grid>
//       </ExpansionPanelDetails>
//     </ExpansionPanel>
//   </Toolbar>
//   );
}
