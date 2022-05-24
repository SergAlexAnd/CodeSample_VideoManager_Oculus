import { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

import { api } from './api-config';

const processResponse = <T>(promise: Promise<AxiosResponse<T>>): Promise<AxiosResponse<T>> =>
  promise
    .then((response) => {
      if (response.status >= 400) {
        return Promise.reject(new Error(`Invalid response: ${response.status}`));
      }
      return response;
    })
    .then((data) => data)
    .catch((err) => {
      console.warn(err);
      throw err;
      // source.cancel('Operation canceled by the user.');
    });

export class BaseAPICall {
  URL: string;

  constructor(URL: string) {
    this.URL = URL;
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return processResponse<T>(api.get<T>(this.URL + url, config));
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return processResponse(api.delete<T>(this.URL + url, config));
  }

  async post<T, J>(url: string, data: J, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return processResponse(api.post(this.URL + url, data, config));
  }

  async put<T, J>(url: string, data: J, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return processResponse(api.put(this.URL + url, data, config));
  }

  async patch<T, J>(url: string, data: J, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return processResponse(api.patch(this.URL + url, data, config));
  }

  async copy<T, J>(url: string, data: J, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    return processResponse(
      api.request({
        url: this.URL + url,
        method: 'COPY',
        data,
        ...config,
      } as AxiosRequestConfig & { method: Method & 'COPY' })
    );
  }

  async move<T, J>(url: string, data: J, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    return processResponse(
      api.request({
        url: this.URL + url,
        method: 'MOVE',
        data,
        ...config,
      } as AxiosRequestConfig & { method: Method & 'MOVE' })
    );
  }
}
