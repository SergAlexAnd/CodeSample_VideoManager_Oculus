import * as React from 'react';

import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box/Box';
import Slider from '@mui/material/Slider';
import PlayIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { DevicesActions } from '../../store/devices/actions';
import { useDispatch, useSelector } from '../../store/store-config';
import { Grid } from '../Grid';
import { ServerVideo } from '../../types/videos';

import { getDuration } from '../../utils/get-duration';
import './styles.scss';

const ICON_SIZE = 16;

let delayTimer: NodeJS.Timeout;

export const Player: React.FC = () => {
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices.selectedDevices);
  const selectedVideoUid = useSelector((state) => state.videos.selectedVideo);
  const byUid = useSelector((state) => state.videos.localByUid);

  const video: ServerVideo | undefined = byUid[selectedVideoUid];

  const [value, setValue] = React.useState(0);

  const { t } = useTranslation();

  // const [selectedDevices, setSelectedDevices] = React.useState<string[]>([]);

  const seek = (v: number) => {
    clearTimeout(delayTimer);
    delayTimer = setTimeout(() => {
      dispatch(DevicesActions.player.seek(devices, v)).catch(console.warn);
    }, 300) as unknown as NodeJS.Timeout;
  };

  const renderVideoControls = () => {
    return (
      <Box sx={{ width: '60vw', justifyContent: 'center', visibility: devices.length === 0 ? 'hidden' : 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography fontSize={12} style={{ fontWeight: 600, width: '10vw', marginRight: 15 }}>
            {video?.name ?? ''}
          </Typography>
          <Typography fontSize={12} style={{ fontWeight: 400, marginRight: 20 }}>
            {getDuration(value)}
          </Typography>
          <Slider
            disabled={devices.length === 0 || !video}
            value={value}
            min={0}
            step={1}
            max={video?.duration ?? 0}
            // scale={calculateValue}
            getAriaValueText={getDuration}
            valueLabelFormat={getDuration}
            onChange={(e, v) => {
              setValue(v as number);
              seek(v as number);
            }}
            valueLabelDisplay="auto"
            aria-labelledby="non-linear-slider"
          />
          <Typography fontSize={12} style={{ fontWeight: 400, marginLeft: 15 }}>
            {getDuration(video?.duration ?? 0)}
          </Typography>
          <IconButton
            style={{ marginLeft: 10 }}
            onClick={() => {
              dispatch(DevicesActions.player.play(devices)).catch(console.warn);
            }}
          >
            <PlayIcon style={{ width: ICON_SIZE, height: ICON_SIZE }} />
          </IconButton>
          <IconButton
            onClick={() => {
              dispatch(DevicesActions.player.pause(devices)).catch(console.warn);
            }}
          >
            <PauseIcon style={{ width: ICON_SIZE, height: ICON_SIZE }} />
          </IconButton>
          <IconButton
            onClick={() => {
              dispatch(DevicesActions.player.stop(devices)).catch(console.warn);
              setValue(0);
              seek(0);
            }}
          >
            <StopIcon style={{ width: ICON_SIZE, height: ICON_SIZE }} />
          </IconButton>
          <Button
            disabled={devices.length === 0 || !video}
            variant="outlined"
            style={{ fontSize: 10, marginLeft: 15, padding: '5px 30px' }}
            onClick={() => {
              dispatch(DevicesActions.player.prepare(devices, video.uid)).catch(console.warn);
            }}
          >
            {t('T_PREPARE')}
          </Button>
        </div>
      </Box>
    );
  };

  return (
    <div className={`player-container ${devices.length > 0 ? 'visible' : ''}`}>
      {renderVideoControls()}
      <Grid.Row verticalAlignment="center" style={{ justifyContent: 'space-between', marginBottom: 5 }}>
        {/* <Typography fontSize={12} style={{ fontWeight: 600 }}>{`${t('T_DEVICES_WITH_VIDEO')}: `}</Typography> */}
      </Grid.Row>
      {/* <DevicesTable devices={devices} setSelected={setSelectedDevices} style={{ height: 150, width: '100%' }} /> */}
    </div>
  );
};
