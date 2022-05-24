import { GeneralRecord } from '../general.d';

export interface VideoInfoItem {
  name: string;
  size: number;
  url: string;
}

export type MediaFileInfo = {
  isExist: boolean;
  isBroken: boolean;
  size: number;
}

export type VideoCover = VideoInfoItem | null;

export type VideoPreview = VideoInfoItem;

export type VideoSource = VideoInfoItem;

export interface ServerVideo extends GeneralRecord {
  name: string;
  description: string;
  duration: number;
  durationStr: null | string;
  cover: VideoCover;
  preview: VideoPreview;
  movie: VideoSource;
  localStorageMovieFile: MediaFileInfo;
  localStoragePreviewFile: MediaFileInfo;
  localStorageCoverFile: MediaFileInfo;
}
