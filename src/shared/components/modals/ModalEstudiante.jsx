import { useState, useEffect, useRef } from 'react';

import ModalContext from '@shared/ModalContext';
import Modal from "./Modal"
import ProgressBar from '@shared/components/ProgressBar';
import { FaUser, FaEnvelope, FaPhone, FaDatabase } from "react-icons/fa"
import { getStudentById } from '@modules/admin/services/studentsService';
import { getUserById } from '@modules/admin/services/usersService';

/**
 * Modal especializado para mostrar información de estudiante.
 *
 * @param {boolean} isOpen
 * @param {function} onClose
 * @param {object} user - Información del usuario: firstName, firstLastName, logo
 * @param {ReactNode} children - Contenido adicional si es necesario
 */
const ModalEstudiante = ({ isOpen, onClose, matricula }) => {
  const [modal, setModal] = useState({ name: null, props: {} });

  const [student, setStudent] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await getStudentById(matricula);
        setStudent(data);
      } catch (error) {
        console.error('Error al cargar estudiante:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();

    const fetchUser = async () => {
      try {
        const data = await getUserById(student.userID);
        setUser(data);
      } catch (error) {
        console.error('Error al cargar usuario:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  /*useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(userID);
        setUser(data);
      } catch (error) {
        console.error('Error al cargar usuario:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);*/

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
              {student.photo ? (
                <div className="w-[150px] h-[150px] rounded-full overflow-hidden border border-gray-300 flex-shrink-0">
                  <img
                    src={student.photo || "/placeholder.svg"}
                    alt={student.firstName}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="w-[150px] h-[150px] rounded-full bg-blue-200 flex items-center justify-center text-6xl text-gray-500 flex-shrink-0">
                </div>
              )}

              {/* Datos personales */}
              <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                <h2 className="text-xl font-medium text-center md:text-left">{student.firstName} {student.firstLastName} {student.secondLastName}</h2>

                <div className="w-full mt-4 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <FaUser className="mr-2 text-gray-400" />
                    <span>ID: {student.controlNumber}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaEnvelope className="mr-2 text-gray-400" />
                    <span>{student.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaPhone className="mr-2 text-gray-400" />
                    <span>{student.phone}</span>
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
                  setModal({ name: 'studentEdit', props: { matricula }, })
                }}>
                <FaUser className="mr-2" /> Editar información
              </button>
              <button className="flex items-center justify-center py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                onClick={() => {
                  setModal({ name: 'studentFiles', props: { matricula }, })
                }}>
                <span className="mr-2">📄</span> Documentos alumno
              </button>
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
              <p className="font-medium">{student.career}</p>
            </div>
            <div>
              <p className="text-gray-500">Semestre:</p>
              <p className="font-medium">{student.semester}</p>
            </div>
            <div>
              <p className="text-gray-500">Turno:</p>
              <p className="font-medium">{student.shift}</p>
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
              <p className="font-medium">{student.status}</p>
            </div>
          </div>

          {/* Práctica en curso y ver datos */}
          <div className="mt-10">
            <h3 className="text-xl font-medium mb-6">Práctica en curso:</h3>

            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <FaDatabase className="text-blue-500" />
              </div>
              <span className="font-medium">{"studentData.practice.name"}</span>
            </div>

            <ProgressBar percentage={66} height={15} />
            <div className="text-right text-sm text-gray-500 mt-1">
              {66}% finalizada
            </div>

            <button className="w-full flex items-center justify-center py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition mt-5" onClick={() => {
              setModal({ name: 'studentPractice', props: { matricula }, })
            }}>
              <span className="mr-2">📊</span> Ver datos de la práctica
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ModalEstudiante