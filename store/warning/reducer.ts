/* eslint-disable no-param-reassign */
import { produce } from 'immer';

import { WARNING } from '../../types/constants.d';
import { WarningKnownActions } from '../../types/known-actions';
import { WarningState } from '../../types/warning';

export const initialState: WarningState = {
  snackbar: [],
  // alert: {
  //   text: 'text',
  //   title: 'title',
  //   okCallback: (): void => {},
  //   isVisible: false,
  // },

  loading: {
    isDeletingData: false,
    isLoadingData: true,
    isSavingData: false,
    isUploadingFile: false,
  },
};

export const reducer = (state = initialState, action: WarningKnownActions): WarningState =>
  produce(state, (draft) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case WARNING.SET_SNACKBAR_MESSAGES:
        draft.snackbar = action.payload;
        break;
      // case WARNING.ALERT:
      //   state.alert = action.payload;
      //   break;
      // case WARNING.HIDE_ALERT:
      //   state.alert = { ...initialState.alert };
      //   break;

      case WARNING.SET_IS_SAVING_DATA:
        draft.loading.isSavingData = action.payload;
        break;
      case WARNING.SET_IS_DELETING_DATA:
        draft.loading.isDeletingData = action.payload;
        break;
      case WARNING.SET_IS_LOADING_DATA:
        draft.loading.isLoadingData = action.payload;
        break;
      case WARNING.SET_IS_UPLOADING_FILE:
        draft.loading.isUploadingFile = action.payload;
        break;
    }
  });
