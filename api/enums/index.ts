import {
  AccessStatusesResponse,
  BackgroundTasksStatusesResponse,
  BatteryStatusesResponse,
  PlayerStatusesResponse,
  VideoContentTypesResponse,
} from '../../types/enums';
import { baseFetch } from '../fetch';

const url = '/enums';

export class EnumsApi {
  getAccessStatuses = async (): Promise<AccessStatusesResponse> => {
    const result = await baseFetch().get<AccessStatusesResponse>(`${url}/access`);
    return result.data;
  };

  getBatteryStatuses = async (): Promise<BatteryStatusesResponse> => {
    const result = await baseFetch().get<BatteryStatusesResponse>(`${url}/battery-statuses`);
    return result.data;
  };

  getPlayerStatuses = async (): Promise<PlayerStatusesResponse> => {
    const result = await baseFetch().get<PlayerStatusesResponse>(`${url}/player-states`);
    return result.data;
  };

  getBackgroundTasksStatuses = async (): Promise<BackgroundTasksStatusesResponse> => {
    const result = await baseFetch().get<BackgroundTasksStatusesResponse>(`${url}/background-task-statuses`);
    return result.data;
  };

  getVideoContentTypes = async (): Promise<VideoContentTypesResponse> => {
    const result = await baseFetch().get<VideoContentTypesResponse>(`${url}/video-content-types`);
    return result.data;
  };
}
