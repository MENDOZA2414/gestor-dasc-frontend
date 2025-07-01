import { useState, useEffect, useRef } from 'react';

import ModalContext from '@shared/ModalContext';
import Modal from "./Modal"
import { DataTable } from '@shared/components/datatable';
import { Search, Filters } from '@shared/components/filters';
import { getAllStudents } from '@modules/admin/services/studentsService';
import IconButton from '@shared/components/buttons/IconButton';
import { getInternalAssessorById } from '@modules/admin/services/assessorsService';

/**
 * Modal especializado para mostrar información de estudiante.
 *
 * @param {boolean} isOpen
 * @param {function} onClose
 * @param {object} user - Información del usuario: firstName, firstLastName, logo
 * @param {ReactNode} children - Contenido adicional si es necesario
 */
const ModalEstudiantesAsignadosA = ({ isOpen, onClose, internalAssessorID, asignar }) => {

  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [internalAssessor, setInternalAssessor] = useState([]);
  const [loading, setLoading] = useState(true);

  const tableRef = useRef(null);
  const cardRef = useRef(null);

  const [students, setStudents] = useState([]);
  const [asignando, setAsignando] = useState(asignar);

  const [modal, setModal] = useState({ name: null, props: {} });

  useEffect(() => {
    const fetchInternalAssessor = async () => {
      try {
        const data = await getInternalAssessorById(internalAssessorID);
        setInternalAssessor(data);
      } catch (error) {
        console.error('Error al cargar asesor interno:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInternalAssessor();
  }, []);

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
      const lowerSearch = search.toLowerCase();
      const matchSearch =
        (student.name || '').toLowerCase().includes(lowerSearch) ||
        (student.matricula || '').toLowerCase().includes(lowerSearch);

      const filters = activeFilters;
      const matchCareer = !filters.Carrera || filters.Carrera.includes(student.career);
      const matchSemester = !filters.Semestre || filters.Semestre.includes(student.semester);
      const matchShift = !filters.Turno || filters.Turno.includes(student.shift);

      const matchAssessor = asignando ?
        student.internalAssessor === (internalAssessor.firstName + ' ' + internalAssessor.firstLastName + ' ' + internalAssessor.secondLastName)
        :
        student.internalAssessor != (internalAssessor.firstName + ' ' + internalAssessor.firstLastName + ' ' + internalAssessor.secondLastName);

      return matchSearch && matchCareer && matchSemester && matchShift && matchAssessor;
    });
  };

  const filtered = getFilteredStudents();
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
          matricula: '',
          career: '',
          semester: '',
          shift: '',
          internalAssessor: '',
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
      label: 'Matrícula',
      key: 'matricula',
      render: (row) => (row.isEmpty ? <div className="h-9"></div> : <span className="truncate">{row.matricula}</span>),
    },
    {
      label: 'Carrera',
      key: 'career',
      render: (row) => (row.isEmpty ? <div className="h-9"></div> : <span className="truncate">{row.career}</span>),
    },
    {
      label: 'Semestre',
      key: 'semester',
      render: (row) => (row.isEmpty ? <div className="h-9"></div> : <span className="truncate">{row.semester}</span>),
    },
    {
      label: 'Turno',
      key: 'shift',
      render: (row) => (row.isEmpty ? <div className="h-9"></div> : <span className="truncate">{row.shift}</span>),
    },
    {
      label: 'Acciones',
      key: 'actions',
      center: true,
      render: (row) => {
        if (row.isEmpty) return <div className="h-9"></div>;
        return (
          <div className="flex gap-2 justify-center">
            <IconButton icon="eye" title="Ver"
              onClick={() => setModal({
                name: 'student', props: {
                  matricula: row.matricula,
                  userID: row.userID,
                },
              })} />
          </div>
        );
      },
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={!asignando ?
      ('Estudiantes asignados a ') + internalAssessor.firstName + ' ' + internalAssessor.firstLastName + ' ' + internalAssessor.secondLastName + ' '
      :
      ('Asignar estudiante a ') + internalAssessor.firstName + ' ' + internalAssessor.firstLastName + ' ' + internalAssessor.secondLastName + ' '} >
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
    </Modal>
  )
}

export default ModalEstudiantesAsignadosA