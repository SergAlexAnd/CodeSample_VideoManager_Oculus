import * as React from 'react';

import { Card, CardContent, CardHeader, Checkbox, IconButton, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/InfoOutlined';

import { ServerDevice } from '../../types/devices';
import { Grid } from '../Grid';
import { DeviceParametersBlock } from './components/device-statuses-block';

type AddedDeviceProps = {
  data: ServerDevice;
  onRemove: (e: React.MouseEvent) => void;
  onClick: (e: React.MouseEvent) => void;
  checked: boolean;
  onCheck: (uid: string) => void;
  disabled: boolean;
};

export const AddedDevice: React.FunctionComponent<AddedDeviceProps> = ({
  data,
  onRemove,
  onClick,
  checked,
  disabled,
  onCheck,
}) => {
  return (
    <Card
      className="added-device-card"
      style={{ opacity: checked ? 0.8 : 1 }}
      onClick={() => {
        if (!disabled || checked) onCheck(data.uid);
      }}
    >
      <CardHeader
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              checked={checked}
              disabled={disabled}
              style={{ marginLeft: -12, pointerEvents: 'none' }}
              sx={{ '& .MuiSvgIcon-root': { fontSize: 22 } }}
              onChange={(e) => {
                e.stopPropagation();
                onCheck(data.uid);
              }}
            />
            <Typography style={{ fontSize: 15, fontWeight: 500 }}>{data.name ?? '-'}</Typography>
          </div>
        }
        titleTypographyProps={{ fontSize: 15 }}
        subheaderTypographyProps={{ fontSize: 13 }}
        subheader={data.deviceName}
        action={
          <div>
            <IconButton
              aria-label="settings"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(e);
              }}
            >
              <RemoveIcon style={{ width: 20, height: 20 }} />
            </IconButton>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onClick(e);
              }}
            >
              <InfoIcon style={{ width: 20, height: 20 }} />
            </IconButton>
          </div>
        }
      />
      <CardContent style={{ paddingTop: 0 }}>
        <Grid.Row>
          <Grid.Column col={12}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography style={{ fontSize: 12 }}>{data.serialNumber}</Typography>
            </div>
          </Grid.Column>
          <DeviceParametersBlock uid={data.uid} />
        </Grid.Row>
      </CardContent>
    </Card>
  );
};
