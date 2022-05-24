import * as React from 'react';

import Card from '@mui/material/Card/Card';
import CardHeader from '@mui/material/CardHeader/CardHeader';
import CardContent from '@mui/material/CardContent/CardContent';
import IconButton from '@mui/material/IconButton/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import FailIcon from '@mui/icons-material/CancelOutlined';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import * as moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

import { BackgroundTasksStatuses, VideoContentTypes } from '../../enums/enums';
import { useSelector } from '../../store/store-config';
import { Grid } from '../Grid';
import { TypeGuards } from '../../types/type-guards';
import { TaskItemProps } from './types';

export const TaskItem: React.FunctionComponent<TaskItemProps> = ({ data, onClose }) => {
  const state = BackgroundTasksStatuses[data.state] as keyof typeof BackgroundTasksStatuses;
  const videosByUid = useSelector((s) => s.videos.externalByUid);
  const localByUid = useSelector((s) => s.videos.localByUid);
  const devicesByUid = useSelector((s) => s.devices.listByUid);

  const isUploadTask = TypeGuards.tasks.isUpload(data);

  const { t } = useTranslation();

  const device = isUploadTask ? devicesByUid[data.deviceUid] : undefined;
  const currentVideoName = isUploadTask ? localByUid[data.videoUid]?.name ?? '-' : videosByUid[data.videoUid]?.name ?? '-';
  const type = isUploadTask ? '' : t(`enums:${VideoContentTypes[data.contentType]}`);

  const deviceName = isUploadTask && device ? `${device.name ?? ''} - ${device.deviceName}` : '';

  const statusIcon = {
    Undefined: <></>,
    ToDo: <></>,
    InProgress: <></>,
    Done: <CheckIcon color="success" style={{ width: 10, height: 10 }} />,
    Failed: <FailIcon color="error" style={{ width: 10, height: 10 }} />,
  } as Record<keyof typeof BackgroundTasksStatuses, React.ReactNode>;

  return (
    <Card className="task-item-card">
      <CardHeader
        title={
          <>
            <Typography style={{ fontSize: 16 }}>{currentVideoName}</Typography>
            <Typography style={{ fontSize: 12 }}>{type}</Typography>
            <Typography style={{ fontSize: 12, marginRight: 10 }}>{deviceName}</Typography>
          </>
        }
        subheader={
          <Grid.Row verticalAlignment="center">
            <Typography style={{ fontSize: 10, marginRight: 10 }}>{moment(data.created).fromNow()}</Typography>
            {statusIcon[state]}
          </Grid.Row>
        }
        action={
          <IconButton aria-label="settings" onClick={onClose}>
            <CancelIcon color="success" style={{ width: 16, height: 16 }} />
          </IconButton>
        }
      />
      <CardContent>
        {/* <Grid.Row> */}
        {state === 'InProgress' && <LinearProgress color="success" />}
        {state === 'ToDo' && <LinearProgress color="warning" />}
        {/* <Grid.Column col={7}>
            <Typography>{data.deviceName}</Typography>
            <Typography>{data.operationSystem}</Typography>
          </Grid.Column>
          <Grid.Column col={4}>
            <Typography>{data.serialNumber}</Typography>
            <Typography>{data.uniqueIdentifier}</Typography>
          </Grid.Column>
        </Grid.Row> */}
      </CardContent>
    </Card>
  );
};
