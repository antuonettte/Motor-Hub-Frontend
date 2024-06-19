import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from './App';
import { AuthProvider } from './providers/AuthProvider';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <App />
      </LocalizationProvider>
    </AuthProvider>
  </React.StrictMode>
);

