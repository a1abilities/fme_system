import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useCommonStyles} from '../../common/StyleComman'; 
import LinearProgress from '@material-ui/core/LinearProgress';
// API CALL
import Color from '../../../api/product/Color';

import useSignUpForm from '../franchise/CustomHooks';


const RESET_VALUES = {
  color: '',
};

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
  button:{
    color:"white",
    fontSize: theme.typography.pxToRem(10),
    marginRight: theme.spacing(1),
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  },
  button:{
    color:"white",
    fontSize: theme.typography.pxToRem(10),
    marginRight: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  closeIcon: { marginTop:theme.spacing(-3) },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddColor(props) {
  const styleClass = useCommonStyles();
  const classes = useStyles();
  const [ploading, setpLoading] = React.useState(false);
  
  const [errors, setErrors] = useState();
  const coloradd = async () => {
      
    let check=false;
    const validString = /^[a-zA-Z\s]+$/;
    if (!inputs.color) {
      setErrors('Color is required');
      check=true;
    } else if (!validString.test(inputs.color)) {
      setErrors('Color is invalid');
      check=true;
    }
    else{      
      setErrors('');
    }
    if(check===false){
        setpLoading(true);
          const response = await Color.addcolor({
           color: inputs.color,
        });
        props.updatedData(response.colorList);
        props.handleClose(false);
      }
  };
  
  function validate(values) {
    let errors = {};
    const validString = /^[a-zA-Z\s]+$/;
    if (!values.color) {
      errors.color = 'Color is required';
    } else if (!validString.test(values.color)) {
      errors.color = 'Color is invalid';
    }

    return errors;
  };

  const { inputs, handleInputChange, handleSubmit, handleReset, setInput } = useSignUpForm(
    RESET_VALUES,
    coloradd,
  );

  return (
    <div>
      <Dialog maxWidth="sm" open={props.open}>
        <form onSubmit={handleSubmit}>
          <AppBar className={classes.appBar}>
            <Toolbar>             
              <Typography variant="h6" className={classes.title}>
                Add Color
              </Typography>              
      <IconButton size="small" onClick={props.handleClose} className={styleClass.closeIcon}> x </IconButton>
    
            </Toolbar>
          </AppBar>

          <div className={classes.root}>

            <Grid item xs={12} sm={12}>   {ploading ?  <LinearProgress />: null}</Grid>

              <Paper className={classes.paper}> 

                <Grid container spacing={3}>
                  
                  
                  <Grid item xs={12} sm={12}>
                    <InputLabel className={classes.textsize} htmlFor="city_selection">Add Color</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="color"
                      name="color"
                      value={inputs.color}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={errors}
                      helperText={errors}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={12}>
                    <Button variant="contained" color="primary" onClick={coloradd} className={classes.button} 
                      >
                      Save
                    </Button>
                    
                    <Button variant="contained" color="primary" onClick={props.handleClose} className={classes.button}>
                      Close
                    </Button>                     
                  </Grid>
                
              </Grid>
              </Paper>
              
          </div>
      </form>
      </Dialog>
    </div>
  );
}
