import * as moment from 'moment';

import { store } from '../store';
import { AppActions } from '../store/app/actions';
import { BackgroundTasksActions } from '../store/background-tasks/actions';
import { DevicesActions } from '../store/devices/actions';
import { AppDispatch } from '../store/store-config';
import { VideosActions } from '../store/videos/actions';
import { VideoDownloadTask, VideoUploadTask } from '../types/background-tasks';
import { BatteryState, Device, PlayerState, ServerDevice } from '../types/devices';

const dispatch = store.dispatch as AppDispatch;

const signalRLogger = (logMessage: string, arg1: unknown, arg2: unknown) => {
  console.log(
    `SIGNAL_R/${logMessage.toUpperCase()}: `,
    arg1,
    '\n',
    arg2 ?? 'arg2 is empty',
    '\n',
    moment().local().format('HH:mm:ss')
  );
};

export const foundDeviceHandler = (device: Device, message: string) => {
  signalRLogger('FOUND DEVICES', device, message);
  dispatch(DevicesActions.availableDevices.append(device));
};

export const batteryHandler = (deviceUid: ServerDevice['uid'], message: BatteryState) => {
  signalRLogger('BATTERY STATE', deviceUid, message);
  dispatch(DevicesActions.devices.setDeviceBatteryStatus(deviceUid, message));
};

export const onConnectedHandler = (device: ServerDevice, message: string) => {
  signalRLogger('DEVICE CONNECTED', device, message);
  dispatch(DevicesActions.devices.toggleConnection(device, 'connected'));
};

export const onDisconnectHandler = (device: ServerDevice, message: string) => {
  signalRLogger('Device disconnected', device, message);
  dispatch(DevicesActions.devices.toggleConnection(device, 'disconnected'));
};

export const playerStateHandler = (deviceUid: ServerDevice['uid'], message: PlayerState) => {
  signalRLogger('Player State', deviceUid, message);
  dispatch(DevicesActions.devices.setDevicePlayerStatus(deviceUid, message));
};

export const uploadHandler = (task: VideoUploadTask, message: string) => {
  signalRLogger('upload task', task, message);
  dispatch(BackgroundTasksActions.upload.append(task));
};

export const downloadHandler = (task: VideoDownloadTask, message: string) => {
  signalRLogger('download task', task, message);
  dispatch(BackgroundTasksActions.download.append(task));
};

export const devicesListHandler = (message: string) => {
  signalRLogger('update devices list', message, undefined);
  dispatch(DevicesActions.devices.get()).catch(console.warn);
};

export const internetConnectionHandler = (obj: { internetAvailability: boolean }) => {
  signalRLogger('internet status', obj, undefined);
  dispatch(AppActions.network.setSatuts(obj?.internetAvailability ? 'online' : 'offline'));
};

export const localVideosUpdateHandler = (message: string) => {
  signalRLogger('update local videos list', message, undefined);
  dispatch(VideosActions.local.get()).catch(console.warn);
};

export const Handlers = {
  foundDevice: foundDeviceHandler,
  battery: batteryHandler,
  onConnect: onConnectedHandler,
  onDisconnect: onDisconnectHandler,
  playerState: playerStateHandler,
  upload: uploadHandler,
  download: downloadHandler,
  devicesList: devicesListHandler,
  internetConnection: internetConnectionHandler,
  localVideosUpdate: localVideosUpdateHandler,
};
