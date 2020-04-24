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

import {useCommonStyles} from '.././../common/StyleComman'; 
import OrderAPI from '../../../api/franchise/Order';
import {getDate} from '../../../utils/datetime';

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


export default function BudgetCommentView({open, handleViewClose, customer_id}){
  const styleClass = useCommonStyles();   
  
  const [commentData, setCommentData] = useState([]);  

  
  const getBudgetComments = async () => {
    const result = await OrderAPI.getBudgetComments({ customer_id: customer_id });      
    setCommentData(result);
  };

  useEffect(() =>{
    getBudgetComments();   
  },[]);

  return(
   <div>     
  <Dialog open={open} maxWidth="xl" TransitionComponent={Transition} >
    <AppBar className={styleClass.appBar}>
            <Toolbar>
              <Typography variant="h6" className={styleClass.title}>
                Budget Comments
              </Typography>
            <IconButton size="small" onClick={handleViewClose} className={styleClass.closeIcon}> x </IconButton>
            </Toolbar>
    </AppBar> 
    <Paper className={styleClass.paper}>  
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12}>          
            <Table >
              <TableHead>
                <TableRow>
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell>Comment By</StyledTableCell>
                  <StyledTableCell>Comment</StyledTableCell>
                  <StyledTableCell>Comment Date</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(commentData.length> 0 ? commentData : []).map((data,index)=>{
                  return(
                    <TableRow>
                      <StyledTableCell>{index + 1}</StyledTableCell>
                      <StyledTableCell>{data.created_by_name}</StyledTableCell>
                      <StyledTableCell>{data.comment}</StyledTableCell>
                      <StyledTableCell>{getDate(data.created_at)}</StyledTableCell>
                    </TableRow>
                  )
                })
                  
                }
              </TableBody>
            </Table>                     
        </Grid>        
        <Grid item xs={12} sm={12}>
            <Button  variant="contained"  onClick={handleViewClose} color="primary" className={styleClass.button}> Close </Button>
          </Grid>
        </Grid>
      </Paper>  

      {/* <DialogActions>        
        <Button onClick={handleViewClose} color="primary" > Close </Button>
      </DialogActions> */}
  </Dialog>
  </div>
  
 )
}