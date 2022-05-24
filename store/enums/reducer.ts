/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { produce } from 'immer';

import { ENUMS } from '../../types/constants';
import { EnumsState } from '../../types/enums';
import { EnumsKnownActions } from '../../types/known-actions';

export const initialState: EnumsState = {
  access: [],
  batteryStatuses: [],
  playerStatuses: [],
};

export const reducer = (state = initialState, action: EnumsKnownActions): EnumsState =>
  produce(state, (draft) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case ENUMS.SET_STATE:
        return { ...draft, ...action.payload };
    }
  });
