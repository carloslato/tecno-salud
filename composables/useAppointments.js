import { getAppwrite } from '~/lib/appwrite';
import { ID, Query } from 'appwrite';

export default function useAppointments() {
  const config = useRuntimeConfig();
  const { databases } = getAppwrite(config);
  const databaseId = '685380e9000e5925c637';
  const collectionId = '686eeb2b0001cb367c34'; // appointments

  const createAppointment = async (data) => {
    try {
      const appointment = await databases.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        data
      );
      console.log('Cita creada:', appointment);
      return appointment;
    } catch (error) {
      console.error('Error al crear cita:', error);
      throw error;
    }
  };

  const listAppointments = async (queries = []) => {
    try {
      const response = await databases.listDocuments(
        databaseId,
        collectionId,
        queries
      );
      console.log('Citas listadas:', response.documents);
      return response.documents;
    } catch (error) {
      console.error('Error al listar citas:', error);
      throw error;
    }
  };

  const getAppointment = async (appointmentId) => {
    try {
      const appointment = await databases.getDocument(
        databaseId,
        collectionId,
        appointmentId
      );
      console.log('Cita obtenida:', appointment);
      return appointment;
    } catch (error) {
      console.error('Error al obtener cita:', error);
      throw error;
    }
  };

  const updateAppointment = async (appointmentId, data) => {
    try {
      const updatedAppointment = await databases.updateDocument(
        databaseId,
        collectionId,
        appointmentId,
        data
      );
      console.log('Cita actualizada:', updatedAppointment);
      return updatedAppointment;
    } catch (error) {
      console.error('Error al actualizar cita:', error);
      throw error;
    }
  };

  const deleteAppointment = async (appointmentId) => {
    try {
      await databases.deleteDocument(
        databaseId,
        collectionId,
        appointmentId
      );
      console.log('Cita eliminada:', appointmentId);
    } catch (error) {
      console.error('Error al eliminar cita:', error);
      throw error;
    }
  };

  return {
    createAppointment,
    listAppointments,
    getAppointment,
    updateAppointment,
    deleteAppointment,
    Query, // Exportar Query para usar en las páginas
  };
}