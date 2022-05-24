import { BadgeProps as MUBadgeProps } from '@mui/material/Badge/Badge';

export interface BadgeProps extends Omit<MUBadgeProps, 'ref'> {
  className?: string;
  // color?: keyof ThemeObject['pallet'];
  size?: 'small' | 'medium' | 'big';
  styles?: React.CSSProperties;
  ref?: Ref<HTMLSpanElement> | Ref<HTMLDivElement>;
  // textColor?: keyof ThemeObject['pallet'];
}
