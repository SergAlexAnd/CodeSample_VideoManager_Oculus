import { Action } from 'redux';
import { ThunkAction as DefaultThunkAction } from 'redux-thunk';

import { IAppActions } from './app';
import { IAuthActions } from './auth';
import { IBackgroundTasksActions } from './background-tasks';
import { IDevicesActions } from './devices/redux';
import { IEnumsActions } from './enums';
import { IModalActions } from './modal';
import { ApplicationState } from './store.d';
import { IVideoActions } from './videos';
import { IWarningActions } from './warning';

// general actions types
export type ThunkAction<ReturnType = void> = DefaultThunkAction<ReturnType, ApplicationState, unknown, Action<string>>;

// known actions

export type AppKnownActions = IAppActions[keyof IAppActions];

export type AuthKnownActions = IAuthActions[keyof IAuthActions];

export type BackgroundTasksKnownActions = IBackgroundTasksActions[keyof IBackgroundTasksActions];

export type DevicesKnownActions = IDevicesActions[keyof IDevicesActions];

export type EnumsKnownActions = IEnumsActions[keyof IEnumsActions];

export type ModalKnownActions = IModalActions[keyof IModalActions];

export type VideoKnownActions = IVideoActions[keyof IVideoActions];

export type WarningKnownActions = IWarningActions[keyof IWarningActions];
