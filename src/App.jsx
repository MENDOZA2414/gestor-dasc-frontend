import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import RegisterStudent from './components/RegisterStudent';
import Home from './components/Home';
import UserStudent from './components/UserStudent';
import Header from './components/Header';

const AppContent = () => {
  const location = useLocation();

  const showHeaderRoutes = ['/', '/login', '/register', '/userStudent'];
  const showHeader = showHeaderRoutes.includes(location.pathname);

  return (
    <div>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterStudent />} />
        <Route path="/userStudent" element={<UserStudent />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;