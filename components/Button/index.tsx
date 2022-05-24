import * as React from 'react';

import { Button, ButtonProps, styled } from '@mui/material';

export const PrimaryButton: React.FunctionComponent<ButtonProps> = (props) => {
  const ColorButton = styled(Button)<ButtonProps>((buttonProps) => ({
    color: buttonProps.theme.palette.background.paper,
    // backgroundColor: purple[500],
    // '&:hover': {
    //   backgroundColor: purple[700],
    // },
  }));
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ColorButton {...props} />;
};
