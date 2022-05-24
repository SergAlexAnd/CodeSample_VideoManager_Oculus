import * as React from 'react';

import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

import * as styles from './auth.scss';
import { Navbar, PrimaryButton } from '../../components';
import { useDispatch } from '../../store/store-config';
import { AuthActions } from '../../store/auth/actions';

interface State {
  login: string;
  password: string;
  showPassword: boolean;
}

export const AuthPage: React.FunctionComponent = (): React.ReactElement => {
  const { t } = useTranslation();
  const theme = useTheme();

  const [values, setValues] = React.useState<State>({
    login: '',
    password: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const dispatch = useDispatch();

  const onSubmit = async () => {
    await dispatch(AuthActions.signIn({ login: values.login, password: values.password }));
  };

  return (
    <>
      <Navbar showNavigation={false} />
      <div className={styles.authFormContainer} style={{ background: theme.palette.background.default }}>
        <img src="/assets/electron.png" alt="logo" />

        <div>
          <Typography style={{ color: theme.palette.text.primary }} className={styles.title}>
            {t('T_MAIN_TITLE')}
          </Typography>
        </div>

        <div>
          <TextField
            id="outlined-basic"
            label={t('T_LOGIN')}
            variant="outlined"
            fullWidth
            value={values.login}
            onChange={handleChange('login')}
          />
        </div>
        <div>
          <FormControl sx={{ width: '40vw' }} variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">{t('T_PASSWORD')}</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSubmit().catch(console.warn);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>
        <PrimaryButton className={styles.button} color="primary" variant="contained" onClick={onSubmit}>
          {t('T_SIGN_IN')}
        </PrimaryButton>
      </div>
    </>
  );
};
