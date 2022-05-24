import { createAction } from 'redux-actions';

import { AUTH } from '../../../types/constants.d';
import { IAuthActions } from '../../../types/auth';

export const AuthPlainActions = {
  setState: createAction<IAuthActions['SetState']['payload']>(AUTH.SET_STATE),
  clearState: createAction<IAuthActions['ClearState']['payload']>(AUTH.CLEAR_STATE),
};
