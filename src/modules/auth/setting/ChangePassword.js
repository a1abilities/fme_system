import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContentWrapper from '../../common/MySnackbarContentWrapper';

// API CALL
import PasswordAPI from '../../../api/setting/Password';
import useSignUpForm from '../franchise/CustomHooks';

export default function ChangePassword({franchiseId, roleName}) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const drawerWidth = 240;
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
    title: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(5),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    fonttransform:{
      textTransform:"initial"
    },
    typography:{
      paddingTop: theme.spacing(3),
    },
    button:{
      color:"white",
      fontSize: theme.typography.pxToRem(10),
      marginTop: theme.spacing(2),
    },
    textsize:{
      fontSize: theme.typography.pxToRem(12),
    },
    margin:{
      fontSize: theme.typography.pxToRem(12),
      marginTop: theme.spacing(2),
    }
  }));
  const classes = useStyles();

  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  function handleSnackbarClick() {
    setSnackbarOpen(true);
  }
  
  function validate(values) {
    let errors = {};

    return errors;
  };
  
  
const RESET_VALUES = {
  current_password:'',
  new_password:'',
  confirm_password:'',
};

  const passwordAdd = async () => {

    if(inputs.new_password === inputs.confirm_password){
      // console.log('match');
      const response = await PasswordAPI.change({
        current_password: inputs.current_password,
        new_password: inputs.new_password,        
      });
      // console.log('pass respo', response);
      if(response.isChanged === 1){
        setSnackbarOpen(true);
      }else if (response.isChanged===0){
        alert('Existing password enterd wrong. ');
      } 
      handleReset(RESET_VALUES);
    }
    else{
      alert('Password not match.');
    }
  };

  const { inputs=null, handleInputChange, handleSubmit, handleReset, setInput, errors } = useSignUpForm(
    RESET_VALUES,
    passwordAdd,
    validate
  );

  return (
    <div>
      {/* {showFranchise ?  */}
      <Grid container spacing={3}>
        <Paper className={classes.paper} style={{ width: '30%' }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" className={classes.title}>
                Change Password 
            </Typography>
            <Grid item xs={12} sm={12}>
                <InputLabel className={classes.margin} htmlFor="current_password">Current Password*</InputLabel>
                <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                  id="current_password"
                  name="current_password"
                  // label="Current Password"
                  value={inputs.current_password}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  type="password"
                  // placeholder="Franchise Name"
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputLabel className={classes.margin} htmlFor="new_password">New Password*</InputLabel>
                <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                  margin="dense"
                  id="new_password"
                  name="new_password"
                  // label="New Password"
                  type="password"
                  value={inputs.new_password} 
                  onChange={handleInputChange}
                  required
                  fullWidth
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputLabel className={classes.margin} htmlFor="confirm_password">Confirm Password*</InputLabel>
                <TextField
                      InputProps={{
                        classes: {
                          input: classes.textsize,
                        },
                      }}
                  margin="dense"
                  id="confirm_password"
                  name="confirm_password"
                  // label="Confirm Password"
                  type="password"
                  value={inputs.confirm_password}
                  onChange={handleInputChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" color="primary" className={classes.button}  type="submit">
                  Change
                </Button>
              </Grid>
            </form>
        </Paper>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MySnackbarContentWrapper
          onClose={handleSnackbarClose}
          variant="success"
          message="Password Changed successfully!"
        />
      </Snackbar>
    </div>
  );
}
