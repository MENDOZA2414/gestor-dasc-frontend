import { FaFilePdf, FaDownload, FaEye } from 'react-icons/fa';
import { Card, DataTable } from '../../../../shared/components';
import { truncateMiddle } from '../../../../utils/truncate';
import IconButton from '../../../../shared/components/IconButton';

const reports = [
  { name: 'Reporte 12/06_saknsfnakjfnaksjnfkjaandskjnksdajkdspdf.pdf' },
  { name: 'Reporte 09/06_dsfsdfsf.pdf' },
  { name: 'Reporte 02/06_sfdsffdsfsdsdf.pdf' },
  { name: 'Reporte 12/06_saknsfnakjfnaksjnfkjaandskjnksdajkdspdf.pdf' },
  { name: 'Reporte 09/06_dsfsdfsf.pdf' },
  { name: 'Reporte 02/06_sfdsffdsfsdsdf.pdf' },
];

const columns = [
  {
    label: 'Nombre',
    key: 'name',
    render: (row) => (
      <div className="flex items-center gap-2 max-w-full">
        <FaFilePdf className="text-red-600 text-lg shrink-0" />
        <span className="block truncate max-w-[150px]">
          {truncateMiddle(row.name)}
        </span>
      </div>
    ),
  },
];

const actions = [
  {
    type: 'download',
    title: 'Descargar',
    onClick: (row) => console.log('Descargar', row)
  },
  {
    type: 'eye',
    title: 'Ver',
    onClick: (row) => console.log('Ver', row)
  }
];



const GeneratedReportsTable = () => {
  return (
    <Card title="Reportes generados" className="col-span-12 md:col-span-3 h-[300px]">
      <DataTable
        columns={columns}
        data={reports}a
        actions={actions}
        maxHeight="300px"
      />
    </Card>
  );
};

export default GeneratedReportsTable;
