import { makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    fabProgress: {
      color: green[10],
      position: 'absolute',
      top: 49,
      left: 2,
      zIndex: 0,
    }
  }));

export default useStyles
