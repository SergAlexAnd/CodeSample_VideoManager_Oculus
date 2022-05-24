import { cloneDeep, setWith } from 'lodash';

import { Api } from '../../../api';
import { getDefaultDeviceParameters } from '../../../templates/devices';
import { Device, DeviceParameters, DeviceParametersByUid, DeviceSettings, ServerDevice } from '../../../types/devices';
import { ThunkAction } from '../../../types/known-actions';
import { ServerVideo } from '../../../types/videos';
import { getByUid } from '../../../utils/by-uid';
import { WarningActions } from '../../warning/actions';
import { DevicesPlainActions } from './plain';

// ! utils
const calculateParams = (devices: ServerDevice[], currentParameters: DeviceParametersByUid): DeviceParametersByUid => {
  const parametersByUid = devices.reduce((acc, d) => {
    if (currentParameters[d.uid]) setWith(acc, [d.uid], currentParameters[d.uid], Object);
    else setWith(acc, [d.uid], getDefaultDeviceParameters(), Object);
    return acc;
  }, {} as DeviceParametersByUid);
  return parametersByUid;
};
// ! utils

const getDevices = (): ThunkAction<Promise<ServerDevice[]>> => async (dispatch, getState) => {
  const params = getState().devices.parametersByUid;
  const res = await dispatch(
    WarningActions.wrappers.loadingData(async () => {
      const devices = await Api.devices.get();

      const byUid = getByUid(devices);
      const parametersByUid = calculateParams(devices, params);
      dispatch(DevicesPlainActions.setState({ list: devices, listByUid: byUid, parametersByUid }));
      return devices;
    })
  );
  return res.callbackResult;
};

// ! videos
const deleteVideoFromDevice =
  (deviceUid: string, videoUid: string): ThunkAction<Promise<boolean>> =>
  async (dispatch) => {
    const res = await dispatch(
      WarningActions.wrappers.deletingData(async () => {
        const response = await Api.devices.deleteVideoFromDevice(deviceUid, videoUid);
        return response;
      })
    );
    await dispatch(getDevices());
    await dispatch(getDeviceVideos(deviceUid));
    return res.callbackResult;
  };

const deleteVideoFromManyDevices =
  (videoUid: string, devicesUids: string[]): ThunkAction<Promise<boolean>> =>
  async (dispatch) => {
    const res = await dispatch(
      WarningActions.wrappers.deletingData(async () => {
        const response = await Api.videos.deleteManyFromDevices(videoUid, devicesUids);
        return response;
      })
    );
    await dispatch(getDevices());
    const proimises = devicesUids.map(async (uid) => {
      await dispatch(getDeviceVideos(uid));
    });
    await Promise.all(proimises);
    return res.callbackResult;
  };

const uploadVideoOnManyDevices =
  (videoUid: string, devicesUids: string[]): ThunkAction<Promise<boolean>> =>
  async (dispatch) => {
    const res = await dispatch(
      WarningActions.wrappers.deletingData(async () => {
        const response = await Api.videos.uploadManyToDevices(videoUid, devicesUids);
        return response;
      })
    );
    await dispatch(getDevices());
    const proimises = devicesUids.map(async (uid) => {
      await dispatch(getDeviceVideos(uid));
    });
    await Promise.all(proimises);
    return res.callbackResult;
  };

const getDeviceVideos =
  (deviceUid: string): ThunkAction<Promise<ServerVideo[]>> =>
  async (dispatch) => {
    const res = dispatch(
      WarningActions.wrappers.loadingData(async () => {
        await Api.devices.syncVideos(deviceUid).catch(console.warn);
        const response = await Api.devices.getVideosByDevice(deviceUid);
        return response;
      })
    );
    return (await res).callbackResult;
  };

const syncAllDevices = (): ThunkAction<Promise<boolean>> => async (dispatch, getState) => {
  const devicesUids = Object.keys(getState().devices.listByUid);
  const res = await dispatch(
    WarningActions.wrappers.loadingData(async () => {
      const promises = devicesUids.map(async (uid) => {
        await Api.devices.syncVideos(uid);
      });
      await Promise.all(promises);
      return true;
    })
  );
  return res.callbackResult;
};

const uploadVideoOnDevice =
  (device: ServerDevice, video: ServerVideo): ThunkAction<Promise<boolean>> =>
  async (dispatch) => {
    const res = dispatch(
      WarningActions.wrappers.loadingData(async () => {
        const response = await Api.devices.uploadVideoOnDevice(device.uid, video.uid);
        return response;
      })
    );
    return (await res).callbackResult;
  };

// ! videos

