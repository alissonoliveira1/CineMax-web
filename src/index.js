import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './contexts/user';
import { StepProvider } from './contexts/contxPassos';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <StepProvider>
    <UserProvider>
    <App />
    </UserProvider>
    </StepProvider>
  </React.StrictMode>
);
