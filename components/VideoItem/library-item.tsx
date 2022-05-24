import * as React from 'react';

import { Card, CardContent, Tooltip, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import * as moment from 'moment';
import PreviewIcon from '@mui/icons-material/MovieSharp';
import MovieIcon from '@mui/icons-material/MovieOutlined';
import CheckIcon from '@mui/icons-material/Check';

import { ServerVideo } from '../../types/videos';
import { VideosActions } from '../../store/videos/actions';
import { useDispatch, useSelector } from '../../store/store-config';
import { BasicMenu } from '../Menu';
import { Grid } from '../Grid';
import { DevicesActions } from '../../store/devices/actions';
import { CustomAccordion } from '../Accordion';
import { useGetCover } from './hook';

type VideoItemProps = {
  data: ServerVideo;
  onClick?: (item: ServerVideo) => void;
  onCardClick?: (item: ServerVideo) => void;
  selected?: boolean;
  truncated?: boolean;
};

export const LibraryVideoItem: React.FunctionComponent<VideoItemProps> = ({
  data,
  onClick = () => {},
  onCardClick = () => {},
  truncated = false,
  selected,
}) => {
  const { name, description } = data;
  const { t } = useTranslation();
  const [coverType, setCoverType] = React.useState<'local' | 'external' | 'error'>('local');

  const stateDevices = useSelector((state) => state.devices.list).filter(
    (d) => !d?.videoUids?.includes(data.uid) && d.isConnected
  );
  const dispatch = useDispatch();

  const devices = !data.localStorageMovieFile.isExist ? [] : stateDevices;

  const { pictureUrl } = useGetCover(data, coverType);

  const getDuration = () => {
    if (!data.duration) return '00:00';
    return moment.utc(data.duration * 1000).format('HH:mm:ss');
  };

  return (
    <Card
      className="video-library-item"
      style={{ width: '100%', marginTop: 15, paddingBottom: truncated ? 12 : undefined, opacity: selected ? 0.7 : 1 }}
      onClick={() => onCardClick(data)}
    >
      <CardContent>
        <Grid.Row style={{ flexWrap: 'nowrap' }}>
          <div style={{ minWidth: 100 }}>
            <img
              src={pictureUrl}
              alt={description}
              style={{ height: 100, borderRadius: 5 }}
              onClick={() => onClick(data)}
              role="presentation"
              onError={() => {
                if (coverType === 'local') setCoverType('external');
                if (coverType === 'external') setCoverType('error');
              }}
            />
          </div>
          <div style={{ display: 'flex', flexGrow: 1, marginLeft: 15 }}>
            <Grid.Row verticalAlignment="start" style={{ justifyContent: 'space-between' }}>
              <Grid.Column col={10}>
                <Typography style={{ fontSize: 14, fontWeight: 600 }}>{name}</Typography>
                <Tooltip title={description ?? '-'}>
                  <Typography className="library-item-descirption">{description ?? '-'}</Typography>
                </Tooltip>
                <Typography style={{ fontSize: 10 }}>{getDuration()}</Typography>
                <div style={{ display: 'flex' }}>
                  <Tooltip title={t('enums:Preview')}>
                    <PreviewIcon
                      style={{ width: 14, height: 14, display: data.localStoragePreviewFile.isExist ? 'block' : 'none' }}
                    />
                  </Tooltip>
                  <Tooltip title={t('enums:Movie')}>
                    <MovieIcon
                      style={{ width: 14, height: 14, display: data.localStorageMovieFile.isExist ? 'block' : 'none' }}
                    />
                  </Tooltip>
                </div>
              </Grid.Column>
              {selected && <CheckIcon />}
              {!truncated && (
                <BasicMenu
                  items={[
                    {
                      onClick: () => {},
                      children: t('T_ADD_TO_DEVICE'),
                      id: 'add',
                    },
                    ...devices.map((d) => ({
                      onClick: () => dispatch(DevicesActions.devices.uploadVideo(d, data)),
                      children: (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: 350 }}>
                          <Typography
                            style={{
                              fontSize: 10,
                              fontWeight: 600,
                              maxWidth: 180,
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >{`${d.name ?? '-'} ${d.deviceName}`}</Typography>
                        </div>
                      ),
                      id: d.uid,
                    })),
                    {
                      onClick: () => {
                        dispatch(VideosActions.local.delete(data.uid)).catch(console.warn);
                      },
                      children: t('T_DELETE'),
                      id: 'delete',
                    },
                  ].filter(({ id }) => (devices.length === 0 ? id !== 'add' : true))}
                />
              )}
            </Grid.Row>
          </div>
        </Grid.Row>
        {!truncated && <CustomAccordion video={data} disabled={!data.localStorageMovieFile.isExist} />}
      </CardContent>
    </Card>
  );
};
