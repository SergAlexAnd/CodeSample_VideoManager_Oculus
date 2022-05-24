import { intersection } from 'lodash';

import { Api } from '../../../api';
import { ThunkAction } from '../../../types/known-actions';
import { ServerVideo } from '../../../types/videos';
// eslint-disable-next-line import/no-cycle
import { VideosActions } from '../../videos/actions';
import { DevicesPlainActions } from './plain';

const play =
  (deviceUids: string[]): ThunkAction<Promise<boolean>> =>
  async () => {
    const result = (await Api.devices.player.play(deviceUids)) ?? false;
    return result;
  };

const pause =
  (deviceUids: string[]): ThunkAction<Promise<boolean>> =>
  async () => {
    const result = (await Api.devices.player.pause(deviceUids)) ?? false;
    return result;
  };

const stop =
  (deviceUids: string[]): ThunkAction<Promise<boolean>> =>
  async () => {
    const result = (await Api.devices.player.stop(deviceUids)) ?? false;
    return result;
  };

const seek =
  (deviceUids: string[], position: number): ThunkAction<Promise<boolean>> =>
  async () => {
    const result = (await Api.devices.player.seek(deviceUids, position)) ?? false;
    return result;
  };

const prepare =
  (deviceUids: string[], videoUid: string): ThunkAction<Promise<boolean>> =>
  async () => {
    const result = (await Api.devices.player.prepare(deviceUids, videoUid)) ?? false;
    return result;
  };

const setSelectedDevices =
  (deviceUid: string): ThunkAction =>
  (dispatch, getState) => {
    let selected = [...getState().devices.selectedDevices];
    const isInList = selected.includes(deviceUid);

    if (isInList) {
      selected = selected.filter((uid) => uid !== deviceUid);
    } else {
      selected.push(deviceUid);
    }
    if (selected.length === 0) dispatch(VideosActions.local.setSelectedVideo(null));
    dispatch(DevicesPlainActions.setState({ selectedDevices: selected }));
  };

const clearSelectedDevices = (): ThunkAction => (dispatch) => {
  dispatch(VideosActions.local.setSelectedVideo(null));
  dispatch(DevicesPlainActions.setState({ selectedDevices: [] }));
};

const getVideosOnSelectedDevices = (): ThunkAction<ServerVideo[]> => (dispatch, getState) => {
  const selected = getState().devices.selectedDevices;
  const devices = getState().devices.list;
  const { localByUid } = getState().videos;
  const selectedDevices = devices.filter((d) => selected.includes(d.uid));
  const videoUids = selectedDevices.reduce((acc, d) => {
    if (acc.length === 0) acc.push(...d.videoUids);
    // eslint-disable-next-line no-param-reassign
    else acc = intersection(acc, d.videoUids);
    return acc;
  }, [] as string[]);
  const avaialbleVideos = videoUids.reduce((acc, uid) => {
    if (localByUid[uid]) acc.push(localByUid[uid]);
    return acc;
  }, [] as ServerVideo[]);
  return avaialbleVideos;
};

export const PlayerActions = {
  play,
  pause,
  seek,
  stop,
  prepare,
  setSelectedDevices,
  clearSelectedDevices,
  getVideosOnSelectedDevices,
};
