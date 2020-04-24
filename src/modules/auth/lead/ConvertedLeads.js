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
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
// API CALL
import LeadAPI from '../../../api/Lead';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
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
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
  },
  expansionTitle: {
    fontWeight: theme.typography.fontWeightBold,
  },
  tbrow:{
    marginTop:theme.spacing(2),
    marginBottom:theme.spacing(2),
  },
  dropdwn:{
      marginTop:theme.spacing(2.5),
  }
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

export default function ConvertedLeads({open, handleConvertedLeadsClose, franchiseListd}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [leadList,setLeadList]= useState({});
  const classes = useStyles();
  const roleName = APP_TOKEN.get().roleName;

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await LeadAPI.convertedList();
        setLeadList(result.convertedList);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

return (
  <div>
    <Dialog maxWidth="lg" open={open} onClose={handleConvertedLeadsClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleConvertedLeadsClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Converted Leads List
            </Typography>
          </Toolbar>
        </AppBar>

    <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Paper style={{ width: '100%' }}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                        <StyledTableCell>#</StyledTableCell>
                        <StyledTableCell>Lead ID</StyledTableCell>
                        <StyledTableCell>For Franchise</StyledTableCell>
                        {/* <StyledTableCell>Doc/Photo</StyledTableCell> */}
                        <StyledTableCell>Created by</StyledTableCell>
                        <StyledTableCell>Message</StyledTableCell>
                        <StyledTableCell>Converted By</StyledTableCell>
                        <StyledTableCell>Converted To</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  { (leadList.length > 0 ? leadList : []).map((data, index)=>{
                        return(
                          <TableRow >
                          <StyledTableCell> {index+1}  </StyledTableCell>
                          <StyledTableCell> {data.lead_id}  </StyledTableCell>
                            {data.franchise_id!=0 ?   
                              (franchiseListd.length > 0 ? franchiseListd : []).map((dataf, index1)=>{
                                  
                                  return(
                                    data.franchise_id===dataf.id ?
                                    <StyledTableCell> {dataf.name} </StyledTableCell>
                                      :''
                                      )
                                      
                                }) : <StyledTableCell> All</StyledTableCell>
                              }
                              {/* <StyledTableCell></StyledTableCell> */}
                              {data.f_id!=0 ?    (franchiseListd.length > 0 ? franchiseListd : []).map((datafr, index1)=>{
                                  
                                  return(
                                    data.f_id===datafr.id ?
                                    <StyledTableCell> {datafr.name +'  ('+ datafr.city + ' ,' + datafr.suburb + ' )'} </StyledTableCell>
                                      :''
                                      )
                                      
                                }) : <StyledTableCell> Master Admin</StyledTableCell>
                              }
                            <StyledTableCell>{data.message}</StyledTableCell>
                            {data.converted_by_f_id!=0 ?(franchiseListd.length > 0 ? franchiseListd : []).map((datafrc, index1)=>{
                                  
                                  return(
                                    data.converted_by_f_id===datafrc.id ?
                                    <StyledTableCell> {datafrc.name +'  ('+ datafrc.city + ' ,' + datafrc.suburb + ' )'} </StyledTableCell>
                                      :''
                                      )
                                      
                                }):<StyledTableCell></StyledTableCell>
                              }
                              <StyledTableCell>{data.converted_to===1? 'Enquiry':'Order'}</StyledTableCell>
                          </TableRow>
                        )
                        })
                      }
                  </TableBody>
                </Table>
            </Paper>
        </Grid>
      </Grid>
      </Dialog>
  </div>
  );
}
