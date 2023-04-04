type ErrorResponse = {
  code: string;
  message: string;
};

type Auth = {
  token: string;
  name: string;
};

type Res<T> = {
  data: T | null;
  status: number;
  statusText: string;
};

type AxiosResponse<T> = {
  success: Res<T> | null;
  error: ErrorResponse | null;
};
