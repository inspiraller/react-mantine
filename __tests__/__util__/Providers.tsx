import { initI18n } from '@/i18n';
import { HelmetProvider } from 'react-helmet-async';

import { BrowserRouter } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

initI18n();

export const Providers = ({ children }: Props) => {
  return (
    <HelmetProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </HelmetProvider>
  );
};
