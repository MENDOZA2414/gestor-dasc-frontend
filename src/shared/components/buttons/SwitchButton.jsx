// src/shared/components/ProfileStyleIconButton.jsx
import {
  FaUser,
  FaEye,
  FaDownload,
  FaPlus,
  FaTrash,
  FaEdit,
  FaCheck,
  FaTimes
} from 'react-icons/fa';

const iconMap = {
  user: <FaUser className="w-[18px] h-[18px] text-gray-500" />,
  eye: <FaEye className="w-[18px] h-[18px] text-gray-500" />,
  download: <FaDownload className="w-[18px] h-[18px] text-gray-500" />,
  add: <FaPlus className="w-[18px] h-[18px] text-gray-500" />,
  delete: <FaTimes className="w-[18px] h-[18px] text-gray-500" />,
  edit: <FaEdit className="w-[18px] h-[18px] text-gray-500" />,
  check: <FaCheck className="w-[18px] h-[18px] text-gray-500" />,
};

const SwitchButton = ({
  icon = 'user',
  showCheck = false,
  onClick,
  title = '',
  className = '',
}) => {
  const content = typeof icon === 'string' ? iconMap[icon] || null : icon;

  return (
    <button
      title={title}
      onClick={onClick}
      className={`
        w-[40px] h-[40px] bg-white rounded-full border border-gray-300
        shadow-sm flex items-center justify-center relative ${className}
      `}
    >
      {content}
      {showCheck && (
        <FaCheck
          className="absolute bottom-1 right-1 bg-white text-gray-700 rounded-full p-[2px]
          w-[16px] h-[16px] shadow-sm border border-gray-300"
        />
      )}
    </button>
  );
};

export default SwitchButton;