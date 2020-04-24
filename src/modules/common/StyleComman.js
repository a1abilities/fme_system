import { makeStyles } from '@material-ui/core/styles';

export const useCommonStyles = makeStyles(theme => ({
  // root: {
  //   display: 'flex',
  //   flexGrow: 1,
  // },
  appBar: {
    position: 'relative',
    height: theme.spacing(5),
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    fontSize: theme.typography.pxToRem(14),
    color:"white",
    marginTop:theme.spacing(-3),
  },
   paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  button:{
    color:"white",
    fontSize: theme.typography.pxToRem(10),
    marginRight: theme.spacing(1),
  },
  adornmentText:{
      fontSize: theme.typography.pxToRem(12),
      backgroundColor: 'lightgray',
  },
  textsize:{
    fontSize: theme.typography.pxToRem(12),
  },
  highlightRow:{
    backgroundColor: "#CBF6BF",
    color: theme.palette.common.white,
  },
  expansionMargin:{
    marginRight: -50,
    marginLeft: -50,
  },
  // drawer: {
  //   width: drawerWidth,
  //   flexShrink: 0,
  // },
  // drawerPaper: {
  //   width: drawerWidth,
  // },
  // content: {
  //   flexGrow: 1,
  //   padding: theme.spacing(3),
  // },
  // toolbar: theme.mixins.toolbar,

  // paper: {
  //   padding: theme.spacing(2),
  //   textAlign: 'left',
  //   color: theme.palette.text.secondary,
  // },
  // table: {
  //   minWidth: 700,
  // },
  commentBoxButton:{    
    fontSize: theme.typography.pxToRem(10),
    marginRight: theme.spacing(1),
  },
  fab:{
    marginRight: theme.spacing(1),
    fontSize: 12
  },
  input: {
    display: 'none',
  },
  closeIcon: {
    marginTop:theme.spacing(-3),
    color: 'white', 
    fontSize: theme.typography.pxToRem(14),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginRight:theme.spacing(-1),
  },
}));

