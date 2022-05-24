import * as React from 'react';

import Typography from '@mui/material/Typography/Typography';
import useTheme from '@mui/material/styles/useTheme';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import SyncIcon from '@mui/icons-material/Sync';
import IconButton from '@mui/material/IconButton/IconButton';

import { AddedDevice, Grid } from '../../components';
import { useDispatch, useSelector } from '../../store/store-config';
import { ModalActions } from '../../store/modal/actions';
import { DevicesActions } from '../../store/devices/actions';

export const DevicesTab: React.FunctionComponent = () => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const devices = useSelector((state) => state.devices.list);
  const availableDevices = useSelector((state) => state.devices.availableDevices);
  const searchState = useSelector((state) => state.devices.searchState);
  const selectedDevices = useSelector((state) => state.devices.selectedDevices);

  React.useEffect(() => {
    dispatch(DevicesActions.devices.get()).catch(console.warn);
  }, [availableDevices, searchState]);

  const { t } = useTranslation();

  return (
    <Grid.Column col={6} style={{ padding: 10 }} className="devices-tab">
      <Grid.Row style={{ justifyContent: 'space-between' }}>
        <Typography style={{ color: theme.palette.text.primary }} variant="h5">
          {t('T_DEVICES')}
        </Typography>
        <div style={{ display: 'flex' }}>
          <IconButton
            aria-label="search"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={async (): Promise<void> => {
              await dispatch(DevicesActions.devices.get());
              dispatch(DevicesActions.devices.syncAllDevices()).catch(console.warn);
            }}
          >
            <SyncIcon style={{ width: 20, height: 20 }} />
          </IconButton>
          <IconButton aria-label="settings" onClick={() => dispatch(ModalActions.open({ name: 'SearchDevice' }))}>
            <SearchIcon style={{ width: 20, height: 20 }} />
          </IconButton>
        </div>
      </Grid.Row>
      <div>
        {devices.map((d) => (
          <AddedDevice
            key={d.uid}
            disabled={!d.isConnected}
            checked={selectedDevices.includes(d.uid)}
            onCheck={(id) => dispatch(DevicesActions.player.setSelectedDevices(id))}
            data={d}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(ModalActions.open({ name: 'DeviceModal', params: { uid: d.uid } }));
            }}
            onRemove={(e) => {
              e.stopPropagation();
              dispatch(DevicesActions.devices.delete(d)).catch(console.warn);
            }}
          />
        ))}
      </div>
    </Grid.Column>
  );
};
