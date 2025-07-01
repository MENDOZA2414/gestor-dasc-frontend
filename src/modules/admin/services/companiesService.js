import api from '@utils/api';

// Obtener todas las companias
export const getAllCompanies = async () => {
  const response = await api.get('/companies/all');
  console.log(response.data)
  return response.data;
};
