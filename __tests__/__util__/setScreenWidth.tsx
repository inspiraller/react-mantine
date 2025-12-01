export function setScreenWidth(widthPx: number) {
  globalThis.matchMedia = vi.fn().mockImplementation((query: string) => {
    const minMatch = query.match(/\(min-width:\s*(\d+)px\)/);
    const maxMatch = query.match(/\(max-width:\s*(\d+)px\)/);

    let matches = true;
    if (minMatch) {
      matches = matches && widthPx >= parseInt(minMatch[1], 10);
    }
    if (maxMatch) {
      matches = matches && widthPx <= parseInt(maxMatch[1], 10);
    }

    return {
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
  });
}
