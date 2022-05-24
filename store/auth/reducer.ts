/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { produce } from 'immer';

import { AuthKnownActions } from '../../types/known-actions.d';
import { AUTH } from '../../types/constants.d';
import { AuthState } from '../../types/auth';
import { getAuthDefaultState } from '../../templates/auth';

export const initialState: AuthState = getAuthDefaultState();

export const reducer = (state = initialState, action: AuthKnownActions): AuthState =>
  produce(state, (draft) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case AUTH.SET_STATE:
        return { ...draft, ...action.payload };

      case AUTH.CLEAR_STATE:
        return getAuthDefaultState();
    }
  });
