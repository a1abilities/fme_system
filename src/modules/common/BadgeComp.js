import React from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

export default function BadgeComp({count, label}) {

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      // width: 1000
    },
    drawer: {
      width: 240,
      flexShrink: 0,
    },
    drawerPaper: {
      width: 240,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
    title: {
      flexGrow: 1,
      fontSize: theme.typography.pxToRem(14),
      color:"white",
      marginTop:theme.spacing(-3),
    },
    button:{
      marginRight: theme.spacing(2),
      padding:theme.spacing(2),
      borderRadius: theme.spacing(7),
    },
    input: {
      display: 'none',
    },
    fab:{
      marginRight: theme.spacing(1),
      fontSize: 12,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    fonttransform:{
      textTransform:"initial",
      fontSize: theme.typography.pxToRem(13),
    },
    textsize:{
      fontSize: theme.typography.pxToRem(12),
      color: 'white',
    },
    badge: {
      padding: theme.spacing(0, 2),
    },
    customBadge: {
      backgroundColor: "#124982",
      color: "white"
    }
  }));
  
  const classes = useStyles();

  return (
    <Badge className={classes.badge} max={count} color="secondary" badgeContent={count}
    classes={{ badge: classes.customBadge }}>{label}</Badge>
  )
}