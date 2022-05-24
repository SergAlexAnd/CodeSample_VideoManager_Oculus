import * as React from 'react';

import { Card, CardContent, Tooltip, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PreviewIcon from '@mui/icons-material/MovieSharp';
import MovieIcon from '@mui/icons-material/MovieOutlined';

import { ServerVideo } from '../../types/videos';
import { VideosActions } from '../../store/videos/actions';
import { useDispatch } from '../../store/store-config';
import { GridColumn } from '../Grid/grid-column';
import { BasicMenu } from '../Menu';
import { Grid } from '../Grid';
import { useGetCover } from './hook';

type VideoItemProps = {
  data: ServerVideo;
  onClick?: (item: ServerVideo) => void;
};

export const ShopVideoItem: React.FunctionComponent<VideoItemProps> = ({ data, onClick = () => {} }) => {
  const { name, description } = data;
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [coverType, setCoverType] = React.useState<'external' | 'error'>('external');

  const { pictureUrl } = useGetCover(data, coverType);

  return (
    <Card
      style={{ height: 305, width: 260, marginRight: 20, marginBottom: 20, boxShadow: 'none', background: 'transparent' }}
      onClick={() => onClick(data)}
    >
      <CardContent style={{ paddingRight: 20 }}>
        <img
          src={pictureUrl}
          alt={description}
          style={{ marginBottom: 10, height: 210, borderRadius: 5 }}
          onError={() => {
            if (coverType === 'external') setCoverType('error');
          }}
        />
        <Grid.Row>
          <GridColumn col={9} verticalAlignment="center">
            <Typography
              style={{
                fontSize: 14,
                fontWeight: 600,
                marginRight: 5,
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                width: 220,
              }}
            >
              {name}
            </Typography>
          </GridColumn>
          <GridColumn col={3} horizontalAlignment="end">
            <BasicMenu
              items={[
                {
                  onClick: () => {
                    dispatch(VideosActions.local.import(data.uid, !!data.preview)).catch(console.warn);
                  },
                  children: t('T_ADD_TO_LIBRARY'),
                  id: 'add',
                },
              ]}
            />
          </GridColumn>
        </Grid.Row>
        <Tooltip title={description}>
          <Typography className="shop-item-description">{description}</Typography>
        </Tooltip>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title={t('enums:Preview')}>
            <PreviewIcon style={{ width: 14, height: 14, display: data.preview ? 'block' : 'none' }} />
          </Tooltip>
          <Tooltip title={t('enums:Movie')}>
            <MovieIcon style={{ width: 14, height: 14, display: data.movie ? 'block' : 'none' }} />
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  );
};
