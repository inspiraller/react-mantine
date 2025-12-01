import { useQuery } from '@tanstack/react-query';

import { axGet } from './axGet';
import { TanstackError } from '@/types/Error';

interface Props {
  url: string;
  id?: string;
  enabled?: boolean;
}
const useGetById = <Response>({ url, id, enabled }: Props) =>
  useQuery<Response, Error>({
    enabled,
    queryKey: [`${url}/${id}`],
    queryFn: () =>
      axGet<Response, TanstackError>({
        url: `${url}/${id}`,
      }),
  });
export default useGetById;
