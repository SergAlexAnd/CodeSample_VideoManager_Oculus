import { DEVICES } from '../constants';
import { CommunicationConfiguration, Device, DeviceParametersByUid, ServerDevice, ServerDevicesByUid } from './model';
import { ActionCreator } from '../general-actions.d';
import { DeviceSearchStatus } from '../../enums/devices';

export interface DevicesState {
  availableDevices: Device[];
  configuration: CommunicationConfiguration;
  list: ServerDevice[];
  listByUid: ServerDevicesByUid;
  parametersByUid: DeviceParametersByUid;
  searchState: DeviceSearchStatus;
  selectedDevices: string[];
  avaialbleVideos: string[];
}

export interface IDevicesActions {
  SetState: ActionCreator<DEVICES.SET_STATE, Partial<DevicesState>>;
  SetConfig: ActionCreator<DEVICES.SET_CONFIG, DevicesState['configuration']>;
}
