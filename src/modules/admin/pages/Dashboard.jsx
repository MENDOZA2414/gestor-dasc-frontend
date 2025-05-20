import React, { useEffect, useState } from 'react';
import Layout from '../../../shared/components/Layout';
import SummaryCard from '../../../shared/components/SummaryCard';
import { HiOutlineAcademicCap, HiOutlineOfficeBuilding } from 'react-icons/hi';
import { FaChalkboardTeacher, FaUserTie } from 'react-icons/fa';
import ActivityChartCard from '../components/ActivityChartCard';
import StudentsPerEntityChart from '../components/StudentsPerEntityChart';
import PracticeStatusChart from '../components/PracticeStatusChart';
import RecentActivityTable from '../components/RecentActivityTable';
import GeneratedReportsTable from '../components/GeneratedReportsTable';
import { getDashboardStats } from '../services/dashboardService';
import { FaPersonShelter } from "react-icons/fa6";
import { GoMortarBoard } from "react-icons/go";

const Dashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    internalAssessors: 0,
    externalAssessors: 0,
    companies: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Error al obtener estadísticas:', error);
      }
    };

    fetchStats();
  }, []);

  const user = {
    firstName: 'José Miguel',
    firstLastName: 'Mendoza',
    logo: 'https://via.placeholder.com/100'
  };

  const userType = 'admin';

  return (
    <Layout user={user} userType={userType}>
      <div className="grid grid-cols-12 sm:grid-cols-12 gap-4">

        <SummaryCard
          icon={<GoMortarBoard />}
          label="Total de alumnos"
          value={stats.students}
          color="bg-sky-500"
        />

        <SummaryCard
          icon={<FaPersonShelter />}
          label="Asesores Internos"
          value={stats.internalAssessors}
          color="bg-blue-700"
        />

        <SummaryCard
          icon={<FaUserTie />}
          label="Asesores Externos"
          value={stats.externalAssessors}
          color="bg-purple-600"
        />

        <SummaryCard
          icon={<HiOutlineOfficeBuilding />}
          label="Entidades receptoras"
          value={stats.companies}
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
