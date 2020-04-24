import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { APP_TOKEN } from '../../../api/Constants';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import HomeIcon from '@material-ui/icons/Home';
import StoreIcon from '@material-ui/icons/Store';
import BusinessIcon from '@material-ui/icons/Business';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import DescriptionIcon from '@material-ui/icons/Description';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// API CALL
import Profile from '../../../api/Profile';
export default function FranchiseDetail({roleName}) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [franchiseDetails, setFranchiseDetails] = useState({});
  const [directorDetails, setDirectorDetails] = useState({});
  const uid = APP_TOKEN.get().userId;
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
      fontSize: theme.typography.pxToRem(12),
    }
  }));
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await Profile.franchiseDetails();
        setFranchiseDetails(result.fd[0]);
        setDirectorDetails(result.fd);
        console.log('profile------',result.fd);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);
  function handleClickOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  function handleSnackbarClick() {
    setSnackbarOpen(true);
  }
  return (
    <div>
      {/* {showFranchise ?  */}
      <Grid container spacing={3}>
            <Paper className={classes.paper} style={{ width: '40%' }}>
              <Typography variant="h6" className={classes.title}>
                {franchiseDetails.franchise_name}
              </Typography>
              <Typography  variant="h6" className={classes.typography}>
                <StoreIcon fontSize="small" /> {franchiseDetails.franchise_city} <br/>
              </Typography>
              <Typography  variant="h6" className={classes.typography}>
                <BusinessIcon fontSize="small" /> {franchiseDetails.suburb} <br/>
              </Typography>
              <Typography  variant="h6" className={classes.typography}>
                <LocationCityIcon fontSize="small" /> {franchiseDetails.company_name} <br/>
              </Typography>
              <Typography  variant="h6" className={classes.typography}>
                <DescriptionIcon fontSize="small" /> {franchiseDetails.company_location} <br/>
              </Typography>
              <Typography  variant="h6" className={classes.typography}>
                <EmailIcon fontSize="small" /> {franchiseDetails.nbzn}<br/>
              </Typography>
              <Typography  variant="h5" className={classes.typography}>
                  Director Details <br/>
              </Typography>
              { (directorDetails.length > 0 ? directorDetails : []).map((data, index)=>{
                return(
                  <Grid sm={12}>
                    
                    <Typography  variant="h6" className={classes.typography}>
                      <AccountCircleIcon fontSize="small" /> {data.director+'   ' +'   ' } 
                      <EmailIcon fontSize="small" /> {'   ' +data.email+'   '+'   '  }
                       <CallIcon fontSize="small" /> {'   ' +data.contact+'   '+'   '  }
                      {data.alt_contact? <CallIcon fontSize="small" />: ''} {'   ' +data.alt_contact }
                    </Typography>
                  </Grid>
                  )})
              }
            </Paper>
      </Grid>
    </div>
  );
}
