import { Api } from '../../../api';
import { ThunkAction } from '../../../types/known-actions';
import { ServerVideo } from '../../../types/videos';
import { GenericWrapperReturnType } from '../../../types/warning';
import { WarningActions } from '../../warning/actions';
import { VideosPlainActions } from './plain';
import { CONFIG } from '../../../config';
import { getByUid } from '../../../utils/by-uid';
// eslint-disable-next-line import/no-cycle
import { DevicesActions } from '../../devices/actions';

export const getLocalVideos = (): ThunkAction<Promise<GenericWrapperReturnType<void>>> => async (dispatch) => {
  const res = await dispatch(
    WarningActions.wrappers.loadingData(async () => {
      const response = await Api.local.get();
      const byUid = getByUid(response.data ?? []);
      dispatch(VideosPlainActions.setState({ localList: response.data ?? [], localByUid: byUid }));
    })
  );
  return res;
};

export const importToLocal =
  (videoUid: string, importPreview: boolean): ThunkAction<Promise<ServerVideo>> =>
  async (dispatch, getState) => {
    const { token } = getState().auth;
    const res = await dispatch(
      WarningActions.wrappers.loadingData(async () => {
        const response = await Api.external.importToLocal(videoUid, token, importPreview);
        return response.data;
      })
    );
    return res.callbackResult;
  };

export const deleteFromLocal =
  (videoUid: string): ThunkAction<Promise<boolean>> =>
  async (dispatch) => {
    const res = await dispatch(
      WarningActions.wrappers.loadingData(async () => {
        const response = await Api.local.delete(videoUid);
        return response;
      })
    );
    dispatch(getLocalVideos()).catch(console.warn);
    await dispatch(DevicesActions.devices.get()).catch(console.warn);
    await dispatch(DevicesActions.devices.syncAllDevices()).catch(console.warn);
    dispatch(DevicesActions.player.clearSelectedDevices());
    dispatch(setSelectedVideo(null));
    return res.callbackResult;
  };

export const getVideo =
  (videoUid: string): ThunkAction<Promise<Blob>> =>
  async (dispatch) => {
    const res = await dispatch(
      WarningActions.wrappers.loadingData(async () => {
        const response = await Api.local.getByUid(videoUid);
        return response;
      })
    );
    return res.callbackResult;
  };

export const getDataUrl =
  (videoUid: string, type: 'movie' | 'cover' | 'preview'): ThunkAction<string> =>
  () => {
    return `${CONFIG.url}:${CONFIG.port}/api/local/videos/${videoUid}/${type === 'movie' ? '' : type}`;
  };

export const getPreview =
  (videoUid: string): ThunkAction<Promise<Blob>> =>
  async (dispatch) => {
    const res = await dispatch(
      WarningActions.wrappers.loadingData(async () => {
        const response = await Api.local.getPreview(videoUid);
        return response;
      })
    );
    return res.callbackResult;
  };

const setSelectedVideo =
  (videoUid: string | null): ThunkAction =>
  (dispatch) => {
    dispatch(VideosPlainActions.setState({ selectedVideo: videoUid }));
  };

export const localVideoActions = {
  get: getLocalVideos,
  import: importToLocal,
  delete: deleteFromLocal,
  getDataUrl,
  setSelectedVideo,
};
