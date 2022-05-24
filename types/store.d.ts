import { AppState } from './app';
import { AuthState } from './auth';
import { BackgroundTasksState } from './background-tasks';
import { DevicesState } from './devices';
import { EnumsState } from './enums';
import { ModalState } from './modal';
import { VideosState } from './videos';
import { WarningState } from './warning';

// The top-level state object
export interface ApplicationState {
  app: AppState;
  auth: AuthState;
  backgroundTasks: BackgroundTasksState;
  devices: DevicesState;
  enums: EnumsState;
  modal: ModalState;
  router: Reducer<RouterState<LocationState>, unknown>;
  videos: VideosState;
  warning: WarningState;
}
