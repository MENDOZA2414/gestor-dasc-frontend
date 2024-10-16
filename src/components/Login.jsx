import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';  // Importar SweetAlert2


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/user/login', { email, password });
      console.log('Login exitoso:', response.data);

      const { token, userTypeID } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userTypeID', userTypeID);

      const routes = {
        1: '/userInternalAssessor',
        2: '/userStudent',
        3: '/userExternalAssessor',
        4: '/userCompany'
      };

      if (routes[userTypeID]) {
        navigate(routes[userTypeID]);
        Swal.fire({
          icon: 'success',
          title: 'Login exitoso',
          showConfirmButton: false,
          timer: 1500
        });
        
      } else {
        console.error('userTypeID no coincide con ninguno de los casos esperados.');
      }
    } catch (err) {
      console.error('Error en el login:', err);
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="flex justify-center items-start pt-6 min-h-[calc(100vh-80px)] bg-gray-100 font-poppins overflow-auto px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg text-center">
          <h1 className="text-xl font-bold mb-1 text-gray-800">Iniciar sesión</h1>
          <h2 className="text-sm font-normal text-gray-600 mb-4">Accede a tu cuenta</h2>

          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

          <div className="mb-3">
            <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Ingresa tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-3">
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
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? <FaEyeSlash className="h-4 w-4 text-gray-500" /> : <FaEye className="h-4 w-4 text-gray-500" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-start mb-4">
            <input
              type="checkbox"
              id="rememberMe"
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-700">
              Mantener sesión abierta
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#049774] text-white border-none rounded-lg py-2 px-4 text-sm cursor-pointer transition duration-300 hover:bg-[#037d5e]"
          >
            Acceder
          </button>

          <div className="mt-3 text-sm text-gray-700">
            <a href="/" className="text-blue-600 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <div className="mt-4 text-sm text-gray-700">
            ¿No tienes cuenta?{' '}
            <a href="/preRegister" className="text-blue-600 hover:underline">
              Regístrate
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}