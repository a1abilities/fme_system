import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FilterIcon from '@material-ui/icons/FilterList';
import TableFooter from '@material-ui/core/TableFooter';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Popover from '@material-ui/core/Popover';;
import Paper from '@material-ui/core/Paper';
import { getDateInDDMMYYYY} from '../../../../utils/datetime';
import { Divider } from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';


// Components
import {PaginationBar} from '../../../common/PaginationBar.js';
import {StyledTableCell} from '../../../common/TableStyles.js';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    fontSize: theme.typography.pxToRem(14),
    color:"white",
    marginTop:theme.spacing(-3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  padding: {
    padding: theme.spacing(0, 2),
  },
  button:{
    color:"white",
    fontSize: theme.typography.pxToRem(10),
    marginRight: theme.spacing(1),
  },
  fonttransform:{
    textTransform:"initial",
    fontSize: theme.typography.pxToRem(13),
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
    color: 'blue',
  },
  typography: {
    padding: theme.spacing(2),
  },
}));




export default function MissedPayment({missedPaymentData, count, handleOrderView, handlePaymentFilter, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) {
  const classes = useStyles();
  
  const [searchText, setSearchText] = React.useState('');
  const [fromPaymentDate, setFromPaymentDate] = React.useState(null);
  const [toPaymentDate, setToPaymentDate] = React.useState(null);
  

  const handleSearchText = async (e) => {
    setSearchText(e.target.value);
  }
  
  const handleFromPaymentDate = (date) =>{
    setFromPaymentDate(date);
  }

  const handleToPaymentDate = (date) => {
    setToPaymentDate(date);
  }

return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth            
            margin="dense"
            id="search"
            name="search"
            placeholder ="Type (Order#, Customer Name, Payment Date) to Search Record..."
            type="text"
            value={searchText}
            onKeyPress={(ev) => {
              if (ev.key ===  'Enter') {
                handlePaymentFilter(searchText);
                ev.preventDefault();
              }
            }}
            onChange={handleSearchText}
          />
        </Grid>
        <Grid item xs={12} sm={6} alignItems = 'center' style = {{ display : 'flex'}}>
                <Typography style={{marginRight : '10px'}}>{"From: "}</Typography>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk = {true}                    
                    variant = "inline"
                    margin="dense"
                    id="from_payment_date"
                    name="from_payment_date"
                    format="dd-MM-yyyy"
                    placeholder="DD-MM-YYYY"
                    value={fromPaymentDate}
                    InputProps={{
                      classes: {
                        input: classes.textsize,
                      },
                      disableUnderline: true,
                    }}       
                    onChange={handleFromPaymentDate}
                    error = {''}
                    helperText = {''}
                  />                  
                </MuiPickersUtilsProvider>

                <Typography style={{marginRight : '10px', marginLeft : '20px'}}>{"To: "}</Typography>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  
                  <KeyboardDatePicker
                    autoOk = {true}                    
                    variant = "inline"
                    margin="dense"
                    id="to_payment_date"
                    name="to_payment_date"
                    format="dd-MM-yyyy"
                    placeholder="DD-MM-YYYY"
                    value={toPaymentDate}
                    InputProps={{
                      classes: {
                        input: classes.textsize,
                      },
                      disableUnderline: true,                      
                    }}       
                    onChange={handleToPaymentDate}
                    error = {''}
                    helperText = {''}
                  />
                </MuiPickersUtilsProvider> 


                <Tooltip title="Search">                
                  <IconButton onClick = {()=> {handlePaymentFilter(searchText, fromPaymentDate, toPaymentDate)}}><SearchIcon /></IconButton>
                </Tooltip>
                <Tooltip title="Filter">
                  <PopupState variant="popover" popupId="demo-popup-popover">
                    {popupState => (
                    <div>
                      <IconButton variant="contained" color="primary" {...bindTrigger(popupState)}>
                        <FilterIcon />
                      </IconButton>
                      <Popover 
                        {...bindPopover(popupState)}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right',}}
                      >
                         <Paper>
                          <Typography className={classes.typography} style={{fontWeight:'bold'}}>Order Type</Typography>
                          <Divider />
                          <List >
                            <ListItem   button onClick={()=> {handlePaymentFilter('$###_Fix_###$')}}>Fix</ListItem>
                            <ListItem   button onClick={()=> {handlePaymentFilter('$###_Flex_###$')}}>Flex</ListItem>
                          </List>                          
                        </Paper>                        
                      </Popover>
                    </div>
                    )}
                  </PopupState>
                </Tooltip>            
        </Grid>
        <Grid item xs={12} sm={12}>
      <Table stickyHeader  className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>Order Id</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Payment Mode</StyledTableCell>
            <StyledTableCell>Intallment No </StyledTableCell>
            <StyledTableCell>Payment Amount</StyledTableCell>            
            <StyledTableCell>Payment Status</StyledTableCell>
            <StyledTableCell>Debit Date  </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>        
            {missedPaymentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => {            
              return(
                <TableRow key={data.id}>
                    <StyledTableCell> {data.id}</StyledTableCell>
                    <StyledTableCell>
                      <IconButton  size="small" className={classes.textsize} value={data.id} name={data.id} component="span"  onClick={(event) => { handleOrderView(data); }}>
                        {data.order_format_id}
                      </IconButton> 
                    </StyledTableCell>
                    <StyledTableCell> {data.first_name + ' ' + data.last_name}  </StyledTableCell>
                    <StyledTableCell>{data.payment_mode_name}   </StyledTableCell>
                    <StyledTableCell>{data.installment_no}</StyledTableCell>
                    <StyledTableCell>{data.payment_amt}</StyledTableCell>            
                    <StyledTableCell>{data.payment_status}</StyledTableCell>
                    <StyledTableCell>{getDateInDDMMYYYY(data.payment_date)}</StyledTableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
        <TableFooter>
          <TableRow>
            <PaginationBar colSpan={8} count={count} rowsPerPage={rowsPerPage} page={page} handleChangePage = {handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />           
          </TableRow>
        </TableFooter>
      </Table>  
      </Grid>
    </Grid> 
    </div>   
  )
}
