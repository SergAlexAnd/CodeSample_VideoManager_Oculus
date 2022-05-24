import * as React from 'react';

import { Typography, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { uniqueId } from 'lodash';
import SyncIcon from '@mui/icons-material/Sync';
import IconButton from '@material-ui/core/IconButton/IconButton';

import { Grid, Modal, SearchedDevice } from '../../components';
import { useDispatch, useSelector } from '../../store/store-config';
import { DevicesActions } from '../../store/devices/actions';
import { DeviceSearchStatus } from '../../enums/devices';

export const SearchDeviceModal: React.FunctionComponent = () => {
  const modalName = useSelector((state) => state.modal.name);
  const isSearching = useSelector((state) => state.devices.searchState) === DeviceSearchStatus.searching;
  const devices = useSelector((state) => state.devices.availableDevices);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  React.useEffect(() => {
    dispatch(DevicesActions.search.start());
    return () => dispatch(DevicesActions.search.stop());
  }, []);

  return (
    <Modal open={modalName === 'SearchDevice'}>
      <Grid.Row verticalAlignment="center" style={{ justifyContent: 'space-between', width: 400 }}>
        <Typography variant="h3">{t('T_SEARCH_DEVICES')}</Typography>
        {isSearching && <CircularProgress size={20} />}
        <IconButton aria-label="settings" onClick={() => dispatch(DevicesActions.search.start())}>
          <SyncIcon color="success" style={{ width: 20, height: 20 }} />
        </IconButton>
      </Grid.Row>
      <div style={{ height: 350 }}>
        {devices.map((d) => {
          return (
            <SearchedDevice
              key={uniqueId()}
              data={d}
              onClick={() => {
                dispatch(DevicesActions.devices.import(d)).catch(console.warn);
              }}
            />
          );
        })}
      </div>
    </Modal>
  );
};
