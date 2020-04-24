import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Components
import MasterAdmin from './MasterAdmin';
import Admin from './Admin';
import CSR from './CSR';
import Finance from './Finance';
import Delivery from './Delivery';
import MasterStaff from './MasterStaff';
import SalesAndMarketing from './SalesAndMarketing';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    // flexGrow: 1,
  }
}));


export default function MainDashboard({roleName, roleId, handleLeadClick, handleTaskClick}) {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>      
       {roleName === "Super Admin" && <MasterAdmin roleName={roleName} roleId={roleId} handleLeadClick={handleLeadClick}  handleTaskClick={handleTaskClick}/>}
       {roleName === "Admin" && <Admin roleName={roleName} roleId={roleId} handleLeadClick={handleLeadClick}  handleTaskClick={handleTaskClick}/>}
       {roleName === "CSR" && <CSR roleName={roleName} roleId={roleId} handleLeadClick={handleLeadClick}  handleTaskClick={handleTaskClick}/>}
       {roleName === "Finance" && <Finance roleName={roleName} roleId={roleId} handleLeadClick={handleLeadClick}  handleTaskClick={handleTaskClick}/>}
       {roleName === "Delivery" && <Delivery roleName={roleName} roleId={roleId} handleLeadClick={handleLeadClick}  handleTaskClick={handleTaskClick}/>}
       {roleName === "S&M" && <SalesAndMarketing roleName={roleName} roleId={roleId} handleLeadClick={handleLeadClick}  handleTaskClick={handleTaskClick}/>}
       {roleId === 0 && <MasterStaff roleName={roleName} roleId={roleId} handleLeadClick={handleLeadClick}  handleTaskClick={handleTaskClick}/>}
    </div>
  );
}
