import * as React from 'react';

import useTheme from '@mui/material/styles/useTheme';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography/Typography';

import { useDispatch, useSelector } from '../../store/store-config';
import { LibraryVideoItem, Navbar } from '../../components';
import { VideosActions } from '../../store/videos/actions';
import { ModalActions } from '../../store/modal/actions';
import * as styles from './styles.scss';

export const LocalVideos: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(VideosActions.local.get()).catch(console.warn);
  }, []);

  const videos = useSelector((state) => state.videos.localList);

  return (
    <div className={styles.container} style={{ background: theme.palette.background.default }}>
      <Navbar />
      <div className={styles.innerContainer}>
        <Typography style={{ color: theme.palette.text.primary }} variant="h5">
          {t('T_VIDEO_LIBRARY')}
        </Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {videos.map((video) => {
            return (
              <LibraryVideoItem
                key={video.uid}
                data={video}
                onClick={(v) => dispatch(ModalActions.open({ name: 'LocalVideo', params: { video: v, showType: 'preview' } }))}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
