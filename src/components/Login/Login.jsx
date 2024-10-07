import React from 'react';

export default function Component() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">Iniciar sesión</h1>
        <h2 className="text-base font-normal text-gray-600 mb-6">Accede a tu cuenta</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Ingresa tu email"
            className="w-full px-3 py-2 text-base border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-black transition duration-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-left text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            placeholder="Ingresa tu contraseña"
            className="w-full px-3 py-2 text-base border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-black transition duration-300"
          />
        </div>

        <div className="flex items-center justify-start mb-4">
          <input type="checkbox" id="rememberMe" className="mr-2" />
          <label htmlFor="rememberMe" className="text-sm text-gray-600">
            Mantener sesión abierta
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-[#049774] text-white border-none rounded-lg py-3 px-5 text-base cursor-pointer mt-2 transition duration-300 hover:bg-[#037d5e]"
        >
          Acceder
        </button>

        <div className="mt-4 text-sm text-gray-600">
          <a href="/" className="text-blue-600 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
          <p className="mt-1">
            ¿No tienes cuenta?{' '}
            <a href="/" className="text-blue-600 hover:underline">
              Regístrate
            </a>
          </p>
        </div>
      </form>

      <footer className="mt-6 text-sm text-gray-500 text-center">
        2024 Universidad Autónoma de Baja California Sur
      </footer>
    </div>
  );
}