
import { useState, useRef, useEffect } from "react"
import { FaChevronDown } from "react-icons/fa"

const Select = ({
    value,
    onChange,
    options,
    placeholder = "Seleccionar…",
    className = "",
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const selectRef = useRef(null)

    // Cerrar dropdown al hacer click fuera
    useEffect(() => {
        function handleClickOutside(event) {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Cerrar con Escape
    useEffect(() => {
        function handleEscape(event) {
            if (event.key === "Escape") {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleEscape)
            return () => document.removeEventListener("keydown", handleEscape)
        }
    }, [isOpen])

    const selectedOption = options.find((option) => option.value === value)

    return (
        <div className={`relative ${className}`} ref={selectRef}>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-[100px] flex items-center justify-between px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <FaChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {/* Dropdown Content */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    <ul role="listbox" className="py-1">
                        {options.map((option) => (
                            <li key={option.value}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        onChange(option.value)
                                        setIsOpen(false)
                                    }}
                                    className={`w-full text-left px-3 py-2 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors ${value === option.value ? "bg-blue-100 text-blue-900 font-medium" : "text-gray-900"
                                        }`}
                                    role="option"
                                    aria-selected={value === option.value}
                                >
                                    {option.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Select;