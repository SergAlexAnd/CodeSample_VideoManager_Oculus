import { createAction } from 'redux-actions';

import { DEVICES } from '../../../types/constants.d';
import { IDevicesActions } from '../../../types/devices';

export const DevicesPlainActions = {
  setConfig: createAction<IDevicesActions['SetConfig']['payload']>(DEVICES.SET_CONFIG),
  setState: createAction<IDevicesActions['SetState']['payload']>(DEVICES.SET_STATE),
};
