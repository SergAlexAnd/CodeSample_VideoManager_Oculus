import * as React from 'react';

import { Typography, useTheme, Theme } from '@mui/material';
import PlayIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import VideoUnknownIcon from '@mui/icons-material/QuestionMark';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import BatteryChargingIcon from '@mui/icons-material/BatteryCharging80';
import BatteryDischargingIcon from '@mui/icons-material/Battery50';
import BatteryUnknownIcon from '@mui/icons-material/BatteryUnknown';
import ConnectionIcon from '@mui/icons-material/Circle';
import ReadyIcon from '@mui/icons-material/CheckCircle';
import { useTranslation } from 'react-i18next';

import { ServerDevice } from '../../../types/devices';
import { Grid } from '../../Grid';
import { BatteryStatuses, ConnectionStatuses, PlayerStatuses } from '../../../enums/enums';
import { useSelector } from '../../../store/store-config';
import { getDuration } from '../../../utils/get-duration';
import './styles.scss';

const ICON_SIZE = 14;

const getBatteryIcon = (status: BatteryStatuses) => {
  const icon: React.ReactNode = {
    [BatteryStatuses.Unknown]: <BatteryUnknownIcon style={{ width: '16px', height: '16px' }} />,
    [BatteryStatuses.Charging]: <BatteryChargingIcon style={{ width: '16px', height: '16px' }} />,
    [BatteryStatuses.Discharging]: <BatteryDischargingIcon style={{ width: '16px', height: '16px' }} />,
    [BatteryStatuses.NotCharging]: <BatteryDischargingIcon style={{ width: '16px', height: '16px' }} />,
    [BatteryStatuses.Full]: <BatteryFullIcon style={{ width: '16px', height: '16px' }} />,
  }[status];
  return icon;
};

const getConnectionIcon = (status: keyof typeof ConnectionStatuses, theme: Theme) => {
  const icon: React.ReactNode = {
    connected: <ConnectionIcon style={{ width: '16px', height: '16px', color: theme.palette.success.light }} />,
    disconnected: <ConnectionIcon style={{ width: '16px', height: '16px', color: theme.palette.error.light }} />,
  }[status];
  return icon;
};

const getPlayerIcon = (status: PlayerStatuses) => {
  const icon: React.ReactNode = {
    [PlayerStatuses.Unknown]: <VideoUnknownIcon style={{ width: ICON_SIZE, height: ICON_SIZE }} />,
    [PlayerStatuses.Pause]: <PauseIcon style={{ width: ICON_SIZE, height: ICON_SIZE }} />,
    [PlayerStatuses.Play]: <PlayIcon style={{ width: ICON_SIZE, height: ICON_SIZE }} />,
    [PlayerStatuses.Stop]: <StopIcon style={{ width: ICON_SIZE, height: ICON_SIZE }} />,
    [PlayerStatuses.WaitForPlay]: <ReadyIcon style={{ width: ICON_SIZE, height: ICON_SIZE }} />,
  }[status];
  return icon;
};

type DeviceParametersProps = {
  uid: string;
};

export const DeviceParametersBlock: React.FunctionComponent<DeviceParametersProps> = ({ uid }): React.ReactElement => {
  const theme = useTheme();
  const { t } = useTranslation();

  const device: ServerDevice | undefined = useSelector((state) => state.devices.listByUid[uid]);
  if (!device) return null;
  const battery = device.batteryState;
  const connection: keyof typeof ConnectionStatuses = device.isConnected ? 'connected' : 'disconnected';
  const player = device.playerState;
  const duration = `${getDuration(player.currentPosition)} / ${getDuration(player.duration)}`;
  const batteryStatus = (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {getBatteryIcon(battery.status ?? BatteryStatuses.Unknown)}
      <Typography style={{ fontSize: 9 }}>{`${battery?.level ?? '-'} %`}</Typography>
    </div>
  );
  const connectionStatus = getConnectionIcon(connection, theme);
  const playerStatus = getPlayerIcon(player.state);

  return (
    <Grid.Row
      verticalAlignment="center"
      style={{ marginTop: 10, justifyContent: 'space-between' }}
      className="device-parameters-container"
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography style={{ fontSize: 10, marginRight: 5 }}>{`${t('T_PLAYER_STATUS')}: `}</Typography>
        <div>{playerStatus}</div>
        <Typography style={{ fontSize: 10, marginTop: 2, marginLeft: 5 }}>{duration}</Typography>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {batteryStatus} <div style={{ marginLeft: 10 }}>{connectionStatus}</div>
      </div>
    </Grid.Row>
  );
};
