import { VideosResponse } from '../../types/videos';
import { translate } from '../../utils/i18n/translate';
import { baseFetch } from '../fetch';

const url = '/videos';

export class VideosApi {
  get = async (): Promise<VideosResponse> => {
    const result = await baseFetch().get<VideosResponse>(url);
    return result.data;
  };

  uploadManyToDevices = async (videoUid: string, deviceUids: string[]): Promise<boolean> => {
    if (deviceUids.length === 0) throw new Error(translate('errors:T_NO_DEVICES_SELECETED'));
    const result = await baseFetch().put(`${url}/${videoUid}`, undefined, { params: { deviceUids } });
    return result.status === 200;
  };

  deleteManyFromDevices = async (videoUid: string, deviceUids: string[]): Promise<boolean> => {
    if (deviceUids.length === 0) throw new Error(translate('errors:T_NO_DEVICES_SELECETED'));
    const result = await baseFetch().delete(`${url}/${videoUid}`, { params: { deviceUids } });
    return result.status === 200;
  };
}
