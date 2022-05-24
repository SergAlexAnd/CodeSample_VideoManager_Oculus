import { ThunkAction } from '../../../types/known-actions';
import { SnackBarStatus } from '../../../types/warning';
import { genUuid } from '../../../utils/generate-uuid';
import { WarningPlainActions } from './plain';

export const manageSnackBarStatus =
  (text: string, status: SnackBarStatus): ThunkAction =>
  (dispatch, getState) => {
    const { snackbar } = getState().warning;
    const { setSnackBarMessages } = WarningPlainActions;
    const uuid = genUuid();
    dispatch(setSnackBarMessages([...snackbar, { text, status, uuid }]));

    const getFilteredMessages = () => {
      const { snackbar: fresh } = getState().warning;
      return fresh.filter((m) => m.uuid !== uuid);
    };
    setTimeout(() => dispatch(setSnackBarMessages(getFilteredMessages())), 1000);
  };
