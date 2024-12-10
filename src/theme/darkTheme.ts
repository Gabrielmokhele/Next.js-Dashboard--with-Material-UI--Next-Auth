import { ThemeOptions } from '@mui/material'

const darkTheme: ThemeOptions ={
  palette: {
    mode: 'dark',
    primary: {
      main: '#f50057',
    },
    secondary: {
      main: '#2979ff',
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
    
  },
}

export default darkTheme;

