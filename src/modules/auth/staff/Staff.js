import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip'; 
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Add from './Add';
import Edit from './Edit';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';

// API CALL
import StaffAPI from '../../../api/StaffMasterAdmin';
import BadgeComp from '../../common/BadgeComp';

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

const drawerWidth = 240;  
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
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
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
    padding: {
      padding: theme.spacing(0, 2),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    fonttransform:{
      textTransform:"initial",
      fontSize: theme.typography.pxToRem(13),
    },
    button:{
      color:"white",
      fontSize: theme.typography.pxToRem(10),
    },
    textsize:{
      color:"white",
      fontSize: theme.typography.pxToRem(12),
    }
  }));


export default function Staff({roleName}) {
  
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [staffData,setStaffData]= useState();
  const [staffList, setStaffList] = useState({});
  const [position, setPosition] = useState({});
  const [searchText, setSearchText]  = useState('');
  const [value, setValue] = React.useState(0);

  let territory = 0;
  let marketing = 0;
  let it = 0;
  let bdm = 0;
  let accountant = 0;
  let sales = 0;


  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await StaffAPI.list();
        setStaffList(result.staffList);
console.log(result)
        const positionResult = await StaffAPI.positionList();
        setPosition(positionResult.staffPosition);
console.log(positionResult)
} catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);



  
  function handleSearchText(event){
    setSearchText(event.target.value);
  }

  function handleClickOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  function handleClickEditOpen(data) {
    setStaffData(data),
    setEditOpen(true);
  }
  function handleEditClose() {
    setEditOpen(false);
  }
  function setFranchiseListFn(response) {
    setStaffList(response);
  }
  
  function handleSnackbarClick() {
    setSnackbarOpen(true);
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    );
  }
  function handleTabChange(event, newValue) {
    setValue(newValue);
  }


  const searchHandler = async () => {
    try {
    if(searchText!=''){
        const result = await StaffAPI.search({searchText: searchText});
        setStaffList(result.staffList);
        setSearchText('');     
    }else{
      const result = await StaffAPI.list();
      setStaffList(result.staffList);     
      setSearchText('');
    }} catch (error) {
      console.log('error',error);
    }
  }


  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <Fab variant="extended" size="small" className={classes.fonttransform} onClick={handleClickOpen} >
              <AddIcon className={classes.extendedIcon} /> Staff
            </Fab>
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              id="search"
              name="search"
              placeholder = "Type (UserId/First Name/Last Name/Location/Email/Contact/Position) to Search Staff..."
              value={searchText} 
              autoComplete='off'
              onKeyPress={(ev) => {
                if (ev.key ===  'Enter') {
                  searchHandler()
                  ev.preventDefault();
                }
              }}
              onChange={handleSearchText}
              InputProps={{
                endAdornment: <InputAdornment position='end'>
                                <Tooltip title="Search">
                                  <IconButton onClick={ searchHandler}><SearchIcon /></IconButton>
                                </Tooltip>
                              </InputAdornment>,
              }}
              fullWidth
            />              
        </Grid>
        <Grid item xs={12} sm={12}>
          <AppBar position="static"  className={classes.appBar}>
            <Tabs value={value} onChange={handleTabChange} className={classes.textsize} variant="scrollable" scrollButtons="auto">
              {
                (staffList.length > 0 ? staffList : []).map((data, index)=>{
                  data.position === 1 ? territory+=1 : '';
                  data.position === 2 ? marketing+=1 : '';
                  data.position === 3 ? it+=1 : '';
                  data.position === 4 ? bdm+=1 : '';
                  data.position === 5 ? accountant+=1 : '';
                  data.position === 6 ? sales+=1 : '';
                })
              }
              <Tab label={<BadgeComp count={staffList.length} label="All" />} /> 
              <Tab label={<BadgeComp count={territory} label="Territory Manager" />} /> 
              <Tab label={<BadgeComp count={marketing} label="Marketing Manager" />} /> 
              <Tab label={<BadgeComp count={it} label="IT Specialist" />} /> 
              <Tab label={<BadgeComp count={bdm} label="BDM" />} /> 
              <Tab label={<BadgeComp count={accountant} label="Accountant" />} /> 
              <Tab label={<BadgeComp count={sales} label="Sales Specialist" />} /> 
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={value}>
            <Paper style={{ width: '100%' }}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>#</StyledTableCell>
                        <StyledTableCell>User ID</StyledTableCell>
                        <StyledTableCell>Full Name</StyledTableCell>
                        <StyledTableCell>Position</StyledTableCell>
                        <StyledTableCell>Contact</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Options</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    { (staffList.length > 0 ? staffList : []).map((data, index)=>{
                      
                      return(
                        <TableRow key={data.id} >
                          <StyledTableCell> {index+1}  </StyledTableCell>
                          <StyledTableCell> {data.user_id}  </StyledTableCell>
                          <StyledTableCell> {data.first_name + ' ' + data.last_name}  </StyledTableCell>
                          <StyledTableCell> 
                            {( (data.position && data.position.split(',')) || []).map((a, index) =>{
                              return(
                                (position != undefined && position != null && position.length > 0 ? position : []).map((ele)=>{
                                  return(
                                    (data.position.split(',').length-1)===index ?
                                    data.position.split(',')[index] == ele.id ? ele.position  :''
                                    :
                                    data.position.split(',')[index] == ele.id ? ele.position + ", " :''
                                  )
                                  })
                                ) 
                            })}
                          </StyledTableCell>
                          <StyledTableCell> {data.contact} </StyledTableCell>
                          <StyledTableCell> {data.email} </StyledTableCell>
                          <StyledTableCell>
                            <Tooltip title="Edit">
                              <IconButton  size="small" value={data.id} name={data.id} onClick={(event) => { handleClickEditOpen(data); }} >
                                <EditIcon />  
                              </IconButton>
                            </Tooltip>  
                          </StyledTableCell>
                        </TableRow>
                        // :'':
                      //   <TableRow key={data.id} >
                      //   <StyledTableCell> {index+1}  </StyledTableCell>
                      //   <StyledTableCell> {data.user_id}  </StyledTableCell>
                      //   <StyledTableCell> {data.first_name + ' ' + data.last_name}  </StyledTableCell>
                      //   <StyledTableCell> {data.position_name} </StyledTableCell>
                      //   <StyledTableCell>{data.contact}</StyledTableCell>
                      //   <StyledTableCell>{data.email}</StyledTableCell>
                      //   <StyledTableCell>
                      //     <Tooltip title="Edit">
                      //       <IconButton  size="small" value={data.id} name={data.id} onClick={(event) => { handleClickEditOpen(data); }} >
                      //         <EditIcon />  
                      //       </IconButton>
                      //     </Tooltip>                          
                      //   </StyledTableCell>
                      // </TableRow>
                      )
                      })
                    }
                    </TableBody>
                  </Table>
               </Paper>
          </TabPanel>
          </Grid>
        </Grid>
      {open ? <Add open={open} handleClose={handleClose} handleSnackbarClick={handleSnackbarClick} setFranchiseList={setFranchiseListFn} positions={position}/> :null}
      
      {editOpen ? <Edit open={editOpen} handleEditClose={handleEditClose} handleSnackbarClick={handleSnackbarClick} inputValues={staffData} setFranchiseList={setFranchiseListFn} positions={position} /> : null}
          
    </div>
  );
}
