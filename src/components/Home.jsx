import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

export default function Home() {
  const navigate = useNavigate();
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    api.get('/user/protected')
      .then(res => {
        const { userTypeID } = res.data.user;
        const routes = {
          1: '/userInternalAssessor',
          2: '/userStudent',
          3: '/userExternalAssessor',
          4: '/userCompany'
        };
        if (routes[userTypeID]) {
          window.location.href = routes[userTypeID];
        } else {
          setCheckingSession(false); // tipo desconocido
        }
      })
      .catch(() => {
        setCheckingSession(false); // no hay sesión
      });
  }, [navigate]);

  return (
    <div className="font-poppins flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="mt-16 text-center px-4">
          <h1 className="text-4xl font-bold mb-4">
            La <span className="text-blue-600">gestión de prácticas</span> del DASC bajo control
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Simplificamos y unificamos los procesos de prácticas profesionales de nuestro departamento para que ganes tiempo, seguridad y tranquilidad.
          </p>
        </div>

        <div className="flex flex-wrap justify-center px-4 md:px-8 lg:px-16">
          <div className="w-full md:w-5/12 p-4">
            <div className="bg-white rounded-3xl shadow-md border border-gray-200 h-full">
              <div className="p-8 flex flex-col h-full">
                <h2 className="text-2xl font-semibold mb-4 text-center">¿Qué son las prácticas profesionales?</h2>
                <p className="text-justify">
                  Las Prácticas Profesionales son actividades curriculares que el alumnado del DASC realiza en alguna organización pública, privada o social, con el propósito de consolidar y complementar el desarrollo de sus competencias y conocimientos adquiridos en su formación académica.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-5/12 p-4">
            <div className="bg-white rounded-3xl shadow-md border border-gray-200 h-full">
              <div className="p-8 flex flex-col h-full">
                <h2 className="text-2xl font-semibold mb-4 text-center">Su objetivo</h2>
                <p className="text-justify">
                  Las prácticas Profesionales tienen como objetivo general que los alumnos pongan en práctica los conocimientos adquiridos en el transcurso de su formación profesional, cubriendo un total de 160 hrs.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#1b1d2d] text-white py-16 mt-8">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-medium mb-4">Una plataforma moderna y actualizada para los alumnos</h2>
            <p className="text-xl mb-4">Creada por y para alumnos, esta herramienta cumple un rol importante en el proceso académico de cada alumno del departamento.</p>
            <a href="#" className="inline-block px-4 py-2 text-base font-bold text-white border-2 border-white rounded-2xl hover:bg-blue-600 hover:border-blue-600 transition-colors">
              Continua leyendo
            </a>
          </div>
        </div>
      </main>

      <footer className="bg-[#0f1119] text-white py-6 px-8">
        <div className="container mx-auto flex flex-col items-center md:flex-row md:justify-between">
          <p className="mb-4 md:mb-0">2024 © Universidad Autónoma de Baja California Sur</p>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/uabcsdsc?locale=es_LA" target="_blank" rel="noopener noreferrer" className="text-2xl text-white hover:text-blue-600 transition-colors">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/dasc_uabcs?igsh=ZjEwbmg5ZWRyMDlt" target="_blank" rel="noopener noreferrer" className="text-2xl text-white hover:text-blue-600 transition-colors">
              <FaInstagram />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
