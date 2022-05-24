import * as React from 'react';

import { Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import PlusIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';

import { Device } from '../../types/devices';
import { Grid } from '../Grid';
import { DevicesActions } from '../../store/devices/actions';
import { useDispatch, useSelector } from '../../store/store-config';

type SearchDeviceProps = {
  data: Device;
  onClick: () => void;
};

export const SearchedDevice: React.FunctionComponent<SearchDeviceProps> = ({ data, onClick }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [alreadyAdded, setAlreadyAdded] = React.useState(false);

  const devices = useSelector((state) => state.devices.list);

  React.useEffect(() => {
    const isAdded = dispatch(DevicesActions.availableDevices.isAlreadyImported(data));
    setAlreadyAdded(isAdded);
  }, [devices]);

  return (
    <Card className="searched-device-card">
      <CardHeader
        title={`${data.name} ${alreadyAdded ? t('T_DEVICE_ALREADY_IMPORTED') : ''}`}
        subheader={data.deviceModel}
        action={
          !alreadyAdded && (
            <IconButton aria-label="settings" onClick={onClick}>
              <PlusIcon color="success" style={{ width: 20, height: 20 }} />
            </IconButton>
          )
        }
      />
      <CardContent>
        <Grid.Row>
          <Grid.Column col={7}>
            <Typography>{data.deviceName}</Typography>
            <Typography>{data.operationSystem}</Typography>
          </Grid.Column>
          <Grid.Column col={4}>
            <Typography>{data.serialNumber}</Typography>
            <Typography noWrap>{data.uniqueIdentifier}</Typography>
          </Grid.Column>
        </Grid.Row>
      </CardContent>
    </Card>
  );
};
