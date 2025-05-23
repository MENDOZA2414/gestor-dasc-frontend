import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LabelList, Cell, Tooltip } from "recharts"
import { Card } from '@shared/components/cards';

// Datos de logins diarios
const loginData7D = [
  { name: "D", value: 6, label: "Domingo" },
  { name: "L", value: 13, label: "Lunes" },
  { name: "M", value: 10, label: "Martes" },
  { name: "X", value: 3, label: "Miércoles" },
  { name: "J", value: 7, label: "Jueves" },
  { name: "V", value: 2, label: "Viernes" },
  { name: "S", value: 2, label: "Sábado" },
]

const loginData1M = [
  { name: "Sem 1", value: 28, label: "Semana 1" },
  { name: "Sem 2", value: 40, label: "Semana 2" },
  { name: "Sem 3", value: 18, label: "Semana 3" },
  { name: "Sem 4", value: 32, label: "Semana 4" },
]

// Componente personalizado para el tooltip (más pequeño y sin negritas)
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-white px-2 py-1.5 border border-gray-200 shadow-sm rounded-md">
        <p className="text-gray-800 text-xs">{data.label || label}</p>
        <p className="text-blue-600 text-xs">
          {payload[0].value} {payload[0].value === 1 ? "login" : "logins"}
        </p>
      </div>
    )
  }
  return null
}

const ActivityChartCard = () => {
  const [range, setRange] = useState("7D")
  const data = range === "7D" ? loginData7D : loginData1M

  const getBarColor = (index) => (index % 2 === 0 ? "#2196F3" : "#1E40AF") // azul claro / oscuro

  // Botones de selección de rango como actions para el Card
  const rangeActions = (
    <div className="flex gap-2">
      <button
        onClick={() => setRange("7D")}
        className={`text-sm px-2 py-0.5 rounded-md font-medium transition border ${
          range === "7D" ? "bg-gray-200 text-gray-800 border-gray-300" : "text-gray-500 border-transparent"
        }`}
      >
        7D
      </button>
      <button
        onClick={() => setRange("1M")}
        className={`text-sm px-2 py-0.5 rounded-md font-medium transition border ${
          range === "1M" ? "bg-gray-200 text-gray-800 border-gray-300" : "text-gray-500 border-transparent"
        }`}
      >
        1M
      </button>
    </div>
  )

  return (
    <Card
      title="Inicios de sesión"
      actions={rangeActions}
      className="col-span-12 sm:col-span-6 lg:col-span-5 h-[256px]"
    >
      {/* Gráfica responsiva, centrada */}
      <div className="w-full h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
            barCategoryGap={range === "7D" ? 15 : 30}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
            <YAxis
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={[0, "auto"]}
              width={30}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
              wrapperStyle={{ outline: "none" }}
              animationDuration={300}
              animationEasing="ease-out"
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={range === "7D" ? 25 : 40} isAnimationActive>
              <LabelList dataKey="value" position="top" fill="#374151" fontSize={12} offset={5} />
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(index)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

export default ActivityChartCard
