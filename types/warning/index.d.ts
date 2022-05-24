import { ReactElement } from 'react';

import { VariantType } from 'notistack';

import { WARNING } from '../constants.d';
import { ActionCreator } from '../general-actions.d';

export type SnackBarStatus = VariantType;

export interface GenericWrapperReturnType<T = void> {
  callbackResult: T;
  status: boolean;
}

type AlertObj = {
  cancelCallback?: () => void;
  cancelColor?: keyof ThemeObject['pallet'];
  cancelText?: string;
  hideCancelButton?: boolean;
  checkHint?: string;
  checkWord?: string;
  children?: ReactElement;
  customButtonAction?: () => void;
  customButtonText?: string;
  isVisible: boolean;
  okCallback: () => void;
  okColor?: keyof ThemeObject['pallet'];
  okText?: string;
  text: string;
  title: string;
};

type SnackBarObj = {
  text: string;
  status: SnackBarStatus;
  uuid: string;
};

export interface WarningState {
  // alert: AlertObj;
  snackbar: SnackBarObj[];

  loading: {
    isDeletingData: boolean;
    isLoadingData: boolean;
    isSavingData: boolean;
    isUploadingFile: boolean;
  };
}

export interface IWarningActions {
  // Alert: ActionCreator<WARNING.ALERT, WarningState['alert']>;
  // HideAlert: ActionCreator<WARNING.HIDE_ALERT, void>;
  SetSnackbarMessages: ActionCreator<WARNING.SET_SNACKBAR_MESSAGES, WarningState['snackbar']>;

  SetIsDeletingData: ActionCreator<WARNING.SET_IS_DELETING_DATA, WarningState['loading']['isDeletingData']>;
  SetIsLoadingData: ActionCreator<WARNING.SET_IS_LOADING_DATA, WarningState['loading']['isLoadingData']>;
  SetIsSavingData: ActionCreator<WARNING.SET_IS_SAVING_DATA, WarningState['loading']['isSavingData']>;
  SetIsUploadingFile: ActionCreator<WARNING.SET_IS_UPLOADING_FILE, WarningState['loading']['isUploadingFile']>;
}
