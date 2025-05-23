import { useEffect, useState } from "react"

const CustomTooltip = ({ label, value, x, y }) => {
  const [style, setStyle] = useState({ opacity: 0 })

  useEffect(() => {
    const maxX = window.innerWidth - 160
    const adjustedX = x > maxX ? maxX : x

    setStyle({
      top: y - 80,
      left: adjustedX,
      pointerEvents: "none",
      opacity: 1,
      transform: "translateX(-50%)",
    })
  }, [x, y])

  return (
    <div
      className="absolute z-50 bg-white px-3 py-1 border border-gray-300 rounded shadow-sm text-sm text-gray-700 max-w-[140px] transition-opacity duration-200"
      style={style}
    >
      <p className="font-medium text-center">{label}</p>
      <p className="text-neutral-900 font-bold text-center text-base">{value}</p>
    </div>
  )
}

export default CustomTooltip
