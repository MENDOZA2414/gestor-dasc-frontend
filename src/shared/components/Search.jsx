import { FaSearch } from 'react-icons/fa';

const Search = ({ value, onChange, placeholder = 'Buscar' }) => {
  return (
    <div className="relative w-[240px]">
      <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      />
    </div>
  );
};

export default Search;
