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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';

import RecentActorsIcon from '@material-ui/icons/RecentActors';
// API CALL
import ProfileAPI from '../../../api/Profile';
import Role from '../../../api/franchise/Role';
export default function Profile({roleName}) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [profileList, setProfileList] = useState({});

  const [role, setRole] = useState([]);  
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
      // fontSize: theme.typography.pxToRem(14),
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
        const result = await ProfileAPI.info();
        setProfileList(result.profile[0] || {});
        console.log('profile------',result.profile[0]);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);
  
  useEffect(() => {
  const roleData = async () => {
      
    try {
      const result = await Role.list();
      setRole(result.role);
    } catch (error) {
      console.log("Error",error);
    }
  };
  roleData();
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
        {profileList.role===2 || profileList.role==null?
            <Paper className={classes.paper} style={{ width: '40%' }}>
              <Typography variant="h6" className={classes.title}>
                {profileList.director}
              </Typography>
              <Typography  variant="h6" className={classes.typography}>
                <StoreIcon fontSize="small"/> {profileList.fname} <br/>
              </Typography>
              <Typography  variant="h6" className={classes.typography}>
                <RecentActorsIcon fontSize="small" /> Director <br/>
                </Typography>
              <Typography  variant="h6" className={classes.typography}>
                <BusinessIcon fontSize="small" /> {profileList.name} <br/>
              </Typography>
              <Typography  variant="h6" className={classes.typography}>
                <LocationCityIcon fontSize="small" /> {profileList.location} <br/>
              </Typography>
              <Typography  variant="h6" className={classes.typography}>
                <DescriptionIcon fontSize="small" /> {profileList.nbzn} <br/>
              </Typography>
              <Typography  variant="h6" className={classes.typography}>
                <EmailIcon fontSize="small" /> {profileList.email} <br/>
              </Typography>
              <Typography  variant="h6" className={classes.typography}>
                <CallIcon fontSize="small" /> {profileList.contact} <br/>
              </Typography>
              <Typography  variant="h6" className={classes.typography}>
                <CallIcon fontSize="small" /> {profileList.alt_contact===''? 'Not Available':profileList.alt_contact} <br/>
              </Typography>
            </Paper>:
            <Paper className={classes.paper} style={{ width: '40%' }}>
              <Typography variant="h6" className={classes.title}>
                  {profileList.first_name + ' ' + profileList.last_name} 
              </Typography>
              <Typography  variant="h6" className={classes.typography}>
                <AccountCircleIcon fontSize="small" /> {profileList.user_id} <br/>
              </Typography>
              <Typography  variant="h6" className={classes.typography}>
                <RecentActorsIcon fontSize="small" />
                { profileList.user_id.split('_')[1] === 'admin' ?
                    profileList.role
                  : ((profileList.role && profileList.role.split(',')) || []).map((a, index) =>{
                    // console.log("index",index);
                    return(
                      role.map((ele)=>{
                        return(
                          (profileList.role.split(',').length-1)===index ?
                          profileList.role.split(',')[index] == ele.id ? ele.name  :''
                          :
                          profileList.role.split(',')[index] == ele.id ? ele.name + ", " :''
                        )
                        })  
                    ) 
                    })
                  } <br/>
              </Typography>
              {/* <Typography  variant="h6" className={classes.typography}>
                <StoreIcon /> {profileList.fname} <br/>
              </Typography> */}
              <Typography  variant="h6" className={classes.typography}>
                <LocationCityIcon fontSize="small" /> {profileList.location} <br/>
              </Typography>
              <Typography  variant="h6" className={classes.typography}>
                <EmailIcon fontSize="small" /> {profileList.email} <br/>
              </Typography>
              <Typography  variant="h6" className={classes.typography}>
                <CallIcon fontSize="small" /> {profileList.contact} <br/>
              </Typography>
          </Paper>
        }
      </Grid>
    </div>
  );
}
