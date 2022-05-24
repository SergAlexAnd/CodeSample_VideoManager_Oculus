import { UserResponse } from '../../types/auth';
import { baseFetch } from '../fetch';

const url = '/users';

export class UsersApi {
  get = async (): Promise<UserResponse> => {
    const result = await baseFetch().get<UserResponse>(`${url}/current`);
    return result.data;
  };
}
