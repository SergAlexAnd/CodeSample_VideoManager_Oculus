import { searchActions } from './config';
import { devicesActions, availableDevicesActions } from './devices';
import { PlayerActions } from './player';

export const DevicesActions = {
  search: searchActions,
  devices: devicesActions,
  availableDevices: availableDevicesActions,
  player: PlayerActions,
};
