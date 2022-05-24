import { Api } from '../../../api';
import { User } from '../../../types/auth';
import { ThunkAction } from '../../../types/known-actions';
import { AuthPlainActions } from './plain';

export const getUser = (): ThunkAction<Promise<User>> => async (dispatch) => {
  const response = await Api.users.get();
  dispatch(AuthPlainActions.setState(response.data));
  return response.data;
};
