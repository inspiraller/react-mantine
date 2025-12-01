import mockEn from '@public/locales/en/translation.json';

vi.mock('@/i18n', async () => {
  const actual = await vi.importActual<typeof import('@/i18n')>('@/i18n');

  return {
    ...actual,
    initI18n: vi.fn(() => Promise.resolve()),
  };
});

const translate = vi.fn((nestedKey: string) => {
  const sp = nestedKey.split('.');

  //console.log('tranlate from', sp);
  const result = sp.reduce((acc, cur) => {
    const key = cur as keyof typeof acc;

    // console.log('key', key, acc[key]);
    return acc[key];
  }, mockEn as any);

  if (typeof result !== 'string') {
    console.error('key not found in translations:', nestedKey);
  }
  return result;
});

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => translate(key),
  }),
}));
