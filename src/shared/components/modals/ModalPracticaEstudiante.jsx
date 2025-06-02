import { useState, useEffect, useRef } from 'react';

import ModalContext from '@shared/ModalContext';
import Modal from "./Modal"
import { DataTable } from '@shared/components/datatable';
import { FaUser, FaEnvelope, FaPhone, FaDatabase } from "react-icons/fa"
import ProgressBar from '@shared/components/ProgressBar';
import GoalProgressBar from '@shared/components/GoalProgressBar';

/**
 * Modal especializado para mostrar información de estudiante.
 *
 * @param {boolean} isOpen
 * @param {function} onClose
 * @param {object} user - Información del usuario: firstName, firstLastName, logo
 * @param {ReactNode} children - Contenido adicional si es necesario
 */
const ModalPracticaEstudiante = ({ isOpen, onClose, user }) => {

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

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const tableRef = useRef(null);
  const cardRef = useRef(null);

  const [modal, setModal] = useState({ name: null, props: {} });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudents();
        setStudents(data);
      } catch (error) {
        console.error('Error al cargar estudiantes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const getFilteredStudents = () => {
    return students.filter((student) => {
      const matchSearch = (student.name || '').toLowerCase().includes(search.toLowerCase());

      const matchFilters =
        activeFilters.length === 0 ||
        activeFilters.includes(student.career) ||
        activeFilters.includes(student.semester) ||
        activeFilters.includes(student.shift) ||
        activeFilters.includes(student.internalAssessor);

      return matchSearch && matchFilters;
    });
  };

  const filtered = getFilteredStudents();
  const minRows = 4;
  const filledData = [...filtered];

  if (filtered.length < minRows) {
    const emptyRows = Array(minRows - filtered.length)
      .fill()
      .map((_, index) => {
        const isLastRow = index === minRows - filtered.length - 1;
        return {
          id: `empty-${index}`,
          name: '',
          tamano: '',
          fecha: '',
          estado: '',
          isEmpty: true,
          isLastRow,
        };
      });

    filledData.push(...emptyRows);
  }

  useEffect(() => {
    if (tableRef.current) {
      const lastRow = tableRef.current.querySelector('tbody tr:last-child');
      if (lastRow) {
        lastRow.style.borderBottom = 'none';
      }
    }
  }, [filledData]);

  const columns = [
    {
      label: 'Nombre',
      key: 'name',
      render: (row) => (row.isEmpty ? <div className="h-9"></div> : <span className="truncate">{row.name}</span>),
    },
    {
      label: 'Tamaño del archivo',
      key: 'tamano',
      render: (row) => (row.isEmpty ? <div className="h-9"></div> : <span className="truncate">{row.matricula}</span>),
    },
    {
      label: 'Fecha',
      key: 'fecha',
      render: (row) => (row.isEmpty ? <div className="h-9"></div> : <span className="truncate">{row.career}</span>),
    },
    {
      label: 'Estado',
      key: 'estado',
      render: (row) => (row.isEmpty ? <div className="h-9"></div> : <span className="truncate">{row.semester}</span>),
    },
    {
      label: 'Acciones',
      key: 'actions',
      center: true,
      render: (row) => {
        if (row.isEmpty) return <div className="h-9"></div>;
        return (
          <div className="flex gap-2 justify-center">
            <IconButton icon="eye" title="Ver" />
            <IconButton icon="edit" title="Editar" onClick={() => console.log('Editar alumno', row)} />
          </div>
        );
      },
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={'Datos de práctica de ' + studentData.fullName} >
      <ModalContext modal={modal} setModal={setModal} />

      {/* Práctica en curso */}
      <div className="mt-10 mx-28">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            <FaDatabase className="text-blue-500" />
          </div>
          <span className="font-medium">{studentData.practice.name}
            <div className="text-left text-sm text-gray-500 mt-1">
              {studentData.practice.progress}% finalizada
            </div>
          </span>
        </div>

        <ProgressBar percentage={studentData.practice.progress} height={25} />
        <div className="mt-4">
          <GoalProgressBar percentage={studentData.practice.progress} />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-col">
        <div className="mx-8 flex-shrink-0 w-full md:w-[900px] pr-6 my-8">
          <DataTable
            columns={columns}
            data={filledData}
            emptyMessage={loading ? 'Cargando archivos...' : 'No hay archivos para mostrar.'}
            ref={tableRef}
          />
        </div>
      </div>
    </Modal>
  )
}

export default ModalPracticaEstudiante