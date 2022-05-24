import { AnyAction, combineReducers } from 'redux';
import { createSelectorHook, createStoreHook, useDispatch as defaultUseDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { ApplicationState } from '../types/store';
import { reducer as appReducer } from './app/reducer';
import { reducer as authReducer } from './auth/reducer';
import { reducer as backgroundTasksReducer } from './background-tasks/reducer';
import { reducer as devicesReducer } from './devices/reducer';
import { reducer as enumsReducer } from './enums/reducer';
import { reducer as modalReducer } from './modal/reducer';
import { reducer as videoReducer } from './videos/reducer';
import { reducer as warningReducer } from './warning/reducer';
import { routerReducer } from './router/reducer';

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = combineReducers({
  app: appReducer,
  auth: authReducer,
  backgroundTasks: backgroundTasksReducer,
  devices: devicesReducer,
  enums: enumsReducer,
  modal: modalReducer,
  router: routerReducer,
  videos: videoReducer,
  warning: warningReducer,
});

// typed useSelector
export const useSelector = createSelectorHook<ApplicationState>();

export type AppDispatch = ThunkDispatch<ApplicationState, unknown, AnyAction>;

// typed useDispatch
export const useDispatch = (): AppDispatch => defaultUseDispatch<AppDispatch>();

export const useStore = createStoreHook<ApplicationState>();
