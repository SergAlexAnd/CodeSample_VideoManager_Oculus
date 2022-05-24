import * as React from 'react';

import useTheme from '@mui/material/styles/useTheme';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography/Typography';
import SyncIcon from '@mui/icons-material/Sync';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import { useDispatch, useSelector } from '../../store/store-config';
import { Grid, LibraryVideoItem } from '../../components';
import { VideosActions } from '../../store/videos/actions';
import { ServerVideo } from '../../types/videos';
import { DevicesActions } from '../../store/devices/actions';

export const VideosTab: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [videos, setVideos] = React.useState<ServerVideo[]>([]);

  React.useEffect(() => {
    dispatch(VideosActions.local.get()).catch(console.warn);
  }, []);

  const localVideos = useSelector((state) => state.videos.localList);
  const devices = useSelector((state) => state.devices.list);
  const selectedVideo = useSelector((state) => state.videos.selectedVideo);
  const selectedDevices = useSelector((state) => state.devices.selectedDevices);

  React.useEffect(() => {
    const availableVideos = dispatch(DevicesActions.player.getVideosOnSelectedDevices());
    setVideos(availableVideos);
  }, [devices, localVideos, selectedDevices]);

  return (
    <Grid.Column
      className="videos-tab"
      col={5}
      style={{ padding: 10, flexBasis: 'calc(calc(5.9/12) * 100%)', maxWidth: 'calc(calc(5.9/12) * 100%)' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography style={{ color: theme.palette.text.primary }} variant="h5">
          {t('T_AVAILABLE_VIDEOS')}
        </Typography>
        <div style={{ display: 'flex' }}>
          <IconButton
            aria-label="remove-vid"
            disabled={!selectedVideo || selectedDevices.length === 0}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={async (): Promise<void> => {
              await dispatch(DevicesActions.devices.videos.deleteFromManyDevices(selectedVideo, selectedDevices));
            }}
          >
            <DeleteIcon style={{ width: 20, height: 20 }} />
          </IconButton>
          <IconButton
            aria-label="search-vid"
            style={{ marginLeft: 10 }}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={async (): Promise<void> => {
              await dispatch(VideosActions.local.get());
              await dispatch(DevicesActions.devices.get());
              dispatch(DevicesActions.devices.syncAllDevices()).catch(console.warn);
            }}
          >
            <SyncIcon style={{ width: 20, height: 20 }} />
          </IconButton>
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {videos.map((video) => {
          return (
            <LibraryVideoItem
              onCardClick={() => dispatch(VideosActions.local.setSelectedVideo(video.uid))}
              selected={selectedVideo === video.uid}
              truncated
              key={video.uid}
              data={video}
              // onClick={(v) => dispatch(ModalActions.open({ name: 'LocalVideo', params: { video: v, showType: 'preview' } }))}
            />
          );
        })}
      </div>
    </Grid.Column>
  );
};
