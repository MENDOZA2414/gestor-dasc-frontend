import { useState, useEffect, useRef } from 'react';

import ModalContext from '@shared/ModalContext';
import { Layout } from '@shared/components/layout';
import { Card } from '@shared/components/cards';
import { Search, Filters } from '@shared/components/filters';
import { DataTable } from '@shared/components/datatable';
import IconButton from '@shared/components/buttons/IconButton';
import SwitchButton from '@shared/components/buttons/SwitchButton';
import { getAllStudents } from '@modules/admin/services/studentsService';

const Students = () => {
  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
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

  const filterSchema = {
    Carrera: {
      type: "multi",
      options: ["LATI", "IDS", "ITC", "LITI", "IC"],
    },
    Semestre: {
      type: "multi",
      options: ["7mo", "8vo", "9no"],
    },
    Turno: {
      type: "multi",
      options: ["TM", "TV"],
    },
    Asesor: {
      type: "multi-step",
      steps: {
        typeOptions: ["Interno", "Externo"],
        Interno: {
          searchable: true,
          options: [
            "Dr. Italia Estrada C.",
            "MT. Alejandro Leyva",
            "MT. Roberto Sánchez",
            "MT. Carmen Vázquez",
          ],
        },
        Externo: {
          searchable: true,
          options: [
            "Ing. Luis Ramírez",
            "Lic. María Gómez",
            "Dr. Jorge Mendoza",
          ],
        },
      },
    },
    Matrícula: {
      type: "searchOnly",
    },
  };

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

      const allAssessorFilters = [
        ...(filters.Asesor?.Interno || []),
        ...(filters.Asesor?.Externo || []),
      ];
      const matchAssessor = allAssessorFilters.length === 0 || allAssessorFilters.includes(student.internalAssessor);

      return matchSearch && matchCareer && matchSemester && matchShift && matchAssessor;
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
            <IconButton icon="eye" title="Ver"
              onClick={() => setModal({ name: 'student', props: { user }, })} />
            <IconButton icon="edit" title="Editar"
              onClick={() => setModal({ name: 'studentEdit', props: { user }, })} />
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
      <ModalContext modal={modal} setModal={setModal} />

      <div className="flex flex-col gap-4 h-full">
        {/* Encabezado de búsqueda y filtros */}
        <div className="flex gap-3 items-center text-left">
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
          <Filters schema={filterSchema} onFilterChange={setActiveFilters} />

          <div className="w-full relative">
            <div className="flex items-center justify-right absolute -top-5 right-0" >
              <SwitchButton icon="add" title="Estudiantes pendientes"
                onClick={() => setModal({ name: 'student', props: { user }, })} />
            </div>

            <div className="flex items-center justify-right absolute -top-5 right-12" >
              <SwitchButton icon="edit" title="Estudiantes aceptados"
                onClick={() => setModal({ name: 'student', props: { user }, })} />
            </div>
          </div>
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
