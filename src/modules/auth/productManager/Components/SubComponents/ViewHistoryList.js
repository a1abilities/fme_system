import React, {useState, useEffect} from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Typography from '@material-ui/core/Typography';


// Other Components
import {getFullDateTime} from '../../../../../utils/datetime.js';


const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
    fontSize: theme.typography.pxToRem(11),
  },
  msg: {
    display: 'inline',
    fontSize: theme.typography.pxToRem(13),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    // width: 1000
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
    fontSize: theme.typography.pxToRem(14),
    color:"white",
    marginTop:theme.spacing(-3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  padding: {
    padding: theme.spacing(0, 2),
  },
  fonttransform:{
    textTransform:"initial",
    fontSize: theme.typography.pxToRem(13),
  },
  button:{
    color:"white",
    fontSize: theme.typography.pxToRem(10),
    marginRight: theme.spacing(2),
    padding:theme.spacing(2),
    borderRadius: theme.spacing(7),
  },
  tbrow:{      
    marginTop:theme.spacing(10),
  },
  bgtaskpending:{
    backgroundColor:"yellow",
    padding: theme.spacing(1),
  },
  bgtaskoverdue:{
    backgroundColor:"red",
    padding: theme.spacing(1),
  },
  fab: {
    margin: theme.spacing(1),
  },
  textsize:{
    color:"white",
    fontSize: theme.typography.pxToRem(12),
  },
  drpdwn:{
    color: 'white',
    fontSize: theme.typography.pxToRem(13),
  },
  icon: {
    fill: 'white',
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
    color: 'white',
  }
}));


export default function ViewHistoryList({historyList}) {
  const classes = useStyles();

  const checkConditions = (data, isFirst) => {
    const conditions = [
      { id: 1, condition: (data.updated_status !== 1 && data.updated_status !== 2 && isFirst === true)},
      { id: 2, condition: (data.updated_status !== 1 && data.updated_status !== 2 && isFirst === false)},
      { id: 3, condition: (data.updated_status === 2 && isFirst === false)},
      { id: 4, condition: (data.updated_status === 2 && isFirst === true)},
      { id: 5, condition: (data.status === 1 && isFirst === true)},
    ];
    return conditions;
  }
  
  const handleChangeEventTitle = (data, condition) =>{
    if(condition.condition === true){
      return(
        <p>{
              condition.id === 5 ? 'Product ordered on ' + getFullDateTime(data.created_at)
            : (condition.id === 4 || condition.id === 3) ? 'Product delivered to customer on ' + getFullDateTime(data.record_modified_at)
            : (condition.id === 2 || condition.id === 1) ? 'Product is ' + (data.updated_status === 3 ? 'under repair' : data.updated_status === 4 ? 'replaced'  :
              data.updated_status === 5 ? 'faulty/with customer' : data.updated_status === 6 ? 'faulty/under repair' :'')
              + ' on ' + getFullDateTime(data.record_modified_at)
            : ''
        }</p>
      )
    }
  }


  return (
    <List className={classes.root}>
      {(historyList.length > 0 && historyList != "" ? historyList : []).map((data, index) => {
        let conditions = checkConditions(data, (historyList.length === index + 1) ? true : false);
        return(        
          conditions.map(condition => {
            if(condition.condition === true){
              return(
                <div>
                  <ListItem alignItems="flex-start">
                    <ListItemIcon> <PlayArrowIcon /> </ListItemIcon>           
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography className={classes.msg} color="textPrimary" >
                            { handleChangeEventTitle(data, condition) }
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </div>
              )
            }
          })
        )
      })}
    </List>
  )
}