<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <h2 class="text-3xl font-extrabold text-gray-900 mb-6">Mis Citas</h2>
      <div v-if="loading" class="text-center text-gray-600">Cargando citas...</div>
      <div v-else-if="appointments.length === 0" class="text-center text-gray-600">No tienes citas agendadas.</div>
      <ul v-else class="space-y-4">
        <li v-for="appointment in appointments" :key="appointment.$id"
            class="bg-white shadow overflow-hidden rounded-md px-6 py-4">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-lg font-medium text-gray-900">Fecha y Hora: {{ new Date(appointment.datetime).toLocaleString() }}</p>
              <p class="text-sm text-gray-500">Doctor ID: {{ appointment.doctor_id }}</p>
              <p class="text-sm text-gray-500">Estado: {{ appointment.status }}</p>
            </div>
            <button @click="cancelAppointment(appointment.$id)"
                    class="ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Cancelar
            </button>
          </div>
        </li>
      </ul>
      <div class="mt-6 text-center">
        <NuxtLink to="/appointments/new"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Agendar Nueva Cita
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import useAppointments from '~/composables/useAppointments';
import { Query } from 'appwrite';

definePageMeta({
  middleware: 'auth',
  roles: ['patient', 'admin'] // Roles permitidos para esta página
});

const appointments = ref([]);
const loading = ref(true);
const { listAppointments, deleteAppointment } = useAppointments();
const { getCurrentUser } = useAuth();

const fetchAppointments = async () => {
  loading.value = true;
  try {
    const currentUser = await getCurrentUser();
    if (currentUser) {
      // Asumiendo que las citas tienen un campo 'patientId'
      const fetchedAppointments = await listAppointments([
        Query.equal('patient_id', currentUser.$id),
        Query.orderDesc('datetime')
      ]);
      appointments.value = fetchedAppointments;
    }
  } catch (error) {
    console.error('Error al cargar citas:', error);
    alert('Error al cargar citas.');
  } finally {
    loading.value = false;
  }
};

const cancelAppointment = async (id) => {
  if (confirm('¿Estás seguro de que quieres cancelar esta cita?')) {
    try {
      await deleteAppointment(id);
      alert('Cita cancelada exitosamente.');
      fetchAppointments(); // Recargar la lista de citas
    } catch (error) {
      console.error('Error al cancelar cita:', error);
      alert('Error al cancelar cita.');
    }
  }
};

onMounted(() => {
  fetchAppointments();
});
</script>