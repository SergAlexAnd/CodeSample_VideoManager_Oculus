import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { BasicMenu } from '../Menu';
import { useSelector, useDispatch } from '../../store/store-config';
import { AppActions } from '../../store/app/actions';
import { NavbarProps } from './types.d';
import { AuthActions } from '../../store/auth/actions';
import { TaskItems } from '../Tasks';

// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const Navbar: React.FC<NavbarProps> = ({ showNavigation = true }) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  // const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const { t } = useTranslation();

  // const theme = useTheme();

  const themeMode = useSelector((state) => state.app.theme);
  const networkStatus = useSelector((state) => state.app.networkStatus);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const pages = [
    {
      name: t('T_HOME'),
      id: 'home',
      onClick: () => {
        navigate('/home');
        handleCloseNavMenu();
      },
    },
    {
      name: t('T_VIDEO_LIBRARY'),
      id: 'local-videos',
      onClick: () => {
        navigate('/local-videos');
        handleCloseNavMenu();
      },
    },
    {
      name: t('T_VIDEOS'),
      id: 'videos',
      onClick: () => {
        navigate('/videos');
        handleCloseNavMenu();
      },
    },
    // {
    //   name: t('T_TASKS'),
    //   id: 'tasks',
    //   onClick: () => {
    //     navigate('/tasks');
    //     handleCloseNavMenu();
    //   },
    // },
  ];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  // const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  const menuItems = [
    { onClick: () => dispatch(AppActions.changeLanguage('en')), children: 'English', id: 'en' },
    { onClick: () => dispatch(AppActions.changeLanguage('ru')), children: 'Russian', id: 'ru', divider: showNavigation },
    // { onClick: () => {}, children: <Divider /> }
    {
      onClick: () => dispatch(AuthActions.signOut()),
      children: (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <LogoutIcon style={{ width: 14, height: 14, marginRight: 5 }} />
          {t('T_SIGN_OUT')}
        </div>
      ),
      id: 'logout',
    },
  ].filter((item) => (showNavigation ? true : item.id !== 'logout'));

  return (
    <AppBar position="static" style={{ height: 64 }}>
      {/* <Container> */}
      <Toolbar disableGutters style={{ padding: '0 20' }}>
        <img src="/assets/electron.png" alt="logo" style={{ maxHeight: 35 }} />
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          {showNavigation && (
            <>
              {' '}
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => {
                  const idDisabledVideos = page.id === 'videos' && networkStatus === 'offline';
                  return (
                    <MenuItem
                      key={page.id}
                      onClick={idDisabledVideos ? undefined : page.onClick}
                      style={{ pointerEvents: idDisabledVideos ? 'none' : 'auto', opacity: idDisabledVideos ? 0.7 : 1 }}
                    >
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  );
                })}
              </Menu>
            </>
          )}
        </Box>
        {/* <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          LOGO
        </Typography> */}
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {showNavigation &&
            pages.map((page) => (
              <Button
                key={page.id}
                disabled={page.id === 'videos' && networkStatus === 'offline'}
                onClick={page.onClick}
                sx={{ my: 2, ml: 3, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
        </Box>

        <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex', alignItems: 'center' } }}>
          <IconButton onClick={() => dispatch(AppActions.toggleTheme())} color="default">
            {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          {showNavigation && <TaskItems />}

          <BasicMenu iconSize={20} items={menuItems} />

          {/* <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
        </Box>
      </Toolbar>
      {/* </Container> */}
    </AppBar>
  );
};
