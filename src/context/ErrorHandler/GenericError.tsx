// src/components/GenericError.tsx

import React from 'react';
import { useTranslation } from 'react-i18next';

import { Alert, Title, Text, Code, Button } from '@mantine/core';

import { MdErrorOutline } from 'react-icons/md';

import classes from './GenericError.module.scss';

// Use process.env directly for environment check
const { NODE_ENV } = process.env;

interface Props {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  handleRetry: () => void;
}

export const GenericError = ({ error, errorInfo, handleRetry }: Props) => {
  const { t } = useTranslation();

  return (
    // 1. Root Container (MUI Box equivalent using SCSS for centering)
    <div className={classes.container}>
      <Alert
        // 2. Alert Component (MUI Alert equivalent)
        color='red'
        variant='light'
        // 3. Icon replacement (using react-icons)
        icon={<MdErrorOutline size={24} />}
        // 4. Apply SCSS class for max-width/width sizing
        className={classes.alertRoot}

        // Mantine's Alert doesn't have an AlertTitle prop.
        // We use Title and Text as children.
      >
        {/* 5. Alert Title (MUI AlertTitle equivalent) */}
        <Title order={4} mb='sm'>
          {t('Something went wrong')}
        </Title>

        {/* 6. Error Message (MUI Typography body2 equivalent) */}
        <Text size='sm' mb='md'>
          {error?.message || t('keys.errors.unexpected')}
        </Text>

        {/* 7. Conditional Error Stack Trace */}
        {NODE_ENV === 'development' && errorInfo && (
          // MUI Box for stack trace container, replaced by a div with SCSS class
          <div className={classes.codeContainer}>
            {/* 8. Mantine Code block for preformatted text (MUI component='pre' equivalent) */}
            <Code
              // 'block' prop makes it a display: block element
              block
              // Custom styles for size, max height, and scroll
              style={{
                fontSize: '0.75rem',
                maxHeight: '200px',
                overflow: 'auto',
              }}
            >
              {error?.stack}
            </Code>
          </div>
        )}

        {/* 9. Retry Button (MUI Button equivalent) */}
        <Button
          // Mantine uses 'variant' and 'color' props
          variant='filled'
          color='red' // Use 'red' for consistency with the error alert
          onClick={handleRetry}
          mt='md' // Mantine spacing prop for margin-top
        >
          {t('Try again')}
        </Button>
      </Alert>
    </div>
  );
};
