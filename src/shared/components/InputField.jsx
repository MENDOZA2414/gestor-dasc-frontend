/**
 * Componente InputField reutilizable que coincide con el diseño de la imagen.
 *
 * @param {string} placeholder - Texto de placeholder cuando el input está vacío.
 * @param {string} value - Valor actual del input.
 * @param {function} onChange - Función que se ejecuta cuando cambia el valor.
 * @param {string} className - Clases extras para personalización.
 * @param {boolean} multiline - Si true, renderiza un textarea en lugar de input.
 * @param {number} rows - Número de filas para textarea (solo si multiline es true).
 */
const InputField = ({
  placeholder = "",
  value = "",
  onChange = () => {},
  className = "",
  multiline = false,
  rows = 3,
}) => {
  const baseClasses = `
    w-full
    px-4 py-3
    border-2 border-gray-300
    rounded-2xl
    bg-white
    text-gray-700
    placeholder-gray-400
    focus:outline-none
    focus:border-blue-400
    focus:ring-2
    focus:ring-blue-100
    transition-all
    duration-200
    resize-none
  `

  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`${baseClasses} ${className}`}
      />
    )
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`${baseClasses} ${className}`}
    />
  )
}

export default InputField