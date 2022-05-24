import { signIn, signOut } from './authentication';
import { getUser } from './user';

export const AuthActions = {
  signIn,
  signOut,
  user: {
    get: getUser,
  },
};
