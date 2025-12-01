import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

const VITE_PORT = process.env.VITE_PORT || 3000;
const VITE_API_BASE_URL =
  process.env.VITE_API_BASE_URL || 'http://localhost:8080';
const VITE_API_PROXY = process.env.VITE_API_PROXY ?? '/api';

const proxy = {
  [VITE_API_PROXY]: {
    target: VITE_API_BASE_URL,
    changeOrigin: true,
    rewrite: (path: string) => path.replace(/^\/api/, ''), // remove /api
  },
};

console.log('vite config...', { proxy, VITE_API_BASE_URL, VITE_PORT });
export default defineConfig(({ mode }) => {
  // Load .env files based on mode (development, production) %VAR in index.html
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  return {
    define: {
      // Replace %VITE_API_BASE_URL% in index.html
      'process.env': env,
    },
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          exportType: 'named', // enables default export for React component
        },
      }),
    ],
    build: {
      outDir: 'dist',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            i18n: [
              'i18next',
              'i18next-browser-languagedetector',
              'i18next-http-backend',
              'react-i18next',
            ],
            // TODO
            // ui: [],
            // components: [],
          },
        },
      },
      minify: 'esbuild',
    },
    esbuild: {
      treeShaking: true,
      target: 'es2020',
      drop:
        process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@public': path.resolve(__dirname, './public'),
        '@tests': path.resolve(__dirname, './__tests__'),
      },
    },

    server: {
      // fix - (failed) net::ERR_CONNECTION_REFUSED
      host: '127.0.0.1',
      port: Number(VITE_PORT) || 5173, // fallback to 5173 if not set
      strictPort: true,
      proxy,
    },
  };
});
