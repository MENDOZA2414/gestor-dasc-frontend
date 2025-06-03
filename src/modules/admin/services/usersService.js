import api from '@utils/api';

// Obtener usuario por ID
export const getUserById = async (id) => {
    try {
        const response = await api.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener usuario con ID ${id}:`, error);
        throw error;
    }
};