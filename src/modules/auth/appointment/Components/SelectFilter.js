import React, { useEffect } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from '@material-ui/core/Toolbar';

import clsx from 'clsx';
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles(theme => ({
  textsize:{
    fontSize: theme.typography.pxToRem(14),
    fontWeight: theme.typography.fontWeightBold,
  },
  labelTitle: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(20),
    color: theme.palette.text.secondary,
  },
  drpdwn:{
    fontSize: theme.typography.pxToRem(12),
  },
}));

export default function SelectFilter({franchiseList, roleList, inputs, handleInputChange, handleSubmit, errors}) {
  
  const classes = useStyles();    
  

  return (   
        <Grid container spacing={4}  direction="row" justify="center" alignItems="center">    
            <Grid item xs={12} sm={4}>
                <InputLabel  className={classes.textsize} htmlFor="franchise_id">Franchise List* </InputLabel>
                <Select
                    name="franchise_id"
                    onChange={handleInputChange}
                    value={inputs.franchise_id}
                    inputProps={{
                        name: 'franchise_id',
                        id: 'franchise_id',
                    }}
                    className={classes.drpdwn}
                    fullWidth
                    required
                    error={errors.franchise_id}
                      helperText={errors.franchise_id}
                >
                    
                    { ((franchiseList !== undefined && franchiseList!== "" && franchiseList.length > 0) ? franchiseList : []).map((data ) => {
                        return( <MenuItem className={classes.drpdwn} value = {data.id}> {data.name}</MenuItem> )
                      })
                    } 
                </Select>
            </Grid>        
            <Grid item xs={12} sm={4}>
                <InputLabel  className={classes.textsize} htmlFor="role_id">Role/Position *</InputLabel>
                <Select
                    name="role_id"
                    onChange={handleInputChange}
                    value={inputs.role_id}
                    inputProps={{
                        name: 'role_id',
                        id: 'role_id',
                    }}
                    className={classes.drpdwn}
                    fullWidth                    
                    required
                    error={errors.role_id}
                      helperText={errors.role_id}
                >
                  { ((roleList !== undefined && roleList!== "" && roleList.length > 0) ? roleList : []).map((data ) => {
                        return( <MenuItem className={classes.drpdwn} value = {data.id}>{data.name}</MenuItem> )
                      })
                    }                     
                </Select>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit} > Get Staff List</Button>
                
            </Grid> 
        </Grid>        
  )
}