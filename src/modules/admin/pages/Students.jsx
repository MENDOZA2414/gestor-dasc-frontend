import { useState, useEffect, useRef } from 'react';

import { Layout } from '@shared/components/layout';
import { Card } from '@shared/components/cards';
import { Search, Filters } from '@shared/components/filters';
import { DataTable } from '@shared/components/datatable';
import IconButton from '@shared/components/buttons/IconButton';
import { getAllStudents } from '@modules/admin/services/studentsService';

const Students = () => {
  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const tableRef = useRef(null);
  const cardRef = useRef(null);

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
      label: 'Asesor Asignado',
      key: 'internalAssessor',
      render: (row) => (row.isEmpty ? <div className="h-9"></div> : <span className="truncate">{row.internalAssessor}</span>),
    },
    {
      label: 'Acciones',
      key: 'actions',
      center: true,
      render: (row) => {
        if (row.isEmpty) return <div className="h-9"></div>;
        return (
          <div className="flex gap-2 justify-center">
            <IconButton icon="eye" title="Ver" onClick={() => console.log('Ver alumno', row)} />
            <IconButton icon="edit" title="Editar" onClick={() => console.log('Editar alumno', row)} />
          </div>
        );
      },
    },
  ];

  const user = {
    firstName: 'José Miguel',
    firstLastName: 'Mendoza',
    logo: 'https://via.placeholder.com/100',
  };

  const userType = 'admin';

  return (
    <Layout user={user} userType={userType}>
      <div className="flex flex-col gap-4 h-full">
        {/* Encabezado de búsqueda y filtros */}
        <div className="flex gap-3 items-center">
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
                emptyMessage={loading ? 'Cargando estudiantes...' : 'No hay estudiantes para mostrar.'}
                ref={tableRef}
              />
            </div>
          </div>
          <div className="px-4 py-3 text-sm text-gray-500 flex justify-between items-center">
            <span>Página 1 de 51</span>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Students;
