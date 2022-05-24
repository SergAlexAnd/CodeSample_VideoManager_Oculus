/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { produce } from 'immer';

import { MODAL } from '../../types/constants';
import { ModalKnownActions } from '../../types/known-actions';
import { ModalState } from '../../types/modal';

export const initialState: ModalState = {
  name: '',
  // params: '',
};

export const reducer = (state = initialState, action: ModalKnownActions): ModalState =>
  produce(state, (draft) => {
    switch (action.type) {
      case MODAL.OPEN:
        draft.name = action.payload.name;
        draft.params = action.payload.params;
        break;
      case MODAL.CLOSE:
        draft.name = '';
        draft.params = undefined;
        break;
      default:
        return state;
    }
  });
