import { axiosAuthApi } from '@/util/axiosApi';
import { AxiosError } from 'axios';

export interface Request {
  url: string;
  propsQueryString?: Record<string, string | number | boolean>;
}

export const axGet = <Response, ErrorResponse = any>({
  url,
  propsQueryString,
}: Request): Promise<Response> => {
  return axiosAuthApi
    .get<Response>(url, {
      params:
        propsQueryString && Object.keys(propsQueryString).length
          ? propsQueryString
          : undefined,
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      // You can handle logging or rethrow with consistent shape
      throw error;
    });
};
