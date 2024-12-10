import { ThemeOptions } from '@mui/material/styles';

const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#f50057', // Base primary color
    },
    secondary: {
      main: '#2979ff',
    },
    background: {
      default: '#ffff',
    },
  },
  components: {
    // Example for applying gradient to Button using primary color
    MuiButton: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #6a82fb, #fc5c7d)', // Gradient applied here
          color: '#fff', // Optional: Set text color to white for contrast
          '&:hover': {
            background: 'linear-gradient(135deg, #6a82fb, #fc5c7d)', // Gradient on hover
          },
        },
      },
    },
    // You can apply a similar gradient style to other components as needed
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #6a82fb, #fc5c7d)', // Gradient on AppBar
        },
      },
    },
  },
};

export default lightTheme;
