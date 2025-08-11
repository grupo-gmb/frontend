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
      main: '#073965', // Azul escuro principal
      light: '#2E5A8C', // Tom mais claro
      dark: '#05234A', // Tom mais escuro
    },
    secondary: {
      main: '#108EC8', // Azul médio principal
      light: '#4BA9D6', // Tom mais claro
      dark: '#0C6B9A', // Tom mais escuro
    },
    success: { // Verde
      main: '#2E7D32', // Verde médio (baseado em Material Design)
      light: '#4CAF50', // Tom mais claro
      dark: '#1B5E20', // Tom mais escuro
    },
    error: { // Vermelho
      main: '#D32F2F', // Vermelho médio
      light: '#EF5350', // Tom mais claro
      dark: '#B71C1C', // Tom mais escuro
    },
    warning: { // Amarelo
      main: '#F9A825', // Amarelo médio
      light: '#FFCA28', // Tom mais claro
      dark: '#F57F17', // Tom mais escuro
    },
    grey: {
      300: '#C5CAD0', // Cinza claro para borders ou texto secundário
      100: '#F2F2F2', // Cinza muito claro para backgrounds
    },
    background: {
      default: '#F2F2F2', // Fundo padrão
      paper: '#FFFFFF', // Fundo de papéis (cards, modais)
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