import { useState } from 'react';

const TableCheckbox = ({ defaultChecked = false, onChange }) => {
  const [checked, setChecked] = useState(defaultChecked);

  const toggle = () => {
    const newState = !checked;
    setChecked(newState);
    if (onChange) onChange(newState);
  };

  return (
    <button
      onClick={toggle}
      className={`w-[32px] h-[32px] rounded-md flex items-center justify-center
        ${checked ? 'bg-blue-500 border-0' : 'bg-white border-2 border-gray-400'}
        hover:brightness-90 transition duration-150 ease-in-out`}
    >
      {checked && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </button>
  );
};

export default TableCheckbox;
