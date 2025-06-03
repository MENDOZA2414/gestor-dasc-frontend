import { useState, useEffect, useRef } from 'react';

import ModalContext from '@shared/ModalContext';
import Modal from "./Modal"

/**
 * Modal especializado para mostrar información de estudiante.
 *
 * @param {boolean} isOpen
 * @param {function} onClose
 * @param {object} user - Información del usuario: firstName, firstLastName, logo
 * @param {ReactNode} children - Contenido adicional si es necesario
 */
const ModalVacante = ({ isOpen, onClose, vacante }) => {
  const [modal, setModal] = useState({ name: null, props: {} });

  /*const vacante = {
    title: "Administrador de Base de Datos",
    availableSpots: "13",
    description: "Se necesita un estudiante capacitado en Arquitectura de Base de Datos avanzado. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    requiredKnowledge: "Desarrollo de software a la medida enfocado en Bases de Datos,  manejo de estructura de datos, conocimientos sólidos de conexiones y colecciónes. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  }*/

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContext modal={modal} setModal={setModal} />
      <div className="flex flex-col md:flex-row md:h-[500px]">
        {/* Información de vacante */}
        <div className="mx-8 flex-shrink-0 w-full md:w-[400px] pr-6">
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
              {/* Datos */}
              <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                <h2 className="text-xl font-medium text-center md:text-left">{vacante.title}</h2>
                <p className="text-gray-500 text-sm mb-3">{vacante.availableSpots} Cupos disponibles</p>
              </div>
            </div>
          </div>

          <div className="w-full my-20"></div>

          {/* Información de vacante */}
          <div className="w-full mt-2">
            <h3 className="flex items-center text-lg font-medium">
              <span className="text-2xl mr-2">"</span>
              Acerca de
            </h3>
            <p className="mt-2 text-gray-600">{vacante.description}</p>
          </div>

          <div className="w-full mt-6">
            <h3 className="flex items-center text-lg font-medium">
              <span className="mr-2">💻</span>
              Conocimientos requeridos
            </h3>
            <p className="mt-2 text-gray-600">{vacante.requiredKnowledge}</p>
          </div>
        </div>

        {/* Línea divisoria vertical */}
        <div className="hidden md:block w-px bg-gray-200 mx-6"></div>

        {/* Columna derecha con datos generales */}
        <div className="flex-1 mt-0 md:mt-0 md:pl-0  mx-8">
          <h3 className="text-xl font-medium mb-6">Datos generales:</h3>

          <div className="grid grid-cols-2 gap-y-6">
            <div>
              <p className="text-gray-500">Modalidad:</p>
              <p className="font-medium">{vacante.modalidad}</p>
              <p className="text-gray-500">Razón social:</p>
              <p className="font-medium">{vacante.razonSocial}</p>
              <p className="text-gray-500">RFC:</p>
              <p className="font-medium">{vacante.RFC}</p>
              <p className="text-gray-500">Sector:</p>
              <p className="font-medium">{vacante.sector}</p>
              <p className="text-gray-500">Sitio Web:</p>
              <p className="font-medium">{vacante.sitioWeb}</p>
              <p className="text-gray-500">Beca económica o apoyo:</p>
              <p className="font-medium">{vacante.beca}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ModalVacante