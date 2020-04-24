import React, { useState, useEffect } from 'react';
import {makeStyles} from '@material-ui/core/styles';

import { Title, EventTracker } from '@devexpress/dx-react-chart';
import { Chart, ArgumentAxis, ValueAxis, LineSeries, BarSeries,Tooltip as ChartTooltip } from "@devexpress/dx-react-chart-material-ui";

import Card from '@material-ui/core/Card';
import CardContent  from '@material-ui/core/CardContent';
import FormControl  from '@material-ui/core/FormControl';
import Select  from '@material-ui/core/Select';
import MenuItem  from '@material-ui/core/MenuItem';
import FormHelperText  from '@material-ui/core/FormHelperText';
import Typography  from '@material-ui/core/Typography';
import Grid  from '@material-ui/core/Grid';
import Paper  from '@material-ui/core/Paper';
import Divider  from '@material-ui/core/Divider';

 

// Component Call

//API Calls
import {Run} from '../../../../../api/Run';


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    width: '100%',
    // padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },

  labelTitle: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(16),
  },  
}));

export default function Panel2({roleName, roleId}) {
  const classes = useStyles();

  const [staff,setstaff]=useState([]);
  const [countdata,setcountdata]=useState([]);
  const [newamountdata,setnewamountdata]=useState([]);
  const [duration,setduration]=useState(30);
  const [rows,setrows] = useState([]);
  

  useEffect(() => {
    fetchRequiredData();
  },[duration]);

  const fetchRequiredData = async () => {
    try{
      let {data} = await Run('orderamount', {franchise:1,duration});
      setstaff(data);
      let result = await Run('ordercount', {franchise:1,duration});
      setcountdata(result.data);
      result = await Run('newamount', {franchise:1,duration});
      setnewamountdata(result.data);
      setrows(result.data);
    }catch(e){
      console.log("Error..", e);
    }
  }

  const changeDuration=(e)=>{
    setduration(e.target.value);
  }


  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12}  style={{textAlign:'center'}}>
            <FormControl>
              <Select value={duration} onChange={changeDuration} displayEmpty>
                <MenuItem value={7}>Last Week</MenuItem>
                <MenuItem value={30}>Last Month</MenuItem>
                <MenuItem value={365}>Last Year</MenuItem>
              </Select>
              <FormHelperText>Report Duration</FormHelperText>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Chart data={staff} height={220}> 
                  <ArgumentAxis showGrid />
                  <ValueAxis />
                  <EventTracker />
                  <ChartTooltip />      
                  <BarSeries valueField="totalreceived" argumentField="staffname" />
                </Chart>
                <Typography variant="h7">Amount receieved in Active Orders</Typography>
              </CardContent>
            </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Chart data={staff} height={220}>
                <ArgumentAxis showGrid />
                <ValueAxis />
                <EventTracker />
                <ChartTooltip />
                <BarSeries valueField="ordercount" argumentField="staffname" />
              </Chart>
              <Typography variant="h7">Active Orders</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Chart data={newamountdata} height={220}>
                <ArgumentAxis showGrid />
                <ValueAxis />
                <EventTracker />
                <ChartTooltip />      
                <BarSeries valueField="totalreceived" argumentField="staffname" />
              </Chart>
              <Typography variant="h7">Amount recieved in New Orders</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Chart data={countdata} height={220}>
                <ArgumentAxis showGrid />
                <ValueAxis />
                <EventTracker />
                <ChartTooltip />
                <BarSeries valueField="totalcount" argumentField="staffname" />      
              </Chart>
              <Typography variant="h7">New Orders</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  </div>
  );
}
