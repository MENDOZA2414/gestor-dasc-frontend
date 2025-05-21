// src/shared/components/IconButton.jsx
import { FaEye, FaDownload, FaPlus, FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

const iconMap = {
  eye: <FaEye className="text-black" />,
  download: <FaDownload className="text-white" />,
  add: <FaPlus className="text-white" />,
  delete: <FaTimes className="text-white" />,
  edit: <FaEdit className="text-white" />,
  check: <FaCheck className="text-white" />,
};

const IconButton = ({
  icon,
  onClick,
  title,
  color = 'bg-gray-300',
  textColor = 'text-black',
  className = ''
}) => {
  const content = typeof icon === 'string' ? iconMap[icon] || null : icon;

  return (
    <button
      title={title}
      onClick={onClick}
      className={`p-1 rounded w-[32px] h-[32px] flex items-center justify-center ${color} ${textColor} ${className}`}
    >
      {content}
    </button>
  );
};

export default IconButton;