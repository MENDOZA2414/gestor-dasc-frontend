import {
  FaUser,
  FaEye,
  FaDownload,
  FaPlus,
  FaTrash,
  FaEdit,
  FaCheck,
  FaTimes,
} from 'react-icons/fa';

// ⬇️  Dejamos de guardar los íconos como <elementos> y solo almacenamos el componente
const iconComponents = {
  user: FaUser,
  eye: FaEye,
  download: FaDownload,
  add: FaPlus,
  delete: FaTimes,
  edit: FaEdit,
  check: FaCheck,
};

const SwitchButton = ({
  icon = 'user',
  showCheck = false,
  selected = false,     // <- NUEVO PROP
  onClick,
  title = '',
  className = '',
}) => {
  const Icon =
    typeof icon === 'string' ? iconComponents[icon] || null : icon;

  const iconColor = selected ? 'text-blue-500' : 'text-gray-500';
  const borderColor = selected ? 'border-blue-500' : 'border-gray-300';

  return (
    <button
      title={title}
      onClick={onClick}
      className={`w-[40px] h-[40px] bg-white rounded-full border ${borderColor}
                  shadow-sm flex items-center justify-center relative
                  transition-colors ${className}`}
    >
      {Icon && (
        <Icon className={`w-[18px] h-[18px] ${iconColor} transition-colors`} />
      )}

      {showCheck && (
        <FaCheck
          className="absolute bottom-1 right-1 bg-white text-gray-700 rounded-full
                     p-[2px] w-[16px] h-[16px] shadow-sm border border-gray-300"
        />
      )}
    </button>
  );
};

export default SwitchButton;