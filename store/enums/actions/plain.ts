import { createAction } from 'redux-actions';

import { ENUMS } from '../../../types/constants.d';
import { IEnumsActions } from '../../../types/enums';

export const EnumsPlainActions = {
  setState: createAction<IEnumsActions['SetState']['payload']>(ENUMS.SET_STATE),
};
