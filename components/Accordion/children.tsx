import * as React from 'react';

import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { ServerVideo } from '../../types/videos';
import { DevicesActions } from '../../store/devices/actions';
import { useDispatch, useSelector } from '../../store/store-config';
import { DevicesTable } from '../../modals/local-video-modal/table';
import { Grid } from '../Grid';

type AccordionChildrenProps = {
  video: ServerVideo;
};

export const AccordionChildren: React.FC<AccordionChildrenProps> = ({ video }) => {
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices.list).filter((d) => !d.videoUids.includes(video.uid));

  const { t } = useTranslation();

  const [selectedDevices, setSelectedDevices] = React.useState<string[]>([]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Grid.Row verticalAlignment="center" style={{ justifyContent: 'space-between', marginBottom: 5 }}>
        <Typography fontSize={12} style={{ fontWeight: 600 }}>{`${t('T_DEVICES_WITHOUT_VIDEO')}: `}</Typography>
        <Button
          disabled={selectedDevices.length === 0}
          variant="outlined"
          style={{ fontSize: 10 }}
          onClick={() => {
            dispatch(DevicesActions.devices.videos.uploadOnManyDevices(video.uid, selectedDevices)).catch(console.warn);
          }}
        >
          {t('T_UPLOAD_ON_DEVICES')}
        </Button>
      </Grid.Row>
      <DevicesTable devices={devices} setSelected={setSelectedDevices} style={{ height: 208, width: '100%' }} />
    </div>
  );
};
