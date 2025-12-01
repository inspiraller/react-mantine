import { useQueries, UseQueryResult } from '@tanstack/react-query';

import { axGet } from './axGet';
import { TanstackError } from '@/types/Error';

// Prevent this use hook from making more than 10 consecutive requests.

export interface Props<Response> {
  url: string;
  fromPage: number;
  toPage: number;
  callback?: (results: Response) => Response;
}
const useGetPageRange = <Response>({
  url,
  fromPage,
  toPage,
  callback = (results) => results,
}: Props<Response>) => {
  const queries =
    toPage >= fromPage
      ? Array.from({ length: toPage - fromPage + 1 }, (_, i) => ({
          queryKey: [url, fromPage + i],
          queryFn: () =>
            axGet<Response, TanstackError>({
              url,
              propsQueryString: { page: fromPage + i },
            }).then(callback),
        }))
      : null;

  const results: UseQueryResult<Response, TanstackError>[] = useQueries({
    queries: queries ?? [],
  });

  // Wait for all queries to be successful
  let allSuccess = true;
  let isFetching = false;
  let error: TanstackError | undefined = undefined;

  if (results.length) {
    for (const r of results) {
      if (r.isFetching) isFetching = true;
      if (!r.isSuccess) allSuccess = false;
      if (!error && r.error) error = r.error; // take first TanstackError
    }
  }

  const dataAll = allSuccess
    ? (results.map((item) => item.data) as Response[])
    : null;
  return {
    data: dataAll,
    isSuccess: allSuccess,
    isFetching: isFetching,
    error,
  };
};

export default useGetPageRange;
