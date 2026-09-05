import { createTheme } from '@mui/material/styles';

export const createThemeApp = (darkmode: boolean) => createTheme({
  palette: {
    mode: darkmode ? 'dark' : 'light',

    primary: {
      main: darkmode ? '#004229' : '#49b134',
    },

    secondary: {
      main: '#9c27b0',
    },

  },

  

  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});