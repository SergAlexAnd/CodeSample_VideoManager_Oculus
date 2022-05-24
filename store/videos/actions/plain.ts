import { createAction } from 'redux-actions';

import { VIDEOS } from '../../../types/constants.d';
import { IVideoActions } from '../../../types/videos';

export const VideosPlainActions = {
  setState: createAction<IVideoActions['SetState']['payload']>(VIDEOS.SET_STATE),
};
