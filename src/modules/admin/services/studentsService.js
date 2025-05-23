import api from '@utils/api';

// Obtener todos los estudiantes
export const getAllStudents = async () => {
  const response = await api.get('/students/all');
  return response.data;
};


// Obtener estudiante por ID
export const getStudentById = async (id) => {
  try {
    const response = await api.get(`/students/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener estudiante con ID ${id}:`, error);
    throw error;
  }
};