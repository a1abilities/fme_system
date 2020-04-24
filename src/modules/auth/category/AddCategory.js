import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {useCommonStyles} from '../../common/StyleComman'; 
// API CALL
import Category from '../../../api/Category';

import useSignUpForm from '../franchise/CustomHooks';

const RESET_VALUES = {
  category: '',
  type: '',
  parentid: '',
  position: '',
  description: '',
  image: '',
  meta_keywords: '',
  meta_description: '',
  active: '',
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
  drpdwn:{
    marginTop: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  closeIcon: { marginTop:theme.spacing(-3) },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddCategory(props) {
  const styleClass = useCommonStyles();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('panel1');
  const [errorCat, setErrorCat] = useState();
  const [errorSubcat, setErrorSubcat] = useState();

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const categoryadd = async () => {
    let check=false;
    const validString = /^[a-zA-Z\s]+$/;
    if (!inputs.category) 
      {setErrorCat('Category required');
      check=true;
    } else if (!validString.test(inputs.category)) 
      {setErrorCat('Category is invalid');
      check=true;}
      else{
        setErrorCat('')
      }
      
    if (!inputs.subcategory) 
    {setErrorSubcat('Sub category required');
    check=true;
  } else if (!validString.test(inputs.subcategory)) 
    {setErrorSubcat('Sub category is invalid');
    check=true;}
    else{
      setErrorSubcat('')
    }

      if(check===false){
        const response = await Category.addcategory({
          maincategory: props.selectedMainCategoryId,
          category: inputs.category,
          subcategory: inputs.subcategory,
        });

        props.newCatData(inputs);
        props.updatedCatData(response.categoryList);
        props.handleClose(false);
      }
  };
  
  function validate(values) {
    let errors = {};

    return errors;
  };

  const { inputs, handleInputChange, handleSubmit, handleReset, setInput } = useSignUpForm(
    RESET_VALUES,
    categoryadd,
    validate
  );

  return (
    <div>
      <Dialog maxWidth="sm" open={props.open}>
        <form onSubmit={handleSubmit}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Category Creation Panel
              </Typography>
            <IconButton size="small" onClick={props.handleClose} className={styleClass.closeIcon}> x </IconButton>
    
            </Toolbar>
          </AppBar>

          <div className={classes.root}>

          <Paper className={classes.paper}> 
                <Grid container spacing={3}>
                  
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="category">Add Category</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="category"
                      name="category"
                      value={inputs.category}
                      onChange={handleInputChange}
                      fullWidth
                      margin="dense"
                      type="text"
                      error={errorCat}
                      helperText={errorCat}
                      // label="Add Category"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel  className={classes.textsize} htmlFor="subcategory">Add Sub Category</InputLabel>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                      id="subcategory"
                      name="subcategory"
                      value={inputs.subcategory}
                      onChange={handleInputChange}
                      fullWidth
                      margin="dense"
                      type="text"
                      error={errorSubcat}
                      helperText={errorSubcat}
                      // label="Add Sub Category"
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={12}>
                    <Button variant="contained" color="primary" onClick={handleSubmit} className={classes.button} 
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
