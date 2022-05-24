import * as React from 'react';

import styled from 'styled-components';
import Popover, { PopoverProps } from '@material-ui/core/Popover';
import { Theme } from '@mui/material';

export const StyledPopover = styled((props: PopoverProps & { $theme: Theme }) => (
  <Popover
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
))`
  .MuiPaper-root {
    padding: 10px;
    background-color: ${(props) => props.$theme.palette.background.default};
  }
`;

// box-shadow: 0px 5px 15px 0px ${(props) => props.$theme.palette.background.paper};
// -webkit-box-shadow: 0px 5px 15px 0px ${(props) => props.$theme.palette.background.paper};
// -moz-box-shadow: 0px 5px 15px 0px ${(props) => props.$theme.palette.background.paper};
