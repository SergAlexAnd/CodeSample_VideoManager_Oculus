import { createAction } from 'redux-actions';

import { MODAL } from '../../types/constants';
import { IModalActions } from '../../types/modal';

export const ModalActions = {
  open: createAction<IModalActions['Open']['payload']>(MODAL.OPEN),
  close: createAction<IModalActions['Close']['payload']>(MODAL.CLOSE),
};
