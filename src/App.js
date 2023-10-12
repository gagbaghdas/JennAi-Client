import React from 'react';
import Routing from './routes';
import { ThemeProvider, createTheme } from '@mui/material/styles';


function App() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Routing />
    </ThemeProvider>
  );
}

export default App;
