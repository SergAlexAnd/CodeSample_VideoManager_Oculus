import { ServerDevice } from '../devices';
import { EnumBackgroundTaskStatusItem, EnumVideoContentTypeItem } from '../enums';
import { ServerVideo } from '../videos';

export interface VideoDownloadTask {
  uid: string;
  created: string;
  state: EnumBackgroundTaskStatusItem['id'];
  priority: number; // for sorting
  videoUid: string;
  contentType: EnumVideoContentTypeItem['id'];
  video: ServerVideo;
}

export interface VideoUploadTask extends Omit<VideoDownloadTask, 'contentType'> {
  deviceUid: string;
  device: ServerDevice;
}
