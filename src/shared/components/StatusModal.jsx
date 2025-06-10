"use client"

import { useState } from "react"

const StatusModal = ({ isOpen, onClose, currentStatus, onConfirm }) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus || "")

  const statusOptions = [
    { value: "aceptado", label: "Aceptado", color: "bg-green-100 text-green-800" },
    { value: "rechazado", label: "Rechazado", color: "bg-red-100 text-red-800" },
    { value: "revision", label: "En Revisión", color: "bg-blue-100 text-blue-800" },
    { value: "pendiente", label: "Pendiente", color: "bg-yellow-100 text-yellow-800" },
  ]

  const handleConfirm = () => {
    if (selectedStatus) {
      onConfirm(selectedStatus)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Cambiar Estado del Archivo</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">
            ×
          </button>
        </div>

        <div className="space-y-3 mb-6">
          <p className="text-sm text-gray-600 mb-3">Selecciona el nuevo estado:</p>
          {statusOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-gray-50"
            >
              <input
                type="radio"
                name="status"
                value={option.value}
                checked={selectedStatus === option.value}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${option.color}`}>{option.label}</span>
            </label>
          ))}
        </div>

        <div className="flex gap-3 justify-end">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedStatus}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}

export default StatusModal