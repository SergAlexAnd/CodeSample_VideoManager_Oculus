import { useEffect } from 'react';

import { useDispatch, useSelector } from '../store/store-config';
import { signalRManager } from '../signalR';
import { EnumsActions } from '../store/enums/actions';
import { DevicesActions } from '../store/devices/actions';
import { VideosActions } from '../store/videos/actions';

export const useInitApp = (isAuthenticated: boolean) => {
  const dispatch = useDispatch();

  const networkStatus = useSelector((state) => state.app.networkStatus);

  const initApp = async () => {
    dispatch(EnumsActions.get()).catch(console.warn);
    await dispatch(DevicesActions.devices.get()).catch(console.warn);
    dispatch(DevicesActions.devices.syncAllDevices()).catch(console.warn);
    dispatch(VideosActions.local.get()).catch(console.warn);
  };

  useEffect(() => {
    signalRManager.start();
    return () => {
      signalRManager.stop().catch(console.warn);
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated || networkStatus === 'offline') {
      initApp().catch(console.warn);
    }
  }, [isAuthenticated, networkStatus]);
};
