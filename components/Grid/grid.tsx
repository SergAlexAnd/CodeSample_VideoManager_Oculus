import * as React from 'react';

interface GridProps {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

export const Grid: React.FunctionComponent<GridProps> = ({ children, className, id, style }): React.ReactElement => (
  <div className={`grid ${className ?? ''}`} id={id} style={style}>
    {children}
  </div>
);
