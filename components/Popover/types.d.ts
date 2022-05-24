import * as React from 'react';

import { PopoverProps as MUPopoverProps } from '@material-ui/core';

export interface PopoverProps extends Omit<MUPopoverProps, 'open'> {
  anchor: {
    component: React.ReactNode;
    style?: React.CSSProperties;
  };
  className?: string;
  style?: React.CSSProperties;
}
