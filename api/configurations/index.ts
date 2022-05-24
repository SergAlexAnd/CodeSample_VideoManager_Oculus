import { ConfigResponse } from '../../types/devices';
import { baseFetch } from '../fetch';

const url = '/configurations';

export class ConfigurationsApi {
  getInternalCommunicationConfiguration = async (): Promise<ConfigResponse> => {
    const result = await baseFetch().get<ConfigResponse>(`${url}/internal-communication-configuration`);
    return result.data;
  };
}
