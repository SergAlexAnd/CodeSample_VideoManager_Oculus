import { BACKGROUND_TASKS } from '../constants';
import { VideoDownloadTask, VideoUploadTask } from './model';
import { ActionCreator } from '../general-actions.d';

export interface BackgroundTasksState {
  videoDownload: VideoDownloadTask[];
  videoUpload: VideoUploadTask[];
}

export interface IBackgroundTasksActions {
  SetState: ActionCreator<BACKGROUND_TASKS.SET_STATE, Partial<BackgroundTasksState>>;
}
