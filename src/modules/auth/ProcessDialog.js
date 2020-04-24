import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from '@material-ui/core';


// const useStyles = makeStyles(theme => ({
//   textsize:{
//     fontSize: theme.typography.pxToRem(13),
//   },
// }));

const useStyles = makeStyles(theme => ({
  progress: {
    display:'block',
    alignItems:'center',
    justifyContent:'center',     
    textAlign: "center",
    opacity: .4,
  },
  
  paper: {
    // backgroundColor: 'white',
    width: '100%',
    height: '100%',
    padding: '20%',
  },
}));

export default function ProcessDialog({open, handleProcessDialogClose}){
  
  const classes = useStyles();
  return(
    
   <div>
    <Dialog  
      open={open} 
      onClose={handleProcessDialogClose}
      className={classes.progress}
      fullWidth      
      fullScreen
    >
        <Paper className={classes.paper}>
            <CircularProgress color= "primary" />
        </Paper>
      </Dialog>
  </div>
 )
}