import { APP } from '../constants.d';
import { ActionCreator } from '../general-actions';

export enum AppLanguages {
  'en',
  'ru',
}

export type LanguageType = keyof typeof AppLanguages;

export interface AppState {
  networkStatus: 'online' | 'offline';
  theme: 'light' | 'dark';
  language?: LanguageType;
  authenticated: boolean;
}

// actions
export interface IAppActions {
  SetTheme: ActionCreator<APP.SET_THEME, AppState['theme']>;
  SetLanguage: ActionCreator<APP.SET_LANGUAGE, AppState['language']>;

  SetAuth: ActionCreator<APP.SET_AUTHENTICATED, AppState['authenticated']>;

  SetNetworkStatus: ActionCreator<APP.SET_NETWORK_STATUS, AppState['networkStatus']>;
}
