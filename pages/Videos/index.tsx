import * as React from 'react';

import { useTheme } from '@mui/material';
// import { useTranslation } from 'react-i18next';

import * as styles from './styles.scss';
import { Navbar, ShopVideoItem } from '../../components';
import { useDispatch, useSelector } from '../../store/store-config';
import { VideosActions } from '../../store/videos/actions';
import { ModalActions } from '../../store/modal/actions';

export const VideosPage = () => {
  const theme = useTheme();

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(VideosActions.external.getVideos()).catch(console.warn);
  }, []);

  const videos = useSelector((state) => state.videos.externalList);

  // const { t } = useTranslation();
  return (
    <>
      <Navbar />
      <div className={styles.container} style={{ background: theme.palette.background.default }}>
        {/* <Typography style={{ color: theme.palette.text.primary }} variant="h3">
          {t('T_VIDEOS')}
        </Typography> */}
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {videos.map((video) => {
            return (
              <ShopVideoItem
                key={video.uid}
                data={video}
                onClick={(v) => dispatch(ModalActions.open({ name: 'VideoPreview', params: { video: v, showType: 'preview' } }))}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
