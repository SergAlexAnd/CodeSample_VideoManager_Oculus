import { VideosResponse } from '../../types/videos';
import { baseFetch } from '../fetch';

const url = '/local';
const videosUrl = `${url}/videos`;

export class LocalApi {
  get = async (): Promise<VideosResponse> => {
    const result = await baseFetch().get<VideosResponse>(videosUrl);
    return result.data;
  };

  delete = async (uid: string): Promise<boolean> => {
    const result = await baseFetch().delete(`${videosUrl}/${uid}`);
    return result.status === 200;
  };

  getByUid = async (uid: string): Promise<Blob> => {
    const result = await baseFetch().get<Blob>(`${videosUrl}/${uid}`);
    return result.data;
  };

  getCover = async (uid: string): Promise<Blob> => {
    const result = await baseFetch().get<Blob>(`${videosUrl}/${uid}/cover`);
    return result.data;
  };

  getPreview = async (uid: string): Promise<Blob> => {
    const result = await baseFetch().get<Blob>(`${videosUrl}/${uid}/preview`);
    return result.data;
  };
}
