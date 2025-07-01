import { useState, useEffect, useRef } from 'react';

import ModalContext from '@shared/ModalContext';
import { Card } from '@shared/components/cards';
import { Search, Filters } from '@shared/components/filters';
import { DataTable } from '@shared/components/datatable';
import IconButton from '@shared/components/buttons/IconButton';
import { getAllStudents } from '@modules/admin/services/studentsService';
import { getAllCompanies } from '../services/companiesService';

const Companies = () => {
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
        const data = await getAllCompanies();
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
  const minRows = 10;
  const filledData = [...filtered];

  if (filtered.length < minRows) {
    const emptyRows = Array(minRows - filtered.length)
      .fill()
      .map((_, index) => {
        const isLastRow = index === minRows - filtered.length - 1;
        return {
          id: `empty-${index}`,
          name: '',
          tipo: '',
          contacto: '',
          alumnosAsignados: '',
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
      render: (row) =>
        row.isEmpty ? <div className="h-9"></div> : <span className="truncate">{row.companyName}</span>,
    },
    {
      label: 'Contacto',
      key: 'contact',
      render: (row) =>
        row.isEmpty ? <div className="h-9"></div> : <span className="truncate">{"row.companyContact"}</span>,
    },
    {
      label: 'Vacantes Activas',
      key: 'vacantesActivas',
      render: (row) => {
        if (row.isEmpty) return <div className="h-9"></div>;
        return (
          <div className="flex gap-2 justify-center">
            <div className="mt-2">
              <span className="truncate">{row.semester}</span>
            </div>
            <IconButton
              icon="eye"
              title="Ver"
              onClick={() => setModal({ name: 'practiceCarousel', props: { user: row } })}
            />
          </div>
        );
      },
    },
    {
      label: 'Alumnos En Práctica',
      key: 'alumnosEnPractica',
      render: (row) => {
        if (row.isEmpty) return <div className="h-9"></div>;
        return (
          <div className="flex gap-2 justify-center">
            <div className="mt-2">
              <span className="truncate">{row.semester}</span>
            </div>
            <IconButton
              icon="eye"
              title="Ver"
              onClick={() => setModal({ name: 'studentsInPractice', props: { user: row } })}
            />
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
          <div className="flex gap-2 justify-center">
            <IconButton
              icon="eye"
              title="Ver"
              onClick={() => setModal({ name: 'student', props: { user: row } })}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <ModalContext modal={modal} setModal={setModal} />

      <div className="flex flex-col gap-4 h-full">
        {/* Encabezado de búsqueda y filtros */}
        <div className="flex gap-3 items-center text-left">
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
          <Filters onFilterChange={setActiveFilters} />
        </div>

        {/* Card fija con tabla expandida visualmente */}
        <Card className="min-h-[540px] flex flex-col justify-between" ref={cardRef}>
          <div className="flex-grow overflow-hidden">
            <div className="h-full flex flex-col">
              <DataTable
                columns={columns}
                data={filledData}
                emptyMessage={loading ? 'Cargando entidades...' : 'No hay entidades para mostrar.'}
                ref={tableRef}
              />
            </div>
          </div>
          <div className="px-4 py-3 text-sm text-gray-500 flex justify-between items-center">
            <span>Página 1 de 51</span>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Companies;
