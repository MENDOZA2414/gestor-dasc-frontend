import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import api from '../api';  // Importar la instancia de Axios configurada
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [contentHeight, setContentHeight] = useState('100vh');
  const navigate = useNavigate(); // Definir navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/user/login', {
        email,
        password,
      });
      console.log('Login exitoso:', response.data);

      const { token, userTypeID } = response.data;

      // Debug: Verificar el valor de userTypeID
      console.log('userTypeID:', userTypeID);

      localStorage.setItem('token', token);
      localStorage.setItem('userTypeID', userTypeID);

      // Asegurarse de que el navigate esté siendo llamado correctamente
      if (userTypeID === 1) {
        console.log('Navigating to /userInternalAssessor');
        navigate('/userInternalAssessor');
      } else if (userTypeID === 2) {
        console.log('Navigating to /userStudent');
        navigate('/userStudent');
      } else if (userTypeID === 3) {
        console.log('Navigating to /userExternalAssessor');
        navigate('/userExternalAssessor');
      } else if (userTypeID === 4) {
        console.log('Navigating to /userCompany');
        navigate('/userCompany');
      } else {
        console.error('userTypeID no coincide con ninguno de los casos esperados.');
      }
    } catch (err) {
      console.error('Error en el login:', err);
      setError('Credenciales incorrectas');
    }
  };


  return (
    <div className="font-poppins flex flex-col justify-between items-center bg-gray-100 overflow-hidden" style={{ height: contentHeight }}>
      <div className="w-full max-w-md flex-grow flex flex-col justify-center items-center overflow-y-auto py-8">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 w-full text-center">
          <h1 className="text-2xl font-bold mb-2 text-gray-800">Iniciar sesión</h1>
          <h2 className="text-base font-normal text-gray-600 mb-6">Accede a tu cuenta</h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="mb-4">
            <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Ingresa tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-base border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-black transition duration-300"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-left text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-base border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-black transition duration-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? <FaEyeSlash className="h-5 w-5 text-gray-500" /> : <FaEye className="h-5 w-5 text-gray-500" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-start mb-6">
            <input type="checkbox" id="rememberMe" className="mr-2 w-4 h-4" />
            <label htmlFor="rememberMe" className="text-sm text-gray-600">
              Mantener sesión abierta
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#049774] text-white border-none rounded-lg py-3 px-5 text-base cursor-pointer transition duration-300 hover:bg-[#037d5e]"
          >
            Acceder
          </button>

          <div className="mt-4 text-sm text-gray-600">
            <a href="/" className="text-blue-600 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </form>

        <div className="mt-6 text-sm text-gray-600 text-center">
          ¿No tienes cuenta?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Regístrate
          </a>
        </div>
      </div>

      <footer className="w-full py-4 text-sm text-gray-500 text-center">
        2024 Universidad Autónoma de Baja California Sur
      </footer>
    </div>
  );
}
