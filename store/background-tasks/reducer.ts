/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { produce } from 'immer';

import { BackgroundTasksKnownActions } from '../../types/known-actions.d';
import { BackgroundTasksState } from '../../types/background-tasks';
import { BACKGROUND_TASKS } from '../../types/constants.d';

export const initialState: BackgroundTasksState = {
  videoDownload: [],
  videoUpload: [],
};

export const reducer = (state = initialState, action: BackgroundTasksKnownActions): BackgroundTasksState =>
  produce(state, (draft) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case BACKGROUND_TASKS.SET_STATE:
        return { ...draft, ...action.payload };
    }
  });
