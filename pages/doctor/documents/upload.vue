<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Subir Documento de Examen
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleUploadDocument">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="patientId" class="sr-only">ID del Paciente</label>
            <input id="patientId" name="patientId" type="text" required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   placeholder="ID del Paciente" v-model="patientId">
          </div>
          <div>
            <label for="documentName" class="sr-only">Nombre del Documento</label>
            <input id="documentName" name="documentName" type="text" required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   placeholder="Nombre del Documento" v-model="documentName">
          </div>
          <div>
            <label for="documentType" class="sr-only">Tipo de Documento</label>
            <input id="documentType" name="documentType" type="text" required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   placeholder="Tipo de Documento (ej. 'Radiografía', 'Análisis de Sangre')" v-model="documentType">
          </div>
          <div>
            <label for="file" class="sr-only">Archivo</label>
            <input id="file" name="file" type="file" required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   @change="handleFileChange">
          </div>
        </div>

        <div>
          <button type="submit"
                  class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Subir Documento
          </button>
        </div>
      </form>
      <p class="mt-2 text-center text-sm text-gray-600">
        <NuxtLink to="/doctor" class="font-medium text-indigo-600 hover:text-indigo-500">
          Volver al Panel del Doctor
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useDoctorPanel from '~/composables/useDoctorPanel';
import useAuth from '~/composables/useAuth';

definePageMeta({
  middleware: 'auth',
  roles: ['doctor', 'admin'] // Roles permitidos para esta página
});

const patientId = ref('');
const documentName = ref('');
const documentType = ref('');
const selectedFile = ref(null);
const router = useRouter();
const { uploadExamDocument } = useDoctorPanel();
const { getCurrentUser } = useAuth();

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0];
};

const handleUploadDocument = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || (currentUser.role !== 'doctor' && currentUser.role !== 'admin')) {
      alert('Acceso denegado. Solo los doctores pueden subir documentos.');
      router.push('/login');
      return;
    }

    if (!selectedFile.value) {
      alert('Por favor, selecciona un archivo para subir.');
      return;
    }

    const metadata = {
      patient_id: patientId.value,
      name: documentName.value,
      type: documentType.value,
      date: new Date().toISOString().split('T')[0],
      uploaded_by: currentUser.$id,
      uploaded_by_name: currentUser.name || currentUser.email,
    };

    await uploadExamDocument(selectedFile.value, metadata);
    alert('Documento subido exitosamente.');
    router.push('/doctor');
  } catch (error) {
    console.error('Error al subir documento:', error);
    alert(`Error al subir documento: ${error.message}`);
  }
};
</script>