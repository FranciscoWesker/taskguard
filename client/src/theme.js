import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4f46e5', // indigo-600
    },
    secondary: {
      main: '#f59e0b', // amber-500
    },
    background: {
      default: '#f5f5f5',
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme; 