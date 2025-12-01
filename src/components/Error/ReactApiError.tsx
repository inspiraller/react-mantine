// src/components/ReactApiError.tsx

// Assuming you have these types/utilities available:
import { TanstackError } from '@/types/Error';
import { NoOrphans } from '@/util/noOrphans';

// 🚀 Mantine imports
import { Alert, Title, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

// 🚀 SCSS Module import
import classes from './ReactApiError.module.scss';

interface Props {
  error?: TanstackError | null; // mutation empty is null, query empty is undefined
}

export const ReactApiError = ({ error }: Props) => {
  const { t } = useTranslation();

  // --- Logic is identical to MUI version ---
  if (!error) return null;

  const { status } = error;

  // Don’t render unless there’s an error (status >= 400)
  if (!status || status < 400) return null;

  const message = error.response?.data?.message ?? error.message;
  const codeToMessage =
    status === 401 || status === 403 // capture auth errors
      ? t(`key.errors.${status}`, {
          defaultValue: t('Error'),
        })
      : message;
  // --- End Logic ---

  return (
    <Alert
      // 1. Mantine's `variant` and `color` props replace MUI's `severity`
      color='red'
      variant='light' // Use light or filled variant based on preference
      // 2. Icon is passed directly (Mantine uses Tabler Icons)

      // 3. Mantine's classNames prop maps your SCSS module classes
      classNames={{
        root: classes.root,
        icon: classes.icon,
        title: classes.title, // Mantine's Title/children structure is simpler
      }}
      // 4. Set component prop for semantic HTML (section)
      component='section'
    >
      {/* --- Error Title (MUI Typography h2 equivalent) --- */}
      <Title order={2} className={classes.title}>
        {t('Error')}
      </Title>

      {/* --- Error Message (MUI p equivalent) --- */}
      <Text component='p' className={classes.message}>
        {/* We use Text component here but render the content inside a p tag */}
        <NoOrphans text={codeToMessage} />
      </Text>
    </Alert>
  );
};
