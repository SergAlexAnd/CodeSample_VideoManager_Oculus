import { BatteryStatuses, PlayerStatuses } from '../../enums/enums';
import { CommunicationConfiguration, DeviceParameters } from '../../types/devices';

export const getDefaultCommunicationConfig = (): CommunicationConfiguration => ({
  port: 12346,
  limitNumberOfMessages: 10000,
  playerStateNameFrame: 'headsets/player/state/',
  batteryStateNameFrame: 'headsets/battery/state/',
  connectedDeviceNameFrame: 'headsets/connected/',
  disconnectedDeviceNameFrame: 'headsets/disconnected/',
});

export const getDefaultDeviceParameters = (params: Partial<DeviceParameters> = {}): DeviceParameters => ({
  battery: {
    level: 0,
    status: BatteryStatuses.Unknown,
  },
  connection: 'disconnected',
  player: {
    duration: 0,
    state: PlayerStatuses.Unknown,
    currentPosition: 0,
    videoUid: '',
  },
  ...params,
});
