import api from '../../../api';

export const getDashboardStats = async () => {
  const [students, internal, external, companies] = await Promise.all([
    api.get('/students/count'),
    api.get('/internalAssessors/count'),
    api.get('/externalAssessors/count'),
    api.get('/companies/count'),
  ]);

  return {
    students: students.data.totalStudents,
    internalAssessors: internal.data.total,
    externalAssessors: external.data.total,
    companies: companies.data.total,
  };
};
