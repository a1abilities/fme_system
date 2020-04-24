import React from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';

import Panel1 from './Components/Panel1';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  }
}));

export default function MasterStaff({roleName, roleId,  handleLeadClick, handleTaskClick}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Panel1 roleName={roleName} roleId={roleId}  handleLeadClick={handleLeadClick}  handleTaskClick={handleTaskClick} />
    </div>
  );
}
