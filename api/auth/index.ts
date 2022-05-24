import { UserResponse, AuthSendForm } from '../../types/auth';
import { baseFetch } from '../fetch';

const url = '/auth';

export class AuthApi {
  signIn = async (data: AuthSendForm): Promise<UserResponse> => {
    const result = await baseFetch().post<UserResponse, AuthSendForm>(`${url}/sign-in`, data);
    return result.data;
  };
}
