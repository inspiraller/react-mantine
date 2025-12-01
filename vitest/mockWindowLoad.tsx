import { vi } from 'vitest';

if (typeof window === 'undefined') {
  // create a fake window object
  // @ts-ignore
  global.window = {} as Window;
}

// then add your mocks
(window as any).myApi = vi.fn();
