import { Card, DataTable } from "../../../../shared/components";
import { BsDownload, BsEnvelopeFill } from 'react-icons/bs';
import IconButton from '../../../../shared/components/IconButton';

const data = [
  {
    role: 'A. Interno',
    name: 'Eduardo Enrique Cota',
    icon: <BsEnvelopeFill className="text-blue-500" />,
    action: 'Subido Cjskdjfbskjdnfkjsdnjksdjsnkjfdnskj.pdf',
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
    action: 'Subido Casasasasasasas.pdf',
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
    action: 'Subido Casasasasasass.pdf',
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
    action: 'Subido Cajosidjaoidjoasid.pdf',
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
    label: 'Actividad', 
    key: 'action',
    render: (row) => (
      <div className="flex items-center gap-2 w-fit">
        {row.icon}
        <span className="truncate max-w-[110px]">{row.action}</span>
      </div>
    )
  },
  {
    label: 'Acción',
    key: 'view',
    center: true,
    render: (row) => (
      <div className="flex justify-center">
        <IconButton
          icon="eye"
          title="Ver"
          onClick={() => console.log('Ver:', row)}
        />
      </div>
    )
  }
];

const RecentActivityTable = () => {
  return (
    <Card title="Actividad reciente" className="col-span-12 md:col-span-8 h-[300px]">
      <DataTable columns={columns} data={data} />
    </Card>
  );
};

export default RecentActivityTable;
