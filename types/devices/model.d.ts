import { GeneralRecord } from '../general';
import { BatteryStatuses, PlayerStatuses, ConnectionStatuses } from '../../enums/enums';

export type CommunicationConfiguration = {
  port: number;
  limitNumberOfMessages: number;
  playerStateNameFrame: string;
  batteryStateNameFrame: string;
  connectedDeviceNameFrame: string;
  disconnectedDeviceNameFrame: string;
};

type StringOrNull = string | null;

export type Device = {
  name: StringOrNull;
  deviceName: StringOrNull;
  deviceModel: StringOrNull;
  operationSystem: StringOrNull;
  uniqueIdentifier: StringOrNull;
  serialNumber: StringOrNull;
};

export type BatteryState = {
  level: number;
  status: BatteryStatuses;
};

export type PlayerState = {
  currentPosition: number;
  duration: number;
  state: PlayerStatuses;
  videoUid: string;
};

export type DeviceParameters = {
  battery: BatteryState;
  connection: keyof typeof ConnectionStatuses;
  player: PlayerState;
};

export interface ServerDevice extends Device, GeneralRecord {
  videoUids: string[];
  isConnected: boolean;
  batteryState: BatteryState;
  playerState: PlayerState;
}

export type DeviceSettings = {
  name: string;
};

export type ServerDevicesByUid = Record<ServerDevice['uid'], ServerDevice>;

export type DeviceParametersByUid = Record<ServerDevice['uid'], DeviceParameters>;
