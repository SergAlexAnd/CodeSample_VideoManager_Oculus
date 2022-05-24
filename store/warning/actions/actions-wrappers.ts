import { AxiosError } from 'axios';
import { Action, ActionFunction1 } from 'redux-actions';

import { ThunkAction } from '../../../types/known-actions';
import { GenericWrapperReturnType } from '../../../types/warning';
import { getErrorMessage } from '../../../utils/errors-handler';
// eslint-disable-next-line import/no-cycle
import { AuthActions } from '../../auth/actions';
import { WarningPlainActions } from './plain';
import { manageSnackBarStatus } from './snackbar';

const genericWrapper =
  (loadingAction: ActionFunction1<boolean, Action<boolean>>) =>
  <T = void>(
    cb: () => Promise<T>,
    errorCb?: (e: AxiosError) => void,
    options?: {
      showConflicts?: boolean;
      customDelay?: number;
      showLoading?: boolean; // ? show loading indicator ?
      showWarning?: boolean;
    }
  ): ThunkAction<Promise<GenericWrapperReturnType<T>>> =>
  async (dispatch) => {
    let status = true;
    let callbackResult;
    const invokeLoading = options?.showLoading ?? true;
    try {
      if (invokeLoading) dispatch(loadingAction(true));
      callbackResult = await cb();
    } catch (e) {
      const error = e as AxiosError;
      if (error.response?.status === 401) {
        dispatch(AuthActions.signOut());
      }
      console.warn(error);
      const errorMessage = getErrorMessage(error);
      if (!options || options.showWarning) dispatch(manageSnackBarStatus(errorMessage, 'error'));
      status = false;
      if (errorCb) errorCb(error);
    }
    setTimeout(() => dispatch(loadingAction(false)), options?.customDelay ?? 600);
    return { status, callbackResult: callbackResult as T };
  };

export const createUpdateWrapper = genericWrapper(WarningPlainActions.setIsSavingData);

export const loadingWrapper = genericWrapper(WarningPlainActions.setIsLoadingData);

export const uploadingWrapper = genericWrapper(WarningPlainActions.setIsUploadingFile);

export const deleteWrapper = genericWrapper(WarningPlainActions.setIsDeletingData);
