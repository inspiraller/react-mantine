import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryclient';

// inactive queries are garbage collected (1000 * 60 * 10) = 10 minutes

export const TanstackProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
