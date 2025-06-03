import React, { useEffect, useState, useRef } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { BsCheckCircleFill, BsDashCircleFill } from 'react-icons/bs';
import { ChartCard } from '@shared/components/cards';
import { getPracticeStatusCounts } from '@modules/admin/services/dashboardService';

const COLORS = ['#60F27D', '#1F1F5C'];
const ORIGINAL_INNER_RADIUS = 50;
const ORIGINAL_OUTER_RADIUS = 80;

const PracticeStatusChart = () => {
  const [chartData, setChartData] = useState([
    { name: 'Concluidas', value: 0, color: COLORS[0] },
    { name: 'Activas', value: 0, color: COLORS[1] },
  ]);
  const [chartSize, setChartSize] = useState({
    innerRadius: ORIGINAL_INNER_RADIUS,
    outerRadius: ORIGINAL_OUTER_RADIUS,
  });

  const containerRef = useRef(null);

  const total = chartData.reduce((acc, item) => acc + item.value, 0);
  const percent = total > 0 ? Math.round((chartData[0].value / total) * 100) : 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPracticeStatusCounts();
        setChartData([
          { name: 'Concluidas', value: data.finished || 0, color: COLORS[0] },
          { name: 'Activas', value: data.started || 0, color: COLORS[1] }
        ]);
      } catch (error) {
        console.error('Error al obtener datos de prácticas:', error);
      }
    };
    fetchData();
  }, []);

  const calculateChartSize = () => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    const minDimension = Math.min(containerWidth, containerHeight);

    if (minDimension / 2 < ORIGINAL_OUTER_RADIUS) {
      const outerRadius = Math.max(30, minDimension / 2.5);
      const innerRadius = outerRadius * 0.6;
      setChartSize({ innerRadius, outerRadius });
    } else {
      setChartSize({
        innerRadius: ORIGINAL_INNER_RADIUS,
        outerRadius: ORIGINAL_OUTER_RADIUS,
      });
    }
  };

  useEffect(() => {
    calculateChartSize();
    const resizeObserver = new ResizeObserver(() => calculateChartSize());

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <ChartCard title="Prácticas activas / concluidas" className="col-span-12 sm:col-span-6 lg:col-span-4 h-[256px]">
      <div className="flex h-full px-4 gap-x-4 items-center justify-between">
        
        {/* Gráfico */}
        <div className="flex flex-col justify-center items-center flex-1 min-w-0">
          <div ref={containerRef} className="w-2/3 min-w-[140px] min-h-[180px] h-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={chartData}
                  labelLine={false}
                  dataKey="value"
                  innerRadius={chartSize.innerRadius}
                  outerRadius={chartSize.outerRadius}
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
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-1 text-sm text-gray-500 font-medium">
            Total: <span className="text-neutral-900 font-semibold">{total}</span>
          </p>
        </div>

       {/* Leyenda lateral */}
<div className="flex flex-col gap-2 pr-2 w-auto flex-shrink-0 text-xs">
  <div className="flex items-center gap-2 text-gray-500">
    <BsCheckCircleFill className="text-green-400 text-base" />
    <span>Concluidas</span>
    <span className="text-neutral-900 font-semibold ml-auto">{chartData[0].value}</span>
  </div>
  <div className="flex items-center gap-2 text-gray-500">
    <BsDashCircleFill className="text-indigo-950 text-base" />
    <span>Activas</span>
    <span className="text-neutral-900 font-semibold ml-auto">{chartData[1].value}</span>
  </div>
</div>

      </div>
    </ChartCard>
  );
};

export default PracticeStatusChart;
