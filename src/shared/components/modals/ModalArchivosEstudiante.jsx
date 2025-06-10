import { useState, useEffect, useRef } from 'react';

import ModalContext from '@shared/ModalContext';
import Modal from "./Modal"
import { DataTable } from '@shared/components/datatable';
import { Search, Filters } from '@shared/components/filters';
import { getStudentById, getStudentFiles, deleteFile, markFileAsOnReview, markFileAsRejected, markFileAsAccepted } from '@modules/admin/services/studentsService';
import IconButton from '@shared/components/buttons/IconButton';
import StatusModal from "@shared/components/StatusModal"

/**
 * Modal especializado para mostrar información de estudiante.
 *
 * @param {boolean} isOpen
 * @param {function} onClose
 * @param {object} user - Información del usuario: firstName, firstLastName, logo
 * @param {ReactNode} children - Contenido adicional si es necesario
 */
const ModalArchivosEstudiante = ({ isOpen, onClose, matricula }) => {

  const [student, setStudent] = useState([]);

  const [statusModal, setStatusModal] = useState({
    isOpen: false,
    currentStatus: "",
    fileId: null,
  })

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

  }, []);

  const base = 'https://uabcs.online/practicas/';

  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const tableRef = useRef(null);
  const cardRef = useRef(null);

  const [modal, setModal] = useState({ name: null, props: {} });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudentFiles(matricula);
        setStudents(data);
        console.log(data)
      } catch (error) {
        console.error('Error al cargar estudiantes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filtered = students;
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

  // Función para abrir el modal de cambio de estado
  const handleStatusClick = (fileId, currentStatus) => {
    setStatusModal({
      isOpen: true,
      currentStatus: currentStatus,
      fileId: fileId,
    })
  }

  // Función para cerrar el modal de estado
  const handleStatusModalClose = () => {
    setStatusModal({
      isOpen: false,
      currentStatus: "",
      fileId: null,
    })
  }

  // Función para confirmar el cambio de estado
  const handleStatusConfirm = (newStatus) => {
    // Aquí puedes hacer la llamada a tu API para actualizar el estado
    console.log(`Cambiando estado del archivo ${statusModal.fileId} a: ${newStatus}`)

    // Actualizar el estado local si es necesario
    /*setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.documentID === statusModal.fileId ? { ...student, status: newStatus } : student,
      ),
    )*/

    switch (newStatus?.toLowerCase()) {
      case "aceptado":
        return markFileAsAccepted(statusModal.fileId)
      case "rechazado":
        return markFileAsRejected(statusModal.fileId, "Archivo rechazado.")
      case "pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "revision":
        return markFileAsOnReview(statusModal.fileId)
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "aceptado":
        return "bg-green-100 text-green-800"
      case "rechazado":
        return "bg-red-100 text-red-800"
      case "pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "revision":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
        return (
          <div className="flex gap-2 justify-center">
            <div className="mt-2">
              <span className="truncate">{row.status}</span>
            </div>
            <IconButton icon="edit" title="Editar Estado" onClick={() => handleStatusClick(row.documentID, row.status)} />
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
    <Modal isOpen={isOpen} onClose={onClose} title={'Archivos subidos por ' + student.firstName + " " + student.firstLastName + " " + student.secondLastName} >
      <ModalContext modal={modal} setModal={setModal} />

      {/* Encabezado de búsqueda y filtros */}
      <div className="flex gap-3 items-center">
        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        <Filters onFilterChange={setActiveFilters} />
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
          <div className="px-4 py-3 text-sm text-gray-500 flex justify-between items-center">
            <span>Página 1 de 51</span>
          </div>
        </div>
      </div>
      <StatusModal
        isOpen={statusModal.isOpen}
        onClose={handleStatusModalClose}
        currentStatus={statusModal.currentStatus}
        onConfirm={handleStatusConfirm}
      />
    </Modal>
  )
}

export default ModalArchivosEstudiante