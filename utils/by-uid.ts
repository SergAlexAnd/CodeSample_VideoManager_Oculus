import { setWith } from 'lodash';

import { GeneralRecord } from '../types/general';

export const getByUid = <T extends GeneralRecord>(videos: T[]): Record<T['uid'], T> => {
  const byUid = videos.reduce((acc, v) => {
    setWith(acc, [v.uid], v, Object);
    return acc;
  }, {} as Record<T['uid'], T>);
  return byUid;
};
