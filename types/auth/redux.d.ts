import { AUTH } from '../constants';
import { ActionCreator } from '../general-actions';
import { User } from './model';

export interface AuthState {
  access: User['access'];
  name: User['name'] | null;
  token: User['token'] | null;
}

// actions
export interface IAuthActions {
  SetState: ActionCreator<AUTH.SET_STATE, Partial<AuthState>>;
  ClearState: ActionCreator<AUTH.CLEAR_STATE, void>;
}
