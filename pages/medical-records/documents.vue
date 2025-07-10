<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <h2 class="text-3xl font-extrabold text-gray-900 mb-6">Mis Documentos Médicos</h2>
      <div v-if="loading" class="text-center text-gray-600">Cargando documentos...</div>
      <div v-else-if="documents.length === 0" class="text-center text-gray-600">No tienes documentos médicos registrados.</div>
      <ul v-else class="space-y-4">
        <li v-for="doc in documents" :key="doc.$id"
            class="bg-white shadow overflow-hidden rounded-md px-6 py-4">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-lg font-medium text-gray-900">Nombre: {{ doc.name }}</p>
              <p class="text-sm text-gray-500">Tipo: {{ doc.type }}</p>
              <p class="text-sm text-gray-500">Fecha: {{ new Date(doc.date).toLocaleDateString() }}</p>
            </div>
            <a :href="doc.url" target="_blank"
               class="ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Ver Documento
            </a>
          </div>
        </li>
      </ul>
      <div class="mt-6 text-center">
        <NuxtLink to="/medical-records"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          Volver al Historial Clínico
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import useMedicalRecords from '~/composables/useMedicalRecords';
import useAuth from '~/composables/useAuth';
import { Query } from 'appwrite';

definePageMeta({
  middleware: 'auth',
  roles: ['patient', 'admin'] // Roles permitidos para esta página
});

const documents = ref([]);
const loading = ref(true);
const { listDocuments } = useMedicalRecords();
const { getCurrentUser } = useAuth();

const fetchDocuments = async () => {
  loading.value = true;
  try {
    const currentUser = await getCurrentUser();
    if (currentUser) {
      // Asumiendo que los documentos tienen un campo 'patientId'
      const fetchedDocuments = await listDocuments([
        Query.equal('patientId', currentUser.$id),
        Query.orderDesc('date')
      ]);
      documents.value = fetchedDocuments;
    }
  } catch (error) {
    console.error('Error al cargar documentos:', error);
    alert('Error al cargar documentos.');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchDocuments();
});
</script>