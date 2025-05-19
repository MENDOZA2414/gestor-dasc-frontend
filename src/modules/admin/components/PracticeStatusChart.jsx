import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { BsCheckCircleFill, BsDashCircleFill } from 'react-icons/bs';
import ChartCard from '../../../shared/components/ChartCard';

const data = [
  { name: 'Concluidas', value: 17, color: '#60F27D' },
  { name: 'Activas', value: 134, color: '#1F1F5C' },
];

const total = data.reduce((acc, item) => acc + item.value, 0);
const percent = Math.round((data[0].value / total) * 100);

const PracticeStatusChart = () => {
  return (
    <ChartCard title="Prácticas activas / concluidas" className="col-span-4 h-64">
        <div className="flex items-center h-full px-4 gap-x-4"> 
        {/* Gráfico */}
        <div className="flex flex-col items-center justify-center flex-1 min-w-0">

        <ResponsiveContainer width="100%" height={160} minWidth={200}>
            
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={0}
                startAngle={90}
                endAngle={-270}
                stroke="none"
                label={({ cx, cy }) => (
                  <text
                    x={cx}
                    y={cy}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="text-xl font-bold text-neutral-900"
                  >
                    {`${percent}%`}
                  </text>
                )}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Total debajo */}
          <p className="mt-1 text-sm text-gray-500 font-medium">
            Total: <span className="text-neutral-900 font-semibold">{total}</span>
          </p>
        </div>

        {/* Leyenda lateral */}
<div className="flex flex-col gap-2 pr-2 w-auto flex-shrink-0">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <BsCheckCircleFill className="text-green-400 text-lg" />
            <span>Concluidas</span>
            <span className="text-neutral-900 font-semibold ml-auto">{data[0].value}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <BsDashCircleFill className="text-indigo-950 text-lg" />
            <span>Activas</span>
            <span className="text-neutral-900 font-semibold ml-auto">{data[1].value}</span>
          </div>
        </div>
      </div>
    </ChartCard>
  );
};

export default PracticeStatusChart;
