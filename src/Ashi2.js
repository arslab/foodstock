import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import AppHeader from './AshiHeader';
import AppFooter from './AshiFooter';
import Kintai from './AshiKintai2';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import { useLocation } from 'react-router-dom'
//import { withAuthenticator } from '@aws-amplify/ui-react';
const theme = createTheme({
  palette: {
    primary: {
      main: '#424242',
    },
    secondary: {
      main: '#ff7043',
      contrastText: '#ffffff'
    },
  },
});

//詳細ページ
function Ashi2() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
        <AppHeader/>
        <Box sx={{ py: 2, flex: 1, backgroundColor: (theme) => theme.palette.grey[100]}}>
          <Kintai/>
        </Box>
        <AppFooter/>
      </Box>
    </ThemeProvider>
  );
}

export default Ashi2;