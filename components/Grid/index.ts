import './style.scss';

import { Grid as DefaultGrid } from './grid';
import { GridRow } from './grid-row';
import { GridColumn } from './grid-column';

export const Grid = Object.assign(DefaultGrid, {
  Column: GridColumn,
  Row: GridRow,
});
