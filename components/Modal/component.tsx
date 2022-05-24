/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';

import cn from 'classnames';
import { Typography, useTheme } from '@mui/material';

import { ModalProps } from './types.d';
import { StyledModal } from './styled-component';
import { useDispatch } from '../../store/store-config';
import { ModalActions } from '../../store/modal/actions';

export const Modal: React.FunctionComponent<ModalProps> = (props) => {
  const {
    title,
    children,
    hideBackdrop = false,
    horizontalAlignment = 'center',
    className = '',
    background,
    // onClose = () => {},
    // closeButton = false,
  } = props;
  const theme = useTheme();
  const dispatch = useDispatch();

  const modalClasses = cn({
    'square-modal': true,
    [`horizontal-align-${horizontalAlignment}`]: true,
    'hide-backdrop': hideBackdrop,
    [className]: true,
  });

  const titleClassNames = cn({
    'square-modal-title': true,
    [title?.align ?? 'center']: true,
  });

  const handleClose = () => {
    dispatch(ModalActions.close());
  };

  return (
    <StyledModal
      $theme={theme}
      {...props}
      onClose={handleClose}
      title={undefined}
      className={modalClasses}
      $background={background}
    >
      {/* {closeButton && (
        <IconButton color="gray50" onClick={handleClose} style={{ position: 'absolute', top: 15, right: 15 }}>
          <AiOutlineClose size={16} />
        </IconButton>
      )} */}
      {title ? (
        <div className={titleClassNames}>
          <Typography style={{ color: theme.palette.text.primary }}>{title.text}</Typography>
        </div>
      ) : null}
      {children}
    </StyledModal>
  );
};
