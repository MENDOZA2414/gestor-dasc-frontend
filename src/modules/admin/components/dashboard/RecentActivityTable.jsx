import { Card, DataTable } from "../../../../shared/components";
import { BsDownload, BsEyeFill, BsEnvelopeFill } from 'react-icons/bs';

const data = [
  {
    role: 'A. Interno',
    name: 'Eduardo Enrique Cota',
    icon: <BsEnvelopeFill className="text-blue-500" />,
    action: 'Subido C...pdf',
  },
  {
    role: 'A. Interno',
    name: 'MT. Alejandro Leyva',
    icon: <span className="w-3 h-3 bg-green-500 rounded-full inline-block" />,
    action: 'Archivo apro...',
  },
  {
    role: 'Alumno',
    name: 'José Flores García',
    icon: <BsDownload className="text-blue-500" />,
    action: 'Subido C...pdf',
  },
  {
    role: 'A. Externo',
    name: 'Sofía Gómez Duarte',
    icon: <span className="w-3 h-3 bg-red-600 rounded-full inline-block" />,
    action: 'Archivo rech...',
  },
  {
    role: 'Alumno',
    name: 'José Flores García',
    icon: <BsDownload className="text-blue-500" />,
    action: 'Subido C...pdf',
  },
  {
    role: 'A. Externo',
    name: 'Sofía Gómez Duarte',
    icon: <span className="w-3 h-3 bg-red-600 rounded-full inline-block" />,
    action: 'Archivo rech...',
  },
  {
    role: 'Alumno',
    name: 'José Flores García',
    icon: <BsDownload className="text-blue-500" />,
    action: 'Subido C...pdf',
  },
  {
    role: 'A. Externo',
    name: 'Sofía Gómez Duarte',
    icon: <span className="w-3 h-3 bg-red-600 rounded-full inline-block" />,
    action: 'Archivo rech...',
  },
];

const columns = [
  {
    label: 'Usuario',
    key: 'role',
  },
  {
    label: 'Nombre',
    key: 'name',
  },
  {
    label: 'Acción',
    key: 'action',
    render: (row) => (
      <div className="flex items-center gap-2">
        {row.icon}
        <span className="truncate">{row.action}</span>
        <button title="Ver" className="ml-auto text-gray-700 hover:text-black">
          <BsEyeFill className="text-lg" />
        </button>
      </div>
    ),
  },
];

const RecentActivityTable = () => {
  return (
    <Card title="Actividad reciente" className="col-span-12 md:col-span-9 h-[300px]">
      <DataTable columns={columns} data={data} />
    </Card>
  );
};

export default RecentActivityTable;
