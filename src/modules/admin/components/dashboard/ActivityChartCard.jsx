import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Card } from "../../../../shared/components";

const data7D = [
  { name: 'D', value: 6 },
  { name: 'L', value: 14 },
  { name: 'M', value: 10 },
  { name: 'X', value: 2 },
  { name: 'J', value: 6 },
  { name: 'V', value: 2 },
  { name: 'S', value: 2 },
];

const data1M = [
  { name: 'Sem 1', value: 35 },
  { name: 'Sem 2', value: 40 },
  { name: 'Sem 3', value: 18 },
  { name: 'Sem 4', value: 28 },
];

const ActivityChartCard = () => {
  const [range, setRange] = useState('7D');
  const data = range === '7D' ? data7D : data1M;

  return (
    <Card className="col-span-5 h-[256px]">
      {/* Header con título y botones alineados */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-700 font-medium text-base md:text-lg">
          Actividad reciente
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setRange('7D')}
            className={`text-sm px-2 py-0.5 rounded-md font-medium transition border ${
              range === '7D' ? 'bg-gray-200 text-gray-800 border-gray-300' : 'text-gray-500 border-transparent'
            }`}
          >
            7D
          </button>
          <button
            onClick={() => setRange('1M')}
            className={`text-sm px-2 py-0.5 rounded-md font-medium transition border ${
              range === '1M' ? 'bg-gray-200 text-gray-800 border-gray-300' : 'text-gray-500 border-transparent'
            }`}
          >
            1M
          </button>
        </div>
      </div>

      {/* Gráfica con margen visual y tooltip funcional */}
      <div className="h-full pt-2 pl-1 pr-4 pb-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 16, right: 12, left: 12, bottom: 12 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} />
            <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} domain={[0, 20]} />
            <Tooltip cursor={{ fill: 'transparent' }} />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#2196F3" barSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ActivityChartCard;
