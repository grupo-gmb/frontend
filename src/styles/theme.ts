'use client';
import { createTheme } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';



export const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    allVariants: {
      fontFamily: 'Roboto, Arial, sans-serif'
    }
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#1D4ED8',
    },
    secondary: {
      main: '#9333EA',
    },
  },
  components: {
    // Configurações para compatibilidade com Tailwind
    MuiCssBaseline: {
      styleOverrides: {
        // Remove conflitos de CSS reset
      },
    },
  },
});