import ButtonBase from '@/components/Button/ButtonBase';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import { routePaths } from '@/routes/routePaths';
import { Button } from '@mantine/core';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const PAGE_URL = `https://www.domain.com${routePaths.homepage}`;

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <meta property='og:url' content={PAGE_URL} />
        <meta property='og:title' content={t('page.homepage.head.og.title')} />
        <meta
          property='og:description'
          content={t('page.homepage.head.og.description')}
        />
        <meta
          property='description'
          content={t('page.homepage.head.description')}
        />
        <title>{t('page.homepage.head.title')}</title>
      </Helmet>
      {/* Every page has a MAIN with appropriate h1, even if visually hidden for screen reader */}
      <main>
        <h1>{t('page.homepage.body.h1')}</h1>
        <Button>test button mantine core</Button>
        <ButtonBase>test button base</ButtonBase>
        <ButtonPrimary>Test button primary</ButtonPrimary>
      </main>
    </>
  );
};

export default HomePage;
