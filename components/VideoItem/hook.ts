import * as React from 'react';

import { useDispatch } from '../../store/store-config';
import { VideosActions } from '../../store/videos/actions';
import { ServerVideo } from '../../types/videos';

export const useGetCover = (data: ServerVideo, type: 'local' | 'external' | 'error') => {
  const [pictureUrl, setPictureUrl] = React.useState<string | null>(null);
  const { cover } = data;

  const dispatch = useDispatch();

  const getPictureUrl = async () => {
    if (!cover?.url) {
      setPictureUrl(null);
      return;
    }
    let url = null;
    if (type === 'local') {
      url = dispatch(VideosActions.local.getDataUrl(data.uid, 'cover'));
    }

    if (!url || type === 'external') {
      const blob = await dispatch(VideosActions.external.getFile(cover?.url, { showWarning: false }));
      url = URL.createObjectURL(blob);
    }

    if (!url || type === 'error') {
      url = 'assets/no-picture.png';
    }

    setPictureUrl(url);
  };

  React.useEffect(() => {
    getPictureUrl().catch(console.warn);
  }, [cover?.url, type]);

  return { pictureUrl };
};
