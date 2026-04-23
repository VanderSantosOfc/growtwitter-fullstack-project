import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#1d9bf0', 
    },
    background: {
      default: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30, 
          padding: '8px 20px',
          fontWeight: 'bold',
          textTransform: 'none', 
        },
      },
    },
  },
});