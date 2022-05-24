import * as React from 'react';

import { CircularProgress, Typography, IconButton, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ReactPlayer from 'react-player';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import * as moment from 'moment';
import PlayIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';

import { Modal } from '../../components';
import { useSelector, useDispatch } from '../../store/store-config';
import { ServerVideo } from '../../types/videos';
import { VideosActions } from '../../store/videos/actions';
import { DevicesActions } from '../../store/devices/actions';
import { DevicesTable } from './table';

type VideoModalParams = {
  video: ServerVideo;
  showType: 'preview' | 'movie';
};

export const LocalVideoModal: React.FunctionComponent = () => {
  const modalName = useSelector((state) => state.modal.name);
  const modalParams = useSelector((state) => state.modal.params);
  const params = modalParams as VideoModalParams;
  const devices = useSelector((state) => state.devices.list).filter((d) => d.videoUids.includes(params?.video?.uid));
  const isLoading = useSelector((state) => state.warning.loading.isLoadingData);
  const dispatch = useDispatch();

  const [value, setValue] = React.useState(0);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [error, setError] = React.useState(false);

  const valueLabelFormat = (val: number) => {
    if (!val) return '00:00';
    return moment.utc(val * 1000).format('HH:mm:ss');
  };

  const { t } = useTranslation();

  const [url, setUrl] = React.useState<string | null>(null);
  const [selectedDevices, setSelectedDevices] = React.useState<string[]>([]);

  React.useEffect(() => {
    dispatch(DevicesActions.player.prepare(selectedDevices, params.video.uid)).catch(console.warn);
  }, [selectedDevices]);

  const getVideoUrl = () => {
    if (!params.video?.[params.showType]?.url) {
      setUrl(null);
      return;
    }

    const uri = dispatch(VideosActions.local.getDataUrl(params.video.uid, params.showType));
    setUrl(uri);
  };

  React.useEffect(() => {
    getVideoUrl();
  }, [params.video?.[params.showType]?.url]);

  const renderVideoControls = () => {
    return (
      <Box sx={{ width: 250, justifyContent: 'center', marginBottom: 2 }}>
        <Slider
          value={value}
          min={0}
          step={1}
          max={params.video.duration}
          // scale={calculateValue}
          getAriaValueText={valueLabelFormat}
          valueLabelFormat={valueLabelFormat}
          onChange={(e, v) => {
            setValue(v as number);
            setTimeout(() => {
              dispatch(DevicesActions.player.seek(selectedDevices, v as number)).catch(console.warn);
            });
          }}
          valueLabelDisplay="auto"
          aria-labelledby="non-linear-slider"
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <IconButton
            onClick={() => {
              dispatch(DevicesActions.player.play(selectedDevices)).catch(console.warn);
            }}
          >
            <PlayIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              dispatch(DevicesActions.player.pause(selectedDevices)).catch(console.warn);
            }}
          >
            <PauseIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              dispatch(DevicesActions.player.stop(selectedDevices)).catch(console.warn);
            }}
          >
            <StopIcon />
          </IconButton>
        </div>
      </Box>
    );
  };

  const renderContainer = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {params.video.localStoragePreviewFile.isExist && (
          <Button onClick={() => setPreviewVisible(!previewVisible)}>{t('enums:Preview')}</Button>
        )}
        {previewVisible && (
          <div>
            {isLoading ? (
              <CircularProgress size={50} />
            ) : (
              <>
                <ReactPlayer url={url} width="100%" controls onError={() => setError(true)} />
                {error && (
                  <Typography fontSize={24} color="error">
                    Error
                  </Typography>
                )}
              </>
            )}
          </div>
        )}

        <Typography variant="h4">{params.video.name}</Typography>

        {renderVideoControls()}
        <Typography variant="h5" style={{ marginBottom: 5 }}>{`${t('T_DEVICES_WITH_VIDEO')}: `}</Typography>
        <DevicesTable devices={devices} setSelected={setSelectedDevices} />
      </div>
    );
  };
  return <Modal open={modalName === 'LocalVideo'}>{renderContainer()}</Modal>;
};
