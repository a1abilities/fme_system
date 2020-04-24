import { makeStyles, withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;
export const useStyles = makeStyles(theme => ({
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