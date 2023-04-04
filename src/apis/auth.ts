import { axiosRequest, clearAuth, setAuth } from '.';

export const login = async (payload: { id: string; password: string }) => {
  const res = await axiosRequest<Auth>({
    method: 'get',
    url: '/login',
    params: payload,
  });

  if (res.success) {
    setAuth(JSON.stringify(res.success.data));
  }

  return res;
};

export const logout = async () => {
  const res = await axiosRequest({ url: '/logout' });

  if (res.success) {
    clearAuth();
  }

  return res;
};
