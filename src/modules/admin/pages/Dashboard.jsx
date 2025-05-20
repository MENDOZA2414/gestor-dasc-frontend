import React from 'react';
import Layout from '../../../shared/components/Layout';
import Card from '../../../shared/components/Card';
import SummaryCard from '../../../shared/components/SummaryCard';
import {HiOutlineAcademicCap,HiOutlineOfficeBuilding,} from 'react-icons/hi';
import { FiUserCheck, FiUserPlus } from 'react-icons/fi';
import ActivityChartCard from '../components/ActivityChartCard';
import StudentsPerEntityChart from '../components/StudentsPerEntityChart';
import PracticeStatusChart from '../components/PracticeStatusChart';
import RecentActivityTable from '../components/RecentActivityTable';
import GeneratedReportsTable from '../components/GeneratedReportsTable';

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
        <SummaryCard
        icon={<HiOutlineAcademicCap />}
        label="Total de alumnos"
        value={127}
        color="bg-sky-500"
        />

        <SummaryCard
        icon={<FiUserCheck />}
        label="Asesores Internos"
        value={11}
        color="bg-blue-700"
        />

        <SummaryCard
        icon={<FiUserPlus />}
        label="Asesores Externos"
        value={16}
        color="bg-purple-600"
        />

        <SummaryCard
        icon={<HiOutlineOfficeBuilding />}
        label="Entidades receptoras"
        value={16}
        color="bg-emerald-300"
        />


        {/* Resto de cards */}
        <ActivityChartCard />
        <StudentsPerEntityChart />
        <PracticeStatusChart />
        <RecentActivityTable />
        <GeneratedReportsTable />
    </div>
    </Layout>
  );
};

export default Dashboard;
