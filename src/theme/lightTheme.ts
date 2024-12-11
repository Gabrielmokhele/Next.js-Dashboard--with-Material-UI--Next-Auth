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
          background: 'linear-gradient(135deg, #6a82fb, #fc5c7d)', 
          color: '#fff', 
          '&:hover': {
            background: 'linear-gradient(135deg, #6a82fb, #fc5c7d)', 
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #6a82fb, #fc5c7d)', 
        },
      },
    },
  },
};

export default lightTheme;
