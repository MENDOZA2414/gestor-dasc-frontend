import React from 'react';

/**
 * Componente base para tarjetas que contienen gráficos.
 *
 * @param {string|ReactNode} title - Título del gráfico.
 * @param {ReactNode} actions - Botones o filtros al lado derecho del título.
 * @param {ReactNode} children - Contenido principal (ej. la gráfica).
 * @param {string} className - Clases extra para tamaño o posición.
 */
const ChartCard = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-md border border-gray-200 p-4 md:p-6 ${className}`}>
  {title && (
    <div className="text-gray-700 font-medium text-base md:text-lg mb-4">
      {title}
    </div>
  )}
  <div className="flex items-center justify-center h-[calc(100%-2rem)]">
    {children}
  </div>
</div>

  );
};


export default ChartCard;
