/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';

import cn from 'classnames';
import { omit } from 'lodash';

import { StyledAdornment, StyledTextField } from './styled-component';
// import { useTheme } from '../Theme';
import { InputProps, InputKeyDownEvent } from './types.d';

/**
 * * DOCS
 *
 * ? variant - standard (hide borders), outlined, filled
 *
 * * Warnings
 * ! maxLength doesn't work with type="number"
 */

export const Input: React.FunctionComponent<InputProps> = (props) => {
  // const theme = useTheme();
  const {
    autoSelectInputContent,
    className = '',
    helperText = '',
    $hideBorder = false,
    $hideBorderOnMouseOut = false,
    $hideLabel,
    icon,
    $inputStyle,
    isError = false,
    label,
    maxLength,
    onKeyDown,
    onSubmit,
    $rightIcon,
    rows,
    rowsMax = 1,
    rowsMin = 1,
    size = 'medium',
    textAlign = 'left',
    value = '',
    variant = 'outlined',
  } = props;
  const [isFocused, setIsFocused] = React.useState(false);
  const [isHover, setIsHover] = React.useState(false);
  const isActive = isFocused || String(value ?? '').length > 0;

  const isBorderHidden = () => {
    if ($hideBorder) return true;
    if ($hideBorderOnMouseOut) {
      return !isHover && !isFocused;
    }
    return false;
  };

  const inputClassNames = cn({
    'square-input': true,
    [className]: true,
    [size]: true,
    multiline: !!rows && rows > 1,
    icon: !!icon,
    'no-border': isBorderHidden(),
  });

  const handleKeyDown = (e: InputKeyDownEvent) => {
    if (onKeyDown) onKeyDown(e as unknown as React.KeyboardEvent<HTMLInputElement>);
    if (e.key === 'Enter' && onSubmit) {
      onSubmit(e as unknown as React.FormEvent<HTMLInputElement>);
    }
  };

  return (
    <StyledTextField
      // $theme={theme}
      $active={isActive}
      {...omit(props, 'isError')}
      label={(icon || $hideLabel) && String(value ?? '').length > 0 ? undefined : label}
      error={isError}
      helperText={helperText}
      size="medium"
      variant={variant}
      color="primary"
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      // placeholder={hideLabel ? label : ''}
      onBlur={(e) => {
        setIsFocused(false);
        if (props.onBlur) props.onBlur(e);
      }}
      onFocus={(e) => {
        setIsFocused(true);
        if (autoSelectInputContent) e.target.select();
        if (props.onFocus) props.onFocus(e);
      }}
      className={inputClassNames}
      onKeyDown={handleKeyDown}
      value={value ?? ''}
      multiline={!!rows && rows > 1}
      InputLabelProps={{
        style: { textAlign },
        shrink: icon || $hideLabel ? false : undefined,
      }}
      InputProps={{
        // onKeyDown: handleKeyDown,
        rowsMin,
        rowsMax,
        startAdornment: icon && (
          <StyledAdornment $error={isError} $active={isActive} position="start">
            {icon}
          </StyledAdornment>
        ),
        endAdornment: $rightIcon && (
          <StyledAdornment $error={isError} $active={isActive} position="end">
            {$rightIcon}
          </StyledAdornment>
        ),
      }}
      // eslint-disable-next-line react/jsx-no-duplicate-props
      inputProps={{
        maxLength,
        style: { ...$inputStyle, textAlign },
      }}
    />
  );
};
