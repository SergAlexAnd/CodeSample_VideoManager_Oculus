import * as moment from 'moment';
import 'moment/locale/en-gb';
import 'moment/locale/ru';

import { LanguageType } from '../../../types/app';
import { ThunkAction } from '../../../types/known-actions';
import i18n from '../../../utils/i18n';
import { AppPlainActions } from './plain';

export const changeLanguage =
  (lang: LanguageType): ThunkAction =>
  (dispatch) => {
    if (!lang) return;
    dispatch(AppPlainActions.setLanguage(lang));
    moment.locale(lang === 'en' ? 'en-gb' : lang);
    i18n.changeLanguage(lang).catch(console.warn);
  };

export const toggleTheme = (): ThunkAction => (dispatch, getState) => {
  const { theme } = getState().app;
  const newTheme = theme === 'light' ? 'dark' : 'light';
  dispatch(AppPlainActions.setTheme(newTheme));
};

export const signIn = (): ThunkAction => (dispatch) => {
  dispatch(AppPlainActions.setAuthenticated(true));
};

export const signOut = (): ThunkAction => (dispatch) => {
  dispatch(AppPlainActions.setAuthenticated(false));
};
