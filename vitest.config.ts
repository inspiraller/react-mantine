import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    // Global test timeout (default: 5000ms)
    testTimeout: 10000,

    // Hook timeouts
    hookTimeout: 10000,

    // Teardown timeout
    teardownTimeout: 10000,
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html', 'clover', 'json'],
      reportsDirectory: './coverage',
      include: ['src/**/*.ts*'],
      exclude: [
        'node_modules',
        'redis',
        '__tests__',
        'src/lib/axe.js',
        'src/messages/*',
        'src/types/*',
      ],
    },
    globals: true,
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        resources: 'usable',
        // This can help with the JSDOM network error
        url: 'http://localhost/',
      },
    },

    setupFiles: ['./vitest/setup.tsx'],
    include: ['__tests__/**/*.{test,spec}.{js,ts,jsx,tsx}'], // Include test files in __tests__ folder
  },
  json: {
    stringify: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@public': path.resolve(__dirname, './public'),
      '@tests': path.resolve(__dirname, './__tests__'),
    },
  },
});
