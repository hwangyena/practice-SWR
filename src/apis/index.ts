import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { mutate } from 'swr';

const AUTH = 'SWR_AUTH';

export const setAuth = (auth: string) => {
  localStorage.setItem(AUTH, auth);
};

export const getAuth = () => {
  const auth = localStorage.getItem(AUTH);
  return auth;
};

export const clearAuth = () => {
  localStorage.removeItem(AUTH);
};

axios.interceptors.request.use((config) => {
  config.headers.Authorization = getAuth();

  return config;
});

export const fetcher = (url: string, config: AxiosRequestConfig) => {
  return axios.get(url, config);
};

export const axiosRequest = async <T>(
  axiosConfig: AxiosRequestConfig
): Promise<T | ErrorResponse> => {
  try {
    const res = await axios(axiosConfig);

    if (res.data) {
      return res.data;
    }

    throw res;
  } catch (err) {
    return (
      (err as AxiosError<ErrorResponse>).response?.data ?? {
        code: 'AXIOS_ERROR',
        message: 'axios error',
      }
    );
  }
};

export const isErrorResponse = (
  res: ErrorResponse | unknown
): res is ErrorResponse => !!(res as ErrorResponse).code;

export const clearCache = () =>
  mutate(() => true, undefined, { revalidate: false });
