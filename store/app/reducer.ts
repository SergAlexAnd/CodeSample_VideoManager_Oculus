/* eslint-disable no-param-reassign */
import { produce } from 'immer';

import { AppKnownActions } from '../../types/known-actions.d';
import { AppState } from '../../types/app';
import { APP } from '../../types/constants.d';

export const initialState: AppState = {
  authenticated: false,
  language: 'ru',
  theme: 'light',
  networkStatus: 'online',
};

export const reducer = (state = initialState, action: AppKnownActions): AppState =>
  produce(state, (draft) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case APP.SET_LANGUAGE:
        draft.language = action.payload;
        break;

      case APP.SET_THEME:
        draft.theme = action.payload;
        break;

      case APP.SET_AUTHENTICATED:
        draft.authenticated = action.payload;
        break;

      case APP.SET_NETWORK_STATUS:
        draft.networkStatus = action.payload;
        break;
    }
  });
