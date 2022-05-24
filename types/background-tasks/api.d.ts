import { ApiResponse } from '../api';
import { VideoDownloadTask, VideoUploadTask } from './model';

export interface DownloadVideoTasksResponse extends ApiResponse<VideoDownloadTask[]> {
  count: number;
}

export interface UploadVideoTasksResponse extends ApiResponse<VideoUploadTask[]> {
  count: number;
}
