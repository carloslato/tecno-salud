import { getAppwrite } from '~/lib/appwrite';
import { ID, Query } from 'appwrite';

export default function useMedicalRecords() {
  const config = useRuntimeConfig();
  const { databases } = getAppwrite(config);
  const databaseId = '685380e9000e5925c637';
  const medicalRecordsCollectionId = '686eeb3800065f11e647'; // medical_records
  const documentsCollectionId = '686eeb4600239359c96c'; // documents

  const createMedicalRecord = async (data) => {
    try {
      const record = await databases.createDocument(
        databaseId,
        medicalRecordsCollectionId,
        ID.unique(),
        data
      );
      console.log('Historia clínica creada:', record);
      return record;
    } catch (error) {
      console.error('Error al crear historia clínica:', error);
      throw error;
    }
  };

  const listMedicalRecords = async (queries = []) => {
    try {
      const response = await databases.listDocuments(
        databaseId,
        medicalRecordsCollectionId,
        queries
      );
      console.log('Historias clínicas listadas:', response.documents);
      return response.documents;
    } catch (error) {
      console.error('Error al listar historias clínicas:', error);
      throw error;
    }
  };

  const getMedicalRecord = async (recordId) => {
    try {
      const record = await databases.getDocument(
        databaseId,
        medicalRecordsCollectionId,
        recordId
      );
      console.log('Historia clínica obtenida:', record);
      return record;
    } catch (error) {
      console.error('Error al obtener historia clínica:', error);
      throw error;
    }
  };

  const uploadDocument = async (file, data) => {
    // Aquí se necesitaría el servicio de Storage de Appwrite
    // Por ahora, solo se simula la creación de un documento en la base de datos
    try {
      const doc = await databases.createDocument(
        databaseId,
        documentsCollectionId,
        ID.unique(),
        data // data debería incluir el ID del archivo subido a Storage
      );
      console.log('Documento subido (simulado):', doc);
      return doc;
    } catch (error) {
      console.error('Error al subir documento (simulado):', error);
      throw error;
    }
  };

  const listDocuments = async (queries = []) => {
    try {
      const response = await databases.listDocuments(
        databaseId,
        documentsCollectionId,
        queries
      );
      console.log('Documentos listados:', response.documents);
      return response.documents;
    } catch (error) {
      console.error('Error al listar documentos:', error);
      throw error;
    }
  };

  const getDocument = async (documentId) => {
    try {
      const doc = await databases.getDocument(
        databaseId,
        documentsCollectionId,
        documentId
      );
      console.log('Documento obtenido:', doc);
      return doc;
    } catch (error) {
      console.error('Error al obtener documento:', error);
      throw error;
    }
  };

  return {
    createMedicalRecord,
    listMedicalRecords,
    getMedicalRecord,
    uploadDocument,
    listDocuments,
    getDocument,
    Query,
  };
}