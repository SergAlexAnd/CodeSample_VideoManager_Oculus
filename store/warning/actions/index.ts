import { WarningPlainActions } from './plain';
import { createUpdateWrapper, deleteWrapper, loadingWrapper, uploadingWrapper } from './actions-wrappers';
import { manageSnackBarStatus } from './snackbar';

export const WarningActions = {
  loading: {
    isDeletingData: WarningPlainActions.setIsDeletingData,
    isLoadingData: WarningPlainActions.setIsLoadingData,
    isSavingData: WarningPlainActions.setIsSavingData,
    isUploadingFile: WarningPlainActions.setIsUploadingFile,
  },
  // alert: {
  //   show: WarningPlainActions.alert,
  //   hide: WarningPlainActions.hideAlert,
  // },
  showSnackBar: manageSnackBarStatus,
  wrappers: {
    loadingData: loadingWrapper,
    uploadingFile: uploadingWrapper,
    savingData: createUpdateWrapper,
    deletingData: deleteWrapper,
  },
};
