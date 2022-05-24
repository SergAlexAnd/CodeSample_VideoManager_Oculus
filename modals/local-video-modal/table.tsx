import * as React from 'react';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';

import { ServerDevice } from '../../types/devices';
import { translate } from '../../utils/i18n/translate';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: translate('T_NAME'),
    width: 100,
    valueGetter: (v) => {
      const data = v.row as ServerDevice;
      return data.name ?? '-';
    },
  },
  { field: 'deviceName', headerName: translate('T_DESCRIPTION'), width: 150 },
  { field: 'uid', headerName: 'ID', width: 200 },
  // { field: 'serial', headerName: 'Serial', width: 200 },
];

type DevicesTableProps = {
  devices: ServerDevice[];
  setSelected: (d: string[]) => void;
  style?: React.CSSProperties;
};

export const DevicesTable: React.FC<DevicesTableProps> = ({ devices, setSelected, style = {} }) => {
  const { t } = useTranslation();
  return (
    <div style={{ height: 400, width: 400, ...style }}>
      <DataGrid
        style={{ fontSize: 12 }}
        rows={devices}
        onSelectionModelChange={(m) => {
          setSelected(m as string[]);
        }}
        columns={columns}
        getRowId={(d) => (d as unknown as ServerDevice).uid}
        checkboxSelection
        hideFooter
        localeText={{ noRowsLabel: t('T_NO_DEVICES') }}
      />
    </div>
  );
};
