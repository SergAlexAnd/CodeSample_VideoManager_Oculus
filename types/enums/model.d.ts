import { AccessStatuses, BackgroundTasksStatuses, BatteryStatuses, PlayerStatuses, VideoContentTypes } from '../../enums/enums';

export type EnumAccessItem = {
  id: AccessStatuses;
  name: keyof typeof AccessStatuses;
};

export type EnumBatteryStatusItem = {
  id: BatteryStatuses;
  name: keyof typeof BatteryStatuses;
};

export type EnumPlayerStatusItem = {
  id: PlayerStatuses;
  name: keyof typeof PlayerStatuses;
};

export type EnumBackgroundTaskStatusItem = {
  id: BackgroundTasksStatuses;
  name: keyof typeof BackgroundTasksStatuses;
};

export type EnumVideoContentTypeItem = {
  id: VideoContentTypes;
  name: keyof typeof VideoContentTypes;
};
