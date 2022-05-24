import { Api } from '../../../api';
import { ThunkAction } from '../../../types/known-actions';
import { GenericWrapperReturnType } from '../../../types/warning';
import { WarningActions } from '../../warning/actions';
import { EnumsPlainActions } from './plain';

export const getEnums = (): ThunkAction<Promise<GenericWrapperReturnType<void>>> => async (dispatch) => {
  const res = await dispatch(
    WarningActions.wrappers.loadingData(async () => {
      const access = await Api.enums.getAccessStatuses();
      const batteryStatuses = await Api.enums.getBatteryStatuses();
      const playerStatuses = await Api.enums.getPlayerStatuses();
      dispatch(
        EnumsPlainActions.setState({
          access: access.data,
          batteryStatuses: batteryStatuses.data,
          playerStatuses: playerStatuses.data,
        })
      );
    })
  );
  return res;
};
