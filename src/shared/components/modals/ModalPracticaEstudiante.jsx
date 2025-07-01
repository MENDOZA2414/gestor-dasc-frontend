import { useState, useEffect, useRef } from 'react';

import ModalContext from '@shared/ModalContext';
import Modal from "./Modal"
import { DataTable } from '@shared/components/datatable';
import { FaUser, FaEnvelope, FaPhone, FaDatabase } from "react-icons/fa"
import ProgressBar from '@shared/components/ProgressBar';
import GoalProgressBar from '@shared/components/GoalProgressBar';
import { deleteFile, getStudentFiles } from '@modules/admin/services/studentsService';
import IconButton from '@shared/components/buttons/IconButton';

/**
 * Modal especializado para mostrar información de estudiante.
 *
 * @param {boolean} isOpen
 * @param {function} onClose
 * @param {ReactNode} children - Contenido adicional si es necesario
 */
const ModalPracticaEstudiante = ({ isOpen, onClose, data }) => {
  const statusOptions = [
    { value: "aceptado", label: "Aceptado", color: "bg-green-100 text-green-800" },
    { value: "rechazado", label: "Rechazado", color: "bg-red-100 text-red-800" },
    { value: "revision", label: "En Revisión", color: "bg-blue-100 text-blue-800" },
    { value: "pendiente", label: "Pendiente", color: "bg-yellow-100 text-yellow-800" },
  ]

  const studentData = {
    practice: {
      name: "Administrador de Base de Datos",
      progress: 66,
    },
  }

  const [student, setStudent] = useState(data);
  const [archivos, setStudentFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const tableRef = useRef(null);
  const cardRef = useRef(null);

  const [modal, setModal] = useState({ name: null, props: {} });

  const base = 'https://uabcs.online/practicas/';

  useEffect(() => {
    setStudent(data)
    const fetchStudentFiles = async () => {
      try {
        const data = await getStudentFiles(student.controlNumber);
        setStudentFiles(data);
        console.log(data)
      } catch (error) {
        console.error('Error al cargar estudiantes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentFiles();
  }, []);

  const filtered = archivos;
  const minRows = 6;
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
      render: (row) => (row.isEmpty ? <div className="h-9"></div> : <span className="truncate">{row.fileName}</span>),
    },
    {
      label: 'Tamaño del archivo',
      key: 'tamano',
      render: (row) => (row.isEmpty ? <div className="h-9"></div> : <span className="truncate">{"row.fileSize"}</span>),
    },
    {
      label: 'Fecha',
      key: 'fecha',
      render: (row) => (row.isEmpty ? <div className="h-9"></div> : <span className="truncate">{"row.fecha"}</span>),
    },
    {
      label: 'Estado',
      key: 'estado',
      render: (row) => {
        if (row.isEmpty) return <div className="h-9"></div>;

        const statusOption = statusOptions.find(opt => opt.value === row.status?.toLowerCase());
        const colorClass = statusOption ? statusOption.color : "bg-gray-100 text-gray-800";

        return (
          <div className="flex gap-2 justify-center">
            <div className="mt-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium truncate ${colorClass}`}>{row.status}</span>
              {/*<span className="truncate">{row.status}</span>*/}
            </div>
          </div>
        );
      },
    },
    {
      label: 'Acciones',
      key: 'actions',
      center: true,
      render: (row) => {
        if (row.isEmpty) return <div className="h-9"></div>;
        return (
          <div className="flex gap-2 justify-center mx-4">
            <IconButton icon="eye" title="Ver" onClick={() => window.open(`https://gestor-dasc-backend.onrender.com/api/documents/view?path=${row.filePath.replace(base, '')}`, '_blank')} />
            <IconButton icon="download" title="Descargar" onClick={() => window.open(`https://gestor-dasc-backend.onrender.com/api/documents/view?path=${row.filePath.replace(base, '')}&download=true`, '_blank')} />
            <IconButton icon="delete" title="Delete" onClick={() => deleteFile(row.documentID)} />
          </div>
        );
      },
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={'Datos de práctica de ' + (student ? student.firstName + " " + student.firstLastName + " " + student.secondLastName : "")} >
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