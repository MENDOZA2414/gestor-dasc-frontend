import React, { useEffect, useState } from 'react';

import { SummaryCard } from '@shared/components/cards';
import {
  FaPersonShelter,
  FaUserTie,
  GoMortarBoard,
  HiOutlineOfficeBuilding
} from '@shared/icons';

import {
  StudentsPerEntityChart,
  PracticeStatusChart,
  RecentActivityTable,
  GeneratedReportsTable,
  ActivityChartCard
} from '@modules/admin/components/dashboard';

import { getDashboardStats } from '@modules/admin/services/dashboardService';

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

  return (
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

      {/* Resto de gráficos y tablas */}
      <ActivityChartCard />
      <StudentsPerEntityChart />
      <PracticeStatusChart />
      <RecentActivityTable />
      <GeneratedReportsTable />
    </div>
  );
};

export default Dashboard;