const importDevice =
  (device: Device): ThunkAction<Promise<ServerDevice[]>> =>
  async (dispatch) => {
    const res = dispatch(
      WarningActions.wrappers.savingData(async () => {
        const devicesRes = await Api.devices.import([device]);
        const devices = devicesRes.data ?? [];
        dispatch(DevicesPlainActions.setState({ list: devices }));
        return devices;
      })
    );
    return (await res).callbackResult;
  };

const deleteDevice =
  (device: ServerDevice): ThunkAction<Promise<boolean>> =>
  async (dispatch) => {
    const res = await dispatch(
      WarningActions.wrappers.deletingData(async () => {
        const response = await Api.devices.delete(device.uid);
        return response;
      })
    );
    await dispatch(getDevices());
    return res.callbackResult;
  };

const appendAvailableDevices =
  (device: Device): ThunkAction =>
  (dispatch, getState) => {
    const availableDevices = cloneDeep(getState().devices.availableDevices);
    const isDeviceAlreadyInList = availableDevices.find((d) => d.uniqueIdentifier === device.uniqueIdentifier);
    if (!isDeviceAlreadyInList) {
      availableDevices.push(device);
      dispatch(DevicesPlainActions.setState({ availableDevices }));
    }
  };

export const clearAvailableDevices = (): ThunkAction => (dispatch) => {
  dispatch(DevicesPlainActions.setState({ availableDevices: [] }));
};

const toggleDeviceConnection =
  (device: ServerDevice, status: DeviceParameters['connection']): ThunkAction =>
  (dispatch, getState) => {
    const params = cloneDeep(getState().devices.parametersByUid);
    const existedParams: DeviceParameters | undefined = params[device.uid];
    if (existedParams) {
      existedParams.connection = status;
    } else {
      setWith(params, [device.uid], getDefaultDeviceParameters({ connection: status }), Object);
    }
    dispatch(DevicesPlainActions.setState({ parametersByUid: params }));
  };

const setDeviceBatteryStatus =
  (deviceUid: ServerDevice['uid'], status: DeviceParameters['battery']): ThunkAction =>
  (dispatch, getState) => {
    const params = cloneDeep(getState().devices.parametersByUid);
    const existedParams: DeviceParameters | undefined = params[deviceUid];
    if (existedParams) {
      existedParams.battery = status;
    } else {
      setWith(params, [deviceUid], getDefaultDeviceParameters({ battery: status }), Object);
    }
    dispatch(DevicesPlainActions.setState({ parametersByUid: params }));
  };

const setDevicePlayerStatus =
  (deviceUid: ServerDevice['uid'], status: DeviceParameters['player']): ThunkAction =>
  (dispatch, getState) => {
    const params = cloneDeep(getState().devices.parametersByUid);
    const existedParams: DeviceParameters | undefined = params[deviceUid];
    if (existedParams) {
      existedParams.player = status;
    } else {
      setWith(params, [deviceUid], getDefaultDeviceParameters({ player: status }), Object);
    }
    dispatch(DevicesPlainActions.setState({ parametersByUid: params }));
  };

const isDeviceAlreadyImported =
  (device: Device): ThunkAction<boolean> =>
  (dispatch, getState) => {
    const devices = cloneDeep(getState().devices.list);
    return !!devices.find((d) => d.uniqueIdentifier === device.uniqueIdentifier);
  };

const getDeviceSettings =
  (device: ServerDevice): ThunkAction<Promise<void>> =>
  async () => {
    await Api.devices.settings.get(device.uid);
  };

const setDeviceSettings =
  (device: ServerDevice, settings: DeviceSettings): ThunkAction<Promise<void>> =>
  async (dispatch) => {
    await Api.devices.settings.set(device.uid, settings);
    await dispatch(getDevices());
  };

const getFreeSpace =
  (device: ServerDevice): ThunkAction<Promise<number>> =>
  async () => {
    return (await Api.devices.settings.getFreeSpace(device.uid))?.availableFreeSpace ?? 0;
  };

export const devicesActions = {
  get: getDevices,
  import: importDevice,
  delete: deleteDevice,
  getVideos: getDeviceVideos,
  uploadVideo: uploadVideoOnDevice,
  toggleConnection: toggleDeviceConnection,
  setDeviceBatteryStatus,
  setDevicePlayerStatus,
  deleteVideoFromDevice,
  syncAllDevices,
  settings: {
    get: getDeviceSettings,
    set: setDeviceSettings,
    getFreeSpace,
  },
  videos: {
    deleteFromManyDevices: deleteVideoFromManyDevices,
    uploadOnManyDevices: uploadVideoOnManyDevices,
  },
};

export const availableDevicesActions = {
  append: appendAvailableDevices,
  clear: clearAvailableDevices,
  isAlreadyImported: isDeviceAlreadyImported,
};
