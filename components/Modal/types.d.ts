import { DialogProps } from '@material-ui/core/Dialog';
import { Theme } from '@mui/material';

export interface ModalProps extends Omit<DialogProps, 'title'> {
  title?: {
    text: string;
    align?: 'left' | 'center' | 'right';
    // textSize?: TitleProps['size'];
    // multiline?: TitleProps['multiline'];
    // maxWidth?: React.CSSProperties['maxWidth'];
  };
  hideBackdrop?: boolean;
  horizontalAlignment?: 'left' | 'center' | 'right';
  background?: keyof Theme['palette']['background'];
  closeButton?: boolean;
  onClose?: () => void;
}
