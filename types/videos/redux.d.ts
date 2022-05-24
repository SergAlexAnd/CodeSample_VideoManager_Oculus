import { VIDEOS } from '../constants';
import { ServerVideo } from './model';
import { ActionCreator } from '../general-actions.d';

export interface VideosState {
  externalList: ServerVideo[];
  externalByUid: Record<ServerVideo['uid'], ServerVideo>;
  localList: ServerVideo[];
  localByUid: Record<ServerVideo['uid'], ServerVideo>;
  selectedVideo: string | null;
}

export interface IVideoActions {
  SetState: ActionCreator<VIDEOS.SET_STATE, Partial<VideosState>>;
}
