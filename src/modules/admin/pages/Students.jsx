import { useState, useEffect, useRef } from 'react';

import { Layout } from '@shared/components/layout';
import { Card } from '@shared/components/cards';
import { Search, Filters } from '@shared/components/filters';
import { DataTable } from '@shared/components/datatable';
import IconButton from '@shared/components/buttons/IconButton';

const Students = () => {
  const [search, setSearch] = useState("")
  const [activeFilters, setActiveFilters] = useState([])

  const [students] = useState([
    {
      id: 1,
      name: "Alan Agúndez Meza",
      matricula: "2021123456",
      carrera: "IDS",
      semestre: "8vo",
      turno: "TM",
      asesor: "MT. Alejandro Leyva",
    },
  ])

  // Función para filtrar estudiantes basado en búsqueda y filtros activos
  const getFilteredStudents = () => {
    return students.filter((student) => {
      // Filtrar por búsqueda
      const matchSearch = student.name.toLowerCase().includes(search.toLowerCase())

      // Filtrar por filtros activos
      const matchFilters =
        activeFilters.length === 0 ||
        activeFilters.includes(student.carrera) ||
        activeFilters.includes(student.semestre) ||
        activeFilters.includes(student.turno) ||
        activeFilters.includes(student.asesor)

      return matchSearch && matchFilters
    })
  }

  const filtered = getFilteredStudents()

  // Aumentamos el número mínimo de filas para llenar mejor la card
  const minRows = 10 // Número mínimo de filas que queremos mostrar
  const filledData = [...filtered]

  // Calcular cuántas filas vacías necesitamos para llenar la card
  if (filtered.length < minRows) {
    // Crear filas vacías para completar hasta minRows
    const emptyRows = Array(minRows - filtered.length)
      .fill()
      .map((_, index) => {
        const isLastRow = index === minRows - filtered.length - 1
        return {
          id: `empty-${index}`,
          name: "",
          matricula: "",
          carrera: "",
          semestre: "",
          turno: "",
          asesor: "",
          isEmpty: true, // Marcador para identificar filas vacías
          isLastRow, // Marcador para identificar la última fila
        }
      })

    filledData.push(...emptyRows)
  }

  // Referencia para acceder al elemento de la tabla después de renderizar
  const tableRef = useRef(null)
  const cardRef = useRef(null)

  // Efecto para eliminar la línea divisoria de la última fila
  useEffect(() => {
    if (tableRef.current) {
      const lastRow = tableRef.current.querySelector("tbody tr:last-child")
      if (lastRow) {
        lastRow.style.borderBottom = "none"
      }
    }
  }, [filledData])

  const columns = [
    {
      label: "Nombre",
      key: "name",
      render: (row) => (row.isEmpty ? <div className="h-9"></div> : <span className="truncate">{row.name}</span>),
    },
    {
      label: "Matrícula",
      key: "matricula",
      render: (row) => (row.isEmpty ? <div className="h-9"></div> : <span className="truncate">{row.matricula}</span>),
    },
    {
      label: "Carrera",
      key: "carrera",
      render: (row) => (row.isEmpty ? <div className="h-9"></div> : <span className="truncate">{row.carrera}</span>),
    },
    {
      label: "Semestre",
      key: "semestre",
      render: (row) => (row.isEmpty ? <div className="h-9"></div> : <span className="truncate">{row.semestre}</span>),
    },
    {
      label: "Turno",
      key: "turno",
      render: (row) => (row.isEmpty ? <div className="h-9"></div> : <span className="truncate">{row.turno}</span>),
    },
    {
      label: "Asesor Asignado",
      key: "asesor",
      render: (row) => (row.isEmpty ? <div className="h-9"></div> : <span className="truncate">{row.asesor}</span>),
    },
    // Añadir una columna adicional para las acciones que solo se muestra si la fila no está vacía
    {
      label: "Acciones",
      key: "actions",
      center: true,
      render: (row) => {
        if (row.isEmpty) {
          return <div className="h-9"></div>
        }
        return (
          <div className="flex gap-2 justify-center">
            <IconButton icon="eye" title="Ver" onClick={() => console.log("Ver alumno", row)} />
            <IconButton icon="edit" title="Editar" onClick={() => console.log("Editar alumno", row)} />
          </div>
        )
      },
    },
  ]

  const user = {
    firstName: "José Miguel",
    firstLastName: "Mendoza",
    logo: "https://via.placeholder.com/100",
  }
  const userType = "admin"

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
                emptyMessage="No hay estudiantes para mostrar."
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
  )
}

export default Students
