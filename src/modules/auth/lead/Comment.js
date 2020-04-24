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
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import SendIcon from '@material-ui/icons/Send.js';
import Tooltip from '@material-ui/core/Tooltip';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Link from '@material-ui/core/Link';
import validate from '../../common/validation/CommentRuleValidation';
// API CALL
import UserAPI from '../../../api/User';
import Lead from '../../../api/Lead';
import useSignUpForm from '../franchise/CustomHooks';
import {useCommonStyles} from '../../common/StyleComman'; 
import { API_URL } from '../../../api/Constants';
// Helpers
import { APP_TOKEN } from '../../../api/Constants';

import FranchiseUsers from '../../../api/FranchiseUsers';
const RESET_VALUES = {
  id: '',
  comment: '',
  comment_by:'',
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
  drpdwn:{
    marginTop: theme.spacing(1),
    fontSize: theme.typography.pxToRem(12),
  },  
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledTableCell = withStyles(theme => ({
  head: {
   
    color: theme.palette.common.black,
    fontSize: theme.typography.pxToRem(18),
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);
export default function Comment({open, handleViewClose, handleSnackbarClick, inputValues}) {
  const classes = useStyles();
  const styleClass = useCommonStyles();
  const [expanded, setExpanded] = React.useState('panel1');
  const [staffList, setStaffList] = useState({});
  const [leadList, setLeadList] = React.useState(inputValues);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [franchiseList, setFranchiseList] = useState({});
  const [commentList, setCommentList] = useState({});
  const [franchiseUser, setFranchiseUser] = useState();
  const [uname, setUname] = useState();
  const docPath = "server\\files\\leads\\" + inputValues.document ; 
  const roleName = APP_TOKEN.get().roleName;
  const userName = APP_TOKEN.get().userName;

  const addCommentToLead = async () => {
    const response = await Lead.addComment({
      lead_id: inputs.id,
      comment:inputs.comment,
      comment_by: uname
    });
    handleSnackbarClick(true);
    handleViewClose(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await UserAPI.list();
        setFranchiseList(result.userList);
        if(roleName != 'Super Admin'){    
          const fid = await FranchiseUsers.franchiseid();
          setFranchiseUser(fid.currentfranchise[0].name);
          setUname(userName + ' ( '+fid.currentfranchise[0].name+' )');
          // setInput('comment_by',uname);
          allComment();
        }
        else{
          setUname(userName);
          // setInput('comment_by',uname);
          allComment();
        }
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
    
  }, []);
  const allComment = async () => {
    const response = await Lead.allComment({
      lead_id: inputValues.id
    });
    setCommentList(response.commentList);
    // console.log('res---',response);
  };

  // function validate(values) {
  //   let errors = {};
  //   return errors;
  // };
  const { inputs, handleInputChange, handleSubmit, handleReset, setInputsAll, setInput, errors } = useSignUpForm(
    RESET_VALUES,
    addCommentToLead,
    validate
  );
  useEffect(() => {
    setInputsAll(inputValues);
  }, []);
  
  return (
    <div>
      <Dialog  maxWidth="sm" open={open}  TransitionComponent={Transition}>
        <from >
          <AppBar className={classes.appBar}>
            <Toolbar>
              {/* <IconButton edge="start" color="inherit" onClick={handleViewClose} aria-label="Close">
                <CloseIcon />
              </IconButton> */}
              <Typography variant="h6" className={classes.title}>
                View Lead
              </Typography>
              <IconButton size="small" onClick={handleViewClose} className={styleClass.closeIcon}> x </IconButton>
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
          <ExpansionPanel
              className={classes.expansionTitle}
              expanded={expanded === 'panel1'}>
              <ExpansionPanelDetails>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={2}>
                    <InputLabel  className={classes.textsize} htmlFor="lead">Lead ID</InputLabel>
                    <TextField 
                      
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="lead_id"
                      name="lead_id"
                      label=""
                      value={inputs.lead_id}
                      fullWidth
                      required
                      type="text"
                      disabled
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel  className={classes.textsize} htmlFor="last_name">Franchise</InputLabel>
                      <Select
                        value={inputs.franchise_id}
                        inputProps={{
                          name: 'franchise_id',
                          id: 'franchise_id',
                          label:'franchise_id'
                        }}
                        disabled
                        className={classes.drpdwn}
                        fullWidth 
                        // label="franchise_id"
                      >
                        <MenuItem disabled className={classes.textsize}  value="" selected>Select Franchise
                        </MenuItem>
                          {(franchiseList.length > 0 ? franchiseList : []).map(data => {
                          return (
                            <MenuItem className={classes.textsize} value={data.franchise_id} >{data.franchise_name}</MenuItem>
                          );
                        })}
                        <MenuItem className={classes.textsize} value={0}>{'All'}</MenuItem> 
                      </Select>
                  </Grid>
                    {/* <Grid item xs={12} sm={3}>
                      <TextField 
                        
                        margin="dense"
                        id="otherFranchiseValue"
                        name="otherFranchiseValue"
                        label="Enter Franchise Name"
                        type="text"
                        value={inputs.franchise_name} 
                        required
                        disabled 
                        fullWidth
                      />
                    </Grid> */}
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="contact">Uploaded Doc/Photo</InputLabel>
                    <a href={API_URL + "/api/download?path=leads/" + inputs.document }  download >{inputs.document}</a>
                      {/* <Tooltip title="Download">
                        <IconButton  size="small"  >
                          <SendIcon />
                        </IconButton>
                      </Tooltip> */}
                  </Grid> 
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="customer_name">Customer Name </InputLabel>
                      
                    <TextField 
                        InputProps={{
                          classes: {
                            input: classes.textsize,
                          },
                        }}
                        id="customer_name"
                        name="customer_name"
                        // label="First Name"
                        value={inputs.customer_name}
                        fullWidth
                        // required
                        type="text"
                        // placeholder="Franchise Name"
                        margin="dense"
                        disabled
                      />
                  </Grid> 
                  <Grid item xs={12} sm={6}>
                    
                  <InputLabel  className={classes.textsize} htmlFor="customer_contact">Customer Contact </InputLabel>
                    <TextField 
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="customer_contact"
                      name="customer_contact"
                      value={inputs.customer_contact}
                      fullWidth
                      // required
                      type="number"
                      disabled
                      // placeholder="Franchise Name"
                      margin="dense"
                      onInput={(e)=>{ 
                        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                    }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <InputLabel  className={classes.textsize} htmlFor="email">Description </InputLabel>
                    <TextField 
                      
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="description"
                      name="description"
                      // label="Description"
                      value={inputs.message}
                      fullWidth
                      required
                      disabled 
                      multiline
                      type="text"
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="email">Comment</InputLabel>
                    <TextField 
                      
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="comment"
                      name="comment"
                      // label="Comment"
                      value={inputs.comment}
                      onChange={handleInputChange}
                      error={errors.comment}
                      helperText={errors.comment}
                      fullWidth
                      required
                      multiline
                      type="text"
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="email">Comment By</InputLabel>
                    <TextField 
                      
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="comment_by"
                      name="comment_by"
                      // label="Comment By"
                      value={uname}
                      // error={errors.comment_by}
                      // helperText={errors.comment_by}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      type="text"
                      margin="dense"
                      disabled
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit} type="submit">
                      Post Comment
                    </Button>
                    <Button  variant="contained"   onClick={handleViewClose} color="primary" className={classes.button} >
                      Close
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Paper className={classes.paper}>    
                      { (commentList.length > 0 ? commentList : []).map((data, index)=>{
                          return(
                            <Typography variant="h6"  className={classes.textsize} >
                                {data.comment + '       -' + data.comment_by}
                            </Typography>
                          )
                        })
                      }
                  </Paper>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel> 
            
            
          </div>
        </from>
      </Dialog>
    </div>
  );
}
