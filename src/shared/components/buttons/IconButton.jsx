// src/shared/components/IconButton.jsx
import {
  FaEye,
  FaDownload,
  FaPlus,
  FaTrash,
  FaEdit,
  FaCheck,
  FaTimes
} from 'react-icons/fa';

const iconMap = {
  eye: <FaEye className="w-[18px] h-[18px]" />,
  download: <FaDownload className="w-[18px] h-[18px]" />,
  add: <FaPlus className="w-[18px] h-[18px]" />,
  delete: <FaTimes className="w-[18px] h-[18px]" />,
  edit: <FaEdit className="w-[18px] h-[18px]" />,
  check: <FaCheck className="w-[18px] h-[18px]" />,
};

const colorMap = {
  eye: 'bg-gray-200 text-black',
  download: 'bg-blue-500 text-white',
  add: 'bg-blue-500 text-white',
  delete: 'bg-red-500 text-white',
  edit: 'bg-orange-400 text-white',
  check: 'bg-blue-500 text-white',
};

const IconButton = ({
  icon,
  onClick,
  title,
  className = ''
}) => {
  const content = typeof icon === 'string' ? iconMap[icon] || null : icon;
  const colorClasses = typeof icon === 'string' ? colorMap[icon] || '' : '';

  return (
    <button
      title={title}
      onClick={onClick}
      className={`w-[32px] h-[32px] rounded-xl flex items-center justify-center 
        ${colorClasses} hover:brightness-90 transition duration-150 ease-in-out ${className}`}
    >
      {content}
    </button>
  );
};

export default IconButton;
