import * as React from 'react';

import { Divider, useTheme } from '@mui/material';

import { Navbar, Player } from '../../components';
import * as styles from './styles.scss';
import { DevicesTab } from './devices';
import { VideosTab } from './videos';
import './tabs.scss';

export const HomePage: React.FC = () => {
  const theme = useTheme();

  return (
    <div className={styles.container} style={{ background: theme.palette.background.default }}>
      <Navbar />
      <div className={styles.innerContainer}>
        <Player />
        <Divider />
        <div style={{ display: 'flex', height: '100%' }}>
          <DevicesTab />
          <Divider orientation="vertical" />
          <VideosTab />
        </div>
      </div>
    </div>
  );
};
