import React from 'react';

/**
 * Componente Card reutilizable para todo el sistema.
 *
 * @param {string} title - Título opcional en la parte superior.
 * @param {ReactNode} children - Contenido interno dinámico.
 * @param {string} className - Clases extras para tamaño/estilo personalizado.
 * @param {ReactNode} actions - Elementos a la derecha del título (iconos, botones, etc.).
 */
const Card = ({ title, children, className = '', actions = null }) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md border border-gray-200 p-4 md:p-6 ${className}`}
    >
      <div className="flex flex-col h-full">
        {(title || actions) && (
          <div className="flex justify-between items-center mb-4 shrink-0">
            {title && (
              <p className="text-base md:text-lg text-gray-700 font-medium">
                {title}
              </p>
            )}
            {actions && <div className="flex items-center">{actions}</div>}
          </div>
        )}
        <div className="flex-grow overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
