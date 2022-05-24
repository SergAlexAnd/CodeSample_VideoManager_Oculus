import * as React from 'react';

export interface GridColumnProps {
  className?: string;
  col: number;
  horizontalAlignment?: 'start' | 'center' | 'end';
  id?: string;
  offset?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  ref?: React.RefObject<HTMLDivElement>;
  style?: React.CSSProperties;
  verticalAlignment?: 'start' | 'center' | 'end';
}

export const GridColumn: React.FunctionComponent<GridColumnProps> = ({
  children,
  className,
  col,
  horizontalAlignment,
  id,
  offset,
  ref,
  style,
  verticalAlignment,
}) => (
  <div
    className={`
    grid-column 
    grid-column-${col} 
    ${className ?? ''} 
    grid-column-vertical-${verticalAlignment ?? ''} 
    grid-column-horizontal-${horizontalAlignment ?? ''} 
    grid-column-offset-${offset ?? ''}`}
    style={style}
    id={id}
    ref={ref}
  >
    {children}
  </div>
);
