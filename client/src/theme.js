import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    text: {
      primary: '#FF76D6',
    },
  },
  typography: {
    fontFamily: [
      'Nova Square',
      'sans-serif', // Fallback font here
    ].join(','),
  },
});

export default theme;