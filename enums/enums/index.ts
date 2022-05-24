export enum AccessStatuses {
  'Undefined' = 0,
  'ManageUsers' = 100,
  'ManageUserRoles' = 110,
  'ViewVideoCollection' = 200,
  'AddUpdateDeleteVideos' = 210,
}

export enum BatteryStatuses {
  'Unknown' = 0,
  'Charging' = 1,
  'Discharging' = 2,
  'NotCharging' = 3,
  'Full' = 4,
}

export enum PlayerStatuses {
  'Unknown' = 0,
  'Play' = 1,
  'Pause' = 2,
  'Stop' = 3,
  'WaitForPlay' = 4,
}

export enum BackgroundTasksStatuses {
  'Undefined' = 0,
  'ToDo' = 1,
  'InProgress' = 2,
  'Done' = 3,
  'Failed' = 4,
}

export enum VideoContentTypes {
  'Cover' = 1,
  'Preview' = 2,
  'Movie' = 3,
}

export enum ConnectionStatuses {
  'connected',
  'disconnected',
}
