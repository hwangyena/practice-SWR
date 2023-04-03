import { clearAuth, axiosRequest, setAuth, isErrorResponse } from '.';

export const login = async (payload: { id: string; password: string }) => {
  const res = await axiosRequest<Auth>({
    method: 'get',
    url: '/login',
    params: payload,
  });

  if (!isErrorResponse(res)) {
    setAuth(res.token);
  }

  return res;
};

export const logout = async () => {
  try {
    await axiosRequest({ url: '/logout' });

    clearAuth();
  } catch (err) {
    console.error('err', err);
  }
};
