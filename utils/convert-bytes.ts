const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

export const bytesConverter = (x: number) => {
  let l = 0;
  let n = parseInt(String(x), 10) || 0;

  // eslint-disable-next-line no-plusplus
  while (n >= 1024 && ++l) {
    n /= 1024;
  }

  return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
};
