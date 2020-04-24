import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function YesNoDialog({open, handleYesNoClose, title, content}) {

  return (
    <div>      
      <Dialog
        open={open}
        // onClose={handleYesNoClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> {handleYesNoClose(0);}} color="primary" autoFocus>
            No
          </Button>
          <Button onClick={()=> {handleYesNoClose(1);}} color="primary" >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}