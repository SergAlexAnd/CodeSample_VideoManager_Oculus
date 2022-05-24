import { ApiResponse } from '../api';
import { User } from './model';

export interface AuthSendForm {
  login: string;
  password: string;
}

export type UserResponse = ApiResponse<User>;
