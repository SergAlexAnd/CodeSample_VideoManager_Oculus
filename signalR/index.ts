import { CONFIG } from '../config';
import { connectionConstants } from './constants';
import { Handlers } from './handlers';
import { signalR } from './types';

declare global {
  export interface Window {
    signalR: typeof signalR;
  }
}

const start = async (connection: signalR.HubConnection): Promise<void> => {
  try {
    await connection.start();
    console.log('SignalR Connected.');
  } catch (err) {
    console.log(err);
    setTimeout(() => {
      start(connection).catch(console.warn);
    }, 5000);
  }
};

const stopSignalR = async (connection: signalR.HubConnection): Promise<void> => {
  try {
    await connection.stop();
    console.log('SignalR stopped');
  } catch (err) {
    console.warn(err);
  }
};

const { port, url } = CONFIG;

class SignalR {
  url = `${url}:${port}/communicator`;

  connection = new window.signalR.HubConnectionBuilder()
    .withUrl(`${url}:${port}/communicator`)
    .configureLogging(window.signalR.LogLevel.Debug)
    .build();

  start = () => {
    try {
      this.connection.on(connectionConstants.BatteryState, Handlers.battery);

      this.connection.on(connectionConstants.ConnectedDevice, Handlers.onConnect);

      this.connection.on(connectionConstants.DisconnectedDevice, Handlers.onDisconnect);

      this.connection.on(connectionConstants.PlayerState, Handlers.playerState);

      this.connection.on(connectionConstants.FoundDevice, Handlers.foundDevice);

      this.connection.on(connectionConstants.UploadVideoOnDeviceBackgroundTask, Handlers.upload);

      this.connection.on(connectionConstants.VideoDownloadOnDevice, Handlers.download);

      this.connection.on(connectionConstants.UpdateDeviceCollection, Handlers.devicesList);

      this.connection.on(connectionConstants.NetworkInformation, Handlers.internetConnection);

      this.connection.on(connectionConstants.UpdateLocalVideoCollection, Handlers.localVideosUpdate);

      this.connection.onclose(() => {
        start(this.connection).catch(console.warn);
      });

      start(this.connection).catch(console.warn);
    } catch (e) {
      console.warn(e);
    }
  };

  stop = () => stopSignalR(this.connection);
}

export const signalRManager = new SignalR();
