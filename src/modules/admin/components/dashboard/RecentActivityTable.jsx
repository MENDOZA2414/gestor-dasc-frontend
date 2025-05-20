import { Card } from "../../../../shared/components";
import { BsDownload, BsEyeFill, BsEnvelopeFill } from 'react-icons/bs';

const data = [
  {
    role: 'A. Interno',
    name: 'Eduardo Enrique Cota',
    actionIcon: <BsEnvelopeFill className="text-blue-500" />,
    actionText: 'Subido C...pdf',
  },
  {
    role: 'A. Interno',
    name: 'MT. Alejandro Leyva',
    actionIcon: <span className="w-3 h-3 bg-green-500 rounded-full inline-block" />,
    actionText: 'Archivo apro...',
  },
  {
    role: 'Alumno',
    name: 'José Flores García',
    actionIcon: <BsDownload className="text-blue-500" />,
    actionText: 'Subido C...pdf',
  },
  {
    role: 'A. Externo',
    name: 'Sofía Gómez Duarte',
    actionIcon: <span className="w-3 h-3 bg-red-600 rounded-full inline-block" />,
    actionText: 'Archivo rech...',
  },
];

const RecentActivityTable = () => {
  return (
    <Card title="Actividad reciente" className="col-span-12 md:col-span-9 h-[300px]">
      <div className="overflow-hidden rounded-xl">
        <div className="grid grid-cols-3 bg-gray-100 text-gray-700 font-medium text-sm px-4 py-2">
          <div>Usuario</div>
          <div>Nombre</div>
          <div>Acción</div>
        </div>
        <div className="overflow-y-auto max-h-40 divide-y divide-gray-200">
          {data.map((item, idx) => (
            <div key={idx} className="grid grid-cols-3 items-center text-sm px-4 py-2">
              <div className="text-gray-500">{item.role}</div>
              <div className="text-gray-600 truncate">{item.name}</div>
              <div className="flex items-center gap-2">
                {item.actionIcon}
                <span className="text-gray-600 truncate">{item.actionText}</span>
                <button className="ml-auto text-gray-700 hover:text-black">
                  <BsEyeFill className="text-lg" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default RecentActivityTable;
