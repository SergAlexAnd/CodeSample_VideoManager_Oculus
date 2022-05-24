import { createAction } from 'redux-actions';

import { APP } from '../../../types/constants.d';
import { IAppActions } from '../../../types/app';

export const AppPlainActions = {
  setLanguage: createAction<IAppActions['SetLanguage']['payload']>(APP.SET_LANGUAGE),
  setTheme: createAction<IAppActions['SetTheme']['payload']>(APP.SET_THEME),
  setAuthenticated: createAction<IAppActions['SetAuth']['payload']>(APP.SET_AUTHENTICATED),
  setNetworkStatus: createAction<IAppActions['SetNetworkStatus']['payload']>(APP.SET_NETWORK_STATUS),
};
