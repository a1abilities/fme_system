import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { APP_TOKEN } from '../../../api/Constants';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'; 
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip'; 
import IconButton from '@material-ui/core/IconButton';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';

import {TabPanel} from '../../common/TabPanel.js'
import Add from './Add';
import Edit from './Edit';
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContentWrapper from '../../common/MySnackbarContentWrapper';
import BadgeComp from '../../common/BadgeComp';
// API CALL
import UserAPI from '../../../api/User';
// import { breakStatement } from '@babel/types';


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

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);


export default function Franchise({roleName}) {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [staffOpen, setStaffOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [franchiseData, setFranchiseData]= useState();
  const [franchiseList, setFranchiseList] = useState({});
  const [franchiseId, setFranchiseId] = useState([]);
  const [openFranchise,setOpenFranchise] = useState();
  const [activeFranchise,setActiveFranchise] = useState();
  const [inactiveFranchise,setInactiveFranchise] = useState();
  const [closeFranchise,setCloseFranchise] = useState();
  

  //value is for tabs  
  const [value, setValue] = React.useState(0);
  

  const [showFranchise, setShowFranchise] = useState(roleName === 'Super Admin');
  const [showStaff, setShowStaff] = useState(roleName === 'Admin');
  // var totalFranchise = 1;  
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  
  const drawerWidth = 240;
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      // zIndex: theme.zIndex.drawer + 1,
      width: 900
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
    fab:{
      marginRight: theme.spacing(1),
      fontSize: 12,
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
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightBold,
    },
    expand:{
      fontSize: theme.typography.pxToRem(12),
      
    },
    padding: {
      padding: theme.spacing(0, 2),
    },
    expandHeading: {
      fontSize: theme.typography.pxToRem(12),
      flexBasis: '33.33%',
      flexShrink: 0,
      fontWeight: theme.typography.fontWeightBold,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(12),
      // marginLeft:theme.spacing(3),
      // color: theme.palette.text.secondary,
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
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await UserAPI.list();        
        setFranchiseList(result.userList);
        

        let franchiseIdTemp = [];
        result.userList.map(data => {        
          let found = franchiseIdTemp.some(el => el.franchise_id === data.franchise_id);
          if(!found) {
            franchiseIdTemp.push({
              director_id: data.director_id,
              franchise_id: data.franchise_id,
              franchise_name: data.franchise_name,
              company_name: data.company_name,
              suburb: data.suburb,
              city: data.city,
              contact: data.contact,
              status: data.state
            });
          }
        });
        
        handleCount(franchiseIdTemp);

        setFranchiseId(franchiseIdTemp);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };
    fetchData();
    // (franchiseList.length > 0 ? franchiseList : []).map((row, index)=>{
    //   console.log('rows',row.franchise_id);  
    // })
    
  }, []);

  function handleCount(franchiseIdTemp) {
    let open = 0;
    let active = 0;
    let inactive = 0;
    let close = 0;

    franchiseIdTemp.map(data=>{
      data.status === 1 ? open += 1 : '';
      data.status === 2 ? active += 1 : '';
      data.status === 3 ? inactive += 1 : '';
      data.status === 4 ? close += 1 : '';
    })

    setOpenFranchise(open);
      setActiveFranchise(active);
      setInactiveFranchise(inactive);
      setCloseFranchise(close);
  }



  
  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setStaffOpen(false);
  }
  
  function handleClickEditOpen(val) {
    setFranchiseData(val),
    setEditOpen(true);
  }
  function handleEditClose() {
    setEditOpen(false);
  }

  function setFranchiseListFn(response) {
    setFranchiseList(response);
    
  }
  function setFranchiseIdFn(response) {
    setFranchiseId(response);
    handleCount(response);
  }
  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  function handleSnackbarClick() {
    setSnackbarOpen(true);
  }

  function handleFranchiseClick() {
    setShowFranchise(true);
    setShowStaff(false);
  }
  function handleTabChange(event, newValue) {
    setValue(newValue);
    // console.log('setValue...',value)
  }

  return (
    <div>
      <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <Fab
              variant="extended"
              size="small"
              aria-label="Add"
              className={classes.fonttransform}
              onClick={handleClickOpen} elevation={0} 
            >
              <AddIcon className={classes.extendedIcon}  />
              Franchise
            </Fab>
          </Grid>
          <AppBar position="static"  className={classes.appBar}>
            <Tabs value={value} onChange={handleTabChange} className={classes.textsize} aria-label="simple tabs example">
              <Tab label={<BadgeComp count={openFranchise} label="Open" />} /> 
              <Tab label={<BadgeComp count={activeFranchise} label="Active" />} /> 
              <Tab label={<BadgeComp count={inactiveFranchise} label="Inactive" />} /> 
              <Tab label={<BadgeComp count={closeFranchise} label="Close" />} /> 
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={value}>
                    { (franchiseId.length > 0 ? franchiseId : []).map((data, index)=>{
                     return(
                       data.status===value+1? <ExpansionPanel
                          className={classes.expansionTitle}
                          expanded={expanded === data.director_id}
                          onChange={handleChange(data.director_id)}
                        >
                        {/* {console.log('value----==',value)} */}
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls=""
                            id="panel1a-header"
                          >
                              {/* <Typography className={classes.expand}>Franchise Details</Typography> */}
                              <Typography className={classes.expandHeading}>{data.franchise_name}</Typography>
                              <Typography className={classes.secondaryHeading}>{data.company_name +' at '+ data.suburb + ', ' + data.city}</Typography>
                              
                              {/* <Typography className={classes.secondaryHeading}>
                              {
                                                data.status===1 ? 'Open' 
                                        : data.status===2 ? 'Active' 
                                        : data.status===3 ? 'Inactive' 
                                        : data.status===4 ? 'Close' 
                                        : ''
                                    }
                              </Typography> */}
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <Paper style={{ width: '100%' }}>
                              <Table className={classes.table}>
                                <TableHead>
                                  <TableRow>
                                    <StyledTableCell>#</StyledTableCell>
                                    {/* <StyledTableCell>Franchise</StyledTableCell> */}
                                    <StyledTableCell>Director</StyledTableCell>
                                    <StyledTableCell>UID</StyledTableCell>
                                    <StyledTableCell>Email</StyledTableCell>
                                    <StyledTableCell>Contact</StyledTableCell>
                                    <StyledTableCell>Status</StyledTableCell>
                                    <StyledTableCell>Options</StyledTableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  
                                {
                                (franchiseList.length > 0 ? franchiseList : []).map((childData, childIndex)=>{
                                  return (childData.franchise_id === data.franchise_id) ? <TableRow > 
                                    {/* <StyledTableCell> {childData.franchise_id}  </StyledTableCell> */}
                                    {/* <StyledTableCell>{childData.franchise_name}</StyledTableCell> */}
                                    
                                    <StyledTableCell> {childIndex+1}  </StyledTableCell>
                                    <StyledTableCell>{childData.director}</StyledTableCell>
                                    <StyledTableCell>{childData.user_id}</StyledTableCell>
                                    <StyledTableCell>{childData.email}</StyledTableCell>
                                    <StyledTableCell>{childData.contact}</StyledTableCell>
                                    <StyledTableCell>{
                                                childData.state===1 ? 'Open' 
                                        : childData.state===2 ? 'Active' 
                                        : childData.state===3 ? 'Inactive' 
                                        : childData.state===4 ? 'Close' 
                                        : ''
                                    }</StyledTableCell>
                                    <StyledTableCell>
                                    
                                    <Tooltip title="Edit">
                                        <IconButton  size="small"  className={classes.fab} value={childData.id} name={childData.id} onClick={(event) => { handleClickEditOpen(childData); }} disabled={childData.state===4 ? true : false}>
                                          <EditIcon />  
                                        </IconButton>
                                      </Tooltip>                                    
                                    </StyledTableCell>
                                  </TableRow> : null
                                    })
                                     }
                                </TableBody>
                              </Table>
                            </Paper>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>:''
                      )
                      })
                    }
                   
          {/* </Grid> */}
          
          </TabPanel>
          
        </Grid>
      {open? <Add open={open} handleClose={handleClose} handleSnackbarClick={handleSnackbarClick} setFranchiseList={setFranchiseListFn} setFranchiseId={setFranchiseIdFn}/> :null}
      
      {editOpen ? <Edit open={editOpen} handleEditClose={handleEditClose} handleSnackbarClick={handleSnackbarClick} inputValues={franchiseData} setFranchiseList={setFranchiseListFn}  setFranchiseId={setFranchiseIdFn}/> : null}
    </div>
  );
}
