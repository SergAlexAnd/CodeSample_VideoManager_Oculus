import * as React from 'react';

import { IconButton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';

import { DeviceVideoItem, Grid, Modal, Input } from '../../components';
import { useDispatch, useSelector } from '../../store/store-config';
import { DevicesActions } from '../../store/devices/actions';
import { ServerVideo } from '../../types/videos';
import { DeviceParametersBlock } from '../../components/Device/components/device-statuses-block';
import { bytesConverter } from '../../utils/convert-bytes';

type DeviceModalParams = {
  uid: string;
};

export const DeviceModal: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const modalName = useSelector((state) => state.modal.name);
  const modalParams = useSelector((state) => state.modal.params) as DeviceModalParams;
  const devicesByUid = useSelector((state) => state.devices.listByUid);

  const device = devicesByUid[modalParams.uid];

  const [videos, setVideos] = React.useState<ServerVideo[]>([]);
  const [deleletion, setDeletion] = React.useState(false);
  const [name, setName] = React.useState(device.name);
  const [freeSpace, setFreeSpace] = React.useState(0);

  React.useEffect(() => {
    dispatch(DevicesActions.devices.getVideos(device.uid))
      .then((v) => setVideos(v))
      .catch(console.warn);
  }, [deleletion]);

  React.useEffect(() => {
    dispatch(DevicesActions.devices.settings.getFreeSpace(device))
      .then(setFreeSpace)
      .catch(() => {
        setTimeout(() => {
          dispatch(DevicesActions.devices.settings.getFreeSpace(device)).then(setFreeSpace).catch(console.warn);
        }, 500);
      });
  }, []);

  const inputRightIcon = () => {
    if (name !== device.name) {
      return (
        <IconButton
          onClick={() => {
            dispatch(DevicesActions.devices.settings.set(device, { name })).catch(console.warn);
          }}
        >
          <SaveIcon style={{ width: 20, height: 20 }} />
        </IconButton>
      );
    }
    return <EditIcon style={{ width: 20, height: 20 }} />;
  };

  return (
    <Modal open={modalName === 'DeviceModal'} style={{ overflow: 'hidden' }}>
      <Grid style={{ height: 550 }}>
        <Grid.Row verticalAlignment="center" style={{ justifyContent: 'space-between', width: 550, overflow: 'hidden' }}>
          <Input
            $hideBorderOnMouseOut
            $hideLabel
            placeholder={t('T_NAME')}
            name=""
            value={name}
            onChange={(e) => setName(e.target.value)}
            $inputStyle={{ fontWeight: 400, fontSize: '3rem', padding: 2 }}
            $rightIcon={inputRightIcon()}
          />
          <Grid.Column col={12} style={{ marginTop: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography style={{ fontSize: 12 }}>{device.deviceName}</Typography>
              <Typography style={{ fontSize: 8, textOverflow: 'ellipsis' }}>{`uid: ${device.uid}`}</Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography style={{ fontSize: 12, textOverflow: 'ellipsis' }}>{device.operationSystem}</Typography>
              <Typography style={{ fontSize: 12 }}>{device.serialNumber}</Typography>
            </div>
            <Typography noWrap>{device.uniqueIdentifier}</Typography>
          </Grid.Column>
          <DeviceParametersBlock uid={device.uid} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%', marginTop: 5 }}>
            <Typography>{`${t('T_FREE_SPACE')}: ${bytesConverter(freeSpace)}`}</Typography>
          </div>
        </Grid.Row>
        <Typography variant="h5" style={{ marginTop: 15 }}>
          {`${t('T_DEVICE_VIDEOS')}: `}
        </Typography>
        <div style={{ height: 350, overflow: 'auto', padding: 2 }}>
          {videos.map((v) => {
            return (
              <DeviceVideoItem
                key={v.uid + v.name}
                data={v}
                onClick={() => {}}
                onDelete={() => {
                  setDeletion(true);
                  dispatch(DevicesActions.devices.deleteVideoFromDevice(device.uid, v.uid)).catch(console.warn);
                  setTimeout(() => setDeletion(false), 500);
                }}
              />
            );
          })}
        </div>
      </Grid>
    </Modal>
  );
};
