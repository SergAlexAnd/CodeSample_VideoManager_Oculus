import { cloneDeep } from 'lodash';

import { Api } from '../../../api';
import { VideoDownloadTask, VideoUploadTask } from '../../../types/background-tasks';
import { ThunkAction } from '../../../types/known-actions';
import { WarningActions } from '../../warning/actions';
import { BackgroundTasksPlainActions } from './plain';

export const getVideosBackgroundTasks = (): ThunkAction<Promise<void>> => async (dispatch) => {
  await dispatch(
    WarningActions.wrappers.loadingData(async () => {
      const videos = await Api.backgroundTasks.downloadVideo.get();
      dispatch(BackgroundTasksPlainActions.setState({ videoDownload: videos.data }));
    })
  );
};

export const deleteDownloadTask =
  (uid: string): ThunkAction<Promise<void>> =>
  async (dispatch) => {
    await dispatch(
      WarningActions.wrappers.deletingData(async () => {
        await Api.backgroundTasks.downloadVideo.delete(uid);
        await dispatch(getVideosBackgroundTasks());
      })
    );
  };

export const getUploadVideosBackgroundTasks = (): ThunkAction<Promise<void>> => async (dispatch) => {
  await dispatch(
    WarningActions.wrappers.loadingData(async () => {
      const videos = await Api.backgroundTasks.uploadOnDevice.get();
      dispatch(BackgroundTasksPlainActions.setState({ videoUpload: videos.data }));
    })
  );
};

export const deleteUploadTask =
  (uid: string): ThunkAction<Promise<void>> =>
  async (dispatch) => {
    await dispatch(
      WarningActions.wrappers.deletingData(async () => {
        await Api.backgroundTasks.uploadOnDevice.delete(uid);
        await dispatch(getUploadVideosBackgroundTasks());
      })
    );
  };

export const appendDownloadTasks =
  (task: VideoDownloadTask): ThunkAction =>
  (dispatch, getState) => {
    const tasks = cloneDeep(getState().backgroundTasks.videoDownload);
    const taskInListIndex = tasks.findIndex((t) => t.uid === task.uid);
    if (taskInListIndex > -1) {
      tasks[taskInListIndex] = task;
    } else {
      tasks.push(task);
    }
    dispatch(BackgroundTasksPlainActions.setState({ videoDownload: tasks }));
  };

export const appendUploadTasks =
  (task: VideoUploadTask): ThunkAction =>
  (dispatch, getState) => {
    const tasks = cloneDeep(getState().backgroundTasks.videoUpload);
    const taskInListIndex = tasks.findIndex((t) => t.uid === task.uid);
    if (taskInListIndex > -1) {
      tasks[taskInListIndex] = task;
    } else {
      tasks.push(task);
    }
    dispatch(BackgroundTasksPlainActions.setState({ videoUpload: tasks }));
  };

export const uploadTasksActions = {
  get: getUploadVideosBackgroundTasks,
  append: appendUploadTasks,
  delete: deleteUploadTask,
};

export const downloadTasksActions = {
  get: getVideosBackgroundTasks,
  append: appendDownloadTasks,
  delete: deleteDownloadTask,
};
