import * as React from 'react';

import { SnackbarProvider } from 'notistack';
import { makeStyles } from '@material-ui/core';
import { useTheme } from '@mui/material';

export const SnackBarProvider: React.FunctionComponent = ({ children }) => {
  const vertical = 'top';
  const horizontal = 'right';
  const theme = useTheme();

  const useStyles = makeStyles({
    base: { fontSize: 35, fontFamily: 'Rubik' },
    variantSuccess: { backgroundColor: theme.palette.success.main },
    variantError: { backgroundColor: theme.palette.success.main },
    variantWarning: { backgroundColor: theme.palette.warning.main },
    variantInfo: { backgroundColor: theme.palette.info.main },
  });

  const classes = useStyles();

  return (
    <SnackbarProvider classes={classes} maxSnack={5} anchorOrigin={{ vertical, horizontal }}>
      {children}
    </SnackbarProvider>
  );
};
