import { getAppwrite } from '~/lib/appwrite';
import { ID, Query } from 'appwrite';
import useAppointments from '~/composables/useAppointments';
import useMedicalRecords from '~/composables/useMedicalRecords';

export default function useDoctorPanel() {
  const config = useRuntimeConfig();
  const { databases, storage } = getAppwrite(config); // Asumiendo que getAppwrite también devuelve storage
  const databaseId = '685380e9000e5925c637';
  const usersCollectionId = '686eeb17000d5f03c93b'; // users
  const invoicesCollectionId = '686eebb2003a85d617cf'; // invoices
  const documentsBucketId = '686f147500363d92fba2'; // TODO: Reemplazar con el ID de tu bucket de documentos

  const { listAppointments, getAppointment, updateAppointment } = useAppointments();
  const { createMedicalRecord, uploadDocument: uploadMedicalDocument } = useMedicalRecords();

  const listPatients = async (queries = []) => {
    try {
      const response = await databases.listDocuments(
        databaseId,
        usersCollectionId,
        [...queries, Query.equal('role', 'patient')] // Filtrar por rol paciente
      );
      console.log('Pacientes listados:', response.documents);
      return response.documents;
    } catch (error) {
      console.error('Error al listar pacientes:', error);
      throw error;
    }
  };

  const getDoctorAppointments = async (doctorId, queries = []) => {
    try {
      const response = await listAppointments([
        ...queries,
        Query.equal('doctor_id', doctorId),
        Query.orderAsc('datetime'),
      ]);
      console.log('Citas del doctor listadas:', response.documents);
      return response.documents;
    } catch (error) {
      console.error('Error al listar citas del doctor:', error);
      throw error;
    }
  };

  const createInvoice = async (data) => {
    try {
      const invoice = await databases.createDocument(
        databaseId,
        invoicesCollectionId,
        ID.unique(),
        data
      );
      console.log('Factura creada:', invoice);
      return invoice;
    } catch (error) {
      console.error('Error al crear factura:', error);
      throw error;
    }
  };

  const uploadExamDocument = async (file, metadata) => {
    try {
      // Aquí se usa el servicio de Storage de Appwrite para subir el archivo
      const uploadedFile = await storage.createFile(
        documentsBucketId,
        ID.unique(),
        file
      );
      console.log('Archivo subido a Storage:', uploadedFile);

      // Luego, se crea un registro en la colección 'documents' con la metadata y el ID del archivo
      const documentRecord = await uploadMedicalDocument(file, {
        ...metadata,
        fileId: uploadedFile.$id,
        fileUrl: storage.getFileView(documentsBucketId, uploadedFile.$id), // URL para ver el documento
      });
      console.log('Registro de documento médico creado:', documentRecord);
      return documentRecord;
    } catch (error) {
      console.error('Error al subir documento de examen:', error);
      throw error;
    }
  };

  return {
    listPatients,
    getDoctorAppointments,
    createMedicalRecord,
    createInvoice,
    uploadExamDocument,
    getAppointment,
    updateAppointment,
    Query,
  };
}