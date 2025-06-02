import { useState, useEffect, useRef } from 'react';

import ModalContext from '@shared/ModalContext';
import Modal from "./Modal"
import ProgressBar from '@shared/components/ProgressBar';
import InputField from '@shared/components/InputField';
import { FaUser, FaEnvelope, FaPhone, FaDatabase } from "react-icons/fa"

/**
 * Modal especializado para mostrar información de estudiante.
 *
 * @param {boolean} isOpen
 * @param {function} onClose
 * @param {object} user - Información del usuario: firstName, firstLastName, logo
 * @param {ReactNode} children - Contenido adicional si es necesario
 */
const ModalEditarEstudiante = ({ isOpen, onClose, user }) => {
  const [modal, setModal] = useState({ name: null, props: {} });

  const [aboutMe, setAboutMe] = useState("")
  const [knowledge, setKnowledge] = useState("")

  const studentData = {
    fullName: "Alan Martín Agúndez Meza",
    id: "2023456702",
    email: "aagundez_21@alu.uabcs.mx",
    phone: "6121587915",
    about: "Estudiante casi-egresado de la UABCS! Estudiante de Ingeniería en Desarrollo de Software.",
    skills: "Especializado en programación Orientada a Objetos, Animación 3D y Diseñador Gráfico Digital.",
    career: "IDS",
    semester: "8vo",
    shift: "TM",
    period: "2025/I",
    gender: "H",
    status: "A",
    practice: {
      name: "Administrador de Base de Datos",
      progress: 66,
    },
  }

  const getInitials = (name) => {
    const nameParts = name.split(" ")
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`
    }
    return nameParts[0][0]
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContext modal={modal} setModal={setModal} />
      <div className="flex flex-col md:flex-row">
        {/* Información de estudiante */}
        <div className="mx-8 flex-shrink-0 w-full md:w-[500px] pr-6">
          <div className="flex flex-col">
            {/* Datos personales  y Foto*/}
            <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
              {/* Avatar */}
              {user.logo ? (
                <div className="w-[150px] h-[150px] rounded-full overflow-hidden border border-gray-300 flex-shrink-0">
                  <img
                    src={user.logo || "/placeholder.svg"}
                    alt={studentData.fullName}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="w-[150px] h-[150px] rounded-full bg-blue-200 flex items-center justify-center text-6xl text-gray-500 flex-shrink-0">
                  {getInitials(studentData.fullName)}
                </div>
              )}

              {/* Datos personales */}
              <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                <h2 className="text-xl font-medium text-center md:text-left">{studentData.fullName}</h2>

                <div className="w-full mt-4 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <FaUser className="mr-2 text-gray-400" />
                    <span>ID: {studentData.id}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaEnvelope className="mr-2 text-gray-400" />
                    <span>{studentData.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaPhone className="mr-2 text-gray-400" />
                    <span>{studentData.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* "Sobre mí" y Conocimientos */}
            <div className="w-full mt-2">
              <h3 className="flex items-center text-lg font-medium">
                <span className="text-2xl mr-2">"</span>
                Sobre mí
              </h3>
              <InputField
                placeholder="¡Escribe qué te gustaría que la gente supiera de ti!"
                value={aboutMe}
                onChange={setAboutMe}
                multiline={true}
                rows={2}
              />
            </div>

            <div className="w-full mt-6">
              <h3 className="flex items-center text-lg font-medium">
                <span className="mr-2">💻</span>
                Conocimientos
              </h3>
              <InputField
                placeholder="¡Descríbele a las entidades qué es lo que puedes hacer!"
                value={knowledge}
                onChange={setKnowledge}
                multiline={true}
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Línea divisoria vertical */}
        <div className="hidden md:block w-px bg-gray-200 mx-6"></div>

        {/* Columna derecha con información académica - ahora más estrecha */}
        <div className="flex-1 mt-0 md:mt-0 md:pl-0  mx-8">
          <h3 className="text-xl font-medium mb-6">Información del alumno:</h3>

          <div className="grid grid-cols-2 gap-y-6">
            <div>
              <p className="text-gray-500">Carrera:</p>
              <p className="font-medium">{studentData.career}</p>
            </div>
            <div>
              <p className="text-gray-500">Semestre:</p>
              <p className="font-medium">{studentData.semester}</p>
            </div>
            <div>
              <p className="text-gray-500">Turno:</p>
              <p className="font-medium">{studentData.shift}</p>
            </div>
            <div>
              <p className="text-gray-500">Periodo:</p>
              <p className="font-medium">{studentData.period}</p>
            </div>
            <div>
              <p className="text-gray-500">Sexo:</p>
              <p className="font-medium">{studentData.gender}</p>
            </div>
            <div>
              <p className="text-gray-500">Estado:</p>
              <p className="font-medium">{studentData.status}</p>
            </div>
          </div>

          {/* Práctica en curso y ver datos */}
          <div className="mt-10">
            <h3 className="text-xl font-medium mb-6">Práctica en curso:</h3>

            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <FaDatabase className="text-blue-500" />
              </div>
              <span className="font-medium">{studentData.practice.name}</span>
            </div>

            <ProgressBar percentage={studentData.practice.progress} height={15} />
            <div className="text-right text-sm text-gray-500 mt-1">
              {studentData.practice.progress}% finalizada
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-6 mx-2 flex items-center justify-center space-x-6">
        <button className="flex items-center justify-center py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
          <FaUser className="mr-2" /> Guardar Información
        </button>
      </div>
    </Modal>
  )
}

export default ModalEditarEstudiante