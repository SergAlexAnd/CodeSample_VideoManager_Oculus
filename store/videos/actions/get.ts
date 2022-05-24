import { Api } from '../../../api';
import { ThunkAction } from '../../../types/known-actions';
import { GenericWrapperReturnType } from '../../../types/warning';
import { getByUid } from '../../../utils/by-uid';
import { WarningActions } from '../../warning/actions';
import { VideosPlainActions } from './plain';

export const getExternalVideos = (): ThunkAction<Promise<GenericWrapperReturnType<void>>> => async (dispatch, getState) => {
  const { token } = getState().auth;
  const res = await dispatch(
    WarningActions.wrappers.loadingData(async () => {
      const response = await Api.external.get(token);
      const videosByUid = getByUid(response.data ?? []);
      dispatch(VideosPlainActions.setState({ externalList: response.data ?? [], externalByUid: videosByUid }));
    })
  );
  return res;
};

export const getFile =
  (url: string, options?: { showWarning: boolean }): ThunkAction<Promise<Blob>> =>
  async (dispatch, getState) => {
    const { token } = getState().auth;
    const res = await dispatch(
      WarningActions.wrappers.loadingData(
        async () => {
          const response = await Api.external.getFile(url, token);
          return response;
        },
        undefined,
        { showWarning: options?.showWarning ?? true }
      )
    );
    return res.callbackResult;
  };
