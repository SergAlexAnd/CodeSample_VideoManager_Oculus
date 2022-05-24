import { createAction } from 'redux-actions';

import { IBackgroundTasksActions } from '../../../types/background-tasks';
import { BACKGROUND_TASKS } from '../../../types/constants.d';

export const BackgroundTasksPlainActions = {
  setState: createAction<IBackgroundTasksActions['SetState']['payload']>(BACKGROUND_TASKS.SET_STATE),
};
