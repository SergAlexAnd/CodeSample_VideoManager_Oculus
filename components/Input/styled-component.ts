import styled from 'styled-components';
import { InputAdornment, TextField } from '@material-ui/core';

// const getLabelColor = (theme: ThemeObject, isError: boolean, isFocused = false) => {
//   if (isError) return theme.pallet.error;
//   return isFocused ? theme.pallet.primaryColor : theme.text.secondary;
// };

export const StyledTextField = styled(TextField).attrs((props: { error: boolean; $active: boolean }) => ({
  error: props.error,
  $active: props.$active,
}))`
  && {
    .MuiInputBase-input {
    }
    .MuiFormLabel-root {
      opacity: ${(props) => (props.disabled ? 0.5 : 1)};
    }
    .MuiInputLabel-outlined.MuiInputLabel-shrink {
      transform: translate(15px, -6px) scale(0.85);
    }
    .MuiFormLabel-root.Mui-focused {
    }
    .MuiSelect-icon {
      opacity: ${(props) => (props.disabled ? 0.5 : 1)};
    }
    .MuiPaper-root {
      background-color: transparent;
    }
  }
`;

export const StyledAdornment = styled(InputAdornment).attrs((props: { $error: boolean; $active: boolean }) => ({
  $error: props.$error,
  $active: props.$active,
}))`
  && {
  }
`;
