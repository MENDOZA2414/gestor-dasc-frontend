// src/components/RegisterStudent/Step4PhotoUpload.jsx
import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';

export default function Step4PhotoUpload({ fotoUrl, foto, omitirFoto, setOmitirFoto, prevFoto, error }) {
  return (
    <>
      <h6 className="text-base text-gray-700 font-medium mb-3">Selecciona una foto de perfil</h6>
      
      <div className="w-32 h-32 mb-3 flex justify-center items-center mx-auto">
        {fotoUrl ? (
          <img className="mx-auto w-full h-full object-cover rounded-full" src={fotoUrl} alt="Foto del alumno" />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-full"></div>
        )}
      </div>

      <div className="flex w-full items-center mb-3">
        <label htmlFor="fileUpload" className="bg-gray-200 text-black py-1.5 px-3 rounded-l-lg border border-gray-300 cursor-pointer whitespace-nowrap text-sm">
          Seleccionar archivo
        </label>
        <input
          id="fileUpload"
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={prevFoto}
          className="hidden"
          disabled={omitirFoto}
        />
        <input
          type="text"
          className="w-full py-1.5 px-2 border border-l-0 border-gray-300 rounded-r-lg bg-gray-50 text-gray-500 cursor-not-allowed text-sm"
          value={foto ? foto.name : 'Sin archivos seleccionados'}
          readOnly
        />
      </div>

      <div className="flex items-center mb-3">
        <input
          type="checkbox"
          id="omitirFoto"
          checked={omitirFoto}
          onChange={(e) => setOmitirFoto(e.target.checked)}
          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="omitirFoto" className="text-sm text-gray-700">
          Omitir foto de perfil
        </label>
      </div>

      {error && (
        <p className="text-xs text-red-500 mt-1 flex items-center gap-1 justify-center">
          <FaTimesCircle /> {error}
        </p>
      )}
    </>
  );
}
