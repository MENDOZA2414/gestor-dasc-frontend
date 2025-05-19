import React from 'react';
import Layout from '../../../shared/components/Layout';
import Card from '../../../shared/components/Card';
import { HiOutlineUser } from 'react-icons/hi';
import ActivityChartCard from '../components/ActivityChartCard';
import StudentsPerEntityChart from '../components/StudentsPerEntityChart';
import PracticeStatusChart from '../components/PracticeStatusChart';

const Dashboard = () => {
  const user = {
    firstName: 'José Miguel',
    firstLastName: 'Mendoza',
    logo: 'https://via.placeholder.com/100'
  };

  const userType = 'admin';

  return (
    <Layout user={user} userType={userType}>
      <div className="grid grid-cols-12 gap-4">

        {/* Totales */}
        <Card className="col-span-12 sm:col-span-6 lg:col-span-3 h-24">
            <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center">
                <HiOutlineUser className="text-white text-2xl" />
            </div>
            <div>
                <p className="text-base md:text-lg text-gray-700 font-medium">Total de alumnos</p>
                <p className="text-xl font-bold text-neutral-900">127</p>
            </div>
            </div>
        </Card>

        <Card className="col-span-12 sm:col-span-6 lg:col-span-3 h-24">
            <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center">
                <HiOutlineUser className="text-white text-2xl" />
            </div>
            <div>
                <p className="text-base md:text-lg text-gray-700 font-medium">Asesores Internos</p>
                <p className="text-xl font-bold text-neutral-900">11</p>
            </div>
            </div>
        </Card>

        <Card className="col-span-12 sm:col-span-6 lg:col-span-3 h-24">
            <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
                <HiOutlineUser className="text-white text-2xl" />
            </div>
            <div>
                <p className="text-base md:text-lg text-gray-700 font-medium">Asesores Externos</p>
                <p className="text-xl font-bold text-neutral-900">16</p>
            </div>
            </div>
        </Card>

        <Card className="col-span-12 sm:col-span-6 lg:col-span-3 h-24">
            <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-full bg-emerald-300 flex items-center justify-center">
                <HiOutlineUser className="text-white text-2xl" />
            </div>
            <div>
                <p className="text-base md:text-lg text-gray-700 font-medium">Entidades receptoras</p>
                <p className="text-xl font-bold text-neutral-900">16</p>
            </div>
            </div>
        </Card>

        {/* Resto de cards */}
        <ActivityChartCard />
        <StudentsPerEntityChart />
        <PracticeStatusChart />
        <Card title="Actividad reciente" className="col-span-12 md:col-span-9 h-64" />
        <Card title="Reportes generados" className="col-span-12 md:col-span-3 h-64" />

        </div>

    </Layout>
  );
};

export default Dashboard;
