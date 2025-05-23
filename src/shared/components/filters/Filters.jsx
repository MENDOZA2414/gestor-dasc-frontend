import { useState, useEffect } from "react"
import { FaSlidersH } from "react-icons/fa"

const Filters = ({ onFilterChange }) => {
  const [open, setOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilters, setActiveFilters] = useState([])

  // Definición de los filtros disponibles (movido desde Students.jsx)
  const [filterOptions] = useState({
    Carrera: [
      { label: "LATI", value: "LATI", checked: false },
      { label: "IDS", value: "IDS", checked: false },
      { label: "ITC", value: "ITC", checked: false },
      { label: "LITI", value: "LITI", checked: false },
      { label: "IC", value: "IC", checked: false },
    ],
    Semestre: [
      { label: "8vo", value: "8vo", checked: false },
      { label: "7mo", value: "7mo", checked: false },
      { label: "6to", value: "6to", checked: false },
      { label: "5to", value: "5to", checked: false },
    ],
    Turno: [
      { label: "TM", value: "TM", checked: false },
      { label: "TV", value: "TV", checked: false },
    ],
    Asesor: [
      { label: "Dr. Italia Estrada C.", value: "italia", checked: false },
      { label: "MT. Alejandro Leyva", value: "alejandro", checked: false },
      { label: "MT. Juan Pérez", value: "juan", checked: false },
      { label: "MT. Ana García", value: "ana", checked: false },
    ],
    Matrícula: [
      { label: "2021", value: "2021", checked: false },
      { label: "2022", value: "2022", checked: false },
      { label: "2023", value: "2023", checked: false },
    ],
    Progreso: [
      { label: "Completado", value: "completado", checked: false },
      { label: "En proceso", value: "proceso", checked: false },
      { label: "No iniciado", value: "no_iniciado", checked: false },
    ],
    Internos: [
      { label: "Dr. Italia Estrada C.", value: "italia_int", checked: false },
      { label: "MT. Alejandro Leyva", value: "alejandro_int", checked: false },
      { label: "MT. Roberto Sánchez", value: "roberto_int", checked: false },
      { label: "MT. Carmen Vázquez", value: "carmen_int", checked: false },
    ],
    Externos: [
      { label: "Ing. Luis Ramírez", value: "luis_ext", checked: false },
      { label: "Lic. María Gómez", value: "maria_ext", checked: false },
      { label: "Dr. Jorge Mendoza", value: "jorge_ext", checked: false },
    ],
  })

  // Función para manejar la selección de categoría
  const handleCategorySelect = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null)
      setSelectedSubcategory(null)
    } else {
      setSelectedCategory(category)
      setSelectedSubcategory(null)
    }
  }

  // Función para manejar la selección de subcategoría
  const handleSubcategorySelect = (subcategory) => {
    // Toggle checkbox
    const updatedOptions = { ...filterOptions }
    const categoryOptions = updatedOptions[selectedCategory]
    const optionIndex = categoryOptions.findIndex((opt) => opt.value === subcategory)

    if (optionIndex !== -1) {
      categoryOptions[optionIndex].checked = !categoryOptions[optionIndex].checked

      // Actualizar filtros activos
      updateActiveFilters(updatedOptions)
    }
  }

  // Función para actualizar los filtros activos
  const updateActiveFilters = (options) => {
    const newActiveFilters = []

    Object.entries(options).forEach(([category, categoryOptions]) => {
      categoryOptions.forEach((option) => {
        if (option.checked) {
          newActiveFilters.push(option.value)
        }
      })
    })

    setActiveFilters(newActiveFilters)
    onFilterChange(newActiveFilters)
  }

  // Función para filtrar opciones basadas en la búsqueda
  const getFilteredOptions = (options) => {
    if (!searchTerm) return options
    return options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".filter-container")) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative filter-container">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full bg-white shadow-sm text-gray-700 hover:bg-gray-50"
      >
        <FaSlidersH className="text-gray-500" />
        Filtros
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 z-50">
          {/* Primer menú flotante - Categorías */}
          <div className="bg-white rounded-xl shadow-xl border text-sm min-w-[180px]">
            <div className="p-3 font-medium">Todos</div>
            {Object.keys(filterOptions).map((category) => (
              <div
                key={category}
                className={`px-3 py-2 flex justify-between items-center cursor-pointer hover:bg-gray-50 ${
                  selectedCategory === category ? "bg-gray-100" : ""
                }`}
                onClick={() => handleCategorySelect(category)}
              >
                <span>{category}</span>
                <input
                  type="checkbox"
                  checked={filterOptions[category].some((opt) => opt.checked)}
                  onChange={(e) => {
                    // Marcar/desmarcar todas las opciones de esta categoría
                    const updatedOptions = { ...filterOptions }
                    updatedOptions[category].forEach((opt) => {
                      opt.checked = e.target.checked
                    })
                    updateActiveFilters(updatedOptions)
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="accent-blue-500"
                />
              </div>
            ))}
          </div>

          {/* Segundo menú flotante - Subcategorías */}
          {selectedCategory && (
            <div
              className="absolute top-0 left-full ml-2 bg-white rounded-xl shadow-xl border text-sm min-w-[180px]"
              style={{ zIndex: 51 }}
            >
              <div className="p-3 font-medium">Todos</div>
              {filterOptions[selectedCategory].map((option) => (
                <div
                  key={option.value}
                  className="px-3 py-2 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSubcategorySelect(option.value)}
                >
                  <span>{option.label}</span>
                  <input
                    type="checkbox"
                    checked={option.checked}
                    onChange={() => {}} // Controlado por el onClick del div
                    onClick={(e) => e.stopPropagation()}
                    className="accent-blue-500"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Tercer menú flotante - Búsqueda (para Internos/Externos/Asesor) */}
          {selectedCategory &&
            (selectedCategory === "Internos" || selectedCategory === "Externos" || selectedCategory === "Asesor") && (
              <div
                className="absolute top-0 left-full ml-2 bg-white rounded-xl shadow-xl border text-sm min-w-[250px]"
                style={{ zIndex: 51 }}
              >
                <div className="p-3">
                  <div className="font-medium mb-3">{selectedCategory}</div>
                  <input
                    type="text"
                    placeholder="Buscar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 mb-2"
                  />
                  {getFilteredOptions(filterOptions[selectedCategory]).map((option) => (
                    <div
                      key={option.value}
                      className="px-3 py-2 flex justify-between items-center cursor-pointer hover:bg-gray-50 rounded-lg"
                      onClick={() => handleSubcategorySelect(option.value)}
                    >
                      <span>{option.label}</span>
                      <input
                        type="checkbox"
                        checked={option.checked}
                        onChange={() => {}} // Controlado por el onClick del div
                        onClick={(e) => e.stopPropagation()}
                        className="accent-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  )
}

export default Filters
