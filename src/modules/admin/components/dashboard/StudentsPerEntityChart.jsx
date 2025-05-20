import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import ChartCard from '../../../shared/components/ChartCard';
import { getTopCompaniesWithStudents } from '../services/DashboardService';

const COLORS = ['#60F27D', '#2196F3', '#FF4D4F', '#FF69C1', '#1F1F5C'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div className="bg-white border border-neutral-300 rounded px-2 py-1 text-sm shadow-md">
        <span className="text-neutral-800 font-medium">{name}</span>
        <span className="ml-1 text-neutral-600">: {value} alumno{value !== 1 && 's'}</span>
      </div>
    );
  }
  return null;
};

const StudentsPerEntityChart = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { totalStudents, topCompanies } = await getTopCompaniesWithStudents();
        const chartData = topCompanies.map((item, index) => ({
          name: item.companyName,
          value: item.studentCount,
          color: COLORS[index % COLORS.length],
        }));

        setData(chartData);
        setTotal(totalStudents);
      } catch (error) {
        console.error('Error al cargar los datos de empresas:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ChartCard title="Alumnos por entidad" className="col-span-3 h-[256px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={50}
            outerRadius={80}
            dataKey="value"
            stroke="none"
            paddingAngle={2}
            labelLine={false}
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
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default StudentsPerEntityChart;
