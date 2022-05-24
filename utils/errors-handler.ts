import { AxiosError } from 'axios';

import { translate } from './i18n/translate';

export const isAxiosError = (data: object): data is AxiosError => {
  return !!(data as AxiosError).response;
};

export const isError = (data: object): data is Error => {
  return !!(data as Error).name;
};

export const getErrorMessage = (e: AxiosError | Error): string => {
  let errorMessage = translate('errors:T_SMTH_WENT_WRONG');

  if (isAxiosError(e) && e.response?.status === 401) {
    errorMessage = translate('errors:T_NOT_AUTHORIZED');
  }
  if (isAxiosError(e) && e.response?.status === 403) {
    errorMessage = translate('errors:T_FORBIDDEN');
  }

  if (isAxiosError(e) && e.message === 'Network Error') {
    errorMessage = translate('errors:T_NETWROK_ERROR');
  }

  return errorMessage;
};
