import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import { Store } from './Store/Store';
const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme({
  palette:{
    customs:{
      white:'#ffffff',
      whiteAccent:'#F4F4F4',
      blue:'#003E71',
      blueAccent:'#ADC1DC'
    }
  }
})
root.render(
  <React.StrictMode>
    <Provider store={Store}>
    <ThemeProvider theme={theme}>
    <Router>
    <App />
    </Router>
    </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

