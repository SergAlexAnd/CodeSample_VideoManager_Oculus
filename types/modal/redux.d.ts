import { MODAL } from '../constants';
import { ActionCreator } from '../general-actions.d';
import { ModalNames } from './model';

export interface ModalState {
  name: ModalNames;
  params?: unknown;
}

export interface IModalActions {
  Open: ActionCreator<MODAL.OPEN, { name: ModalState['name']; params?: unknown }>;
  Close: ActionCreator<MODAL.CLOSE, void>;
}
