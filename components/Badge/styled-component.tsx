/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';

import styled from 'styled-components';
import Badge, { BadgeProps } from '@mui/material/Badge/Badge';
import { Theme } from '@mui/material';

// const getColor = (theme: ThemeObject, invisible?: boolean, color?: keyof ThemeObject['pallet']) => {
//   if (invisible) return 'transparent';
//   if (color) return theme.pallet[color];
//   return theme.active ?? theme.text.inverse;
// };

export const StyledBadge = styled(
  (
    props: BadgeProps & {
      $theme: Theme;
      // $color: keyof ThemeObject['pallet'];
      $size?: number;
      // $textColor?: keyof ThemeObject['pallet'];
    }
  ) => <Badge {...props} />
)`
  && {
    .MuiBadge-anchorOriginTopRightRectangle {
      transform: scale(${(props) => props.$size}) translate(40%, -40%);
    }
  }
`;

// background: ${(props) => (props.invisible ? 'transparent' : props.$theme.pallet[props.$color])};
// color: ${(props) => getColor(props.$theme, props.invisible, props.$textColor)};
