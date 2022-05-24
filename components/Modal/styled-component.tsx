/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';

import styled from 'styled-components';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import { Theme } from '@mui/material';

export const StyledModal = styled((props: DialogProps & { $theme: Theme; $background: keyof Theme['palette']['background'] }) => (
  <Dialog {...props} />
))`
  & .MuiPaper-root.MuiDialog-paperWidthSm {
    background-color: ${(props) => props.$theme.palette.background[props.$background]};
    transition: all 0.25s !important;
  }
`;
