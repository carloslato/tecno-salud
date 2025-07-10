<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <h2 class="text-3xl font-extrabold text-gray-900 mb-6">Mi Historial Clínico</h2>
      <div v-if="loading" class="text-center text-gray-600">Cargando historial clínico...</div>
      <div v-else-if="medicalRecords.length === 0" class="text-center text-gray-600">No tienes historial clínico registrado.</div>
      <ul v-else class="space-y-4">
        <li v-for="record in medicalRecords" :key="record.$id"
            class="bg-white shadow overflow-hidden rounded-md px-6 py-4">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-lg font-medium text-gray-900">Fecha: {{ new Date(record.date).toLocaleDateString() }}</p>
              <p class="text-sm text-gray-500">Diagnóstico: {{ record.diagnosis }}</p>
              <p class="text-sm text-gray-500">Tratamiento: {{ record.treatment }}</p>
              <p class="text-sm text-gray-500">Doctor: {{ record.doctorName }}</p>
            </div>
          </div>
        </li>
      </ul>
      <div class="mt-6 text-center">
        <NuxtLink to="/medical-records/documents"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Ver Documentos Médicos
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

const medicalRecords = ref([]);
const loading = ref(true);
const { listMedicalRecords } = useMedicalRecords();
const { getCurrentUser } = useAuth();

const fetchMedicalRecords = async () => {
  loading.value = true;
  try {
    const currentUser = await getCurrentUser();
    if (currentUser) {
      // Asumiendo que las historias clínicas tienen un campo 'patientId'
      const fetchedRecords = await listMedicalRecords([
        Query.equal('patientId', currentUser.$id),
        Query.orderDesc('date')
      ]);
      medicalRecords.value = fetchedRecords;
    }
  } catch (error) {
    console.error('Error al cargar historial clínico:', error);
    alert('Error al cargar historial clínico.');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchMedicalRecords();
});
</script>