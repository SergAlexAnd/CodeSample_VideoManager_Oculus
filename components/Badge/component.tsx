/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';

import { useTheme } from '@mui/material';

import { StyledBadge } from './styled-component';
import { BadgeProps } from './types.d';

export const Badge: React.FunctionComponent<BadgeProps> = (props): React.ReactElement => {
  const { children, size = 'medium' } = props;
  const theme = useTheme();

  const badgeSize = {
    small: 0.7,
    medium: 0.85,
    big: 1,
  }[size];

  return (
    <StyledBadge $theme={theme} $size={badgeSize} {...props} color="error">
      {children}
    </StyledBadge>
  );
};
