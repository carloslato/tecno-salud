import { getAppwrite } from '~/lib/appwrite';
import { Query } from 'appwrite';

export default function useAdminPanel() {
  const config = useRuntimeConfig();
  const { databases } = getAppwrite(config);
  const databaseId = '685380e9000e5925c637';
  const usersCollectionId = '686eeb17000d5f03c93b'; // users
  const appointmentsCollectionId = '686eeb2b0001cb367c34'; // appointments
  const invoicesCollectionId = '686eebb2003a85d617cf'; // invoices
  const notificationsCollectionId = '686eebe2001d1b5f26d8'; // notifications

  const listUsers = async (queries = []) => {
    try {
      const response = await databases.listDocuments(
        databaseId,
        usersCollectionId,
        queries
      );
      console.log('Usuarios listados:', response.documents);
      return response.documents;
    } catch (error) {
      console.error('Error al listar usuarios:', error);
      throw error;
    }
  };

  const updateUser = async (userId, data) => {
    try {
      const updatedUser = await databases.updateDocument(
        databaseId,
        usersCollectionId,
        userId,
        data
      );
      console.log('Usuario actualizado:', updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error;
    }
  };

  const deleteUser = async (userId) => {
    try {
      await databases.deleteDocument(
        databaseId,
        usersCollectionId,
        userId
      );
      console.log('Usuario eliminado:', userId);
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw error;
    }
  };

  const listAllAppointments = async (queries = []) => {
    try {
      const response = await databases.listDocuments(
        databaseId,
        appointmentsCollectionId,
        queries
      );
      console.log('Todas las citas listadas:', response.documents);
      return response.documents;
    } catch (error) {
      console.error('Error al listar todas las citas:', error);
      throw error;
    }
  };

  const listAllInvoices = async (queries = []) => {
    try {
      const response = await databases.listDocuments(
        databaseId,
        invoicesCollectionId,
        queries
      );
      console.log('Todas las facturas listadas:', response.documents);
      return response.documents;
    } catch (error) {
      console.error('Error al listar todas las facturas:', error);
      throw error;
    }
  };

  const createNotification = async (data) => {
    try {
      const notification = await databases.createDocument(
        databaseId,
        notificationsCollectionId,
        ID.unique(),
        data
      );
      console.log('Notificación creada:', notification);
      return notification;
    } catch (error) {
      console.error('Error al crear notificación:', error);
      throw error;
    }
  };

  // Funciones para estadísticas básicas (ejemplos)
  const getAppointmentsCount = async () => {
    try {
      const response = await databases.listDocuments(
        databaseId,
        appointmentsCollectionId,
        [Query.limit(1)] // Solo necesitamos el total, no los documentos
      );
      return response.total;
    } catch (error) {
      console.error('Error al obtener el conteo de citas:', error);
      return 0;
    }
  };

  const getUsersCount = async () => {
    try {
      const response = await databases.listDocuments(
        databaseId,
        usersCollectionId,
        [Query.limit(1)]
      );
      return response.total;
    } catch (error) {
      console.error('Error al obtener el conteo de usuarios:', error);
      return 0;
    }
  };

  return {
    listUsers,
    updateUser,
    deleteUser,
    listAllAppointments,
    listAllInvoices,
    createNotification,
    getAppointmentsCount,
    getUsersCount,
    Query,
  };
}