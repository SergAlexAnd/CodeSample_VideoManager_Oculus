import * as React from 'react';

import TaskIcon from '@mui/icons-material/PlaylistAddCheck';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import useTheme from '@mui/material/styles/useTheme';
import { useDispatch } from 'react-redux';
import SyncIcon from '@mui/icons-material/Sync';
import IconButton from '@mui/material/IconButton';
import { orderBy } from 'lodash';

import { useSelector } from '../../store/store-config';
import { Badge } from '../Badge';
import { Popover } from '../Popover';
import { TaskItem } from './item';
import { BackgroundTasksActions } from '../../store/background-tasks/actions';
import { Grid } from '../Grid';
import { TaskItemProps } from './types';

export const TaskItems: React.FunctionComponent = () => {
  const downloadTasks = useSelector((state) => state.backgroundTasks.videoDownload);
  const uploadTasks = useSelector((state) => state.backgroundTasks.videoUpload);

  const tasksLength = downloadTasks.length + uploadTasks.length;

  const theme = useTheme();

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const renderSyncButton = () => {
    return (
      <IconButton
        aria-label="settings"
        onClick={() => {
          dispatch(BackgroundTasksActions.download.get());
          dispatch(BackgroundTasksActions.upload.get());
        }}
      >
        <SyncIcon color="success" style={{ width: 20, height: 20 }} />
      </IconButton>
    );
  };

  const renderContent = () => {
    if (tasksLength === 0)
      return (
        <div className="task-items-container">
          <Grid.Row
            className="task-items-container__header"
            verticalAlignment="center"
            style={{ background: theme.palette.background.default }}
          >
            <Typography style={{ color: theme.palette.text.primary }}>{t('T_NO_TASKS')}</Typography>
            {renderSyncButton()}
          </Grid.Row>
        </div>
      );
    return (
      <div className="task-items-container">
        <Grid.Row
          className="task-items-container__header"
          verticalAlignment="center"
          style={{ background: theme.palette.background.default }}
        >
          <Typography style={{ color: theme.palette.text.primary }}>{t('T_TASKS')}</Typography>
          {renderSyncButton()}
        </Grid.Row>
        <div className="task-items-container__body">
          {orderBy(
            downloadTasks
              .map((task) => (
                <TaskItem data={task} key={task.uid} onClose={() => dispatch(BackgroundTasksActions.download.delete(task.uid))} />
              ))
              .concat(
                uploadTasks.map((task) => (
                  <TaskItem data={task} key={task.uid} onClose={() => dispatch(BackgroundTasksActions.upload.delete(task.uid))} />
                ))
              ),
            (task) => new Date((task.props as TaskItemProps).data.created),
            ['desc']
          )}
        </div>
      </div>
    );
  };
  return (
    <Popover
      className="task-items-popover-root"
      anchor={{
        component: (
          <Badge badgeContent={tasksLength}>
            <TaskIcon style={{ width: 22, height: 22, marginRight: 5, marginLeft: 5 }} />
          </Badge>
        ),
      }}
    >
      {renderContent()}
    </Popover>
  );
};
