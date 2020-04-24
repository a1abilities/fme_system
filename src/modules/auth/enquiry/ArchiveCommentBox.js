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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Slide from '@material-ui/core/Slide';
import InputLabel from '@material-ui/core/InputLabel';
import {useCommonStyles} from '.././../common/StyleComman'; 
import EnquiryAPI from '../../../api/franchise/Enquiry';
import CommentIcon from '@material-ui/icons/Comment';

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  tableWrapper: {
    maxHeight: 440,
    overflow: 'auto',
  },
});

export default function ArchiveCommentBox({open, handleViewClose, enquiryData, setEnquiryList, handleTabsData, isDeleted}){
  const styleClass = useCommonStyles();   
  const classes = useStyles();
  const [comment, setComment] = useState("");
  
  useEffect(() => {
    if(isDeleted === false){
      setComment(enquiryData.reason_to_delete);
    }
  },[]);

  const postComment = async () => {
    if(comment != "") {
      const result = await EnquiryAPI.deleteEnquiry({
        id : enquiryData.id,
        comment : comment,
      });
      setEnquiryList(result.enquiryList);
      handleTabsData(result.enquiryList);
      handleViewClose();
    } else{
      alert("Write reason before submit");
    }  
  };

  const handleInputChange = (e) => {
    setComment(e.target.value);
  }

  return(
   <div>     
  <Dialog open={open} maxWidth TransitionComponent={Transition} >
    <AppBar className={styleClass.appBar}>
            <Toolbar>
              <Typography variant="h6" className={styleClass.title}>
                Enquiry Deletion Panel
              </Typography>
            <IconButton size="small" onClick={handleViewClose} className={styleClass.closeIcon}> x </IconButton>
            </Toolbar>
    </AppBar> 
    {/* <DialogTitle id="form-dialog-title">Comment Box</DialogTitle> */}
        <DialogContent>
          <DialogContentText>
            Enter a valid reason to delete this enquiry
          </DialogContentText>
          <TextField
            multiline
            autoFocus
            value = {comment}
            margin="dense"
            id="comment"
            label="Write here.."
            type="text"
            fullWidth
            required
            onChange = {handleInputChange}
            disabled = {isDeleted == false}
          />
        </DialogContent>
        <DialogActions>
          {isDeleted === true &&
            <Button onClick={postComment} color="primary" > Archive </Button>
          }
          <Button onClick={handleViewClose} color="primary" > Close </Button>
        </DialogActions>
        <Divider />    
  </Dialog>
 </div>
 )
}