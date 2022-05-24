import { ApiResponse } from '../api';
import { CommunicationConfiguration, ServerDevice } from './model';

export type ConfigResponse = ApiResponse<CommunicationConfiguration>;

export type DeviceSearchStateResponse = ApiResponse<boolean>;

export interface DevicesResponse extends ApiResponse<ServerDevice[]> {
  count: number;
}

export type DeleteDeviceResponse = ApiResponse<boolean>;
