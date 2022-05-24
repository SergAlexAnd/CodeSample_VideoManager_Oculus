import { createAction } from 'redux-actions';

import { WARNING } from '../../../types/constants.d';
import { IWarningActions } from '../../../types/warning';

export const WarningPlainActions = {
  setIsDeletingData: createAction<IWarningActions['SetIsDeletingData']['payload']>(WARNING.SET_IS_DELETING_DATA),
  setIsLoadingData: createAction<IWarningActions['SetIsLoadingData']['payload']>(WARNING.SET_IS_LOADING_DATA),
  setIsUploadingFile: createAction<IWarningActions['SetIsUploadingFile']['payload']>(WARNING.SET_IS_UPLOADING_FILE),
  setIsSavingData: createAction<IWarningActions['SetIsSavingData']['payload']>(WARNING.SET_IS_SAVING_DATA),

  // alert: createAction<IWarningActions['Alert']['payload']>(WARNING.ALERT),
  // hideAlert: createAction<IWarningActions['HideAlert']['payload']>(WARNING.HIDE_ALERT),

  setSnackBarMessages: createAction<IWarningActions['SetSnackbarMessages']['payload']>(WARNING.SET_SNACKBAR_MESSAGES),
};
