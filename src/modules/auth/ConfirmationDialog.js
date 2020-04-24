import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  textsize:{
    fontSize: theme.typography.pxToRem(13),
  },
}));
export default function ConfirmationDialog({open, lastValue, handleConfirmationClose, currentState, title, content}){
 
  function handleDialogClose(){
  handleConfirmationClose(currentState);
 }
 function handleDialogConfirm(){
  handleConfirmationClose(lastValue);
}
 
const classes = useStyles();
  return(
   <div>
    <Dialog
        maxWidth="lg"
        open={open}
        onClose={handleConfirmationClose}
        aria-labelledby="alert-dialog-title"
        className={classes.textsize}
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText>{content} </DialogContentText>
        </DialogContent>  
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button name="comfirm" onClick={handleDialogConfirm} color="primary" autoFocus>
            Yes
          </Button>
          <Button name="close" onClick={handleDialogClose} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
  </div>
 )
}