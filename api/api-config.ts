/* eslint-disable no-param-reassign */
// import * as Msal from 'msal';
import axios from 'axios';
// import createAuthRefreshInterceptor from 'axios-auth-refresh';
import * as qs from 'qs';

// import { getToken } from 'utils/auth';
// import { store } from 'store/configureStore';
// import { UserActions } from 'store/user/actions';

const { CancelToken } = axios;
const source = CancelToken.source();
const axiosConfig = {
  headers: {
    Pragma: 'no-cache',
    Authorization: '',
  },
  'Content-Type': 'application/json',
  cancelToken: source.token,
  withCredentials: process.env.NODE_ENV !== 'test',
  paramsSerializer: (p: unknown) => {
    return qs.stringify(p);
  },
};

const api = axios.create(axiosConfig);

// api.interceptors.request.use((request) => {
//   const token = store?.getState()?.user?.auth?.idToken as string;
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//   request.headers.Authorization = `Bearer ${token}`;
//   return request;
// });

// const refreshAuthLogic = async (failedRequest: AxiosError) => {
//   const token = ((await getToken()) as Msal.AuthResponse) ?? ({} as Msal.AuthResponse);
//   if (token.idToken !== undefined) {
//     store.dispatch(
//       UserActions.setIdToken({
//         idToken: token.idToken.rawIdToken,
//         claims: token.idToken.claims,
//       })
//     );
//     if (failedRequest.response?.config?.headers) {
//       // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//       failedRequest.response.config.headers.Authorization = `Bearer ${token.idToken.rawIdToken}`;
//     }
//   }

//   return token;
// };

// createAuthRefreshInterceptor(api, refreshAuthLogic);

export { api };
