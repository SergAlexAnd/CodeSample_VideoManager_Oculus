import * as React from 'react';

import { Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

import * as styles from './styles.scss';
import { Navbar } from '../../components';

export const TasksPage = () => {
  const theme = useTheme();

  const { t } = useTranslation();
  return (
    <>
      <Navbar />
      <div className={styles.container} style={{ background: theme.palette.background.default }}>
        <Typography style={{ color: theme.palette.text.primary }} variant="h3">
          {t('T_TASKS')}
        </Typography>
      </div>
    </>
  );
};
