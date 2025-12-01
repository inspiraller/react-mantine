import { render, screen } from '@testing-library/react';

import { Providers } from '@tests/__util__/Providers';
import enJson from '@public/locales/en/translation.json';

import HomePage from '@/pages/Home';
import { setScreenWidth } from '@tests/__util__/setScreenWidth';

describe('Homepage', () => {
  beforeEach(() => {
    setScreenWidth(992); // simulate wide screen

    render(
      <Providers>
        <HomePage />
      </Providers>,
    );
  });

  it('renders h1 without crashing', async () => {
    expect(screen.getByText(enJson.page.homepage.body.h1)).toBeInTheDocument();
  });
});
