import { useState, useEffect, useRef } from 'react';

import ModalContext from '@shared/ModalContext';
import Modal from "./Modal"
import ProgressBar from '@shared/components/ProgressBar';
import { FaUser, FaEnvelope, FaPhone, FaDatabase } from "react-icons/fa"
import { getInternalAssessorById } from '@modules/admin/services/assessorsService';

/**
 * Modal especializado para mostrar información de estudiante.
 *
 * @param {boolean} isOpen
 * @param {function} onClose
 * @param {object} user - Información del usuario: firstName, firstLastName, logo
 * @param {ReactNode} children - Contenido adicional si es necesario
 */
const ModalEditarAsesor = ({ isOpen, onClose, internalAssessorID }) => {
  const [modal, setModal] = useState({ name: null, props: {} });

  const [internalAssessor, setInternalAssessor] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInternalAssessor = async () => {
      try {
        const data = await getInternalAssessorById(internalAssessorID);
        console.log(data)
        setInternalAssessor(data);
      } catch (error) {
        console.error('Error al cargar asesor interno:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInternalAssessor();
  }, []);

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
              {internalAssessor.photo ? (
                <div className="w-[150px] h-[150px] rounded-full overflow-hidden border border-gray-300 flex-shrink-0">
                  <img
                    src={internalAssessor.photo || "/placeholder.svg"}
                    alt={internalAssessor.firstName}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="w-[150px] h-[150px] rounded-full bg-blue-200 flex items-center justify-center text-6xl text-gray-500 flex-shrink-0">
                </div>
              )}

              {/* Datos personales */}
              <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                <h2 className="text-xl font-medium text-center md:text-left">{internalAssessor.firstName} {internalAssessor.firstLastName} {internalAssessor.secondLastName}</h2>

                <div className="w-full mt-4 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <FaUser className="mr-2 text-gray-400" />
                    <span>ID: {internalAssessor.userID}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaEnvelope className="mr-2 text-gray-400" />
                    <span>{"student.email"}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaPhone className="mr-2 text-gray-400" />
                    <span>{"student.phone"}</span>
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
              <p className="mt-2 text-gray-600">{"studentData.aboutMe"}</p>
            </div>

            <div className="w-full mt-6">
              <h3 className="flex items-center text-lg font-medium">
                <span className="mr-2">💻</span>
                Conocimientos
              </h3>
              <p className="mt-2 text-gray-600">{"studentData.knowledge"}</p>
            </div>

            <div className="w-full mt-16 mx-2 flex items-center justify-center space-x-6">
              <button className="flex items-center justify-center py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                onClick={() => {
                  setModal({
                    name: 'assessorEdit', props: {
                      internalAssessorID: internalAssessorID
                    }
                  })
                }}>
                <FaUser className="mr-2" /> Editar información
              </button>
            </div>
          </div>
        </div>

        {/* Línea divisoria vertical */}
        <div className="hidden md:block w-px bg-gray-200 mx-6"></div>

        {/* Columna derecha con información académica - ahora más estrecha */}
        <div className="flex-1 mt-0 md:mt-0 md:pl-0  mx-8">
          <h3 className="text-xl font-medium mb-6">Información del asesor:</h3>

          <div className="grid grid-cols-2 gap-y-6">
            <div>
              <p className="text-gray-500">Carrera:</p>
              <p className="font-medium">{"student.career"}</p>
            </div>
            <div>
              <p className="text-gray-500">Semestre:</p>
              <p className="font-medium">{"student.semester"}</p>
            </div>
            <div>
              <p className="text-gray-500">Turno:</p>
              <p className="font-medium">{"student.shift"}</p>
            </div>
            <div>
              <p className="text-gray-500">Periodo:</p>
              <p className="font-medium">{2025 / 1}</p>
            </div>
            <div>
              <p className="text-gray-500">Sexo:</p>
              <p className="font-medium">{"studentData.gender"}</p>
            </div>
            <div>
              <p className="text-gray-500">Estado:</p>
              <p className="font-medium">{"student.status"}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ModalEditarAsesor