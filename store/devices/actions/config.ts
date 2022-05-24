import { Api } from '../../../api';
import { DeviceSearchStatus } from '../../../enums/devices';
import { ThunkAction } from '../../../types/known-actions';
// import { GenericWrapperReturnType } from '../../../types/warning';
import { WarningActions } from '../../warning/actions';
import { clearAvailableDevices } from './devices';
import { DevicesPlainActions } from './plain';

// export const getConfig = (): ThunkAction<Promise<GenericWrapperReturnType<void>>> => async (dispatch) => {
//   const res = await dispatch(
//     WarningActions.wrappers.loadingData(async () => {
//       const result = await Api.configuration.getInternalCommunicationConfiguration();
//       if (result.data) {
//         dispatch(DevicesPlainActions.setConfig(result.data));
//       }
//     })
//   );
//   return res;
// };

export const getSearchState = (): ThunkAction => async (dispatch) => {
  const res = await dispatch(
    WarningActions.wrappers.loadingData(async () => {
      const result = await Api.deviceSearch.getState();
      if (result.data !== undefined || result.data !== null) {
        const status = result.data ? DeviceSearchStatus.searching : DeviceSearchStatus.stopped;
        dispatch(DevicesPlainActions.setState({ searchState: status }));
      }
    })
  );
  return res;
};

export const stopSearch = (): ThunkAction => async (dispatch) => {
  await Api.deviceSearch.stop();
  dispatch(clearAvailableDevices());
  dispatch(getSearchState());
};

export const startSearch = (): ThunkAction => async (dispatch) => {
  await Api.deviceSearch.stop();
  dispatch(clearAvailableDevices());
  setTimeout(() => {
    Api.deviceSearch.start().catch(console.warn);
    dispatch(getSearchState());
  });
  setTimeout(() => {
    Api.deviceSearch.stop().catch(console.warn);
    dispatch(getSearchState());
  }, 20000);
};

export const searchActions = {
  getState: getSearchState,
  start: startSearch,
  stop: stopSearch,
};
