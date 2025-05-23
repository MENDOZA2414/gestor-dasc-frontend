import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@utils/api';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [retrySeconds, setRetrySeconds] = useState(null);
  const navigate = useNavigate();

  const routes = {
    1: '/userInternalAssessor',
    2: '/userStudent',
    3: '/userExternalAssessor',
    4: '/userCompany'
  };

  useEffect(() => {
    if (retrySeconds !== null && retrySeconds > 0) {
      const interval = setInterval(() => {
        setRetrySeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setError(null);
            setLoading(false);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [retrySeconds]);

  const doLogin = async (override = false) => {
    const body = { email, password, rememberMe };
    if (override) body.override = true;

    const response = await api.post('/users/login', body);
    localStorage.setItem('token', response.data.token);

    const { userTypeID, userID, controlNumber, roles } = response.data;
    sessionStorage.setItem('userTypeID', userTypeID);
    sessionStorage.setItem('userID', userID);
    sessionStorage.setItem('controlNumber', controlNumber);
    sessionStorage.setItem('roles', JSON.stringify(roles));

    sessionStorage.removeItem('alertShown');

    if (roles.includes('Admin') || roles.includes('SuperAdmin')) {
      window.location.replace('/admin/dashboard');
    } else if (routes[userTypeID]) {
      window.location.replace(routes[userTypeID]);
    }

    Swal.fire({
      icon: 'success',
      title: 'Sesión Iniciada',
      showConfirmButton: false,
      timer: 1500
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (retrySeconds !== null) return;

    setLoading(true);

    try {
      await doLogin();
    } catch (err) {
      const status = err?.response?.status;
      const code = err?.response?.data?.code;
      const retryAfter = err?.response?.data?.retryAfter;
      const attemptsRemaining = parseInt(err?.response?.headers['x-warning-attempts'], 10);

      if (status === 429 || code === 'TOO_MANY_REQUESTS') {
        if (!isNaN(retryAfter)) {
          setRetrySeconds(retryAfter);
          setLoading(false);
          const minutosRestantes = Math.ceil(retryAfter / 60);
          setError(`Demasiados intentos. Intenta de nuevo en ${minutosRestantes} minutos.`);
        } else {
          setError('Demasiados intentos. Intenta más tarde.');
        }
      } else if (!isNaN(attemptsRemaining) && attemptsRemaining <= 3) {
        setError(`Credenciales incorrectas. Te quedan ${attemptsRemaining} intento${attemptsRemaining === 1 ? '' : 's'}.`);
      } else if (status === 409 && code === 'SESSION_ACTIVE') {
        setLoading(false);
        if (!sessionStorage.getItem('alertShown')) {
          Swal.fire({
            title: 'Sesión activa detectada',
            text: 'Ya hay una sesión iniciada. ¿Deseas continuar en este dispositivo?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#049774',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, continuar aquí',
            cancelButtonText: 'Cancelar'
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                await doLogin(true);
              } catch (error) {
                setError('No se pudo continuar la sesión. Intenta nuevamente.');
              }
            }
          });
          sessionStorage.setItem('alertShown', 'true');
        }
      } else {
        setError('Credenciales incorrectas');
      }
    } finally {
      if (retrySeconds === null) {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-start pt-6 min-h-[calc(100vh-80px)] bg-gray-100 font-poppins overflow-auto px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg text-center">
          <h1 className="text-xl font-bold mb-1 text-gray-800">Iniciar sesión</h1>
          <h2 className="text-sm font-normal text-gray-600 mb-4">Accede a tu cuenta</h2>

          {loading && (
            <div className="flex justify-center items-center mb-4">
              <div className="w-5 h-5 border-2 border-[#049774] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {error && (
            <div className="mb-4">
              {error.includes('Demasiados intentos') ? (
                <>
                  <p className="text-red-500 text-sm font-semibold">Demasiados intentos.</p>
                  <p className="text-red-500 text-sm">
                    {retrySeconds !== null
                      ? `Intenta de nuevo en ${Math.floor(retrySeconds / 60)}:${(retrySeconds % 60).toString().padStart(2, '0')} minutos.`
                      : error.replace('Demasiados intentos. ', '')}
                  </p>
                </>
              ) : (
                <p className="text-red-500 text-sm">{error}</p>
              )}
            </div>
          )}

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
              disabled={retrySeconds !== null}
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
                disabled={retrySeconds !== null}
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
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              disabled={retrySeconds !== null}
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-700">
              Mantener sesión abierta
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#049774] text-white border-none rounded-lg py-2 px-4 text-sm cursor-pointer transition duration-300 hover:bg-[#037d5e] disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={retrySeconds !== null || loading}
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
