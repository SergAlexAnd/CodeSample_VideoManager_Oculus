import { ENUMS } from '../constants';
import { EnumAccessItem, EnumBatteryStatusItem, EnumPlayerStatusItem } from './model';
import { ActionCreator } from '../general-actions.d';

export interface EnumsState {
  access: EnumAccessItem[];
  batteryStatuses: EnumBatteryStatusItem[];
  playerStatuses: EnumPlayerStatusItem[];
}

export interface IEnumsActions {
  SetState: ActionCreator<ENUMS.SET_STATE, Partial<EnumsState>>;
}
