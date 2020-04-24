import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
import {useCommonStyles} from '../../common/StyleComman'; 
// API CALL
import Category from '../../../../src/api/Category';
import Brand from '../../../api/product/Brand';
import Color from '../../../api/product/Color';
import Status from '../../../api/product/Status';

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
  tbrow:{
    marginTop:theme.spacing(2),
    marginBottom:theme.spacing(2),
  },
  dropdwn:{
      marginTop:theme.spacing(2.5),
  },
  closeIcon: { marginTop:theme.spacing(-3) },  
}));

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

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

export default function ArchivedList({open, handleArchivedClose}) {
  const styleClass = useCommonStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [brandList, setBrandList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [productList, setProductList] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await Category.archivedList();
        setProductList(result.archivedList);
        const brand_result = await Brand.list();
        setBrandList(brand_result.brandList);
        const color_result = await Color.list();
        setColorList(color_result.colorList);
        const status_result = await Status.list();
        setStatusList(status_result.statusList);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);
return (
  <div>
    <Dialog maxWidth="lg" open={open} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>           
            <Typography variant="h6" className={classes.title}>
              Archived Product List
            </Typography>
            <IconButton size="small" onClick={handleArchivedClose} className={styleClass.closeIcon}> x </IconButton>

          </Toolbar>
        </AppBar>

    <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Paper style={{ width: '100%' }}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>#</StyledTableCell>
                      <StyledTableCell>Product Name</StyledTableCell>
                      <StyledTableCell>Color</StyledTableCell>
                      <StyledTableCell>Brand</StyledTableCell>
                      <StyledTableCell>Buying Price</StyledTableCell>
                      <StyledTableCell>Description</StyledTableCell>
                      <StyledTableCell>Specification</StyledTableCell>
                      <StyledTableCell>Brought from</StyledTableCell>
                      <StyledTableCell>Invoice Number</StyledTableCell>
                      <StyledTableCell>Rental Price</StyledTableCell>
                      <StyledTableCell>Meta Keywords</StyledTableCell>
                      <StyledTableCell>Meta Description</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  
              { (productList.length > 0 ? productList : []).map((data, index)=>{
                 return(
                  <TableRow key={data.id} >
                      <StyledTableCell component="th" scope="row">
                      {data.id}
                      </StyledTableCell>
                      <StyledTableCell>{data.name}</StyledTableCell>
                      
                        { colorList.map((datacolor, index)=>{
                          return(
                            data.color_id===datacolor.id ?
                              <StyledTableCell>{datacolor.color}</StyledTableCell>
                              :''
                              )
                              
                            })
                          }

                        { brandList.map((databrand, index)=>{
                          return(
                            data.brand_id===databrand.id ?
                              <StyledTableCell>{databrand.brand_name}</StyledTableCell>
                              :''
                              )
                              
                            })
                          }
                        <StyledTableCell>{data.buying_price}</StyledTableCell>
                        <StyledTableCell>{data.description}</StyledTableCell>
                        <StyledTableCell>{data.specification}</StyledTableCell>
                        <StyledTableCell>{data.brought}</StyledTableCell>
                        <StyledTableCell>{data.invoice}</StyledTableCell>
                        <StyledTableCell>{data.rental}</StyledTableCell>
                        <StyledTableCell>{data.meta_keywords}</StyledTableCell>
                        <StyledTableCell>{data.meta_description}</StyledTableCell>
                       
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
