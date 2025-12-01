import { AxiosError } from 'axios';

export type ApiError = {
  message: string;
  // data?: { message: string };
  // status: number;
};

export type TanstackError = AxiosError<ApiError>;
