import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import ChartCard from '../../../shared/components/ChartCard';

const data = [
  { name: 'Entidad A', value: 35, color: '#60F27D' },
  { name: 'Entidad B', value: 30, color: '#2196F3' },
  { name: 'Entidad C', value: 25, color: '#FF4D4F' },
  { name: 'Entidad D', value: 20, color: '#FF69C1' },
  { name: 'Entidad E', value: 24, color: '#1F1F5C' }
];

const StudentsPerEntityChart = () => {
  const total = data.reduce((acc, cur) => acc + cur.value, 0);

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
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default StudentsPerEntityChart;
