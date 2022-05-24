import * as React from 'react';

import { CircularProgress, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ReactPlayer from 'react-player';

import { Modal } from '../../components';
import { useSelector, useDispatch } from '../../store/store-config';
import { ServerVideo } from '../../types/videos';
import { VideosActions } from '../../store/videos/actions';

type VideoModalParams = {
  video: ServerVideo;
  showType: 'preview' | 'movie';
};

export const VideoPreviewModal: React.FunctionComponent = () => {
  const modalName = useSelector((state) => state.modal.name);
  const modalParams = useSelector((state) => state.modal.params);
  const isLoading = useSelector((state) => state.warning.loading.isLoadingData);
  const dispatch = useDispatch();

  const params = modalParams as VideoModalParams;

  const { t } = useTranslation();

  const [url, setUrl] = React.useState<string | null>(null);

  const getVideoUrl = async () => {
    if (!params.video?.[params.showType]?.url) {
      setUrl(null);
      return;
    }

    const blob = await dispatch(VideosActions.external.getFile(params.video?.[params.showType]?.url));
    const objectUrl = URL.createObjectURL(blob);
    setUrl(objectUrl);
  };

  React.useEffect(() => {
    getVideoUrl().catch(console.warn);
  }, [params.video?.[params.showType]?.url]);

  const renderContainer = () => {
    if (!params.video || !params.video?.[params.showType])
      return (
        <>
          <Typography variant="h4">{params.video.name}</Typography>
          <Typography>{t('T_VIDEO_UNAVAILABLE')}</Typography>
        </>
      );
    return (
      <>
        {/* <video width="750" height="500" controls>
          <track kind="captions" />
          <source src={`http://localhost:8001/${serverVideo.preview.url}`} type="video/mp4" />
        </video> */}
        {isLoading ? (
          <CircularProgress size={50} />
        ) : (
          <ReactPlayer
            url={url}
            width="100%"
            controls
            // config={{
            //   file: {
            //     forceHLS: true,
            //     hlsOptions: {
            //       forceHLS: true,
            //       debug: false,
            //       xhrSetup: (xhr: XMLHttpRequest) => {
            //         xhr.setRequestHeader('token', token);
            //       },
            //     },
            //   },
            // }}
          />
        )}

        <Typography variant="h4">{params.video.name}</Typography>
      </>
    );
  };
  return <Modal open={modalName === 'VideoPreview'}>{renderContainer()}</Modal>;
};
