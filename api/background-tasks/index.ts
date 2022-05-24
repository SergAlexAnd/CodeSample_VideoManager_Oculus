import { DownloadVideoTasksResponse, UploadVideoTasksResponse } from '../../types/background-tasks';
import { baseFetch } from '../fetch';

const url = '/background-tasks';

export class BackgroundTasksApi {
  private getVideoDownloadTasks = async (): Promise<DownloadVideoTasksResponse> => {
    const result = await baseFetch().get<DownloadVideoTasksResponse>(`${url}/video-download`);
    return result.data;
  };

  private deleteVideoDownloadTask = async (uid: string): Promise<boolean> => {
    const result = await baseFetch().delete(`${url}/video-download/${uid}`);
    return result.status === 200;
  };

  downloadVideo = {
    get: this.getVideoDownloadTasks,
    delete: this.deleteVideoDownloadTask,
  };

  private getUploadVideoOnDeviceTasks = async (): Promise<UploadVideoTasksResponse> => {
    const result = await baseFetch().get<UploadVideoTasksResponse>(`${url}/upload-video-on-device`);
    return result.data;
  };

  private deleteVideoUploadTask = async (uid: string): Promise<boolean> => {
    const result = await baseFetch().delete(`${url}/upload-video-on-device/${uid}`);
    return result.status === 200;
  };

  uploadOnDevice = {
    get: this.getUploadVideoOnDeviceTasks,
    delete: this.deleteVideoUploadTask,
  };
}
