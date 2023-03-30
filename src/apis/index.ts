import axios, { AxiosRequestConfig } from 'axios';
import { mutate } from 'swr';

export const fetcher = (url: string, config: AxiosRequestConfig) => {
  return axios.get(url, config);
};

export const clearCache = () =>
  mutate(() => true, undefined, { revalidate: false });
