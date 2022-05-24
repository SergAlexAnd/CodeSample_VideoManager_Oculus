import { useEffect, useMemo, useState } from 'react';

import { useSnackbar } from 'notistack';

import { useSelector } from '../store/store-config';

export const useSnackBar = (): void => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [oldMessages, setOldMessages] = useState<string[]>([]);
  const snackBarMessages = useSelector((state) => state.warning.snackbar);

  const messages = useMemo(() => snackBarMessages, [snackBarMessages]);

  useEffect(() => {
    if (snackBarMessages.length > 0) {
      snackBarMessages.forEach((m) => {
        if (!oldMessages.includes(m.uuid)) {
          enqueueSnackbar(m.text, { variant: m.status, key: m.uuid });
          setOldMessages((prevState) => [...prevState, m.uuid]);
          setTimeout(() => closeSnackbar(m.uuid), 2500);
        }
      });
      setTimeout(() => setOldMessages([]), 10000);
    }
  }, [messages]);
};
