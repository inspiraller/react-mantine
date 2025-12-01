import { QueryClient } from '@tanstack/react-query';
// Separated file so we can mock this more easily

export const MS_24DAYS = 1000 * 60 * 60 * 24 * 24; // 24 days. larges 32 bit signed integer allowed for next build for tanstack query gcTime
export const MS_DAY = 1000 * 60 * 60 * 24;

// inactive queries are garbage collected (1000 * 60 * 10) = 10 minutes
export const gcTime = MS_DAY;
export const staleTime = gcTime;
export const retry = 2;
export const retryDelay = 1500;

// default quries documentation:
// https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      // refetchIntervalInBackground: false,
      refetchOnReconnect: false,
      gcTime,
      staleTime,
      retry,
      retryDelay,
    },
  },
});
