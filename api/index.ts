import { AuthApi } from './auth';
import { BackgroundTasksApi } from './background-tasks';
import { ConfigurationsApi } from './configurations';
import { DeviceSearchApi } from './device-search';
import { DevicesApi } from './devices';
import { EnumsApi } from './enums';
import { ExternalApi } from './external';
import { LocalApi } from './local';
import { UsersApi } from './users';
import { VideosApi } from './videos';

export const Api = {
  auth: new AuthApi(),
  backgroundTasks: new BackgroundTasksApi(),
  configuration: new ConfigurationsApi(),
  devices: new DevicesApi(),
  deviceSearch: new DeviceSearchApi(),
  enums: new EnumsApi(),
  external: new ExternalApi(),
  local: new LocalApi(),
  users: new UsersApi(),
  videos: new VideosApi(),
};
