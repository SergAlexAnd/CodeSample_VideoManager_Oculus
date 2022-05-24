import { VideoDownloadTask, VideoUploadTask } from '../../types/background-tasks';

export type TaskItemProps = {
  data: VideoDownloadTask | VideoUploadTask;
  onClose: () => void;
};
