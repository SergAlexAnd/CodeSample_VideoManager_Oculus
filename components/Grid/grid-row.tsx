import * as React from 'react';

export interface GridRowProps {
  className?: string;
  horizontalAlignment?: 'start' | 'center' | 'end' | 'spaceBetween';
  id?: string;
  style?: React.CSSProperties;
  verticalAlignment?: 'start' | 'center' | 'end';
}

export const GridRow: React.FunctionComponent<GridRowProps> = ({
  className,
  children,
  verticalAlignment,
  horizontalAlignment,
  id,
  style,
}) => (
  <div
    className={`
      grid-row ${className ?? ''} 
      grid-row-vertical-${verticalAlignment ?? ''} 
      grid-row-horizontal-${horizontalAlignment ?? ''}`}
    style={style}
    id={id}
  >
    {children}
  </div>
);
