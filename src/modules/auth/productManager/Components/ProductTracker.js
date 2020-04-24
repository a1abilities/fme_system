import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// Components
import ViewHistoryList from './SubComponents/ViewHistoryList.js';


// API CALL
import HistoryAPI from '../../../../api/History.js';


const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    height: theme.spacing(5),
  },
  closeIcon: {
    marginTop:theme.spacing(-3),
    color: 'white', 
    fontSize: theme.typography.pxToRem(14),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginRight:theme.spacing(-1),
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
  highlightRow:{
    backgroundColor: "#CBF6BF",
    color: theme.palette.common.white,
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
  buttonDisabled: {
    color: theme.palette.secondary,
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
  },
  buttonMargin: {
    margin: theme.spacing(1),
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function ProductTracker({ open, handleClose, rowIdInHistory}) {

  const classes = useStyles();
  const [historyList, setHistoryList] =  React.useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await HistoryAPI.getModifiedRecord({
          tableName: 'ordered_product',
          rowIdInHistory: rowIdInHistory
        });
        setHistoryList(result);     
      } catch (error) {
        console.log('error',error)
      }      
    };
    fetchData();
  }, []);
  

return (
    <div>
      <Dialog maxWidth open={open} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Product Tracker
            </Typography>
            <IconButton size="small" onClick={handleClose} className={classes.closeIcon}> x </IconButton>
          </Toolbar>
        </AppBar>

      <div className={classes.root}>
        <Paper className={classes.paper}>            
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12}>
              <ViewHistoryList historyList={historyList}  />
            </Grid>
            <Grid item xs={12} sm={12}>                      
              <Button variant="contained" color="primary" onClick={handleClose} className={classes.button}>
                Close
              </Button> 
            </Grid>
          </Grid>
        </Paper>
      </div>
      </Dialog>
    </div>
  );
}
