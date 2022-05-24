/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';

import { IconButton, useTheme } from '@mui/material';

import { StyledPopover } from './styled-component';
import { PopoverProps } from './types.d';

export const Popover: React.FunctionComponent<PopoverProps> = (props) => {
  const { children, anchor, style = {}, className = '' } = props;
  const theme = useTheme();

  const anchorRef = React.useRef(null);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton style={anchor.style ?? {}} ref={anchorRef} onClick={handleClick}>
        {anchor.component}
      </IconButton>
      <StyledPopover
        $theme={theme}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        {...props}
        style={style}
        className={className}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        {children}
      </StyledPopover>
    </div>
  );
};
