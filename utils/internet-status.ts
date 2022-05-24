import axios, { AxiosError } from 'axios';

export const getConnectionStatus = async () => {
  let s = true;
  try {
    await axios.get('yandex.ru');
  } catch (e) {
    if ((e as AxiosError).message === 'Network Error') {
      s = false;
      return s;
    }
  }
  return s;
};
