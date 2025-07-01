import { useState, useEffect, useRef } from 'react';

import ModalContext from '@shared/ModalContext';
import Modal from "./Modal"
import ProgressBar from '@shared/components/ProgressBar';
import { FaUser, FaEnvelope, FaPhone, FaDatabase } from "react-icons/fa"
import { changeStudentStatus, getStudentById } from '@modules/admin/services/studentsService';
import { getUserById } from '@modules/admin/services/usersService';
import InputField from '@shared/components/InputField';
import Select from '@shared/components/Select';

/**
 * Modal especializado para mostrar información de estudiante.
 *
 * @param {boolean} isOpen
 * @param {function} onClose
 * @param {object} user - Información del usuario: firstName, firstLastName, logo
 * @param {ReactNode} children - Contenido adicional si es necesario
 */
const ModalEstudiante = ({ isOpen, onClose, matricula, editar }) => {
  const [modal, setModal] = useState({ name: null, props: {} });

  const [student, setStudent] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editando, setEditando] = useState(editar);
  const [aboutMe, setAboutMe] = useState("")
  const [knowledge, setKnowledge] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")

  const [selectedCareer, setSelectedCareer] = useState(student.career)
  const [selectedSemester, setSelectedSemester] = useState(student.semester)
  const [selectedShift, setSelectedShift] = useState(student.semester)
  const [selectedPeriod, setSelectedPeriod] = useState("2025-1")
  const [selectedGender, setSelectedGender] = useState("H")
  const [selectedStatus, setSelectedStatus] = useState(student.status)

  const careerOptions = [
    { value: "IDS", label: "IDS" },
    { value: "ITC", label: "ITC" },
    { value: "LATI", label: "LATI" },
  ]

  const semesterOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
  ]

  const shiftOptions = [
    { value: "TM", label: "TM" },
    { value: "TV", label: "TV" },
  ]

  const genderOptions = [
    { value: "H", label: "H" },
    { value: "M", label: "M" },
    { value: "Otro", label: "Otro" },
  ]

  const statusOptions = [
    { value: "Aceptado", label: "Aceptado" },
    { value: "Pendiente", label: "Pendiente" },
  ]

  useEffect(() => {
    setLoading(false)
  }, [])

  const handleSave = () => {
    console.log("Guardando cambios:", {
      career: selectedCareer,
      semester: selectedSemester,
      shift: selectedShift,
      period: selectedPeriod,
      gender: selectedGender,
      status: selectedStatus,
      aboutMe,
      knowledge,
      phone,
      email,
    })
    changeStudentStatus(matricula, selectedStatus)
    setEditando(false)
  }

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

  const colorClass = (status) => {
    if (status != null) {
      if (status.toLowerCase() === "aceptado") {
        return "bg-green-100 text-green-800"
      } else {
        return "bg-yellow-100 text-yellow-800"
      }
    }
    else return null
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
                    {editando ?
                      (
                        <InputField
                          placeholder={student.email}
                          value={email}
                          onChange={setEmail}
                          multiline={false}
                          rows={1}
                        />
                      )
                      :
                      (
                        <span>{student.email}</span>
                      )}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaPhone className="mr-2 text-gray-400" />
                    {editando ?
                      (
                        <InputField
                          placeholder={student.phone}
                          value={phone}
                          onChange={setPhone}
                          multiline={false}
                          rows={1}
                        />
                      )
                      :
                      (
                        <span>{student.phone}</span>
                      )}
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
              {editando ?
                (<InputField
                  placeholder="¡Escribe qué te gustaría que la gente supiera de ti!"
                  value={aboutMe}
                  onChange={setAboutMe}
                  multiline={true}
                  rows={2}
                />)
                :
                (<p className="mt-2 text-gray-600">{"studentData.aboutMe"}</p>)}
            </div>

            <div className="w-full mt-6">
              <h3 className="flex items-center text-lg font-medium">
                <span className="mr-2">💻</span>
                Conocimientos
              </h3>
              {editando ?
                (<InputField
                  placeholder="¡Descríbele a las entidades qué es lo que puedes hacer!"
                  value={knowledge}
                  onChange={setKnowledge}
                  multiline={true}
                  rows={2}
                />)
                :
                (<p className="mt-2 text-gray-600">{"studentData.aboutMe"}</p>)}
            </div>

            {editando ?
              (
                <div className="w-full mt-6 mx-2 flex items-center justify-center space-x-6">
                  <button
                    className="flex items-center justify-center py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                    onClick={handleSave}
                  >
                    <FaUser className="mr-2" /> Guardar información
                  </button>
                  <button
                    className="flex items-center justify-center py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                    onClick={() => setEditando(false)}
                  >
                    Cancelar
                  </button>
                </div>
              )
              :
              (
                <div className="w-full mt-16 mx-2 flex items-center justify-center space-x-6">
                  <button className="flex items-center justify-center py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    onClick={() => {
                      setEditando(true)
                      console.log({ editando })
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
              )
            }

          </div>
        </div>

        {/* Línea divisoria vertical */}
        <div className="hidden md:block w-px bg-gray-200 mx-6"></div>

        {/* Columna derecha con información académica - ahora más estrecha */}
        <div className="flex-1 mt-0 md:mt-0 md:pl-0 mx-8">
          <h3 className="text-xl font-medium mb-6">Información del alumno:</h3>

          <div className="grid grid-cols-2 gap-y-6">
            <div>
              <p className="text-gray-500 mb-2">Carrera:</p>
              {editando ? (
                <Select
                  value={selectedCareer}
                  onChange={setSelectedCareer}
                  options={careerOptions}
                  placeholder="Carrera"
                />
              ) : (
                <p className="font-medium">{student.career}</p>
              )}
            </div>

            <div>
              <p className="text-gray-500 mb-2">Semestre:</p>
              {editando ? (
                <Select
                  value={selectedSemester}
                  onChange={setSelectedSemester}
                  options={semesterOptions}
                  placeholder="Semestre"
                />
              ) : (
                <p className="font-medium">{student.semester}</p>
              )}
            </div>

            <div>
              <p className="text-gray-500 mb-2">Turno:</p>
              {editando ? (
                <Select
                  value={selectedShift}
                  onChange={setSelectedShift}
                  options={shiftOptions}
                  placeholder="Turno"
                />
              ) : (
                <p className="font-medium">{student.shift}</p>
              )}
            </div>

            <div>
              <p className="text-gray-500 mb-2">Sexo:</p>
              {editando ? (
                <Select
                  value={selectedGender}
                  onChange={setSelectedGender}
                  options={genderOptions}
                  placeholder="Género"
                />
              ) : (
                <p className="font-medium">H</p>
              )}
            </div>

            <div>
              <p className="text-gray-500 mb-2 ">Estado:</p>
              {editando ? (
                <Select
                  value={selectedStatus}
                  onChange={setSelectedStatus}
                  options={statusOptions}
                  placeholder="Estado"
                />
              ) : (
                <div className={`px-2 py-2 mr-14 rounded-full text-xs font-medium truncate ${colorClass(student.status)}`}>{student.status}</div>
              )}
            </div>
          </div>

          {/* Práctica en curso y ver datos */}
          <div className="mt-10">
            <h3 className="text-xl font-medium mb-6">Práctica en curso:</h3>

            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <FaDatabase className="text-blue-500" />
              </div>
              <span className="font-medium">Desarrollo de Sistema Web</span>
            </div>

            <ProgressBar percentage={66} height={15} />
            <div className="text-right text-sm text-gray-500 mt-1">66% finalizada</div>

            {!editando && (
              <button
                className="w-full flex items-center justify-center py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition mt-5"
                onClick={() => {
                  setModal({ name: "studentPractice", props: { data: student }}) }
                }
              >
                <span className="mr-2">📊</span> Ver datos de la práctica
              </button>
            )}
          </div>
        </div>
      </div >
    </Modal >
  )
}

export default ModalEstudiante