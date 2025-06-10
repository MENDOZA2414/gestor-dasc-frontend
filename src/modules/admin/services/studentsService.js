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

// Reasignar Asesor Interno
export const reassignInternalAssessor = async (studentID, assessorID) => {
  try {
    const response = await api.patch(`/students/${studentID}/assessor`, {
      internalAssessorID: assessorID
    });
    console.log('Estudiante reasignado correctamente:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error reasignando al alumno ${studentID}:`, {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    throw error;
  }
};

// Obtener archivos de estudiante por Matricula/Numero de control
export const getStudentFiles = async (studentID) => {
  try {
    const response = await api.get(`/student-documentation/by-control/${studentID}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener archivos del estudiante ${studentID}:`, error);
    throw error;
  }
};

// Ver archivo según su ruta
export const getAndViewFile = async (path) => {
  try {
    const response = await api.get(`/documents/view?path=${path}&download=false`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener archivo ${path}:`, error);
    throw error;
  }
};

// Descargar archivo según su ruta
export const getAndDownloadFile = async (path) => {
  try {
    const response = await api.get(`/documents/view?path=${path}&download=true`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener archivo ${path}:`, error);
    throw error;
  }
};

// Elimina archivo según su ID
export const deleteFile = async (id) => {
  try {
    const response = await api.delete(`/student-documentation/${id}`);
    console.log('Archivo eliminado correctamente:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar archivo ${id}:`, {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    throw error;
  }
};

// Marcar archivo como Aceptado
export const markFileAsAccepted = async (id) => {
  try {
    const response = await api.patch(`/student-documentation/approve`, {
      documentID: id
    });
    console.log('Archivo marcado como ACEPTADO correctamente:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al marcar como ACEPTADO al archivo ${id}:`, {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    throw error;
  }
};

// Marcar archivo como Rechazado
export const markFileAsRejected = async (id, reason) => {
  try {
    const response = await api.post(`/student-documentation/reject`, {
      documentID: id,
      reason: reason
    });
    console.log('Archivo marcado como RECHAZADO correctamente:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al marcar como RECHAZADO al archivo ${id}:`, {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    throw error;
  }
};

// Marcar archivo En Revisión
export const markFileAsOnReview = async (id) => {
  try {
    const response = await api.patch(`/student-documentation/review/${id}`);
    console.log('Archivo marcado como EN REVISIÓN correctamente:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al marcar como EN REVISIÓN al archivo ${id}:`, {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    throw error;
  }
};