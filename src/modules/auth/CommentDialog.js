import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';

import {useCommonStyles} from '../common/StyleComman'; 
import ProcessDialog from './ProcessDialog.js';
import OrderAPI from '../../api/franchise/Order';
import MySnackbarContentWrapper from '../common/MySnackbarContentWrapper';

export default function CommentDialog({open, handleCommentBoxClose, orderData, setResponse}){
  const styleClass = useCommonStyles();   
  const [comment, setComment] = useState('');
  const [processDialog,setProcessDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState([]);

  function handleCommentChange(e){
    setComment(e.target.value)
  }

  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }
    
  function handleProcessDialogClose(){
    setProcessDialog(false);
  }

  const postComment = async () => {
    if(comment != "") {
      setProcessDialog(true);  
      const result = await OrderAPI.postComment({
        order_id: orderData.order_id,
        user_id: orderData.user_id,
        user_role: orderData.roleName,
        comment: comment, 
        });
        setProcessDialog(false);  
        if(result.isUploaded === 1){
          if(processDialog===false){
            setSnackbarContent({message:"Comment posted.", variant: "success"});
            setSnackbarOpen(true);
          }
        }else if(result.isUploaded === 0){
          if(processDialog===false){
            setSnackbarContent({message:"Failed to post", variant: "error"});
            setSnackbarOpen(true);
          }
        }
        setResponse(result);
        handleCommentBoxClose(false);
      }else{
        alert('Comment something..');
      }
  };
  
  return(
   <div>     
  <Dialog open={open}  >
      <DialogTitle id="form-dialog-title">Comment Box</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you have something to give info about order then you can post a comment.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Write a Comment"
            type="text"
            fullWidth
            required
            onChange = {handleCommentChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={postComment} color="primary" > Post Comment </Button>
          <Button onClick={handleCommentBoxClose} color="primary" > Close </Button>
        </DialogActions>
      </Dialog>
{/* className={styleClass.commentBoxButton} */}    

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
      >
        <MySnackbarContentWrapper
          onClose={handleSnackbarClose}
          variant={snackbarContent.variant}
          message={snackbarContent.message}
        />
      </Snackbar>
      
      {processDialog ? <ProcessDialog open = {processDialog} handleProcessDialogClose={handleProcessDialogClose}/> : null }          
  </div>
  
 )
}