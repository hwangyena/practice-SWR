import axios, { AxiosRequestConfig } from 'axios';

export const fetcher = (url: string, config: AxiosRequestConfig) => {
  return axios.get(url, config);
};
