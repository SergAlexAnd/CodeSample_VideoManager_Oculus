import React from 'react';

import { FilledTextFieldProps, OutlinedTextFieldProps, StandardTextFieldProps } from '@material-ui/core';

export interface InputProps extends Omit<StandardTextFieldProps | FilledTextFieldProps | OutlinedTextFieldProps, 'size'> {
  autoSelectInputContent?: boolean;
  className?: string;
  disabled?: boolean;
  helperText?: string;
  $hideBorder?: boolean;
  $hideBorderOnMouseOut?: boolean;
  $hideLabel?: boolean; // ! deprecated
  icon?: React.ReactNode;
  $inputStyle?: React.CSSProperties;
  isError?: boolean;
  label?: string;
  maxLength?: number;
  name: string;
  $rightIcon?: React.ReactNode;
  rowsMin?: number;
  shrink?: boolean;
  size?: 'small' | 'medium' | 'big';
  style?: React.CSSProperties;
  textAlign?: React.CSSProperties['textAlign'];
  value: React.InputHTMLAttributes<HTMLInputElement>['value'];
}

export type InputKeyDownEvent = {
  key: string;
};
