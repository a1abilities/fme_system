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
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip'; 
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {useCommonStyles} from '../../../../common/StyleComman';


// API CALL
import staticContentAPI from '../../../../../api/StaticContent.js';


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
  closeIcon: {
    marginTop:theme.spacing(-3),
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    flexGrow: 1,
    // padding: theme.spacing(1),
    width: '100%',
    // textAlign: 'left',
    backgroundColor: '#E5E9EA',
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
  errorHeading: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightBold,
    color:'red',
  },
  addButton:{
    backgroundColor:'#CBDF90',
  },
  expansionTitle: {
    fontWeight: theme.typography.fontWeightBold,
  },
  margin: {
    margin: theme.spacing(1),
  },
  deleteBtn: {
    margin: theme.spacing(1),
  },
  button:{
    color:"white",
    fontSize: theme.typography.pxToRem(10),
    marginRight: theme.spacing(1),
    marginTop:theme.spacing(3),
    marginLeft:theme.spacing(1),
    marginBottom:theme.spacing(3),
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  },
  tableHeading:{
    fontWeight: "bold",  
  }
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function MainDashboard({ open, handleClose}) {
  const classes = useStyles();
  const styleClass = useCommonStyles();
  const [discountList,setDiscountList] = useState([]);

  useEffect(() => {
    fetchDiscountRateList();
  },[]);

  const fetchDiscountRateList = async () => {
    const result = await staticContentAPI.getDiscountRateList({});
    setDiscountList(result.discountRateList);
  }

  const handleChange = (e, index, discountType) => {
    const validDecimalNumber = /^\d*\.?\d*$/;
    if (e.target.value === '' || validDecimalNumber.test(e.target.value)) {
      const discount = [...discountList];    
      discount[index][discountType] = e.target.value;
      setDiscountList(discount);
    }
  }

  const handleSubmit = async () => {
    try{
      await staticContentAPI.updateDiscountRateList({discountList : discountList});
    }catch(e){
      console.log('error..',e);
    }
    handleClose();
  }

  return (    
    <div>
       <Dialog maxWidth="lg" open={open} TransitionComponent={Transition}>        
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}> EMI Calculator </Typography>
              <IconButton size="small" onClick={handleClose} className={styleClass.closeIcon}> x </IconButton>
            </Toolbar>
          </AppBar>
          <div className={classes.root}>
          <Paper className={classes.paper}>
          <Grid item xs={12} sm={12}>
            <Table stickyHeader>
              <TableHead className = {classes.tableHeading}>
                <TableRow >                    
                  <TableCell >#</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Duration Period</TableCell>
                  <TableCell>Weekly Rate</TableCell>
                  <TableCell>Fortnightly Rate</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {(discountList != undefined && discountList != null) && (discountList.length > 0 ? discountList :[]).map((data, index) => {
                    return(
                      <TableRow hover role="checkbox">
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{data.duration_in_year + ' Year'}</TableCell>
                        <TableCell>{data.duration_period}</TableCell>
                        <TableCell>
                          <TextField 
                            InputProps={{
                              classes: {
                                input: classes.textsize,
                              },
                            }}
                            id="weekly_discount_rate"
                            name="weekly_discount_rate"
                            value={discountList[index].weekly_discount_rate}
                            onChange={(e) => {handleChange(e, index, 'weekly_discount_rate');}}
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <TextField 
                            InputProps={{
                              classes: {
                                input: classes.textsize,
                              },
                            }}
                            id="fortnightly_discount_rate"
                            name="fortnightly_discount_rate"
                            value={discountList[index].fortnightly_discount_rate}
                            onChange={(e) => {handleChange(e, index, 'fortnightly_discount_rate');}}
                            fullWidth
                          /></TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button variant="contained"  color="primary" className={classes.button} onClick={handleSubmit}> Submit </Button>
              <Button variant="contained"  color="primary" className={classes.button} onClick={handleClose}> Close </Button>
            </Grid>
          </Paper>
        </div>
      </Dialog>
    </div>
  );
}
