import * as moment from 'moment';

export const getDuration = (duration?: number) => {
  if (!duration) return '00:00';
  return moment.utc(duration * 1000).format('HH:mm:ss');
};
