import { ApiResponse } from '../api';
import { ServerVideo } from './model';

export interface VideosResponse extends ApiResponse<ServerVideo[]> {
  count: number;
}

export type VideoResponse = ApiResponse<ServerVideo>;
