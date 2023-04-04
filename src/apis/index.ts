import axios, { AxiosError, AxiosRequestConfig } from 'axios';
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

export const fetcher = async (url: string, config: AxiosRequestConfig) => {
  try {
    const res = await axios.get(url, config);

    return res.data;
  } catch (e) {
    throw e;
  }
};

export const axiosRequest = async <T>(
  axiosConfig: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  try {
    const res = await axios(axiosConfig);

    const defaultSuccess: Res<T> = {
      status: res.status,
      statusText: res.statusText,
      data: res.data,
    };

    return { success: defaultSuccess, error: null };
  } catch (err) {
    const defaultError = {
      code: 'AXIOS_ERROR',
      message: 'axios error',
    };

    return {
      success: null,
      error: (err as AxiosError<ErrorResponse>).response?.data ?? defaultError,
    };
  }
};

export const clearCache = () =>
  mutate(() => true, undefined, { revalidate: false });
