/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { produce } from 'immer';

import { VIDEOS } from '../../types/constants';
import { VideoKnownActions } from '../../types/known-actions';
import { VideosState } from '../../types/videos';

export const initialState: VideosState = {
  externalList: [],
  externalByUid: {},
  localList: [],
  localByUid: {},
  selectedVideo: null,
};

export const reducer = (state = initialState, action: VideoKnownActions): VideosState =>
  produce(state, (draft) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case VIDEOS.SET_STATE:
        return { ...draft, ...action.payload };
    }
  });
