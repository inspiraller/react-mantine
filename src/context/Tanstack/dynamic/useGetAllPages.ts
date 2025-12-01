import { useEffect, useState } from 'react';

import useGetPageRange from './useGetPageRange';

// Prevent this use hook from making more than 10 consecutive requests.
export interface Props<Response> {
  url: string;
  totalPages: number;
  callback?: (results: Response) => Response;
}

const BATCH_SIZE = 10; // Max - get 10 pages in succession
const BATCH_DELAY = 5000; // 5 seconds - allow 5 second delay (to prevent hammering api and hitting rate limit!)

// Use useGetAll
// useGetAll will call both useGetFirstPage and useGetAllPages
const useGetAllPages = <Response>({
  url,
  totalPages,
  callback = (results) => results,
}: Props<Response>) => {
  const [currentBatch, setCurrentBatch] = useState(0);
  const totalBatches = Math.ceil(totalPages / BATCH_SIZE);

  useEffect(() => {
    if (currentBatch < totalBatches - 1) {
      const timer = setTimeout(() => {
        setCurrentBatch((prev) => prev + 1);
      }, BATCH_DELAY);

      return () => clearTimeout(timer);
    }
  }, [currentBatch, totalBatches]);

  const fromPage = 1;
  const toPage = Math.min((currentBatch + 1) * BATCH_SIZE, totalPages);

  return useGetPageRange<Response>({
    url,
    fromPage,
    toPage,
    callback
  });
};

export default useGetAllPages;
