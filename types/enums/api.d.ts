import { ApiResponse } from '../api';
import {
  EnumAccessItem,
  EnumBackgroundTaskStatusItem,
  EnumBatteryStatusItem,
  EnumPlayerStatusItem,
  EnumVideoContentTypeItem,
} from './model';

export type AccessStatusesResponse = ApiResponse<EnumAccessItem[]>;

export type BatteryStatusesResponse = ApiResponse<EnumBatteryStatusItem[]>;

export type PlayerStatusesResponse = ApiResponse<EnumPlayerStatusItem[]>;

export type BackgroundTasksStatusesResponse = ApiResponse<EnumBackgroundTaskStatusItem[]>;

export type VideoContentTypesResponse = ApiResponse<EnumVideoContentTypeItem[]>;
