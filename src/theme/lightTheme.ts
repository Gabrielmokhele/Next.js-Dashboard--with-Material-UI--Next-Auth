import { ThemeOptions } from '@mui/material/styles';

const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#f50057', 
    },
    secondary: {
      main: '#2979ff',
    },
    background: {
      default: '#ffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: 'radial-gradient(862px at 6% 18%, rgb(21, 219, 149) 9.4%, rgb(26, 35, 160) 83.6%);', 
          color: '#fff',
          border:'none', 
          '&:hover': {
            background: 'radial-gradient(862px at 6% 18%, rgb(21, 219, 149) 9.4%, rgb(26, 35, 160) 83.6%);', 
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'radial-gradient(862px at 6% 18%, rgb(21, 219, 149) 9.4%, rgb(26, 35, 160) 83.6%);', 
        },
      },
    },
  },
};

export default lightTheme;
