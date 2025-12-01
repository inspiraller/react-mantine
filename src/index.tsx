import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';
import { initI18n } from './i18n';
import { StrictMode } from 'react';

import { TanstackProvider } from './context/Tanstack/TanstackProvider';

import '@/global.css';
import { ErrorHandlerProvider } from './context/ErrorHandler/ErrorHandler';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';

initI18n();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <MantineProvider theme={theme}>
          <ErrorHandlerProvider>
            <TanstackProvider>
              <App />
            </TanstackProvider>
          </ErrorHandlerProvider>
        </MantineProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
