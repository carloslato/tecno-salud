<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Agendar Nueva Cita
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleScheduleAppointment">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="date" class="sr-only">Fecha</label>
            <input id="date" name="date" type="date" required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   v-model="date">
          </div>
          <div>
            <label for="time" class="sr-only">Hora</label>
            <input id="time" name="time" type="time" required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   v-model="time">
          </div>
          <div>
            <label for="doctorName" class="sr-only">Nombre del Doctor</label>
            <input id="doctorName" name="doctorName" type="text" required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   placeholder="Nombre del Doctor" v-model="doctorName">
          </div>
        </div>

        <div>
          <button type="submit"
                  class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Agendar Cita
          </button>
        </div>
      </form>
      <p class="mt-2 text-center text-sm text-gray-600">
        <NuxtLink to="/appointments" class="font-medium text-indigo-600 hover:text-indigo-500">
          Ver mis citas
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useAppointments from '~/composables/useAppointments';
import useAuth from '~/composables/useAuth';

definePageMeta({
  middleware: 'auth',
  roles: ['patient', 'admin'] // Roles permitidos para esta página
});

const date = ref('');
const time = ref('');
const doctorName = ref('');
const router = useRouter();
const { createAppointment } = useAppointments();
const { getCurrentUser } = useAuth();

const handleScheduleAppointment = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      alert('Debes iniciar sesión para agendar una cita.');
      router.push('/login');
      return;
    }

    const appointmentData = {
      datetime: `${date.value}T${time.value}:00.000Z`, // Combinar fecha y hora en formato ISO
      doctor_id: doctorName.value, // Asumiendo que doctorName ahora es doctor_id
      patient_id: currentUser.$id,
      // patientName: currentUser.full_name || currentUser.email, // Este campo no existe en el esquema de Appwrite
      status: 'pending', // Estado inicial de la cita, según el esquema
    };
    await createAppointment(appointmentData);
    alert('Cita agendada exitosamente.');
    router.push('/appointments');
  } catch (error) {
    console.error('Error al agendar cita:', error);
    alert(`Error al agendar cita: ${error.message}`);
  }
};
</script>