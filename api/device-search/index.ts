import { ApiResponse } from '../../types/api';
import { DeviceSearchStateResponse } from '../../types/devices';
import { baseFetch } from '../fetch';

const url = '/device-search';

export class DeviceSearchApi {
  getState = async (): Promise<DeviceSearchStateResponse> => {
    const result = await baseFetch().get<DeviceSearchStateResponse>(`${url}/state`);
    return result.data;
  };

  start = async (): Promise<boolean> => {
    const result = await baseFetch().post<ApiResponse, null>(`${url}/start`, null);
    return result.data.success;
  };

  stop = async (): Promise<boolean> => {
    const result = await baseFetch().post<ApiResponse, null>(`${url}/stop`, null);
    return result.data.success;
  };
}
