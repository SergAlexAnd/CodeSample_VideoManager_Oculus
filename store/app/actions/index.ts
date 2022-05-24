import { changeLanguage, toggleTheme, signIn, signOut } from './actions';
import { AppPlainActions } from './plain';

export const AppActions = {
  changeLanguage,
  toggleTheme,
  network: {
    setSatuts: AppPlainActions.setNetworkStatus,
  },
  auth: {
    signIn,
    signOut,
  },
};
