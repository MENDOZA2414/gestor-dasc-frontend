import { useEffect, useState, useRef } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { ChartCard } from "../../../../shared/components"
import { getTopCompaniesWithStudents } from "../../services/dashboardService"

const COLORS = ["#60F27D", "#2196F3", "#FF4D4F", "#FF69C1", "#1F1F5C"]

// Valores originales de los radios
const ORIGINAL_INNER_RADIUS = 50
const ORIGINAL_OUTER_RADIUS = 80

// Tooltip exactamente igual al de la gráfica de barras (más pequeño y sin negritas)
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-white px-2 py-1.5 border border-gray-200 shadow-sm rounded-md">
        <p className="text-gray-800 text-xs">{data.name}</p>
        <p className="text-blue-600 text-xs">
          {data.value} {data.value === 1 ? "alumno" : "alumnos"}
        </p>
      </div>
    )
  }
  return null
}

const StudentsPerEntityChart = () => {
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [chartSize, setChartSize] = useState({
    innerRadius: ORIGINAL_INNER_RADIUS,
    outerRadius: ORIGINAL_OUTER_RADIUS,
  })
  const containerRef = useRef(null)

  // Función para calcular el tamaño del gráfico basado en el contenedor
  const calculateChartSize = () => {
    if (!containerRef.current) return

    const containerWidth = containerRef.current.clientWidth
    const containerHeight = containerRef.current.clientHeight

    // Usar la dimensión más pequeña para calcular el radio
    const minDimension = Math.min(containerWidth, containerHeight)

    // Solo reducir el tamaño si el contenedor es demasiado pequeño
    // para los valores originales
    if (minDimension / 2 < ORIGINAL_OUTER_RADIUS) {
      const outerRadius = Math.max(30, minDimension / 2.5)
      const innerRadius = outerRadius * 0.6
      setChartSize({ innerRadius, outerRadius })
    } else {
      // Mantener los valores originales
      setChartSize({
        innerRadius: ORIGINAL_INNER_RADIUS,
        outerRadius: ORIGINAL_OUTER_RADIUS,
      })
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { totalStudents, topCompanies } = await getTopCompaniesWithStudents()
        const chartData = topCompanies.map((item, index) => ({
          name: item.companyName,
          value: item.studentCount,
          color: COLORS[index % COLORS.length],
        }))

        setData(chartData)
        setTotal(totalStudents)
      } catch (error) {
        console.error("Error al cargar los datos de empresas:", error)
        // Datos de ejemplo en caso de error
        const mockData = [
          { name: "Empresa A", value: 12, color: COLORS[0] },
          { name: "Empresa B", value: 8, color: COLORS[1] },
        ]
        setData(mockData)
        setTotal(20)
      }
    }

    fetchData()
  }, [])

  // Efecto para calcular el tamaño inicial y cuando cambie el tamaño de la ventana
  useEffect(() => {
    calculateChartSize()

    // Crear un ResizeObserver para detectar cambios en el tamaño del contenedor
    const resizeObserver = new ResizeObserver(() => {
      calculateChartSize()
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    // Limpiar el observer cuando el componente se desmonte
    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current)
      }
    }
  }, [])

  return (
    <ChartCard title="Alumnos por entidad" className="col-span-12 sm:col-span-6 lg:col-span-3 h-[256px]">
      <div ref={containerRef} className="w-full h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={chartSize.innerRadius}
              outerRadius={chartSize.outerRadius}
              dataKey="value"
              stroke="none"
              paddingAngle={2}
              labelLine={false}
              isAnimationActive={true}
              animationBegin={0}
              animationDuration={800}
              animationEasing="ease-out"
              label={({ cx, cy }) => (
                <text
                  x={cx}
                  y={cy}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="text-xl font-bold text-neutral-900"
                >
                  {total}
                </text>
              )}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
              wrapperStyle={{ outline: "none" }}
              animationDuration={300}
              animationEasing="ease-out"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}

export default StudentsPerEntityChart
