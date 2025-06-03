import api from '@utils/api';

// Obtener todos los asesores
export const getAllInternalAssessors = async () => {
  const response = await api.get('/internalAssessors/');
  return response.data;
};


// Obtener asesor por ID
export const getInternalAssessorById = async (id) => {
  try {
    const response = await api.get(`/internalAssessors/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener asesor con ID ${id}:`, error);
    throw error;
  }
};