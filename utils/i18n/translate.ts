import i18n from '.';

export const translate = (s: string, params?: { [key: string]: string | number }): string => i18n.t(s, params);
