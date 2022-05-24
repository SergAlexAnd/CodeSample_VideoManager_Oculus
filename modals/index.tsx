import * as React from 'react';

import { useSelector } from '../store/store-config';
import { ModalNames } from '../types/modal';
import { DeviceModal } from './device';
import { LocalVideoModal } from './local-video-modal';
import { SearchDeviceModal } from './search-device';
import { VideoPreviewModal } from './video-modal';

const modalContent: { [key in ModalNames]: React.ReactElement } = {
  SearchDevice: <SearchDeviceModal />,
  VideoPreview: <VideoPreviewModal />,
  DeviceModal: <DeviceModal />,
  LocalVideo: <LocalVideoModal />,
  '': <></>,
};

export const Modals: React.FunctionComponent = (): React.ReactElement => {
  const name = useSelector((state) => state.modal.name);
  return <>{modalContent[name]}</>;
};
