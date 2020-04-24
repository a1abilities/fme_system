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
import Customer from '../../../api/franchise/Customer';

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

export default function CommentDialog({open, handleViewClose, customer_id}){
  const styleClass = useCommonStyles();   
  const classes = useStyles();
  const [comment, setComment] = useState('');
  const [commentData, setCommentData] = useState([]);  

  useEffect(() =>{
    const viewComment = async () => {
      const result = await Customer.getCommentList({ 
        customer_id : customer_id,
      });      
      setCommentData(result);
    };
    viewComment();   
  },[]);

  
  const postComment = async () => {
    if(comment != "") {
      const result = await Customer.postComment({
        customer_id : customer_id,
        comment: comment, 
        });        
        setCommentData(result);        
    } else{
      alert("Write comment before submit");
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
                Customer Comment
              </Typography>
            <IconButton size="small" onClick={handleViewClose} className={styleClass.closeIcon}> x </IconButton>
            </Toolbar>
    </AppBar> 
    {/* <DialogTitle id="form-dialog-title">Comment Box</DialogTitle> */}
        <DialogContent>
          <DialogContentText>
            If you have something to give info about customer then you can post a comment.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Write your comment here"
            type="text"
            fullWidth
            required
            onChange = {handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={postComment} color="primary" > Post Comment </Button>
          <Button onClick={handleViewClose} color="primary" > Close </Button>
        </DialogActions>
        <Divider />
    <Paper className={classes.root}>  
      <div className={classes.tableWrapper}>      
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="right" style={{ minWidth: 50, color: "black", fontWeight: "bolder" }}>#</TableCell>
                  <TableCell  style={{ minWidth: 100, color: "black", fontWeight: "bolder" }}>Comment By</TableCell>                  
                  <TableCell  style={{ minWidth: 250, color: "black", fontWeight: "bolder" }}>Comment</TableCell>
                  <TableCell  style={{ minWidth: 150, color: "black", fontWeight: "bolder" }}>Comment Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(commentData.length> 0 ? commentData : []).map((data,index)=>{
                  return(
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{data.created_by_name}</TableCell>                      
                      <TableCell>{data.comment}</TableCell>
                      <TableCell>{data.created_at}</TableCell>
                    </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>                     
          </div>
    </Paper>   
  </Dialog>
 </div>
 )
}