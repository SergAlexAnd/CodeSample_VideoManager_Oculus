/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { produce } from 'immer';

import { DeviceSearchStatus } from '../../enums/devices';
import { getDefaultCommunicationConfig } from '../../templates/devices';
import { DEVICES } from '../../types/constants';
import { DevicesState } from '../../types/devices/redux';
import { DevicesKnownActions } from '../../types/known-actions';

export const initialState: DevicesState = {
  availableDevices: [],
  configuration: getDefaultCommunicationConfig(),
  list: [],
  listByUid: {},
  parametersByUid: {},
  searchState: DeviceSearchStatus.stopped,
  selectedDevices: [],
  avaialbleVideos: [],
};

export const reducer = (state = initialState, action: DevicesKnownActions): DevicesState =>
  produce(state, (draft) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case DEVICES.SET_CONFIG:
        draft.configuration = action.payload;
        break;

      case DEVICES.SET_STATE:
        return { ...draft, ...action.payload };
    }
  });
