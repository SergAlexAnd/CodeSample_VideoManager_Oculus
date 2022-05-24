import * as React from 'react';

import { Card, CardContent, Typography, Tooltip } from '@mui/material';
import * as moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@material-ui/core/IconButton/IconButton';

import { ServerVideo } from '../../types/videos';
import { GridColumn } from '../Grid/grid-column';
import { Grid } from '../Grid';
import { useGetCover } from './hook';

type VideoItemProps = {
  data: ServerVideo;
  onClick?: (item: ServerVideo) => void;
  onDelete?: () => void;
};

export const DeviceVideoItem: React.FunctionComponent<VideoItemProps> = ({ data, onClick = () => {}, onDelete = () => {} }) => {
  const { name, description } = data;

  const [coverType, setCoverType] = React.useState<'local' | 'external' | 'error'>('local');

  const { pictureUrl } = useGetCover(data, coverType);

  const getDuration = () => {
    if (!data.duration) return '00:00';
    return moment.utc(data.duration * 1000).format('HH:mm:ss');
  };

  return (
    <Card style={{ height: 130, width: '100%', marginTop: 15, background: 'transparent' }} onClick={() => onClick(data)}>
      <CardContent>
        <Grid.Row>
          <GridColumn col={3} verticalAlignment="center">
            <img
              alt={description}
              onError={() => {
                if (coverType === 'local') setCoverType('external');
                if (coverType === 'external') setCoverType('error');
              }}
              src={pictureUrl}
              style={{ height: 100, borderRadius: 5 }}
            />
          </GridColumn>
          <GridColumn col={9}>
            <Grid.Row verticalAlignment="start" style={{ justifyContent: 'space-between' }}>
              <GridColumn col={10}>
                <Typography style={{ fontSize: 14, fontWeight: 600 }}>{name}</Typography>
                <Tooltip title={description ?? '-'}>
                  <Typography className="device-video-description">{description ?? '-'}</Typography>
                </Tooltip>
                <Typography style={{ fontSize: 10 }}>{getDuration()}</Typography>
              </GridColumn>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                <DeleteIcon style={{ width: 16, height: 16 }} />
              </IconButton>
            </Grid.Row>
          </GridColumn>
        </Grid.Row>
      </CardContent>
    </Card>
  );
};
