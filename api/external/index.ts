import { VideoResponse, VideosResponse } from '../../types/videos';
import { baseFetch } from '../fetch';

const url = '/external';
const videosUrl = `${url}/videos`;

export class ExternalApi {
  get = async (token: string): Promise<VideosResponse> => {
    const result = await baseFetch().get<VideosResponse>(`${videosUrl}`, { headers: { token } });
    return result.data;
  };

  getByUid = async (uid: string, token: string): Promise<VideosResponse> => {
    const result = await baseFetch().get<VideosResponse>(`${videosUrl}/${uid}`, { headers: { token } });
    return result.data;
  };

  importToLocal = async (uid: string, token: string, importPreview: boolean): Promise<VideoResponse> => {
    const result = await baseFetch().post<undefined, VideosResponse>(`${videosUrl}/${uid}/import-to-local`, undefined, {
      headers: { token },
      params: { importPreview },
    });
    return result.data;
  };

  getFile = async (fileUrl: string, token: string): Promise<Blob> => {
    const result = await baseFetch().get<Blob>(`${url}${fileUrl}`, { headers: { token }, responseType: 'blob' });
    return result.data;
  };
}
