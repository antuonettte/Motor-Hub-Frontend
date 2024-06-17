import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { createClient } from '@supabase/supabase-js';
import { AuthProvider } from './providers/AuthProvider';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

