import { ComponentsOverrides, PaletteColorOptions, PaletteMode, Theme } from '@mui/material';
import { grey, blueGrey } from '@mui/material/colors';
import { darken, lighten, invert } from 'polished';

const getMaterialUiColor = (color: string): PaletteColorOptions => {
  return { main: color, light: lighten(0.2, color), dark: darken(0.2, color), contrastText: invert(color) };
};

// const primaryColor = {
//   50: '#e0f4ff',
//   100: '#b3e4ff',
//   200: '#80d3ff',
//   300: '#4dc1ff',
//   400: '#26b3ff',
//   500: '#00a6ff',
//   600: '#009eff',
//   700: '#0095ff',
//   800: '#008bff',
//   900: '#007bff',
//   A100: '#ffffff',
//   A200: '#f2f8ff',
//   A400: '#bfdaff',
//   A700: '#a6ccff',
// };

const lightPalette = {
  // palette values for light mode
  primary: getMaterialUiColor('#00a6ff'),
  secondary: getMaterialUiColor('#F48F2C'),
  divider: blueGrey[200],
  text: {
    primary: grey[900],
    secondary: grey[800],
  },
  background: {
    default: '#f7f7f7',
  },
};

const darkPalette = {
  // palette values for dark mode
  primary: getMaterialUiColor('#00a6ff'),
  secondary: getMaterialUiColor('#F48F2C'),
  divider: blueGrey[700],
  background: {
    default: grey[900],
    paper: grey[700],
  },
  text: {
    primary: '#fff',
    secondary: '#f5f5f5',
  },
};

export const getDesignTokens = (mode: PaletteMode) => {
  const palette = mode === 'light' ? lightPalette : darkPalette;
  return {
    typography: {
      fontFamily: `Rubik`,
      fontSize: 26,
      // button: {
      //   color: 'green',
      // },
    } as Partial<Theme['typography']>,
    overrides: {
      // MuiButtonBase: {
      //   text: { fontSize: 20, color: 'red' },
      //   root: {
      //     color: 'white',
      //   },
      // },
      MuiCssBaseline: {
        '@global': {
          body: {
            transition: 'all 0.3s linear',
          },
        },
      },
    } as ComponentsOverrides,
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        // most basic recommended timing
        standard: 300,
        // this is to be used in complex animations
        complex: 375,
        // recommended when something is entering screen
        enteringScreen: 225,
        // recommended when something is leaving screen
        leavingScreen: 195,
      },
    } as Partial<Theme['transitions']>,
    palette: {
      mode,
      ...palette,
    } as Partial<Theme['palette']>,
  } as Partial<Theme>;
};
