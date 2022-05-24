import React = require('react');

import { createTheme } from '@mui/material';

import { useSelector } from '../../store/store-config';
import { getDesignTokens } from './theme';

export const useInitTheme = () => {
  const themeMode = useSelector((state) => state.app.theme);

  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(themeMode)), [themeMode]);

  return theme;
};
