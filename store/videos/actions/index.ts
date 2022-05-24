import { getFile, getExternalVideos } from './get';
import { localVideoActions } from './local';

export const VideosActions = {
  external: {
    getVideos: getExternalVideos,
    getFile,
  },
  local: localVideoActions,
};
