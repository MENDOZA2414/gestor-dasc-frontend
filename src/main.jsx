import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './input.css'; // Tailwind + estilos globales
import AppRouter from './router/AppRouter';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
