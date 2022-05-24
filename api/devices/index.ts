import { ApiResponse } from '../../types/api';
import { Device, DeviceSettings } from '../../types/devices';
import { DevicesResponse } from '../../types/devices/api';
import { VideosResponse } from '../../types/videos';
import { baseFetch } from '../fetch';

const url = '/devices';

export class DevicesApi {
  get = async (): Promise<DevicesResponse['data']> => {
    const result = await baseFetch().get<DevicesResponse>(url);
    return result.data.data ?? [];
  };

  import = async (devices: Device[]): Promise<DevicesResponse> => {
    const result = await baseFetch().post<DevicesResponse, Device[]>(`${url}/import`, devices);
    return result.data;
  };

  delete = async (id: string): Promise<boolean> => {
    const result = await baseFetch().delete<ApiResponse>(`${url}/${id}`, null);
    return result.data.success;
  };

  getVideosByDevice = async (uid: string): Promise<VideosResponse['data']> => {
    const result = await baseFetch().get<VideosResponse>(`${url}/${uid}/videos`);
    return result.data.data ?? [];
  };

  syncVideos = async (uid: string): Promise<boolean> => {
    const result = await baseFetch().post(`${url}/${uid}/videos/sync`, undefined);
    return result.status === 200;
  };

  uploadVideoOnDevice = async (deviceUid: string, videoUid: string): Promise<boolean> => {
    const result = await baseFetch().put(`${url}/${deviceUid}/videos/${videoUid}`, undefined);
    return result.status === 200;
  };

  deleteVideoFromDevice = async (deviceUid: string, videoUid: string): Promise<boolean> => {
    const result = await baseFetch().delete<ApiResponse>(`${url}/${deviceUid}/videos/${videoUid}`, null);
    return result.data.success;
  };

  // ! player
  private play = async (deviceUids: string[]): Promise<boolean> => {
    const result = await baseFetch().post(`${url}/player/play`, { deviceUids });
    return result.status === 200;
  };

  private pause = async (deviceUids: string[]): Promise<boolean> => {
    const result = await baseFetch().post(`${url}/player/pause`, { deviceUids });
    return result.status === 200;
  };

  private stop = async (deviceUids: string[]): Promise<boolean> => {
    const result = await baseFetch().post(`${url}/player/stop`, { deviceUids });
    return result.status === 200;
  };

  private prepare = async (deviceUids: string[], videoUid: string): Promise<boolean> => {
    const result = await baseFetch().post(`${url}/player/prepare`, { deviceUids, videoUid });
    return result.status === 200;
  };

  private seek = async (deviceUids: string[], position: number): Promise<boolean> => {
    const result = await baseFetch().post(`${url}/player/seek`, { deviceUids, position });
    return result.status === 200;
  };

  player = {
    pause: this.pause,
    play: this.play,
    prepare: this.prepare,
    seek: this.seek,
    stop: this.stop,
  };
  // ! player

  // ! settings
  private getSettings = async (uid: string): Promise<DeviceSettings> => {
    const result = await baseFetch().get<DeviceSettings>(`${url}/${uid}/settings`);
    return result.data;
  };

  private setSettings = async (uid: string, settings: DeviceSettings): Promise<boolean> => {
    const result = await baseFetch().put<undefined, DeviceSettings>(`${url}/${uid}/settings`, settings);
    return result.status === 200;
  };

  private getFreeSpace = async (uid: string): Promise<{ availableFreeSpace: number }> => {
    const result = await baseFetch().get<ApiResponse<{ availableFreeSpace: number }>>(
      `${url}/${uid}/storage/available-free-space`
    );
    return result.data.data;
  };

  settings = {
    get: this.getSettings,
    set: this.setSettings,
    getFreeSpace: this.getFreeSpace,
  };
  // ! settings
}
