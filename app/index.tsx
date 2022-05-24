import * as React from 'react';

import { ThemeProvider } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useInitTheme } from '../utils/theme';
import { useInitApp } from '../hooks/init-hook';
import { AuthPage, VideosPage, HomePage } from '../pages';
import { useCheckAuth } from '../hooks/check-auth';
import { useSnackBar } from '../hooks/useSnackBar';
import { LocalVideos } from '../pages/LocalVideos';

export const InitComponent: React.FunctionComponent = () => {
  const theme = useInitTheme();
  const { isAuthenticated } = useCheckAuth();
  useInitApp(isAuthenticated);
  useSnackBar();

  const renderContent = () => {
    return (
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        {/* <Route path="/tasks" element={<TasksPage />} /> */}
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/local-videos" element={<LocalVideos />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  };
  return <ThemeProvider theme={theme}>{renderContent()}</ThemeProvider>;
};
