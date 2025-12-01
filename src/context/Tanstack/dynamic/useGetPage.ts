import { useQuery } from '@tanstack/react-query';

import { axGet } from './axGet';
import { TanstackError } from '@/types/Error';

export interface Props<Response> {
  url: string;
  page: number;
  callback?: (results: Response) => Response;
}

const useGetPage = <Response>({ url, page, callback }: Props<Response>) =>
  useQuery<Response, Error>({
    queryKey: [url, page],
    queryFn: () =>
      axGet<Response, TanstackError>({
        url,
        propsQueryString: { page },
      }).then(callback),
  });

export default useGetPage;
