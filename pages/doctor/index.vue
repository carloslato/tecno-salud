<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl font-extrabold text-gray-900 mb-6">Panel del Doctor</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Citas Próximas -->
        <div class="bg-white shadow overflow-hidden rounded-lg p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Citas Próximas</h3>
          <div v-if="loadingAppointments" class="text-center text-gray-600">Cargando citas...</div>
          <!-- <div v-else-if="upcomingAppointments.length === 0" class="text-center text-gray-600">No tienes citas próximas.</div> -->
          <ul v-else class="space-y-3">
            <li v-for="appointment in upcomingAppointments" :key="appointment.$id" class="border-b pb-2">
              <p class="text-lg font-medium text-gray-900">Paciente: {{ appointment.patientName }}</p>
              <p class="text-sm text-gray-500">Fecha: {{ new Date(appointment.date).toLocaleDateString() }}</p>
              <p class="text-sm text-gray-500">Hora: {{ appointment.time }}</p>
              <NuxtLink :to="`/doctor/medical-records/create?appointmentId=${appointment.$id}&patientId=${appointment.patientId}`"
                        class="text-indigo-600 hover:text-indigo-900 text-sm">
                Crear Historia Médica
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Acciones Rápidas -->
        <div class="bg-white shadow overflow-hidden rounded-lg p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
          <div class="space-y-4">
            <NuxtLink to="/doctor/medical-records/create"
                      class="block w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
              Crear/Editar Historia Médica
            </NuxtLink>
            <NuxtLink to="/doctor/documents/upload"
                      class="block w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
              Subir Documentos de Exámenes
            </NuxtLink>
            <NuxtLink to="/doctor/invoices/create"
                      class="block w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700">
              Emitir Factura
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import useDoctorPanel from '~/composables/useDoctorPanel';
import useAuth from '~/composables/useAuth';
import { Query } from 'appwrite';

definePageMeta({
  middleware: 'auth',
  roles: ['doctor', 'admin'] // Roles permitidos para esta página
});

const upcomingAppointments = ref([]);
const loadingAppointments = ref(true);
const { getDoctorAppointments } = useDoctorPanel();
const { getCurrentUser } = useAuth();

const fetchUpcomingAppointments = async () => {
  loadingAppointments.value = true;
  try {
    console.log('currentUserComplete before')
    const currentUser = await getCurrentUser();
    console.log('currentUserComplete', currentUser)
    if (currentUser && (currentUser.role === 'doctor' || currentUser.role === 'admin')) { // Verificar el rol del usuario
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const fetchedAppointments = await getDoctorAppointments(currentUser.$id, [
        Query.greaterThanEqual('datetime', today.toISOString().split('T')[0]), // Citas desde hoy en adelante
        Query.equal('status', 'scheduled') // Solo citas agendadas
      ]);
      upcomingAppointments.value = fetchedAppointments;
    } else {
      alert('Acceso denegado. Solo los doctores pueden acceder a este panel.');
      navigateTo('/'); // Redirigir si no es doctor
    }
  } catch (error) {
    console.error('Error al cargar citas próximas:', error);
    alert('Error al cargar citas próximas.');
  } finally {
    loadingAppointments.value = false;
  }
};

onMounted(() => {
  fetchUpcomingAppointments();
});
</script>