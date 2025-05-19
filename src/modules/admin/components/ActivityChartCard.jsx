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
import Card from '../../../shared/components/Card';

const data7D = [
  { name: 'D', value: 6, color: '#2196F3' },
  { name: 'L', value: 14, color: '#1E40AF' },
  { name: 'M', value: 10, color: '#2196F3' },
  { name: 'X', value: 2, color: '#1E40AF' },
  { name: 'J', value: 6, color: '#2196F3' },
  { name: 'V', value: 2, color: '#1E40AF' },
  { name: 'S', value: 2, color: '#2196F3' },
];

const data1M = [
  { name: 'Sem 1', value: 35 },
  { name: 'Sem 2', value: 40 },
  { name: 'Sem 3', value: 18 },
  { name: 'Sem 4', value: 28 },
];

const ActivityChartCard = () => {
  const [range, setRange] = useState('7D');

  const is7D = range === '7D';
  const data = is7D ? data7D : data1M;

  return (
    <Card
      title={
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium text-base md:text-lg">
            Actividad reciente
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setRange('7D')}
              className={`text-sm px-2 py-1 rounded-md font-medium ${
                range === '7D' ? 'bg-gray-200 text-gray-800' : 'text-gray-500'
              }`}
            >
              7D
            </button>
            <button
              onClick={() => setRange('1M')}
              className={`text-sm px-2 py-1 rounded-md font-medium ${
                range === '1M' ? 'bg-gray-200 text-gray-800' : 'text-gray-500'
              }`}
            >
              1M
            </button>
          </div>
        </div>
      }
      className="col-span-6 h-64"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} />
          <YAxis ticks={[0, 5, 10, 15, 20]} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar
            dataKey="value"
            radius={[8, 8, 0, 0]}
            fill="#2196F3"
            // fill={({ payload }) => payload.color}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ActivityChartCard;
