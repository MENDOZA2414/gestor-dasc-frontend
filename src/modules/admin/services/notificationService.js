import api from '@utils/api';

export const getUnreadNotifications = async () => {
  try {
    const { data } = await api.get('/users/notifications/unread');
    return data;
  } catch (error) {
    console.error('Error al obtener notificaciones:', error.message);
    return [];
  }
};
