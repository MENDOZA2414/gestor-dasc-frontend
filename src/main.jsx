import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './output.css'; /* Aquí solo los estilos globales */

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
