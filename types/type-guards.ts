import { VideoDownloadTask, VideoUploadTask } from './background-tasks';

const isVideoUploadTask = (task: VideoUploadTask | VideoDownloadTask): task is VideoUploadTask => {
  return (task as VideoUploadTask)?.deviceUid !== undefined;
};

export const TypeGuards = {
  tasks: {
    isUpload: isVideoUploadTask,
  },
};
