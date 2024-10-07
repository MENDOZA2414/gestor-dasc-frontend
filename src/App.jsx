import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';  // Asumiendo que tienes un componente Login
import RegisterStudent from './components/RegisterStudent/RegisterStudent';  // Importa el nuevo componente

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  {/* Ruta para el login */}
        <Route path="/register" element={<RegisterStudent />} />  {/* Ruta para el registro */}
      </Routes>
    </Router>
  );
};

export default App;
