import Card from './Card';
import { FaTimes } from 'react-icons/fa';

/**
 * Modal reutilizable.
 *
 * @param {boolean} isOpen - Si el modal está visible.
 * @param {function} onClose - Función para cerrar el modal.
 * @param {ReactNode} children - Contenido del modal.
 * @param {string} size - Clases de Tailwind para tamaño personalizado (ej: 'max-w-4xl h-[600px]').
 * @param {boolean} backdrop - Si se debe mostrar fondo opaco.
 */
const Modal = ({ isOpen, onClose, children, size = 'max-w-4xl', backdrop = true }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        backdrop ? 'bg-black bg-opacity-40' : ''
      }`}
    >
      <div className={`relative w-full ${size} mx-4`}>
        <Card
          className="relative overflow-hidden p-6"
          actions={
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black transition">
              <FaTimes />
            </button>
          }
        >
          {children}
        </Card>
      </div>
    </div>
  );
};

export default Modal;